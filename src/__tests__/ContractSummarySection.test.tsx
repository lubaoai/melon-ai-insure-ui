import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContractSummarySection } from '../components/home/ContractSummarySection';

describe('ContractSummarySection コンポーネント', () => {
  it('アンバー見出し「契約の概要（注意喚起情報）」が表示されること', () => {
    render(<ContractSummarySection onConfirm={vi.fn()} />);
    expect(screen.getByText(/契約の概要（注意喚起情報）/)).toBeInTheDocument();
  });

  it('マゼンタ見出し「契約の概要」が表示されること', () => {
    render(<ContractSummarySection onConfirm={vi.fn()} />);
    const headings = screen.getAllByText('契約の概要');
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  it('スクロール可能な領域が表示されること', () => {
    render(<ContractSummarySection onConfirm={vi.fn()} />);
    expect(screen.getByTestId('contract-scroll')).toBeInTheDocument();
  });

  it('初期状態では確認チェックボックスが非活性であること', () => {
    render(<ContractSummarySection onConfirm={vi.fn()} />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('全文を見るリンクが表示されること', () => {
    render(<ContractSummarySection onConfirm={vi.fn()} />);
    expect(screen.getByText('＞全文を見る')).toBeInTheDocument();
  });

  it('確認チェックボックスのラベルが表示されること', () => {
    render(<ContractSummarySection onConfirm={vi.fn()} />);
    const checkbox = screen.getByRole('checkbox');
    const label = checkbox.closest('label');
    expect(label).toHaveTextContent('確認しました');
  });
});
