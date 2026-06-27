import { describe, it, expect } from 'vitest';
import { validateCreditCardInfo } from '../utils/creditCardValidation';
import type { CreditCardInfoData } from '../store/applicationFormStore';

const validData: CreditCardInfoData = {
  cardNumber: '4242424242424242',
  expiryMonth: '12',
  expiryYear: '30',
  cardHolder: 'TARO YAMADA',
  securityCode: '123',
};

describe('validateCreditCardInfo', () => {
  it('全フィールドが正常な場合、isValid=true で errors が空であること', () => {
    const result = validateCreditCardInfo(validData);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('カード番号が空の場合、isValid=false で cardNumber エラーであること', () => {
    const result = validateCreditCardInfo({ ...validData, cardNumber: '' });
    expect(result.isValid).toBe(false);
    expect(result.errors.cardNumber).toBe('カード番号を入力してください');
  });

  it('カード番号が16桁未満の場合、isValid=false で cardNumber エラーであること', () => {
    const result = validateCreditCardInfo({ ...validData, cardNumber: '424242424242424' });
    expect(result.isValid).toBe(false);
    expect(result.errors.cardNumber).toBe('カード番号は16桁で入力してください');
  });

  it('有効期限の月が空の場合、isValid=false で expiryMonth エラーであること', () => {
    const result = validateCreditCardInfo({ ...validData, expiryMonth: '' });
    expect(result.isValid).toBe(false);
    expect(result.errors.expiryMonth).toBe('有効期限（月）を入力してください');
  });

  it('有効期限の月が00の場合、isValid=false で expiryMonth エラーであること', () => {
    const result = validateCreditCardInfo({ ...validData, expiryMonth: '00' });
    expect(result.isValid).toBe(false);
    expect(result.errors.expiryMonth).toBe('有効期限（月）は01〜12で入力してください');
  });

  it('有効期限の月が13の場合、isValid=false で expiryMonth エラーであること', () => {
    const result = validateCreditCardInfo({ ...validData, expiryMonth: '13' });
    expect(result.isValid).toBe(false);
    expect(result.errors.expiryMonth).toBe('有効期限（月）は01〜12で入力してください');
  });

  it('有効期限の年が空の場合、isValid=false で expiryYear エラーであること', () => {
    const result = validateCreditCardInfo({ ...validData, expiryYear: '' });
    expect(result.isValid).toBe(false);
    expect(result.errors.expiryYear).toBe('有効期限（年）を入力してください');
  });

  it('カード名義人が空の場合、isValid=false で cardHolder エラーであること', () => {
    const result = validateCreditCardInfo({ ...validData, cardHolder: '' });
    expect(result.isValid).toBe(false);
    expect(result.errors.cardHolder).toBe('カード名義人を入力してください');
  });

  it('セキュリティコードが空の場合、isValid=false で securityCode エラーであること', () => {
    const result = validateCreditCardInfo({ ...validData, securityCode: '' });
    expect(result.isValid).toBe(false);
    expect(result.errors.securityCode).toBe('セキュリティコードを入力してください');
  });

  it('セキュリティコードが2桁の場合、isValid=false で securityCode エラーであること', () => {
    const result = validateCreditCardInfo({ ...validData, securityCode: '12' });
    expect(result.isValid).toBe(false);
    expect(result.errors.securityCode).toBe('セキュリティコードは3〜4桁で入力してください');
  });
});
