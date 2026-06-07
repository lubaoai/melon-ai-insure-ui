import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CautionSection } from '../components/home/CautionSection';

describe('CautionSection コンポーネント', () => {
  it('マゼンタ見出し「ご確認いただきたい事項」が表示されること', () => {
    render(<CautionSection />);
    expect(screen.getByText('ご確認いただきたい事項')).toBeInTheDocument();
  });

  it('スクロール可能な領域が表示されること', () => {
    render(<CautionSection />);
    expect(screen.getByTestId('caution-scroll')).toBeInTheDocument();
  });

  it('全文を見るリンクが表示されること', () => {
    render(<CautionSection />);
    expect(screen.getByText('＞全文を見る')).toBeInTheDocument();
  });
});
