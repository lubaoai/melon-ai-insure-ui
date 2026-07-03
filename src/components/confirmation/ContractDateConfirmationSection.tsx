import { ConfirmationRow } from './ConfirmationRow';

interface ContractDateConfirmationSectionProps {
  date: string;
}

export function ContractDateConfirmationSection({ date }: ContractDateConfirmationSectionProps) {
  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          ① 契約希望日
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            <ConfirmationRow label="契約希望日" value={date} />
          </div>
        </div>
      </div>
    </div>
  );
}
