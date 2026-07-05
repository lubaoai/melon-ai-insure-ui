import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingOverlay } from '../components/ui/LoadingOverlay';

describe('LoadingOverlay コンポーネント', () => {
  it('isVisible=true のときにオーバーレイが表示されること', () => {
    render(<LoadingOverlay isVisible={true} />);
    expect(screen.getByText('処理を行っております')).toBeInTheDocument();
  });

  it('isVisible=false のときにオーバーレイが非表示であること', () => {
    render(<LoadingOverlay isVisible={false} />);
    expect(screen.queryByText('処理を行っております')).not.toBeInTheDocument();
  });

  it('Loader2アイコンが回転アニメーション付きで表示されること', () => {
    render(<LoadingOverlay isVisible={true} />);
    const svg = document.querySelector('svg.animate-spin');
    expect(svg).toBeInTheDocument();
  });
});
