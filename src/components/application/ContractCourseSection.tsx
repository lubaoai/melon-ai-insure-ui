import { useState, useCallback } from 'react';
import { FormRow } from './FormRow';

interface ContractCourseData {
  insurancePeriod: string;
  paymentMethod: string;
  product: string;
  planType: string;
}

interface ContractCourseSectionProps {
  onChange: (data: ContractCourseData) => void;
  defaultValue?: ContractCourseData;
  insurancePremium?: number;
}

const plans = [
  { value: '1Y8C', label: '１Ｙ８' },
  { value: '1Y9C', label: '１Ｙ９' },
  { value: '1Y10C', label: '１Ｙ１０' },
  { value: '1Y11C', label: '１Ｙ１１' },
  { value: '1Y12C', label: '１Ｙ１２' },
  { value: '1Y15C', label: '１Ｙ１５' },
];

export function ContractCourseSection({ onChange, defaultValue, insurancePremium = 0 }: ContractCourseSectionProps) {
  const [form, setForm] = useState<ContractCourseData>(defaultValue ?? {
    insurancePeriod: '1',
    paymentMethod: '5',
    product: 'K008',
    planType: '',
  });

  const updateField = useCallback(
    (field: keyof ContractCourseData, value: string) => {
      setForm((prev) => {
        const next = { ...prev, [field]: value };
        onChange(next);
        return next;
      });
    },
    [onChange],
  );

  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          ② ご契約コース
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            {/* 保険期間 */}
            <FormRow label="保険期間" required inputClassName="flex gap-4 items-center">
              <label className="inline-flex items-center gap-1">
                <input type="radio" name="insurancePeriod" value="1" checked={form.insurancePeriod === '1'} onChange={() => updateField('insurancePeriod', '1')} />
                １年
              </label>
              <label className="inline-flex items-center gap-1">
                <input type="radio" name="insurancePeriod" value="2" checked={form.insurancePeriod === '2'} onChange={() => updateField('insurancePeriod', '2')} />
                ２年
              </label>
            </FormRow>

            {/* 保険料のお支払方法 */}
            <FormRow label="保険料のお支払方法" required inputClassName="flex items-center" className="mt-2">
              <label className="inline-flex items-center gap-1">
                <input type="radio" name="paymentMethod" value="5" checked={form.paymentMethod === '5'} onChange={() => updateField('paymentMethod', '5')} />
                クレジットカード払
              </label>
            </FormRow>

            {/* 商品 */}
            <FormRow label="商品" required inputClassName="flex items-center" className="mt-2">
              <label className="inline-flex items-center gap-1">
                <input type="radio" name="product" value="K008" checked={form.product === 'K008'} onChange={() => updateField('product', 'K008')} />
                ＜メロンの新家財保険＞
              </label>
            </FormRow>

            {/* プラン種別 */}
            <FormRow label="プラン種別" required className="mt-2">
              <select
                aria-label="プラン種別"
                value={form.planType}
                onChange={(e) => updateField('planType', e.target.value)}
                className="h-[30px] w-full max-w-[200px] rounded-lg border border-border bg-white px-2 text-base text-text-primary focus:border-sub1 focus:outline-none"
              >
                <option value="">選択してください</option>
                {plans.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </FormRow>

            {/* 保険料 */}
            <FormRow label="保険料" className="mt-2">
              <b className="text-base text-text-primary">{insurancePremium.toLocaleString()}円</b>
            </FormRow>

            {/* 保険料の種類 */}
            <FormRow label="保険料の種類" className="mt-2">
              <span className="text-base text-text-primary">&nbsp;</span>
            </FormRow>
          </div>
        </div>
      </div>
    </div>
  );
}

export type { ContractCourseData };
