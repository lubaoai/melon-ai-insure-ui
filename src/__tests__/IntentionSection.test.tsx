import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntentionSection } from '../components/home/IntentionSection';

describe('IntentionSection コンポーネント', () => {
  it('青見出し「お客様番号」が表示されること', () => {
    render(<IntentionSection canProceed={false} onCustomerNumberChange={vi.fn()} onBack={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByRole('heading', { name: 'お客様番号' })).toBeInTheDocument();
  });

  it('お客様番号入力フィールドと必須ラベルが表示されること', () => {
    render(<IntentionSection canProceed={false} onCustomerNumberChange={vi.fn()} onBack={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByPlaceholderText('お客様番号を入力してください')).toBeInTheDocument();
    expect(screen.getByText('必須')).toBeInTheDocument();
  });

  it('戻るボタンが常に活性であること', () => {
    render(<IntentionSection canProceed={false} onCustomerNumberChange={vi.fn()} onBack={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByRole('button', { name: /戻る/ })).not.toBeDisabled();
  });

  it('canProceed=falseでは次へボタンが非活性であること', () => {
    render(<IntentionSection canProceed={false} onCustomerNumberChange={vi.fn()} onBack={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByRole('button', { name: /次へ/ })).toBeDisabled();
  });

  it('canProceed=trueでは次へボタンが活性であること', () => {
    render(<IntentionSection canProceed={true} onCustomerNumberChange={vi.fn()} onBack={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByRole('button', { name: /次へ/ })).not.toBeDisabled();
  });

  it('お客様番号入力でonCustomerNumberChangeが呼ばれること', async () => {
    const handleChange = vi.fn();
    render(<IntentionSection canProceed={false} onCustomerNumberChange={handleChange} onBack={vi.fn()} onNext={vi.fn()} />);
    await userEvent.type(screen.getByPlaceholderText('お客様番号を入力してください'), '12345');
    expect(handleChange).toHaveBeenCalled();
  });
});
