import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../components/ui/Button';

describe('Button コンポーネント', () => {
  it('プライマリボタンがオレンジ背景で表示されること', () => {
    render(<Button variant="primary">次へ進む</Button>);
    const button = screen.getByRole('button', { name: '次へ進む' });
    expect(button).toBeInTheDocument();
    expect(button.className).toContain('bg-cta');
  });

  it('無効状態のボタンがグレー背景で表示されること', () => {
    render(<Button variant="primary" disabled>次へ進む</Button>);
    const button = screen.getByRole('button', { name: '次へ進む' });
    expect(button).toBeDisabled();
    expect(button.className).toContain('bg-disabled');
  });

  it('セカンダリボタンがクリーム背景で表示されること', () => {
    render(<Button variant="secondary">戻る</Button>);
    const button = screen.getByRole('button', { name: '戻る' });
    expect(button.className).toContain('bg-cream');
  });

  it('クリック時にonClickハンドラが呼ばれること', async () => {
    const handleClick = vi.fn();
    render(<Button variant="primary" onClick={handleClick}>クリック</Button>);
    await userEvent.click(screen.getByRole('button', { name: 'クリック' }));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('無効状態ではクリックハンドラが呼ばれないこと', async () => {
    const handleClick = vi.fn();
    render(<Button variant="primary" disabled onClick={handleClick}>クリック</Button>);
    await userEvent.click(screen.getByRole('button', { name: 'クリック' }));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
