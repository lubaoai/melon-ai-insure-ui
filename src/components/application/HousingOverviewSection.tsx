import { useState, useCallback } from 'react';
import { FormRow } from './FormRow';

interface HousingOverviewData {
  structure: string;
  housingType: string;
  totalFloors: string;
  residentFloor: string;
}

interface HousingOverviewSectionProps {
  onChange: (data: HousingOverviewData) => void;
  defaultValue?: HousingOverviewData;
}

export function HousingOverviewSection({ onChange, defaultValue }: HousingOverviewSectionProps) {
  const [form, setForm] = useState<HousingOverviewData>(defaultValue ?? {
    structure: '1',
    housingType: '2',
    totalFloors: '',
    residentFloor: '',
  });

  const updateField = useCallback(
    (field: keyof HousingOverviewData, value: string) => {
      setForm((prev) => {
        const next = { ...prev, [field]: value };
        onChange(next);
        return next;
      });
    },
    [onChange],
  );

  const isApartment = form.housingType === '2';

  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          ③ 住居の概要
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            {/* 構造 */}
            <FormRow label="構造" required inputClassName="flex gap-4 items-center">
              <label className="inline-flex items-center gap-1">
                <input type="radio" name="structure" value="1" checked={form.structure === '1'} onChange={() => updateField('structure', '1')} />
                木造
              </label>
              <label className="inline-flex items-center gap-1">
                <input type="radio" name="structure" value="2" checked={form.structure === '2'} onChange={() => updateField('structure', '2')} />
                非木造
              </label>
            </FormRow>

            {/* 形態 */}
            <FormRow label="形態" required inputClassName="flex gap-4 items-center" className="mt-2">
              <label className="inline-flex items-center gap-1">
                <input type="radio" name="housingType" value="2" checked={form.housingType === '2'} onChange={() => updateField('housingType', '2')} />
                アパート・マンション
              </label>
              <label className="inline-flex items-center gap-1">
                <input type="radio" name="housingType" value="1" checked={form.housingType === '1'} onChange={() => updateField('housingType', '1')} />
                戸建て
              </label>
            </FormRow>

            {/* 形態（備考） */}
            <FormRow label="形態 （備考）" required inputClassName="flex items-center" className="mt-2">
              <input
                type="text"
                placeholder="数字"
                maxLength={2}
                value={form.totalFloors}
                onChange={(e) => updateField('totalFloors', e.target.value)}
                className="h-[30px] w-[70px] rounded-lg border border-border bg-white px-2.5 text-base text-text-primary focus:border-sub1 focus:outline-none"
              />
              {isApartment ? (
                <span className="text-sm ml-1">階建中&nbsp;
                  <input
                    type="text"
                    placeholder="数字"
                    maxLength={2}
                    value={form.residentFloor}
                    onChange={(e) => updateField('residentFloor', e.target.value)}
                    className="h-[30px] w-[70px] rounded-lg border border-border bg-white px-2.5 text-base text-text-primary focus:border-sub1 focus:outline-none"
                  />
                  &nbsp;階
                </span>
              ) : (
                <span className="text-sm ml-1">階建</span>
              )}
            </FormRow>
          </div>
        </div>
      </div>
    </div>
  );
}

export type { HousingOverviewData };
