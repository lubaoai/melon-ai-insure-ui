import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../components/ui/Badge';

describe('Badge コンポーネント', () => {
  it('ライトピンク背景のカテゴリバッジが表示されること', () => {
    render(<Badge>医療</Badge>);
    const badge = screen.getByText('医療');
    expect(badge.className).toContain('bg-label-bg');
    expect(badge.className).toContain('text-primary');
  });

  it('必須バッジが赤背景で表示されること', () => {
    render(<Badge variant="required">必須</Badge>);
    const badge = screen.getByText('必須');
    expect(badge.className).toContain('bg-error');
    expect(badge.className).toContain('text-text-white');
  });
});
