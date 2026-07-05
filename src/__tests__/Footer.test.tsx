import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '../components/layout/Footer';

describe('Footer コンポーネント', () => {
  it('マゼンタ背景のフッターが表示されること', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer.className).toContain('bg-primary');
  });

  it('著作権表示が白テキストで表示されること', () => {
    render(<Footer />);
    const copyright = screen.getByText(/メロン少額短期保険/);
    const container = copyright.closest('div');
    expect(container?.className).toContain('text-text-white');
  });
});
