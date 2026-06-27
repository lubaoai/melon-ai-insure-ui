import { describe, it, expect, beforeEach } from 'vitest';
import { useApplicationFormStore } from '../store/applicationFormStore';

describe('applicationFormStore 決済情報', () => {
  beforeEach(() => {
    useApplicationFormStore.setState({
      paymentMethod: 'credit',
      creditCardInfo: { cardNumber: '', expiryMonth: '', expiryYear: '', cardHolder: '', securityCode: '' },
    });
  });

  it('paymentMethod の初期値が credit であること', () => {
    const state = useApplicationFormStore.getState();
    expect(state.paymentMethod).toBe('credit');
  });

  it('creditCardInfo の初期値が全て空文字であること', () => {
    const state = useApplicationFormStore.getState();
    expect(state.creditCardInfo).toEqual({
      cardNumber: '', expiryMonth: '', expiryYear: '', cardHolder: '', securityCode: '',
    });
  });

  it('setPaymentMethod が paymentMethod を更新すること', () => {
    useApplicationFormStore.getState().setPaymentMethod('bank');
    expect(useApplicationFormStore.getState().paymentMethod).toBe('bank');
  });

  it('setCreditCardInfo が creditCardInfo を更新すること', () => {
    const data = { cardNumber: '1234567890123456', expiryMonth: '12', expiryYear: '30', cardHolder: 'TARO YAMADA', securityCode: '123' };
    useApplicationFormStore.getState().setCreditCardInfo(data);
    expect(useApplicationFormStore.getState().creditCardInfo).toEqual(data);
  });
});
