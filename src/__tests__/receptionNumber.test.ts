import { describe, it, expect } from 'vitest';
import { generateReceptionNumber } from '../utils/receptionNumber';

describe('generateReceptionNumber', () => {
  it('YYYYMMDD-XXXXXX 形式の文字列を返すこと', () => {
    const result = generateReceptionNumber();
    expect(result).toMatch(/^\d{8}-\d{6}$/);
  });

  it('日付部分が現在日であること', () => {
    const result = generateReceptionNumber();
    const today = new Date();
    const yyyymmdd = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
    expect(result.startsWith(yyyymmdd)).toBe(true);
  });

  it('呼び出しごとに異なる番号を生成すること', () => {
    const results = new Set(Array.from({ length: 100 }, () => generateReceptionNumber()));
    expect(results.size).toBeGreaterThan(90);
  });

  it('空文字でないこと', () => {
    const result = generateReceptionNumber();
    expect(result.length).toBeGreaterThan(0);
  });
});
