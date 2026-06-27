interface PaymentAmountSectionProps {
  amount: number;
}

export function PaymentAmountSection({ amount }: PaymentAmountSectionProps) {
  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          お支払金額
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            <div className="grid grid-cols-1 min-[875px]:grid-cols-[260px_1fr] w-full">
              <div className="border border-border bg-label-bg px-3 py-2 text-sm font-bold text-text-primary flex items-center min-[875px]:whitespace-nowrap">
                保険料合計
              </div>
              <div className="border border-border bg-input-bg px-3 py-2 border-t-0 min-[875px]:border-t min-[875px]:border-l-0">
                <b className="text-base text-text-primary">{amount.toLocaleString()}円</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
