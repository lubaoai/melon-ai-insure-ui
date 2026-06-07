import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntentionSection } from '../components/home/IntentionSection';

describe('IntentionSection コンポーネント', () => {
  it('マゼンタ見出し「意向確認」が表示されること', () => {
    render(<IntentionSection canProceed={false} onAgree={vi.fn()} onBack={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByText('意向確認')).toBeInTheDocument();
  });

  it('同意チェックボックスが表示されること', () => {
    render(<IntentionSection canProceed={false} onAgree={vi.fn()} onBack={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('戻るボタンが常に活性であること', () => {
    render(<IntentionSection canProceed={false} onAgree={vi.fn()} onBack={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByRole('button', { name: /戻る/ })).not.toBeDisabled();
  });

  it('canProceed=falseでは次へボタンが非活性であること', () => {
    render(<IntentionSection canProceed={false} onAgree={vi.fn()} onBack={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByRole('button', { name: /次へ/ })).toBeDisabled();
  });

  it('canProceed=trueでは次へボタンが活性であること', () => {
    render(<IntentionSection canProceed={true} onAgree={vi.fn()} onBack={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByRole('button', { name: /次へ/ })).not.toBeDisabled();
  });

  it('同意チェックボックス変更でonAgreeが呼ばれること', async () => {
    const handleAgree = vi.fn();
    render(<IntentionSection canProceed={false} onAgree={handleAgree} onBack={vi.fn()} onNext={vi.fn()} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(handleAgree).toHaveBeenCalledWith(true);
  });
});
