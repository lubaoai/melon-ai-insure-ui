import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'required';
}

const variantClasses: Record<string, string> = {
  default: 'bg-label-bg text-primary',
  required: 'bg-error text-text-white',
};

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={`
        inline-block rounded-full px-3 py-1 text-xs font-medium
        ${variantClasses[variant]}
      `}
    >
      {children}
    </span>
  );
}
