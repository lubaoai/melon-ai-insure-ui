import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CautionSection } from '../components/home/CautionSection';

describe('CautionSection コンポーネント', () => {
  it('マゼンタ見出し「ご確認いただきたい事項」が表示されること', () => {
    render(<CautionSection />);
    expect(screen.getByText('ご確認いただきたい事項')).toBeInTheDocument();
  });

  it('確認案内テキストが表示されること', () => {
    render(<CautionSection />);
    expect(screen.getByText(/下記の事項を充分ご確認ください/)).toBeInTheDocument();
    expect(screen.getByText(/全て「はい」の場合のみお申込が可能です/)).toBeInTheDocument();
  });

  it('3つの確認項目のラジオボタンが表示されること', () => {
    render(<CautionSection />);
    const radios = screen.getAllByRole('radio');
    expect(radios.length).toBe(6);
  });
});
