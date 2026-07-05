import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TermsSection } from '../components/home/TermsSection';

describe('TermsSection コンポーネント', () => {
  it('スクロール可能な規約エリアが表示されること', () => {
    render(<TermsSection onAgree={vi.fn()} />);
    const termsArea = screen.getByTestId('terms-scroll');
    expect(termsArea).toBeInTheDocument();
  });

  it('初期状態では確認チェックボックスが無効であること', () => {
    render(<TermsSection onAgree={vi.fn()} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('注意喚起情報セクションが表示されること', () => {
    render(<TermsSection onAgree={vi.fn()} />);
    expect(screen.getByText(/重要事項説明書（注意喚起情報/)).toBeInTheDocument();
  });

  it('重要事項説明書セクションが表示されること', () => {
    render(<TermsSection onAgree={vi.fn()} />);
    const headings = screen.getAllByText('重要事項説明書');
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  it('確認チェックボックスのラベルが表示されること', () => {
    render(<TermsSection onAgree={vi.fn()} />);
    const checkbox = screen.getByRole('checkbox');
    const label = checkbox.closest('label');
    expect(label).toHaveTextContent('確認しました');
  });

  it('全文を見るリンクが表示されること', () => {
    render(<TermsSection onAgree={vi.fn()} />);
    expect(screen.getByText('＞全文を見る')).toBeInTheDocument();
  });
});
