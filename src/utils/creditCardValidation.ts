import type { CreditCardInfoData } from '../store/applicationFormStore';

interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof CreditCardInfoData, string>>;
}

export function validateCreditCardInfo(data: CreditCardInfoData): ValidationResult {
  const errors: Partial<Record<keyof CreditCardInfoData, string>> = {};

  if (!data.cardNumber) {
    errors.cardNumber = 'カード番号を入力してください';
  } else if (data.cardNumber.length !== 16) {
    errors.cardNumber = 'カード番号は16桁で入力してください';
  }

  if (!data.expiryMonth) {
    errors.expiryMonth = '有効期限（月）を入力してください';
  } else if (Number(data.expiryMonth) < 1 || Number(data.expiryMonth) > 12) {
    errors.expiryMonth = '有効期限（月）は01〜12で入力してください';
  }

  if (!data.expiryYear) {
    errors.expiryYear = '有効期限（年）を入力してください';
  }

  if (!data.cardHolder) {
    errors.cardHolder = 'カード名義人を入力してください';
  }

  if (!data.securityCode) {
    errors.securityCode = 'セキュリティコードを入力してください';
  } else if (data.securityCode.length < 3) {
    errors.securityCode = 'セキュリティコードは3〜4桁で入力してください';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}
