import type { HousingOverviewData } from '../application/HousingOverviewSection';

interface HousingOverviewConfirmationSectionProps {
  data: HousingOverviewData;
}

const structureLabels: Record<string, string> = { '1': '木造', '2': '非木造' };
const housingTypeLabels: Record<string, string> = { '1': '戸建て', '2': 'アパート・マンション' };

function ConfirmationRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[260px_1fr] w-full mt-2 first:mt-0">
      <div className="border border-border bg-label-bg px-3 py-2 text-sm font-bold text-text-primary whitespace-nowrap flex items-center">
        {label}
      </div>
      <div className="border border-l-0 border-border bg-input-bg px-3 py-2 text-base text-text-primary">
        {value}
      </div>
    </div>
  );
}

export function HousingOverviewConfirmationSection({ data }: HousingOverviewConfirmationSectionProps) {
  const isApartment = data.housingType === '2';
  const floorText = isApartment
    ? (data.totalFloors && data.residentFloor ? `${data.totalFloors}階建中${data.residentFloor}階` : '')
    : (data.totalFloors ? `${data.totalFloors}階建` : '');

  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          ③ 住居の概要
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            <ConfirmationRow label="構造" value={structureLabels[data.structure] ?? ''} />
            <ConfirmationRow label="形態" value={housingTypeLabels[data.housingType] ?? ''} />
            <ConfirmationRow label="形態 （備考）" value={floorText} />
          </div>
        </div>
      </div>
    </div>
  );
}
