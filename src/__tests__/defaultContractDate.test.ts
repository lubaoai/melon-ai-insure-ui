import { describe, it, expect } from 'vitest';
import { getDefaultContractDate } from '../utils/defaultContractDate';

describe('getDefaultContractDate', () => {
  it('現在日付の1週間後を yyyy/mm/dd 形式で返すこと', () => {
    const result = getDefaultContractDate();
    const expected = new Date();
    expected.setDate(expected.getDate() + 7);
    const yyyymmdd = `${expected.getFullYear()}/${String(expected.getMonth() + 1).padStart(2, '0')}/${String(expected.getDate()).padStart(2, '0')}`;
    expect(result).toBe(yyyymmdd);
  });

  it('月末を跨ぐ場合も正しい日付を返すこと', () => {
    const result = getDefaultContractDate(new Date(2026, 5, 27));
    expect(result).toBe('2026/07/04');
  });

  it('年末を跨ぐ場合も正しい日付を返すこと', () => {
    const result = getDefaultContractDate(new Date(2026, 11, 28));
    expect(result).toBe('2027/01/04');
  });

  it('引数なしの場合は現在日付を基準にすること', () => {
    const result = getDefaultContractDate();
    const now = new Date();
    const expected = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
    const expectedStr = `${expected.getFullYear()}/${String(expected.getMonth() + 1).padStart(2, '0')}/${String(expected.getDate()).padStart(2, '0')}`;
    expect(result).toBe(expectedStr);
  });
});
