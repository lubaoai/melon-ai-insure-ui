import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '../components/layout/Header';

describe('Header コンポーネント', () => {
  it('ブランドロゴが表示されること', () => {
    render(<Header />);
    expect(screen.getByText('メロン少額短期保険')).toBeInTheDocument();
  });

  it('お問い合わせ情報が表示されること', () => {
    render(<Header />);
    expect(screen.getByText(/0120/)).toBeInTheDocument();
  });

  it('マゼンタの下部ボーダーが適用されること', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('border-b-4');
    expect(header.className).toContain('border-primary');
  });
});
