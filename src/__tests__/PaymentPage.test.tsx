import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import PaymentPage from '../app/views/PaymentPage';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const mockSetIsCompleted = vi.fn();
const mockSetPaymentMethod = vi.fn();
const mockSetCreditCardInfo = vi.fn();

const mockStore = {
  hasData: () => true,
  paymentMethod: 'credit' as string,
  creditCardInfo: { cardNumber: '', expiryMonth: '', expiryYear: '', cardHolder: '', securityCode: '' },
  contractCourse: { insurancePeriod: '1', paymentMethod: '5', product: 'K008', planType: '' },
  insurancePremium: 880,
  setPaymentMethod: mockSetPaymentMethod,
  setCreditCardInfo: mockSetCreditCardInfo,
  setIsCompleted: mockSetIsCompleted,
};

vi.mock('../store/applicationFormStore', () => ({
  useApplicationFormStore: () => mockStore,
}));

const validCreditCardInfo = {
  cardNumber: '4242424242424242',
  expiryMonth: '12',
  expiryYear: '30',
  cardHolder: 'TARO YAMADA',
  securityCode: '123',
};

function renderWithRouter() {
  return render(
    <MemoryRouter>
      <PaymentPage />
    </MemoryRouter>,
  );
}

describe('PaymentPage コンポーネント', () => {
  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(vi.fn());
    mockSetIsCompleted.mockClear();
    mockStore.creditCardInfo = { cardNumber: '', expiryMonth: '', expiryYear: '', cardHolder: '', securityCode: '' };
  });

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

  it('お支払金額に880円が表示されること', () => {
    renderWithRouter();
    expect(screen.getByText('880円')).toBeInTheDocument();
  });
});

describe('PaymentPage 次へボタン遷移', () => {
  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(vi.fn());
    mockSetIsCompleted.mockClear();
  });

  it('次へボタンクリックで setIsCompleted(true) が呼ばれ /application-completion に遷移すること', () => {
    mockStore.creditCardInfo = validCreditCardInfo;

    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    renderWithRouter();

    const nextButton = screen.getByText('次へ').closest('button')!;
    expect(nextButton).not.toBeDisabled();
    fireEvent.click(nextButton);
    expect(mockSetIsCompleted).toHaveBeenCalledWith(true);
    expect(mockNavigate).toHaveBeenCalledWith('/application-completion');
  });
});
