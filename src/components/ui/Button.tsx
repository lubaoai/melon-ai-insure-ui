import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
  children: ReactNode;
}

const variantClasses: Record<string, string> = {
  primary:
    'bg-cta text-text-white hover:bg-cta-hover hover:text-text-primary shadow-soft',
  secondary:
    'bg-cream text-text-primary border border-border hover:bg-border hover:text-text-white shadow-soft',
};

const disabledClasses =
  'bg-disabled text-text-white cursor-not-allowed shadow-soft';

export function Button({
  variant,
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-lg px-5 py-2.5
        font-bold transition-all duration-150 ease-out
        ${disabled ? disabledClasses : variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
