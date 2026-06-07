import { useCallback } from 'react';
import { Icon } from '../ui/Icon';

interface IntentionSectionProps {
  canProceed: boolean;
  onCustomerNumberChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export function IntentionSection({ canProceed, onCustomerNumberChange, onBack, onNext }: IntentionSectionProps) {
  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onCustomerNumberChange(e.target.value);
    },
    [onCustomerNumberChange],
  );

  return (
    <div className="m-2">
      <div className="border-4 border-sub1 mt-4">
        <h1 className="bg-sub1 text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          お客様番号
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            <div className="inline-flex w-full max-w-[600px]">
              <div className="border border-border bg-label-bg px-3 py-2 text-sm font-bold text-text-primary whitespace-nowrap flex items-center">
                お客様番号
                <span className="ml-2 bg-error text-text-white text-small px-1.5 py-0.5 rounded-sm">必須</span>
              </div>
              <div className="border border-l-0 border-border bg-input-bg px-3 py-2 flex-1">
                <input
                  type="text"
                  onChange={handleInput}
                  className="h-[30px] w-full max-w-[300px] rounded-lg border border-border bg-white px-2.5 text-base text-text-primary focus:border-sub1 focus:outline-none"
                  placeholder="お客様番号を入力してください"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="m-2 mt-4 flex justify-center gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2 text-lg font-bold bg-cream text-text-primary border border-border shadow-soft transition-colors duration-150 hover:bg-hover-light"
        >
          <Icon name="arrow-left-circle" size="lg" />
          戻る
        </button>
        <button
          disabled={!canProceed}
          onClick={onNext}
          className={`
            inline-flex items-center justify-center gap-2 rounded-lg w-[230px] py-2
            text-lg font-bold shadow-soft transition-all duration-150 ease-out
            ${canProceed
              ? 'bg-cta text-text-white hover:bg-cta-hover hover:text-text-primary'
              : 'bg-disabled text-text-white cursor-not-allowed'
            }
          `}
        >
          <Icon name="arrow-right-circle" size="lg" />
          次へ
        </button>
      </div>
    </div>
  );
}
