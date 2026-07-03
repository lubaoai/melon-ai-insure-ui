import type { PrimaryResidentData } from '../application/PrimaryResidentSection';
import { ConfirmationRow } from './ConfirmationRow';

interface PrimaryResidentConfirmationSectionProps {
  data: PrimaryResidentData;
}

const residentTypeLabels: Record<string, string> = { '0': '契約者と同じ', '1': '契約者と異なる' };
const sexLabels: Record<string, string> = { '1': '男性', '2': '女性' };
const relationshipLabels: Record<string, string> = {
  '1': '配偶者', '2': '親', '3': '子', '4': '兄弟姉妹',
  '5': '祖父母', '6': '孫', '7': 'おじ・おば', '8': 'その他',
};

export function PrimaryResidentConfirmationSection({ data }: PrimaryResidentConfirmationSectionProps) {
  const isDifferent = data.residentType === '1';
  const birthDate = [data.birthYear, data.birthMonth, data.birthDay].filter(Boolean).join('/');
  const phone = [data.phone1, data.phone2, data.phone3].filter(Boolean).join('-');

  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          ⑥ 主たる居住者
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            <ConfirmationRow label="区分" value={residentTypeLabels[data.residentType] ?? ''} />
            {isDifferent && (
              <>
                <ConfirmationRow label="主居住者氏名" value={data.name} />
                <ConfirmationRow label="主居住者氏名カナ" value={data.nameKana} />
                <ConfirmationRow label="性別" value={sexLabels[data.sex] ?? ''} />
                <ConfirmationRow label="生年月日" value={birthDate} />
                <ConfirmationRow label="契約者との続柄" value={relationshipLabels[data.relationship] ?? ''} />
                {data.relationship === '8' && (
                  <ConfirmationRow label="続柄（備考）" value={data.relationshipNote} />
                )}
                <ConfirmationRow label="電話番号" value={phone} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
