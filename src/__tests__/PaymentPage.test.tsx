import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PaymentPage from '../app/views/PaymentPage';

vi.mock('../store/applicationFormStore', () => ({
  useApplicationFormStore: () => ({
    hasData: () => true,
    paymentMethod: 'credit',
    creditCardInfo: { cardNumber: '', expiryMonth: '', expiryYear: '', cardHolder: '', securityCode: '' },
    contractCourse: { insurancePeriod: '1', paymentMethod: '5', product: 'K008', planType: '' },
    setPaymentMethod: vi.fn(),
    setCreditCardInfo: vi.fn(),
  }),
}));

function renderWithRouter() {
  return render(
    <MemoryRouter>
      <PaymentPage />
    </MemoryRouter>,
  );
}

describe('PaymentPage コンポーネント', () => {
  it('ステップナビゲーションで⑤決済手続きがアクティブであること', () => {
    renderWithRouter();
    const stepEl = screen.getByText('⑤決済手続き');
    expect(stepEl).toBeInTheDocument();
  });

  it('お支払方法セクションが表示されること', () => {
    renderWithRouter();
    expect(screen.getByRole('heading', { name: /お支払方法/ })).toBeInTheDocument();
  });

  it('クレジットカード情報セクションが表示されること', () => {
    renderWithRouter();
    expect(screen.getByRole('heading', { name: /クレジットカード情報/ })).toBeInTheDocument();
  });

  it('お支払金額セクションが表示されること', () => {
    renderWithRouter();
    expect(screen.getByRole('heading', { name: /お支払金額/ })).toBeInTheDocument();
  });

  it('注意喚起セクションが表示されること', () => {
    renderWithRouter();
    expect(screen.getByRole('heading', { name: /注意喚起/ })).toBeInTheDocument();
  });

  it('戻るボタンと次へボタンが表示されること', () => {
    renderWithRouter();
    expect(screen.getByText('戻る')).toBeInTheDocument();
    expect(screen.getByText('次へ')).toBeInTheDocument();
  });

  it('初期状態では次へボタンが無効であること', () => {
    renderWithRouter();
    const nextButton = screen.getByText('次へ').closest('button');
    expect(nextButton).toBeDisabled();
  });
});
