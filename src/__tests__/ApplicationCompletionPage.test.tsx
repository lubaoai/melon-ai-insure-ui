import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ApplicationCompletionPage from '../app/views/ApplicationCompletionPage';

vi.mock('../store/applicationFormStore', () => ({
  useApplicationFormStore: () => ({
    hasData: () => true,
    contractCourse: { insurancePeriod: '1', paymentMethod: '5', product: 'K008', planType: '1Y8C' },
  }),
}));

vi.mock('../utils/receptionNumber', () => ({
  generateReceptionNumber: () => '20260627-123456',
}));

function renderWithRouter() {
  return render(
    <MemoryRouter>
      <ApplicationCompletionPage />
    </MemoryRouter>,
  );
}

describe('ApplicationCompletionPage コンポーネント', () => {
  it('ステップナビゲーションで⑥申込完了がアクティブであること', () => {
    renderWithRouter();
    expect(screen.getByText('⑥申込完了')).toBeInTheDocument();
  });

  it('完了メッセージセクションが表示されること', () => {
    renderWithRouter();
    expect(screen.getByRole('heading', { name: /申込完了/ })).toBeInTheDocument();
  });

  it('申込内容セクションが表示されること', () => {
    renderWithRouter();
    expect(screen.getByRole('heading', { name: /申込内容/ })).toBeInTheDocument();
  });

  it('トップページへ戻るリンクが表示されること', () => {
    renderWithRouter();
    expect(screen.getByText('トップページへ戻る')).toBeInTheDocument();
  });

  it('Q&Aサイドバーが表示されないこと', () => {
    renderWithRouter();
    expect(screen.queryByText('よくある質問')).not.toBeInTheDocument();
  });
});
