import type { ResidenceLocationData } from '../application/ResidenceLocationSection';
import { ConfirmationRow } from './ConfirmationRow';

interface ResidenceLocationConfirmationSectionProps {
  data: ResidenceLocationData;
}

export function ResidenceLocationConfirmationSection({ data }: ResidenceLocationConfirmationSectionProps) {
  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          ⑤ 住居の所在地
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            <ConfirmationRow label="郵便番号" value={data.postalCode} />
            <ConfirmationRow label="住所" value={data.address} />
            <ConfirmationRow label="建物名・部屋番号" value={data.buildingName} />
            <ConfirmationRow label="住所フリガナ" value={data.addressKana} />
          </div>
        </div>
      </div>
    </div>
  );
}
