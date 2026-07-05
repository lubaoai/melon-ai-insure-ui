import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  hoverable?: boolean;
  className?: string;
}

export function Card({ children, hoverable = false, className = '' }: CardProps) {
  return (
    <div
      className={`
        border-4 border-primary border-t-0 bg-cream p-6 m-2
        transition-shadow duration-150 ease-out
        ${hoverable ? 'hover:shadow-md cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
