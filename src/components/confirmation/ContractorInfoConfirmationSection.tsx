import type { ContractorInfoData } from '../application/ContractorInfoSection';

interface ContractorInfoConfirmationSectionProps {
  data: ContractorInfoData;
}

const contractTypeLabels: Record<string, string> = { '1': '個人', '2': '法人' };
const sexLabels: Record<string, string> = { '1': '男性', '2': '女性' };

function ConfirmationRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="inline-flex w-full max-w-[600px] mt-2 first:mt-0">
      <div className="border border-border bg-label-bg px-3 py-2 text-sm font-bold text-text-primary whitespace-nowrap flex items-center">
        {label}
      </div>
      <div className="border border-l-0 border-border bg-input-bg px-3 py-2 flex-1 text-base text-text-primary">
        {value}
      </div>
    </div>
  );
}

export function ContractorInfoConfirmationSection({ data }: ContractorInfoConfirmationSectionProps) {
  const isCorporate = data.contractType === '2';
  const nameLabel = isCorporate ? '役職者氏名' : '契約者氏名';
  const nameKanaLabel = isCorporate ? '役職者氏名カナ' : '契約者氏名カナ';
  const birthDate = [data.birthYear, data.birthMonth, data.birthDay].filter(Boolean).join('/');
  const phone = [data.phone1, data.phone2, data.phone3].filter(Boolean).join('-');

  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          ④ ご契約者様の情報
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            <ConfirmationRow label="契約種別" value={contractTypeLabels[data.contractType] ?? ''} />
            {isCorporate && (
              <>
                <ConfirmationRow label="法人名" value={data.corporateName} />
                <ConfirmationRow label="法人名カナ" value={data.corporateNameKana} />
                <ConfirmationRow label="役職名" value={data.positionName} />
              </>
            )}
            <ConfirmationRow label={nameLabel} value={data.name} />
            <ConfirmationRow label={nameKanaLabel} value={data.nameKana} />
            {!isCorporate && (
              <>
                <ConfirmationRow label="性別" value={sexLabels[data.sex] ?? ''} />
                <ConfirmationRow label="生年月日" value={birthDate} />
              </>
            )}
            <ConfirmationRow label="郵便番号" value={data.postalCode} />
            <ConfirmationRow label="住所" value={data.address} />
            <ConfirmationRow label="建物名・部屋番号" value={data.buildingName} />
            <ConfirmationRow label="住所フリガナ" value={data.addressKana} />
            <ConfirmationRow label="電話番号" value={phone} />
          </div>
        </div>
      </div>
    </div>
  );
}
