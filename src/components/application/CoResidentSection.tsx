import { useState, useCallback } from 'react';
import { FormRow } from './FormRow';

interface CoResidentPerson {
  name: string;
  nameKana: string;
  sex: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  relationship: string;
  relationshipNote: string;
}

interface CoResidentData {
  hasCoResident: boolean;
  residents: CoResidentPerson[];
}

interface CoResidentSectionProps {
  onChange: (data: CoResidentData) => void;
}

const relationships = [
  { value: '2', label: '配偶者' },
  { value: '3', label: '父母' },
  { value: '4', label: '子' },
  { value: '8', label: 'その他' },
];

const emptyPerson: CoResidentPerson = {
  name: '',
  nameKana: '',
  sex: '',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  relationship: '',
  relationshipNote: '',
};

export function CoResidentSection({ onChange }: CoResidentSectionProps) {
  const [hasCoResident, setHasCoResident] = useState(false);
  const [residents, setResidents] = useState<CoResidentPerson[]>([{ ...emptyPerson }]);

  const updateResident = useCallback(
    (index: number, field: keyof CoResidentPerson, value: string) => {
      setResidents((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], [field]: value };
        onChange({ hasCoResident, residents: next });
        return next;
      });
    },
    [hasCoResident, onChange],
  );

  const addResident = useCallback(() => {
    if (residents.length >= 5) return;
    setResidents((prev) => {
      const next = [...prev, { ...emptyPerson }];
      onChange({ hasCoResident, residents: next });
      return next;
    });
  }, [hasCoResident, residents.length, onChange]);

  const handleToggle = useCallback(
    (value: boolean) => {
      setHasCoResident(value);
      if (value) {
        onChange({ hasCoResident: true, residents });
      } else {
        onChange({ hasCoResident: false, residents: [] });
      }
    },
    [residents, onChange],
  );

  const inputClass = "h-[30px] w-full max-w-[300px] rounded-lg border border-border bg-white px-2.5 text-base text-text-primary focus:border-sub1 focus:outline-none";
  const shortInputClass = "h-[30px] w-[70px] rounded-lg border border-border bg-white px-2.5 text-base text-text-primary focus:border-sub1 focus:outline-none";

  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          ⑦ 同居人の明細
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            {/* 同居人有無 */}
            <FormRow label="同居人" required inputClassName="flex flex-col">
              <div className="flex gap-4 items-center">
                <label className="inline-flex items-center gap-1 whitespace-nowrap">
                  <input type="radio" name="hasCoResident" checked={!hasCoResident} onChange={() => handleToggle(false)} />
                  なし
                </label>
                <label className="inline-flex items-center gap-1 whitespace-nowrap">
                  <input type="radio" name="hasCoResident" checked={hasCoResident} onChange={() => handleToggle(true)} />
                  あり
                </label>
              </div>
              <div className="text-small text-text-light mt-1">
                ※ご家族（6親等以内の血族、3親等以内の姻族）は記入不要です。<br />
                ※同居人は最大5名まで。
              </div>
            </FormRow>

            {/* 同居人詳細 */}
            {hasCoResident && residents.map((resident, index) => {
              const num = index + 1;
              const isFirst = index === 0;
              return (
                <div key={index} className="mt-4 pt-2 border-t border-border first:border-t-0 first:mt-0 first:pt-0">
                  {/* 氏名 */}
                  <FormRow label={`同居人${num} 氏名`} required={isFirst} className="mt-2">
                    <input type="text" placeholder={`同居人${num} 氏名`} maxLength={100} value={resident.name} onChange={(e) => updateResident(index, 'name', e.target.value)} className={inputClass} />
                  </FormRow>

                  {/* 氏名カナ */}
                  <FormRow label={`同居人${num} 氏名（カナ）`} required={isFirst} className="mt-2">
                    <input type="text" placeholder="全角カナ" maxLength={200} value={resident.nameKana} onChange={(e) => updateResident(index, 'nameKana', e.target.value)} className={inputClass} />
                  </FormRow>

                  {/* 性別 */}
                  <FormRow label={`同居人${num} 性別`} required={isFirst} inputClassName="flex gap-4 items-center" className="mt-2">
                    <label className="inline-flex items-center gap-1">
                      <input type="radio" name={`residentSex${index}`} value="1" checked={resident.sex === '1'} onChange={() => updateResident(index, 'sex', '1')} />
                      男性
                    </label>
                    <label className="inline-flex items-center gap-1">
                      <input type="radio" name={`residentSex${index}`} value="2" checked={resident.sex === '2'} onChange={() => updateResident(index, 'sex', '2')} />
                      女性
                    </label>
                  </FormRow>

                  {/* 生年月日 */}
                  <FormRow label={`同居人${num} 生年月日`} required={isFirst} inputClassName="flex items-center gap-1" className="mt-2">
                    <input type="text" placeholder="年" maxLength={4} value={resident.birthYear} onChange={(e) => updateResident(index, 'birthYear', e.target.value)} className={shortInputClass} />
                    <span className="text-sm">年</span>
                    <input type="text" placeholder="月" maxLength={2} value={resident.birthMonth} onChange={(e) => updateResident(index, 'birthMonth', e.target.value)} className="h-[30px] w-[50px] rounded-lg border border-border bg-white px-2.5 text-base text-text-primary focus:border-sub1 focus:outline-none" />
                    <span className="text-sm">月</span>
                    <input type="text" placeholder="日" maxLength={2} value={resident.birthDay} onChange={(e) => updateResident(index, 'birthDay', e.target.value)} className="h-[30px] w-[50px] rounded-lg border border-border bg-white px-2.5 text-base text-text-primary focus:border-sub1 focus:outline-none" />
                    <span className="text-sm">日</span>
                  </FormRow>

                  {/* 契約者との続柄 */}
                  <FormRow label="契約者との続柄" required={isFirst} className="mt-2">
                    <select
                      value={resident.relationship}
                      onChange={(e) => updateResident(index, 'relationship', e.target.value)}
                      className="h-[30px] w-full max-w-[200px] rounded-lg border border-border bg-white px-2 text-base text-text-primary focus:border-sub1 focus:outline-none"
                    >
                      <option value="">選択してください</option>
                      {relationships.map((r) => (
                        <option key={r.value} value={r.value}>{r.label}</option>
                      ))}
                    </select>
                  </FormRow>

                  {/* 続柄備考（その他選択時） */}
                  {resident.relationship === '8' && (
                    <FormRow label="契約者との続柄（備考）" required className="mt-2">
                      <input type="text" placeholder="続柄備考" maxLength={50} value={resident.relationshipNote} onChange={(e) => updateResident(index, 'relationshipNote', e.target.value)} className={inputClass} />
                    </FormRow>
                  )}
                </div>
              );
            })}

            {/* 同居人追加ボタン */}
            {hasCoResident && residents.length < 5 && (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={addResident}
                  className="inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-bold bg-cream text-text-primary border border-border shadow-soft hover:bg-hover-light"
                >
                  同居人を追加
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export type { CoResidentData, CoResidentPerson };
