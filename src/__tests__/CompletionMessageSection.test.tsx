import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CompletionMessageSection } from '../components/completion/CompletionMessageSection';

describe('CompletionMessageSection コンポーネント', () => {
  it('見出し「申込完了」が表示されること', () => {
    render(<CompletionMessageSection receptionNumber="20260627-123456" />);
    expect(screen.getByRole('heading', { name: /申込完了/ })).toBeInTheDocument();
  });

  it('完了メッセージが表示されること', () => {
    render(<CompletionMessageSection receptionNumber="20260627-123456" />);
    expect(screen.getByText(/お申込みが完了いたしました/)).toBeInTheDocument();
  });

  it('受付番号が表示されること', () => {
    render(<CompletionMessageSection receptionNumber="20260627-123456" />);
    expect(screen.getByText('20260627-123456')).toBeInTheDocument();
  });

  it('受付番号のラベルが表示されること', () => {
    render(<CompletionMessageSection receptionNumber="20260627-123456" />);
    expect(screen.getByText('受付番号')).toBeInTheDocument();
  });
});
