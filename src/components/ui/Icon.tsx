import {
  AlertCircle,
  ArrowLeftCircle,
  ArrowRightCircle,
  ChevronRight,
  CircleChevronUp,
  HelpCircle,
  Square,
  Loader2,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'alert-circle': AlertCircle,
  'arrow-left-circle': ArrowLeftCircle,
  'arrow-right-circle': ArrowRightCircle,
  'chevron-right': ChevronRight,
  'circle-chevron-up': CircleChevronUp,
  'help-circle': HelpCircle,
  square: Square,
  loader: Loader2,
};

const sizeMap: Record<string, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

type IconName = keyof typeof iconMap;

interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Icon({ name, size = 'md', className }: IconProps) {
  const LucideIcon = iconMap[name as IconName];
  const iconSize = sizeMap[size] ?? sizeMap.md;

  if (!LucideIcon) {
    return <span className={className}>?</span>;
  }

  return <LucideIcon width={iconSize} height={iconSize} className={className} />;
}
