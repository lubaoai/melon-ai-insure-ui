import { useState, useCallback } from 'react';
import { FormRow } from './FormRow';

interface ContractDateSectionProps {
  onChange: (date: string) => void;
  value?: string;
}

export function ContractDateSection({ onChange, value }: ContractDateSectionProps) {
  const [date, setDate] = useState(value ?? '');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDate(e.target.value);
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          ① 契約希望日
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            <FormRow label="契約希望日" required>
              <input
                type="text"
                placeholder="yyyy/mm/dd"
                maxLength={10}
                value={date}
                onChange={handleChange}
                className="h-[30px] w-full max-w-[190px] rounded-lg border border-border bg-white px-2.5 text-base text-text-primary focus:border-sub1 focus:outline-none"
              />
            </FormRow>
            <div className="mt-2 text-sm text-text-light">
              <label>家財保険をお申込みの場合、契約希望日は次の日付をご入力下さい。<br />
                ・不動産会社を経由する<br />
                　（お部屋の賃貸借契約と一緒にお申込みいただく）：お申込日の翌日以降<br />
                ・上記以外：お申込日から８日後以降</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
