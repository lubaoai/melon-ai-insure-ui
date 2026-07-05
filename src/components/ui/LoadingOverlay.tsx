import { Icon } from './Icon';

interface LoadingOverlayProps {
  isVisible: boolean;
}

export function LoadingOverlay({ isVisible }: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50">
      <Icon name="loader" size="lg" className="animate-spin text-text-white" />
      <p className="mt-4 text-sm text-text-white">処理を行っております</p>
    </div>
  );
}
