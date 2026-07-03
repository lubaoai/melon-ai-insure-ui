import type { ContractCourseData } from '../application/ContractCourseSection';
import { ConfirmationRow } from '../confirmation/ConfirmationRow';

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

export function CompletionSummarySection({ data, amount }: CompletionSummarySectionProps) {
  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          申込内容
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            <ConfirmationRow label="保険期間" value={periodLabels[data.insurancePeriod] ?? ''} />
            <ConfirmationRow label="お支払方法" value={paymentLabels[data.paymentMethod] ?? ''} />
            <ConfirmationRow label="商品" value={productLabels[data.product] ?? ''} />
            <ConfirmationRow label="プラン種別" value={planLabels[data.planType] ?? ''} />
            <ConfirmationRow label="保険料合計" value={`${amount.toLocaleString()}円`} />
          </div>
        </div>
      </div>
    </div>
  );
}
