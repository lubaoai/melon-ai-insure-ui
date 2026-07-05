import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ApplicationInputPage from '../app/views/ApplicationInputPage';

describe('ApplicationInputPage', () => {
  it('ステップナビゲーションのステップ3が表示されること', () => {
    render(<BrowserRouter><ApplicationInputPage /></BrowserRouter>);
    expect(screen.getByText('③申込内容入力')).toBeInTheDocument();
  });

  it('全7セクションの見出しが表示されること', () => {
    render(<BrowserRouter><ApplicationInputPage /></BrowserRouter>);
    expect(screen.getByRole('heading', { name: /① 契約希望日/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /② ご契約コース/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /③ 住居の概要/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /④ ご契約者様の情報/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /⑤ 住居の所在地/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /⑥ 主たる居住者/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /⑦ 同居人の明細/ })).toBeInTheDocument();
  });

  it('Q&Aサイドバーが表示されること', () => {
    render(<BrowserRouter><ApplicationInputPage /></BrowserRouter>);
    expect(screen.getByText('よくある質問')).toBeInTheDocument();
  });

  it('初期状態では次へボタンが非活性であること', () => {
    render(<BrowserRouter><ApplicationInputPage /></BrowserRouter>);
    expect(screen.getByRole('button', { name: /次へ/ })).toBeDisabled();
  });
});
