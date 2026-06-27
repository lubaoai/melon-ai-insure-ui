import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PaymentMethodSection } from '../components/payment/PaymentMethodSection';

describe('PaymentMethodSection コンポーネント', () => {
  it('見出し「お支払方法」が表示されること', () => {
    render(<PaymentMethodSection value="credit" onChange={vi.fn()} />);
    expect(screen.getByRole('heading', { name: /お支払方法/ })).toBeInTheDocument();
  });

  it('クレジットカード払いのラジオボタンが表示されること', () => {
    render(<PaymentMethodSection value="credit" onChange={vi.fn()} />);
    expect(screen.getByLabelText('クレジットカード払')).toBeInTheDocument();
  });

  it('value が credit の場合、クレジットカード払いが選択状態であること', () => {
    render(<PaymentMethodSection value="credit" onChange={vi.fn()} />);
    expect(screen.getByLabelText('クレジットカード払')).toBeChecked();
  });

  it('ラジオボタンを変更した際に onChange が呼ばれること', () => {
    const onChange = vi.fn();
    render(<PaymentMethodSection value="" onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('クレジットカード払'));
    expect(onChange).toHaveBeenCalledWith('credit');
  });
});
