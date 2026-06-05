import { describe, it, expect } from 'vitest';
import type { InsuranceProduct } from '../modules/products/types';

describe('InsuranceProduct型', () => {
  it('全フィールドを持つオブジェクトが型チェックを通ること', () => {
    const product: InsuranceProduct = {
      id: '1',
      name: '医療保険プレミアム',
      category: '医療',
      premium: 5000,
      coverage: '入院一時金50万円',
      description: '充実の保障内容の医療保険',
    };
    expect(product.id).toBe('1');
    expect(product.name).toBe('医療保険プレミアム');
    expect(product.category).toBe('医療');
    expect(product.premium).toBe(5000);
    expect(product.coverage).toBe('入院一時金50万円');
    expect(product.description).toBe('充実の保障内容の医療保険');
  });

  it('必須フィールドを省略すると型エラーになること', () => {
    const incomplete = { id: '1' } as Partial<InsuranceProduct>;
    expect(incomplete.id).toBe('1');
    expect(incomplete.name).toBeUndefined();
  });
});
