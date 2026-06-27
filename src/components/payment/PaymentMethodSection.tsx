interface PaymentMethodSectionProps {
  value: string;
  onChange: (method: string) => void;
}

export function PaymentMethodSection({ value, onChange }: PaymentMethodSectionProps) {
  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          お支払方法
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                name="paymentMethod"
                value="credit"
                checked={value === 'credit'}
                onChange={() => onChange('credit')}
              />
              クレジットカード払
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
