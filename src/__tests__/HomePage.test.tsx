import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../app/views/HomePage';

describe('HomePage', () => {
  it('ステップナビゲーションが表示されること', () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>);
    expect(screen.getByText('①重要事項同意')).toBeInTheDocument();
  });

  it('注意喚起情報セクションが表示されること', () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>);
    expect(screen.getByText(/重要事項説明書（注意喚起情報/)).toBeInTheDocument();
  });

  it('重要事項説明書セクションが表示されること', () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>);
    const headings = screen.getAllByText('重要事項説明書');
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  it('Q&Aサイドバーが表示されること', () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>);
    expect(screen.getByText('よくある質問')).toBeInTheDocument();
  });

  it('「同意」ボタンが表示されること', () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>);
    expect(screen.getByRole('button', { name: /同意/ })).toBeInTheDocument();
  });

  it('初期状態では同意ボタンが無効であること', () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>);
    expect(screen.getByRole('button', { name: /同意/ })).toBeDisabled();
  });
});
