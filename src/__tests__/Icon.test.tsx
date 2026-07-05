import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Icon } from '../components/ui/Icon';

describe('Icon コンポーネント', () => {
  it('alert-circleアイコンがレンダリングされること', () => {
    render(<Icon name="alert-circle" />);
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('size="sm"で16pxサイズが適用されること', () => {
    render(<Icon name="alert-circle" size="sm" />);
    const svg = document.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('16');
    expect(svg?.getAttribute('height')).toBe('16');
  });

  it('size="lg"で24pxサイズが適用されること', () => {
    render(<Icon name="alert-circle" size="lg" />);
    const svg = document.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('24');
    expect(svg?.getAttribute('height')).toBe('24');
  });

  it('未定義のアイコン名でプレースホルダーがレンダリングされること', () => {
    render(<Icon name="nonexistent-icon" />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('サイズ未指定時はmd(20px)がデフォルトであること', () => {
    render(<Icon name="alert-circle" />);
    const svg = document.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('20');
    expect(svg?.getAttribute('height')).toBe('20');
  });
});
