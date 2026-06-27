import { useState, useCallback } from 'react';
import { FormRow } from './FormRow';

interface ContractorInfoData {
  contractType: string;
  corporateName: string;
  corporateNameKana: string;
  positionName: string;
  name: string;
  nameKana: string;
  sex: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  postalCode: string;
  address: string;
  buildingName: string;
  addressKana: string;
  phone1: string;
  phone2: string;
  phone3: string;
}

interface ContractorInfoSectionProps {
  onChange: (data: ContractorInfoData) => void;
  defaultValue?: ContractorInfoData;
}

const prefectures = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県',
  '岐阜県', '静岡県', '愛知県', '三重県',
  '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
  '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県',
  '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
];

const years = Array.from({ length: 100 }, (_, i) => String(2026 - i));
const months = Array.from({ length: 12 }, (_, i) => String(i + 1));
const days = Array.from({ length: 31 }, (_, i) => String(i + 1));

export function ContractorInfoSection({ onChange, defaultValue }: ContractorInfoSectionProps) {
  const [form, setForm] = useState<ContractorInfoData>(defaultValue ?? {
    contractType: '1',
    corporateName: '',
    corporateNameKana: '',
    positionName: '',
    name: '',
    nameKana: '',
    sex: '1',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    postalCode: '',
    address: '',
    buildingName: '',
    addressKana: '',
    phone1: '',
    phone2: '',
    phone3: '',
  });

  const isCorporate = form.contractType === '2';

  const updateField = useCallback(
    (field: keyof ContractorInfoData, value: string) => {
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
          ④ ご契約者様の情報
          <span className="text-small font-normal ml-2">※郵送物は契約者様の住所へのお届けになります。</span>
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            {/* 契約種別 */}
            <FormRow label="契約種別" required inputClassName="flex gap-4 items-center">
              <label className="inline-flex items-center gap-1">
                <input type="radio" name="contractType" value="1" checked={form.contractType === '1'} onChange={() => updateField('contractType', '1')} />
                個人
              </label>
              <label className="inline-flex items-center gap-1">
                <input type="radio" name="contractType" value="2" checked={form.contractType === '2'} onChange={() => updateField('contractType', '2')} />
                法人
              </label>
            </FormRow>

            {/* 法人フィールド（法人選択時のみ表示） */}
            {isCorporate && (
              <>
                <FormRow label="法人名" required className="mt-2">
                  <input type="text" placeholder="法人名" maxLength={40} value={form.corporateName} onChange={(e) => updateField('corporateName', e.target.value)} className={inputClass} />
                </FormRow>
                <FormRow label="法人名 （カナ）" required className="mt-2">
                  <input type="text" placeholder="全角カナ" maxLength={100} value={form.corporateNameKana} onChange={(e) => updateField('corporateNameKana', e.target.value)} className={inputClass} />
                </FormRow>
                <FormRow label="役職名" required className="mt-2">
                  <input type="text" placeholder="全角" maxLength={18} value={form.positionName} onChange={(e) => updateField('positionName', e.target.value)} className={inputClass} />
                </FormRow>
              </>
            )}

            {/* 氏名 */}
            <FormRow label={isCorporate ? '役職者氏名' : '契約者氏名'} required className="mt-2">
              <input type="text" placeholder="全角" maxLength={40} value={form.name} onChange={(e) => updateField('name', e.target.value)} className={inputClass} />
            </FormRow>

            {/* 氏名カナ */}
            <FormRow label={isCorporate ? '役職者氏名（カナ）' : '契約者氏名（カナ）'} required className="mt-2">
              <input type="text" placeholder="全角カナ" maxLength={99} value={form.nameKana} onChange={(e) => updateField('nameKana', e.target.value)} className={inputClass} />
            </FormRow>

            {/* 性別（個人のみ） */}
            {!isCorporate && (
              <FormRow label="性別" required inputClassName="flex gap-4 items-center" className="mt-2">
                <label className="inline-flex items-center gap-1">
                  <input type="radio" name="contractorSex" value="1" checked={form.sex === '1'} onChange={() => updateField('sex', '1')} />
                  男性
                </label>
                <label className="inline-flex items-center gap-1">
                  <input type="radio" name="contractorSex" value="2" checked={form.sex === '2'} onChange={() => updateField('sex', '2')} />
                  女性
                </label>
              </FormRow>
            )}

            {/* 生年月日（個人のみ） */}
            {!isCorporate && (
              <FormRow label="生年月日" required inputClassName="flex items-center gap-1" className="mt-2">
                <input type="text" placeholder="年" maxLength={4} value={form.birthYear} onChange={(e) => updateField('birthYear', e.target.value)} className={shortInputClass} />
                <span className="text-sm">年</span>
                <input type="text" placeholder="月" maxLength={2} value={form.birthMonth} onChange={(e) => updateField('birthMonth', e.target.value)} className="h-[30px] w-[50px] rounded-lg border border-border bg-white px-2.5 text-base text-text-primary focus:border-sub1 focus:outline-none" />
                <span className="text-sm">月</span>
                <input type="text" placeholder="日" maxLength={2} value={form.birthDay} onChange={(e) => updateField('birthDay', e.target.value)} className="h-[30px] w-[50px] rounded-lg border border-border bg-white px-2.5 text-base text-text-primary focus:border-sub1 focus:outline-none" />
                <span className="text-sm">日</span>
              </FormRow>
            )}

            {/* 住所（番地まで） */}
            <FormRow label="住所（番地まで）" required className="mt-2">
              〒
              <input type="text" placeholder="郵便番号" maxLength={7} value={form.postalCode} onChange={(e) => updateField('postalCode', e.target.value)} className="h-[30px] w-[80px] rounded-lg border border-border bg-white px-2.5 text-base text-text-primary focus:border-sub1 focus:outline-none" />
              <br />
              <input type="text" placeholder="東京都千代田区美土代町１－２－３" maxLength={100} value={form.address} onChange={(e) => updateField('address', e.target.value)} className="mt-1 h-[30px] w-full max-w-[300px] rounded-lg border border-border bg-white px-2.5 text-base text-text-primary focus:border-sub1 focus:outline-none" />
            </FormRow>

            {/* 建物名・部屋番号 */}
            <FormRow label="建物名・部屋番号" required={!isCorporate} className="mt-2">
              <input type="text" placeholder="建物名・部屋番号" maxLength={100} value={form.buildingName} onChange={(e) => updateField('buildingName', e.target.value)} className={inputClass} />
              <br /><span className="text-small text-text-light">※戸建等で建物名がない場合は不要</span>
            </FormRow>

            {/* 住所フリガナ */}
            <FormRow label={isCorporate ? '建物名フリガナ' : '住所フリガナ'} required className="mt-2">
              <input type="text" placeholder="フリガナ" maxLength={200} value={form.addressKana} onChange={(e) => updateField('addressKana', e.target.value)} className={inputClass} />
            </FormRow>

            {/* 電話番号 */}
            <FormRow label="電話番号" required inputClassName="flex items-center" className="mt-2">
              <input type="text" placeholder="数字" maxLength={5} value={form.phone1} onChange={(e) => updateField('phone1', e.target.value)} className={shortInputClass} />
              <span className="mx-1">－</span>
              <input type="text" placeholder="数字" maxLength={4} value={form.phone2} onChange={(e) => updateField('phone2', e.target.value)} className={shortInputClass} />
              <span className="mx-1">－</span>
              <input type="text" placeholder="数字" maxLength={4} value={form.phone3} onChange={(e) => updateField('phone3', e.target.value)} className={shortInputClass} />
            </FormRow>
          </div>
        </div>
      </div>
    </div>
  );
}

export type { ContractorInfoData };
