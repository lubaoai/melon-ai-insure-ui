import { useCallback } from 'react';
import { FormRow } from '../application/FormRow';
import type { CreditCardInfoData } from '../../store/applicationFormStore';

interface CreditCardSectionProps {
  data: CreditCardInfoData;
  onChange: (data: CreditCardInfoData) => void;
}

export function CreditCardSection({ data, onChange }: CreditCardSectionProps) {
  const updateField = useCallback(
    (field: keyof CreditCardInfoData, value: string) => {
      onChange({ ...data, [field]: value });
    },
    [data, onChange],
  );

  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          クレジットカード情報
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            <FormRow label="カード番号" required>
              <input
                aria-label="カード番号"
                type="text"
                maxLength={16}
                value={data.cardNumber}
                onChange={(e) => updateField('cardNumber', e.target.value.replace(/\D/g, ''))}
                className="h-[30px] w-full max-w-[300px] rounded-lg border border-border bg-white px-2 text-base text-text-primary focus:border-sub1 focus:outline-none"
                placeholder="1234567890123456"
              />
            </FormRow>

            <FormRow label="有効期限" required className="mt-2" inputClassName="flex items-center gap-2">
              <input
                aria-label="有効期限（月）"
                type="text"
                maxLength={2}
                value={data.expiryMonth}
                onChange={(e) => updateField('expiryMonth', e.target.value.replace(/\D/g, ''))}
                className="h-[30px] w-[60px] rounded-lg border border-border bg-white px-2 text-base text-text-primary focus:border-sub1 focus:outline-none"
                placeholder="MM"
              />
              <span>/</span>
              <input
                aria-label="有効期限（年）"
                type="text"
                maxLength={2}
                value={data.expiryYear}
                onChange={(e) => updateField('expiryYear', e.target.value.replace(/\D/g, ''))}
                className="h-[30px] w-[60px] rounded-lg border border-border bg-white px-2 text-base text-text-primary focus:border-sub1 focus:outline-none"
                placeholder="YY"
              />
            </FormRow>

            <FormRow label="カード名義人" required className="mt-2">
              <input
                aria-label="カード名義人"
                type="text"
                value={data.cardHolder}
                onChange={(e) => updateField('cardHolder', e.target.value.toUpperCase())}
                className="h-[30px] w-full max-w-[300px] rounded-lg border border-border bg-white px-2 text-base text-text-primary focus:border-sub1 focus:outline-none"
                placeholder="TARO YAMADA"
              />
            </FormRow>

            <FormRow label="セキュリティコード" required className="mt-2">
              <input
                aria-label="セキュリティコード"
                type="text"
                maxLength={4}
                value={data.securityCode}
                onChange={(e) => updateField('securityCode', e.target.value.replace(/\D/g, ''))}
                className="h-[30px] w-[80px] rounded-lg border border-border bg-white px-2 text-base text-text-primary focus:border-sub1 focus:outline-none"
                placeholder="123"
              />
            </FormRow>
          </div>
        </div>
      </div>
    </div>
  );
}
