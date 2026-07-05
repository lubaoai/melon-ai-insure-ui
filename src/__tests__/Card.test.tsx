import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '../components/ui/Card';

describe('Card コンポーネント', () => {
  it('マゼンタの3辺ボーダーとクリーム背景で表示されること', () => {
    render(<Card>カード内容</Card>);
    const card = screen.getByText('カード内容').closest('div');
    expect(card?.className).toContain('border-primary');
    expect(card?.className).toContain('bg-cream');
  });

  it('ホバー時にシャドウが強調されること', () => {
    render(<Card hoverable>カード内容</Card>);
    const card = screen.getByText('カード内容').closest('div');
    expect(card?.className).toContain('hover:shadow-md');
  });

  it('children がレンダリングされること', () => {
    render(<Card><p>テスト内容</p></Card>);
    expect(screen.getByText('テスト内容')).toBeInTheDocument();
  });
});
