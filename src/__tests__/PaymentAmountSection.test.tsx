import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PaymentAmountSection } from '../components/payment/PaymentAmountSection';

describe('PaymentAmountSection コンポーネント', () => {
  it('見出し「お支払金額」が表示されること', () => {
    render(<PaymentAmountSection amount={0} />);
    expect(screen.getByRole('heading', { name: /お支払金額/ })).toBeInTheDocument();
  });

  it('金額が0円の場合、「0円」と表示されること', () => {
    render(<PaymentAmountSection amount={0} />);
    expect(screen.getByText('0円')).toBeInTheDocument();
  });

  it('金額がカンマ区切りで表示されること', () => {
    render(<PaymentAmountSection amount={15000} />);
    expect(screen.getByText('15,000円')).toBeInTheDocument();
  });
});
