import type { HousingOverviewData } from '../application/HousingOverviewSection';
import { ConfirmationRow } from './ConfirmationRow';

interface HousingOverviewConfirmationSectionProps {
  data: HousingOverviewData;
}

const structureLabels: Record<string, string> = { '1': '木造', '2': '非木造' };
const housingTypeLabels: Record<string, string> = { '1': '戸建て', '2': 'アパート・マンション' };

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
