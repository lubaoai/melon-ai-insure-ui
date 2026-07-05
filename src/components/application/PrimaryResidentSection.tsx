import { useState, useCallback } from 'react';
import { FormRow } from './FormRow';

interface PrimaryResidentData {
  residentType: string;
  name: string;
  nameKana: string;
  sex: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  relationship: string;
  relationshipNote: string;
  phone1: string;
  phone2: string;
  phone3: string;
}

interface PrimaryResidentSectionProps {
  onChange: (data: PrimaryResidentData) => void;
}

const relationships = [
  { value: '2', label: '配偶者' },
  { value: '3', label: '父母' },
  { value: '4', label: '子' },
  { value: '8', label: 'その他' },
];

export function PrimaryResidentSection({ onChange }: PrimaryResidentSectionProps) {
  const [form, setForm] = useState<PrimaryResidentData>({
    residentType: '',
    name: '',
    nameKana: '',
    sex: '1',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    relationship: '',
    relationshipNote: '',
    phone1: '',
    phone2: '',
    phone3: '',
  });

  const isDifferent = form.residentType === '0';

  const updateField = useCallback(
    (field: keyof PrimaryResidentData, value: string) => {
      setForm((prev) => {
        const next = { ...prev, [field]: value };
        onChange(next);
        return next;
      });
    },
    [onChange],
  );

  const inputClass = "h-[30px] w-full max-w-[300px] rounded-lg border border-border bg-white px-2.5 text-base text-text-primary focus:border-sub1 focus:outline-none";
  const shortInputClass = "h-[30px] w-[70px] rounded-lg border border-border bg-white px-2.5 text-base text-text-primary focus:border-sub1 focus:outline-none";

  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          ⑥ 主たる居住者
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            {/* 区分 */}
            <FormRow label="区分" required inputClassName="flex gap-4 items-center">
              <label className="inline-flex items-center gap-1">
                <input type="radio" name="residentType" value="1" checked={form.residentType === '1'} onChange={() => updateField('residentType', '1')} />
                契約者と同じ
              </label>
              <label className="inline-flex items-center gap-1">
                <input type="radio" name="residentType" value="0" checked={form.residentType === '0'} onChange={() => updateField('residentType', '0')} />
                契約者と異なる
              </label>
            </FormRow>

            {/* 契約者と異なる選択時の詳細フィールド */}
            {isDifferent && (
              <>
                {/* 主居住者氏名 */}
                <FormRow label="主居住者氏名" required className="mt-2">
                  <input type="text" placeholder="主居住者氏名" maxLength={100} value={form.name} onChange={(e) => updateField('name', e.target.value)} className={inputClass} />
                </FormRow>

                {/* 主居住者氏名（カナ） */}
                <FormRow label="主居住者氏名（カナ）" required className="mt-2">
                  <input type="text" placeholder="全角カナ" maxLength={200} value={form.nameKana} onChange={(e) => updateField('nameKana', e.target.value)} className={inputClass} />
                </FormRow>

                {/* 性別 */}
                <FormRow label="主居住者性別" required inputClassName="flex gap-4 items-center" className="mt-2">
                  <label className="inline-flex items-center gap-1">
                    <input type="radio" name="residentSex" value="1" checked={form.sex === '1'} onChange={() => updateField('sex', '1')} />
                    男性
                  </label>
                  <label className="inline-flex items-center gap-1">
                    <input type="radio" name="residentSex" value="2" checked={form.sex === '2'} onChange={() => updateField('sex', '2')} />
                    女性
                  </label>
                </FormRow>

                {/* 生年月日 */}
                <FormRow label="主居住者生年月日" required inputClassName="flex items-center gap-1" className="mt-2">
                  <input type="text" placeholder="年" maxLength={4} value={form.birthYear} onChange={(e) => updateField('birthYear', e.target.value)} className={shortInputClass} />
                  <span className="text-sm">年</span>
                  <input type="text" placeholder="月" maxLength={2} value={form.birthMonth} onChange={(e) => updateField('birthMonth', e.target.value)} className="h-[30px] w-[50px] rounded-lg border border-border bg-white px-2.5 text-base text-text-primary focus:border-sub1 focus:outline-none" />
                  <span className="text-sm">月</span>
                  <input type="text" placeholder="日" maxLength={2} value={form.birthDay} onChange={(e) => updateField('birthDay', e.target.value)} className="h-[30px] w-[50px] rounded-lg border border-border bg-white px-2.5 text-base text-text-primary focus:border-sub1 focus:outline-none" />
                  <span className="text-sm">日</span>
                </FormRow>

                {/* 契約者との続柄 */}
                <FormRow label="契約者との続柄" required className="mt-2">
                  <select
                    aria-label="契約者との続柄"
                    value={form.relationship}
                    onChange={(e) => updateField('relationship', e.target.value)}
                    className="h-[30px] w-full max-w-[200px] rounded-lg border border-border bg-white px-2 text-base text-text-primary focus:border-sub1 focus:outline-none"
                  >
                    <option value="">選択してください</option>
                    {relationships.map((r) => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </FormRow>

                {/* 続柄備考（その他選択時） */}
                {form.relationship === '8' && (
                  <FormRow label="契約者との続柄（備考）" required className="mt-2">
                    <input type="text" placeholder="続柄備考" maxLength={50} value={form.relationshipNote} onChange={(e) => updateField('relationshipNote', e.target.value)} className={inputClass} />
                  </FormRow>
                )}

                {/* 電話番号 */}
                <FormRow label="電話番号" required inputClassName="flex items-center" className="mt-2">
                  <input type="text" placeholder="数字" maxLength={5} value={form.phone1} onChange={(e) => updateField('phone1', e.target.value)} className={shortInputClass} />
                  <span className="mx-1">－</span>
                  <input type="text" placeholder="数字" maxLength={4} value={form.phone2} onChange={(e) => updateField('phone2', e.target.value)} className={shortInputClass} />
                  <span className="mx-1">－</span>
                  <input type="text" placeholder="数字" maxLength={4} value={form.phone3} onChange={(e) => updateField('phone3', e.target.value)} className={shortInputClass} />
                </FormRow>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export type { PrimaryResidentData };
