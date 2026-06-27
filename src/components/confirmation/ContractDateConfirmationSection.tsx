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
            <div className="grid grid-cols-[260px_1fr] w-full">
              <div className="border border-border bg-label-bg px-3 py-2 text-sm font-bold text-text-primary whitespace-nowrap flex items-center">
                契約希望日
              </div>
              <div className="border border-l-0 border-border bg-input-bg px-3 py-2 text-base text-text-primary">
                {date}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
