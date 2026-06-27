import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PaymentCautionSection } from '../components/payment/PaymentCautionSection';

describe('PaymentCautionSection コンポーネント', () => {
  it('見出し「注意喚起」が表示されること', () => {
    render(<PaymentCautionSection />);
    expect(screen.getByRole('heading', { name: /注意喚起/ })).toBeInTheDocument();
  });

  it('注意喚起の内容がスクロール領域に表示されること', () => {
    render(<PaymentCautionSection />);
    expect(screen.getByText(/クレジットカードのお支払いに関する/)).toBeInTheDocument();
  });

  it('スクロール領域の高さが300pxであること', () => {
    render(<PaymentCautionSection />);
    const scrollArea = screen.getByTestId('caution-scroll-area');
    expect(scrollArea).toHaveStyle({ height: '300px', overflowY: 'auto' });
  });
});
