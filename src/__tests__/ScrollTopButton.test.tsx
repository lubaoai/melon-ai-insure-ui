import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScrollTopButton } from '../components/ui/ScrollTopButton';

describe('ScrollTopButton コンポーネント', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('スクロール位置が50px未満ではボタンが表示されないこと', () => {
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(0);
    render(<ScrollTopButton />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('スクロール位置が50px超でボタンが表示されること', () => {
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(100);
    render(<ScrollTopButton />);
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    expect(screen.getByRole('button', { name: /ページ最上部へ/ })).toBeInTheDocument();
  });

  it('クリック時にwindow.scrollToが呼ばれること', async () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(100);
    render(<ScrollTopButton />);
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    await userEvent.click(screen.getByRole('button', { name: /ページ最上部へ/ }));
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    scrollToSpy.mockRestore();
  });
});
