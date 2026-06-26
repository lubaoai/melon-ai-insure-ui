import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HousingOverviewConfirmationSection } from '../components/confirmation/HousingOverviewConfirmationSection';
import type { HousingOverviewData } from '../components/application/HousingOverviewSection';

describe('HousingOverviewConfirmationSection コンポーネント', () => {
  const apartmentData: HousingOverviewData = { structure: '1', housingType: '2', totalFloors: '5', residentFloor: '3' };
  const houseData: HousingOverviewData = { structure: '2', housingType: '1', totalFloors: '2', residentFloor: '' };

  it('見出し「③ 住居の概要」が表示されること', () => {
    render(<HousingOverviewConfirmationSection data={apartmentData} />);
    expect(screen.getByRole('heading', { name: /③ 住居の概要/ })).toBeInTheDocument();
  });

  it('構造が表示ラベルに変換されること（木造）', () => {
    render(<HousingOverviewConfirmationSection data={apartmentData} />);
    expect(screen.getByText('木造')).toBeInTheDocument();
  });

  it('構造が表示ラベルに変換されること（非木造）', () => {
    render(<HousingOverviewConfirmationSection data={houseData} />);
    expect(screen.getByText('非木造')).toBeInTheDocument();
  });

  it('形態が表示ラベルに変換されること（アパート・マンション）', () => {
    render(<HousingOverviewConfirmationSection data={apartmentData} />);
    expect(screen.getByText('アパート・マンション')).toBeInTheDocument();
  });

  it('アパート選択時は「〇階建中〇階」形式で表示されること', () => {
    render(<HousingOverviewConfirmationSection data={apartmentData} />);
    expect(screen.getByText('5階建中3階')).toBeInTheDocument();
  });

  it('戸建て選択時は「〇階建」形式で表示されること', () => {
    render(<HousingOverviewConfirmationSection data={houseData} />);
    expect(screen.getByText('2階建')).toBeInTheDocument();
  });
});
