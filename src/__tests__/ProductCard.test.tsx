import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductCard } from '../components/home/ProductCard';
import type { InsuranceProduct } from '../modules/products/types';

const sampleProduct: InsuranceProduct = {
  id: '1',
  name: '医療保険プレミアム',
  category: '医療',
  premium: 5000,
  coverage: '入院一時金50万円',
  description: '充実の保障内容の医療保険',
};

describe('ProductCard コンポーネント', () => {
  it('商品名が表示されること', () => {
    render(<ProductCard product={sampleProduct} />);
    expect(screen.getByText('医療保険プレミアム')).toBeInTheDocument();
  });

  it('カテゴリバッジが表示されること', () => {
    render(<ProductCard product={sampleProduct} />);
    expect(screen.getByText('医療')).toBeInTheDocument();
  });

  it('月額保険料が表示されること', () => {
    render(<ProductCard product={sampleProduct} />);
    expect(screen.getByText(/月額 5,000/)).toBeInTheDocument();
  });

  it('補償内容が表示されること', () => {
    render(<ProductCard product={sampleProduct} />);
    expect(screen.getByText('入院一時金50万円')).toBeInTheDocument();
  });

  it('CTAボタンがオレンジ色で表示されること', () => {
    render(<ProductCard product={sampleProduct} />);
    const button = screen.getByRole('button', { name: /詳しく見る/ });
    expect(button.className).toContain('bg-cta');
  });
});
