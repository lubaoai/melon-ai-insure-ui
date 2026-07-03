import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ConfirmationRow } from '../components/confirmation/ConfirmationRow';

describe('ConfirmationRow コンポーネント', () => {
  it('ラベルと値が表示されること', () => {
    render(<ConfirmationRow label="契約種別" value="個人" />);
    expect(screen.getByText('契約種別')).toBeInTheDocument();
    expect(screen.getByText('個人')).toBeInTheDocument();
  });

  it('モバイル表示で1カラムの縦スタックレイアウトが適用されること', () => {
    const { container } = render(<ConfirmationRow label="契約種別" value="個人" />);
    const grid = container.firstChild as HTMLElement;
    expect(grid.className).toContain('grid-cols-1');
  });

  it('デスクトップ表示で2カラムレイアウトが適用されること', () => {
    const { container } = render(<ConfirmationRow label="契約種別" value="個人" />);
    const grid = container.firstChild as HTMLElement;
    expect(grid.className).toContain('min-[875px]:grid-cols-[260px_1fr]');
  });

  it('値セルにモバイル用ボーダークラスが適用されること', () => {
    const { container } = render(<ConfirmationRow label="契約種別" value="個人" />);
    const valueCell = container.querySelector('.bg-input-bg') as HTMLElement;
    expect(valueCell.className).toContain('border-t-0');
    expect(valueCell.className).toContain('min-[875px]:border-t');
    expect(valueCell.className).toContain('min-[875px]:border-l-0');
  });

  it('ラベルが空文字でもレイアウトが崩れないこと', () => {
    const { container } = render(<ConfirmationRow label="" value="個人" />);
    const grid = container.firstChild as HTMLElement;
    expect(grid.className).toContain('grid-cols-1');
  });

  it('値が空文字でもレイアウトが崩れないこと', () => {
    const { container } = render(<ConfirmationRow label="契約種別" value="" />);
    const grid = container.firstChild as HTMLElement;
    expect(grid.className).toContain('grid-cols-1');
  });
});
