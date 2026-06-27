import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreditCardSection } from '../components/payment/CreditCardSection';
import type { CreditCardInfoData } from '../store/applicationFormStore';

const defaultData: CreditCardInfoData = {
  cardNumber: '', expiryMonth: '', expiryYear: '', cardHolder: '', securityCode: '',
};

describe('CreditCardSection コンポーネント', () => {
  it('見出し「クレジットカード情報」が表示されること', () => {
    render(<CreditCardSection data={defaultData} onChange={vi.fn()} />);
    expect(screen.getByRole('heading', { name: /クレジットカード情報/ })).toBeInTheDocument();
  });

  it('カード番号の入力フィールドが表示されること', () => {
    render(<CreditCardSection data={defaultData} onChange={vi.fn()} />);
    expect(screen.getByLabelText('カード番号')).toBeInTheDocument();
  });

  it('有効期限の入力フィールドが表示されること', () => {
    render(<CreditCardSection data={defaultData} onChange={vi.fn()} />);
    expect(screen.getByLabelText('有効期限（月）')).toBeInTheDocument();
    expect(screen.getByLabelText('有効期限（年）')).toBeInTheDocument();
  });

  it('カード名義人の入力フィールドが表示されること', () => {
    render(<CreditCardSection data={defaultData} onChange={vi.fn()} />);
    expect(screen.getByLabelText('カード名義人')).toBeInTheDocument();
  });

  it('セキュリティコードの入力フィールドが表示されること', () => {
    render(<CreditCardSection data={defaultData} onChange={vi.fn()} />);
    expect(screen.getByLabelText('セキュリティコード')).toBeInTheDocument();
  });

  it('必須バッジが4つ表示されること', () => {
    render(<CreditCardSection data={defaultData} onChange={vi.fn()} />);
    const badges = screen.getAllByText('必須');
    expect(badges).toHaveLength(4);
  });

  it('カード番号入力で onChange が呼ばれること', () => {
    const onChange = vi.fn();
    render(<CreditCardSection data={defaultData} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('カード番号'), { target: { value: '4242424242424242' } });
    expect(onChange).toHaveBeenCalledWith({ ...defaultData, cardNumber: '4242424242424242' });
  });
});
