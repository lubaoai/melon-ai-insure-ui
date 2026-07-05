import { Icon } from '../ui/Icon';

const steps = [
  '①重要事項同意',
  '②意向確認',
  '③申込内容入力',
  '④申込内容確認',
  '⑤決済手続き',
  '⑥申込完了',
];

interface StepNavigationProps {
  currentStep: number;
}

function clampStep(step: number): number {
  return Math.max(1, Math.min(6, step));
}

export function StepNavigation({ currentStep }: StepNavigationProps) {
  const activeStep = clampStep(currentStep);

  return (
    <nav className="px-4 py-2">
      <ol className="grid grid-cols-3 min-[875px]:grid-cols-6 gap-1">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === activeStep;

          return (
            <li key={stepNumber}>
              <span
                className={`
                  inline-flex items-center justify-center gap-0.5 rounded px-1 py-1.5 text-sm font-medium w-full
                  ${isActive ? 'bg-primary text-text-white' : 'bg-label-bg text-text-primary'}
                `}
              >
                {label}
                {stepNumber < steps.length && <Icon name="chevron-right" size="sm" />}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
