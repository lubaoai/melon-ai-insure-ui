import { Icon } from '../ui/Icon';

interface NavigationButtonsProps {
  canProceed: boolean;
  onBack: () => void;
  onNext: () => void;
}

export function NavigationButtons({ canProceed, onBack, onNext }: NavigationButtonsProps) {
  return (
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
  );
}
