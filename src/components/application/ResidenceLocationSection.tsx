import { useState, useCallback } from 'react';
import { FormRow } from './FormRow';

interface ResidenceLocationData {
  postalCode: string;
  address: string;
  buildingName: string;
  addressKana: string;
}

interface ContractorAddress {
  postalCode: string;
  address: string;
  buildingName: string;
  addressKana: string;
}

interface ResidenceLocationSectionProps {
  onChange: (data: ResidenceLocationData) => void;
  contractorAddress: ContractorAddress | null;
  defaultValue?: ResidenceLocationData;
}

export function ResidenceLocationSection({ onChange, contractorAddress, defaultValue }: ResidenceLocationSectionProps) {
  const [form, setForm] = useState<ResidenceLocationData>(defaultValue ?? {
    postalCode: '',
    address: '',
    buildingName: '',
    addressKana: '',
  });

  const updateField = useCallback(
    (field: keyof ResidenceLocationData, value: string) => {
      setForm((prev) => {
        const next = { ...prev, [field]: value };
        onChange(next);
        return next;
      });
    },
    [onChange],
  );

  const copyFromContractor = useCallback(() => {
    if (!contractorAddress) return;
    const next: ResidenceLocationData = {
      postalCode: contractorAddress.postalCode,
      address: contractorAddress.address,
      buildingName: contractorAddress.buildingName,
      addressKana: contractorAddress.addressKana,
    };
    setForm(next);
    onChange(next);
  }, [contractorAddress, onChange]);

  const inputClass = "h-[30px] w-full max-w-[300px] rounded-lg border border-border bg-white px-2.5 text-base text-text-primary focus:border-sub1 focus:outline-none";

  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          ⑤ 住居の所在地
          <span className="text-small font-normal ml-2">※今回家財保険をご契約いただく物件情報を入力ください。</span>
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            {/* 住居所在地（番地まで） */}
            <FormRow label={<>住居所在地<br />（番地まで）</>} required>
              <button
                type="button"
                onClick={copyFromContractor}
                className="mb-1 inline-flex items-center gap-1 rounded px-2 py-1 text-sm bg-cream text-text-primary border border-border hover:bg-hover-light"
              >
                契約者と同じ
              </button>
              <br />
              〒
              <input
                type="text"
                placeholder="郵便番号"
                maxLength={7}
                value={form.postalCode}
                onChange={(e) => updateField('postalCode', e.target.value)}
                className="h-[30px] w-[80px] rounded-lg border border-border bg-white px-2.5 text-base text-text-primary focus:border-sub1 focus:outline-none"
              />
              <br />
              <input
                type="text"
                placeholder="東京都千代田区美土代町１－２－３"
                maxLength={100}
                value={form.address}
                onChange={(e) => updateField('address', e.target.value)}
                className="mt-1 h-[30px] w-full max-w-[300px] rounded-lg border border-border bg-white px-2.5 text-base text-text-primary focus:border-sub1 focus:outline-none"
              />
            </FormRow>

            {/* 建物名・部屋番号 */}
            <FormRow label={<>住居所在地<br />建物名・部屋番号</>} required className="mt-2">
              <input
                type="text"
                placeholder="建物名・部屋番号"
                maxLength={100}
                value={form.buildingName}
                onChange={(e) => updateField('buildingName', e.target.value)}
                className={inputClass}
              />
              <br /><span className="text-small text-text-light">※戸建等で建物名がない場合は不要</span>
            </FormRow>

            {/* 住所フリガナ */}
            <FormRow label="住所フリガナ" required className="mt-2">
              <input
                type="text"
                placeholder="フリガナ"
                maxLength={200}
                value={form.addressKana}
                onChange={(e) => updateField('addressKana', e.target.value)}
                className={inputClass}
              />
            </FormRow>
          </div>
        </div>
      </div>
    </div>
  );
}

export type { ResidenceLocationData, ContractorAddress };
