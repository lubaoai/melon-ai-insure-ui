import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContractDateConfirmationSection } from '../components/confirmation/ContractDateConfirmationSection';

describe('ContractDateConfirmationSection コンポーネント', () => {
  it('見出し「① 契約希望日」が表示されること', () => {
    render(<ContractDateConfirmationSection date="2026/07/01" />);
    expect(screen.getByRole('heading', { name: /① 契約希望日/ })).toBeInTheDocument();
  });

  it('契約希望日のラベルと値が表示されること', () => {
    render(<ContractDateConfirmationSection date="2026/07/01" />);
    expect(screen.getByText('契約希望日')).toBeInTheDocument();
    expect(screen.getByText('2026/07/01')).toBeInTheDocument();
  });

  it('dateが空文字の場合は空欄で表示されること', () => {
    render(<ContractDateConfirmationSection date="" />);
    expect(screen.getByText('契約希望日')).toBeInTheDocument();
  });

  it('ConfirmationRowコンポーネントを使用していること', () => {
    const { container } = render(<ContractDateConfirmationSection date="2026/07/01" />);
    const grids = container.querySelectorAll('.grid');
    const mainGrid = grids[0];
    expect(mainGrid.className).toContain('grid-cols-1');
    expect(mainGrid.className).toContain('min-[875px]:grid-cols-[260px_1fr]');
  });
});
