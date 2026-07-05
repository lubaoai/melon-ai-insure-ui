import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QASidebar } from '../components/home/QASidebar';

const sampleQA = [
  { question: '保険料はいくらですか？', answer: '保険料はプランにより異なります。' },
  { question: '解約はできますか？', answer: 'いつでも解約可能です。' },
];

describe('QASidebar コンポーネント', () => {
  it('Q&A質問が表示されること', () => {
    render(<QASidebar items={sampleQA} />);
    expect(screen.getByText('保険料はいくらですか？')).toBeInTheDocument();
    expect(screen.getByText('解約はできますか？')).toBeInTheDocument();
  });

  it('初期状態では回答が非表示であること', () => {
    render(<QASidebar items={sampleQA} />);
    expect(screen.queryByText('保険料はプランにより異なります。')).not.toBeInTheDocument();
  });

  it('質問をクリックすると回答が表示されること', async () => {
    render(<QASidebar items={sampleQA} />);
    await userEvent.click(screen.getByText('保険料はいくらですか？'));
    expect(screen.getByText('保険料はプランにより異なります。')).toBeInTheDocument();
  });

  it('Q&Aが空の場合にメッセージが表示されること', () => {
    render(<QASidebar items={[]} />);
    expect(screen.getByText('よくある質問はありません')).toBeInTheDocument();
  });
});
