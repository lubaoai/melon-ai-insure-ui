import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import IntentConfirmationPage from '../app/views/IntentConfirmationPage';

describe('IntentConfirmationPage', () => {
  it('ステップナビゲーションのステップ2が表示されること', () => {
    render(<BrowserRouter><IntentConfirmationPage /></BrowserRouter>);
    expect(screen.getByText('②意向確認')).toBeInTheDocument();
  });

  it('ContractSummarySectionが表示されること', () => {
    render(<BrowserRouter><IntentConfirmationPage /></BrowserRouter>);
    expect(screen.getByText(/契約の概要（注意喚起情報）/)).toBeInTheDocument();
  });

  it('ご確認いただきたい事項セクションが表示されること', () => {
    render(<BrowserRouter><IntentConfirmationPage /></BrowserRouter>);
    expect(screen.getByText('ご確認いただきたい事項')).toBeInTheDocument();
  });

  it('お客様番号セクションが表示されること', () => {
    render(<BrowserRouter><IntentConfirmationPage /></BrowserRouter>);
    expect(screen.getByRole('heading', { name: 'お客様番号' })).toBeInTheDocument();
  });

  it('Q&Aサイドバーが表示されること', () => {
    render(<BrowserRouter><IntentConfirmationPage /></BrowserRouter>);
    expect(screen.getByText('よくある質問')).toBeInTheDocument();
  });

  it('初期状態では次へボタンが非活性であること', () => {
    render(<BrowserRouter><IntentConfirmationPage /></BrowserRouter>);
    expect(screen.getByRole('button', { name: /次へ/ })).toBeDisabled();
  });
});
