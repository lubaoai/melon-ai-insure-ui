import { useState, useEffect } from 'react';
import { Icon } from './Icon';

export function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40">
      <button
        onClick={handleClick}
        className="rounded-[5px] border border-disabled bg-button-area px-6 py-2 text-base text-text-primary transition-colors duration-150 hover:bg-hover-light cursor-pointer"
      >
        <Icon name="circle-chevron-up" size="md" className="mr-1 inline" />
        ページ最上部へ
      </button>
    </div>
  );
}
