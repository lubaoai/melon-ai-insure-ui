interface ConfirmationRowProps {
  label: string;
  value: string;
}

export function ConfirmationRow({ label, value }: ConfirmationRowProps) {
  return (
    <div className="grid grid-cols-1 min-[875px]:grid-cols-[260px_1fr] w-full mt-2 first:mt-0">
      <div className="border border-border bg-label-bg px-3 py-2 text-sm font-bold text-text-primary flex items-center min-[875px]:whitespace-nowrap">
        {label}
      </div>
      <div className="border border-border bg-input-bg px-3 py-2 border-t-0 min-[875px]:border-t min-[875px]:border-l-0 text-base text-text-primary">
        {value}
      </div>
    </div>
  );
}
