import { useState } from 'react';
import { Icon } from '../ui/Icon';

interface QAItem {
  question: string;
  answer: string;
}

interface QASidebarProps {
  items: QAItem[];
}

export function QASidebar({ items }: QASidebarProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (items.length === 0) {
    return (
      <aside className="border border-border rounded-lg p-2">
        <p className="text-sm text-text-light">よくある質問はありません</p>
      </aside>
    );
  }

  return (
    <aside className="border border-border rounded-lg p-2">
      <h3 className="mb-2 text-sm font-bold text-text-primary">よくある質問</h3>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index}>
            <button
              className="flex w-full items-center gap-1 rounded bg-qa-bg border border-gray-200 px-2 py-1.5 text-left text-sm text-primary-link hover:bg-gray-200 transition-colors duration-150"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <Icon name="help-circle" size="sm" />
              {item.question}
            </button>
            {openIndex === index && (
              <div className="border border-t-0 border-gray-200 px-2 py-1.5 text-xs text-text-primary">
                {item.answer}
              </div>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
