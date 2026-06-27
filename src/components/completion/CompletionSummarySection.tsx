import type { ContractCourseData } from '../application/ContractCourseSection';

interface CompletionSummarySectionProps {
  data: ContractCourseData;
  amount: number;
}

const periodLabels: Record<string, string> = { '1': '１年', '2': '２年' };
const paymentLabels: Record<string, string> = { '5': 'クレジットカード払' };
const productLabels: Record<string, string> = { 'K008': 'メロンの新家財保険' };
const planLabels: Record<string, string> = {
  '1Y8C': '１Ｙ８', '1Y9C': '１Ｙ９', '1Y10C': '１Ｙ１０',
  '1Y11C': '１Ｙ１１', '1Y12C': '１Ｙ１２', '1Y15C': '１Ｙ１５',
};

function SummaryRow({ label, value }: { label: string; value: string }) {
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

export function CompletionSummarySection({ data, amount }: CompletionSummarySectionProps) {
  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          申込内容
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            <SummaryRow label="保険期間" value={periodLabels[data.insurancePeriod] ?? ''} />
            <SummaryRow label="お支払方法" value={paymentLabels[data.paymentMethod] ?? ''} />
            <SummaryRow label="商品" value={productLabels[data.product] ?? ''} />
            <SummaryRow label="プラン種別" value={planLabels[data.planType] ?? ''} />
            <SummaryRow label="保険料合計" value={`${amount.toLocaleString()}円`} />
          </div>
        </div>
      </div>
    </div>
  );
}
