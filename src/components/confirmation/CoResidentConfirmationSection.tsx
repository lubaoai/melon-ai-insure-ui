import type { CoResidentData } from '../application/CoResidentSection';

interface CoResidentConfirmationSectionProps {
  data: CoResidentData;
}

const sexLabels: Record<string, string> = { '1': '男性', '2': '女性' };
const relationshipLabels: Record<string, string> = {
  '1': '配偶者', '2': '親', '3': '子', '4': '兄弟姉妹',
  '5': '祖父母', '6': '孫', '7': 'おじ・おば', '8': 'その他',
};

function ConfirmationRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[260px_1fr] w-full mt-2 first:mt-0">
      <div className="border border-border bg-label-bg px-3 py-2 text-sm font-bold text-text-primary whitespace-nowrap flex items-center">
        {label}
      </div>
      <div className="border border-l-0 border-border bg-input-bg px-3 py-2 text-base text-text-primary">
        {value}
      </div>
    </div>
  );
}

export function CoResidentConfirmationSection({ data }: CoResidentConfirmationSectionProps) {
  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          ⑦ 同居人の明細
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            <ConfirmationRow label="同居人の有無" value={data.hasCoResident ? 'あり' : 'なし'} />
            {data.hasCoResident && data.residents.map((resident, index) => {
              const birthDate = [resident.birthYear, resident.birthMonth, resident.birthDay].filter(Boolean).join('/');
              return (
                <div key={index}>
                  <div className="text-sm font-bold text-text-primary mt-3 mb-1">
                    同居人{index + 1}
                  </div>
                  <ConfirmationRow label="氏名" value={resident.name} />
                  <ConfirmationRow label="氏名カナ" value={resident.nameKana} />
                  <ConfirmationRow label="性別" value={sexLabels[resident.sex] ?? ''} />
                  <ConfirmationRow label="生年月日" value={birthDate} />
                  <ConfirmationRow label="契約者との続柄" value={relationshipLabels[resident.relationship] ?? ''} />
                  {resident.relationship === '8' && (
                    <ConfirmationRow label="続柄（備考）" value={resident.relationshipNote} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
