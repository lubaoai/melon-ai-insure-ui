import type { ContractCourseData } from '../application/ContractCourseSection';

interface ContractCourseConfirmationSectionProps {
  data: ContractCourseData;
}

const periodLabels: Record<string, string> = { '1': '１年', '2': '２年' };
const paymentLabels: Record<string, string> = { '5': 'クレジットカード払' };
const productLabels: Record<string, string> = { 'K008': 'メロンの新家財保険' };
const planLabels: Record<string, string> = {
  '1Y8C': '１Ｙ８', '1Y9C': '１Ｙ９', '1Y10C': '１Ｙ１０',
  '1Y11C': '１Ｙ１１', '1Y12C': '１Ｙ１２', '1Y15C': '１Ｙ１５',
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

export function ContractCourseConfirmationSection({ data }: ContractCourseConfirmationSectionProps) {
  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          ② ご契約コース
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            <ConfirmationRow label="保険期間" value={periodLabels[data.insurancePeriod] ?? ''} />
            <ConfirmationRow label="保険料のお支払方法" value={paymentLabels[data.paymentMethod] ?? ''} />
            <ConfirmationRow label="商品" value={productLabels[data.product] ?? ''} />
            <ConfirmationRow label="プラン種別" value={planLabels[data.planType] ?? ''} />
            <ConfirmationRow label="保険料" value="0円" />
            <ConfirmationRow label="保険料の種類" value="" />
          </div>
        </div>
      </div>
    </div>
  );
}
