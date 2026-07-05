import type { ReactNode } from 'react';

interface FormRowProps {
  label: ReactNode;
  required?: boolean;
  inputClassName?: string;
  className?: string;
  children: ReactNode;
}

export function FormRow({ label, required, inputClassName, className, children }: FormRowProps) {
  return (
    <div className={`grid grid-cols-1 min-[875px]:grid-cols-[260px_1fr] w-full ${className ?? ''}`}>
      <div className="border border-border bg-label-bg px-3 py-2 text-sm font-bold text-text-primary flex items-center min-[875px]:whitespace-nowrap">
        <span>{label}</span>
        {required && (
          <span className="ml-auto bg-error text-text-white text-small px-1.5 py-0.5 rounded-sm">必須</span>
        )}
      </div>
      <div className={`border border-border bg-input-bg px-3 py-2 border-t-0 min-[875px]:border-t min-[875px]:border-l-0 ${inputClassName ?? ''}`}>
        {children}
      </div>
    </div>
  );
}
