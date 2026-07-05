import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NavigationButtons } from '../components/application/NavigationButtons';

describe('NavigationButtons コンポーネント', () => {
  it('戻るボタンが表示されること', () => {
    render(<NavigationButtons canProceed={false} onBack={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByRole('button', { name: /戻る/ })).toBeInTheDocument();
  });

  it('次へボタンが表示されること', () => {
    render(<NavigationButtons canProceed={false} onBack={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByRole('button', { name: /次へ/ })).toBeInTheDocument();
  });

  it('canProceed=falseでは次へボタンが非活性であること', () => {
    render(<NavigationButtons canProceed={false} onBack={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByRole('button', { name: /次へ/ })).toBeDisabled();
  });

  it('canProceed=trueでは次へボタンが活性であること', () => {
    render(<NavigationButtons canProceed={true} onBack={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByRole('button', { name: /次へ/ })).not.toBeDisabled();
  });
});
