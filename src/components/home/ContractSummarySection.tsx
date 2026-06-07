import { useState, useRef, useCallback } from 'react';
import { Icon } from '../ui/Icon';

interface ContractSummarySectionProps {
  onConfirm: (confirmed: boolean) => void;
}

export function ContractSummarySection({ onConfirm }: ContractSummarySectionProps) {
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 10;
    if (isAtBottom) {
      setScrolledToBottom(true);
    }
  }, []);

  const handleCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setConfirmed(checked);
      onConfirm(checked);
    },
    [onConfirm],
  );

  return (
    <div className="m-2">
      <div className="border-4 border-warning">
        <h1 className="bg-warning text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          <Icon name="alert-circle" size="sm" className="mr-1 inline" />
          契約の概要（注意喚起情報）
        </h1>
        <div className="bg-warning-light p-4 text-sm leading-relaxed">
          <p>「契約の概要」は、保険商品の内容やご注意いただきたい事項のうち、特にご確認いただきたい重要な点をまとめたものです。</p>
          <p className="mt-2">内容をご確認のうえ、「確認しました」をチェックして同意ボタンをクリックしてください。</p>
          <p className="mt-2 font-bold">最後までスクロールすることで「確認しました」にチェックが行えます。</p>
        </div>
      </div>

      <div className="border-4 border-primary mt-4">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          契約の概要
        </h1>
        <div className="bg-cream">
          <div
            data-testid="contract-scroll"
            ref={scrollRef}
            onScroll={handleScroll}
            className="m-2 h-[300px] overflow-y-auto border border-border rounded-lg p-3 text-sm leading-relaxed"
          >
            <p className="mb-3 font-bold text-text-primary">【契約の概要】</p>
            <p className="mb-2">保険期間：1年間または2年間</p>
            <p className="mb-2">保険金額：補償内容により異なります</p>
            <p className="mb-2">保険料：プランにより異なります</p>
            <p className="mb-2">払込方法：一時払いまたは月払い</p>
          </div>

          <div className="text-center mb-2">
            <button className="text-primary-link underline text-sm hover:opacity-70">
              ＞全文を見る
            </button>
          </div>

          <div className="flex justify-center pb-3">
            <div className={`w-[600px] rounded-md p-3 flex items-center justify-center ${scrolledToBottom ? 'bg-white border border-border' : 'bg-qa-bg'}`}>
              <label className={`inline-flex items-center gap-2 ${scrolledToBottom ? 'cursor-pointer text-text-primary' : 'cursor-not-allowed text-text-light'}`}>
                <span className="relative inline-flex h-6 w-6 items-center justify-center">
                  <input type="checkbox" checked={confirmed} onChange={handleCheck} disabled={!scrolledToBottom} className="sr-only" />
                  <span className={`h-6 w-6 rounded-[4px] border ${scrolledToBottom ? 'border-border bg-cream' : 'border-disabled bg-disabled'}`} />
                  <span className={`absolute left-[5px] top-[2px] h-3.5 w-2 rotate-45 border-r-[3px] border-b-[3px] border-accent-orange transition-opacity duration-150 ${confirmed ? 'opacity-100' : 'opacity-0'}`} />
                </span>
                <span className="text-base">確認しました</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
