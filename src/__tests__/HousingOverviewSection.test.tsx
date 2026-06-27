import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HousingOverviewSection } from '../components/application/HousingOverviewSection';

describe('HousingOverviewSection コンポーネント', () => {
  it('見出し「③ 住居の概要」が表示されること', () => {
    render(<HousingOverviewSection onChange={vi.fn()} />);
    expect(screen.getByRole('heading', { name: /③ 住居の概要/ })).toBeInTheDocument();
  });

  it('構造のラジオボタンが表示されること', () => {
    render(<HousingOverviewSection onChange={vi.fn()} />);
    expect(screen.getByLabelText('木造')).toBeInTheDocument();
    expect(screen.getByLabelText('非木造')).toBeInTheDocument();
  });

  it('形態のラジオボタンが表示されること', () => {
    render(<HousingOverviewSection onChange={vi.fn()} />);
    expect(screen.getByLabelText('アパート・マンション')).toBeInTheDocument();
    expect(screen.getByLabelText('戸建て')).toBeInTheDocument();
  });

  it('形態備考の数値入力フィールドが表示されること', () => {
    render(<HousingOverviewSection onChange={vi.fn()} />);
    expect(screen.getAllByPlaceholderText('数字').length).toBeGreaterThanOrEqual(1);
  });

  it('アパート選択時は階建中の入力が表示されること', () => {
    render(<HousingOverviewSection onChange={vi.fn()} />);
    expect(screen.getByText(/階建中/)).toBeInTheDocument();
  });

  it('戸建て選択時に階建のみが表示されること', async () => {
    render(<HousingOverviewSection onChange={vi.fn()} />);
    await userEvent.click(screen.getByLabelText('戸建て'));
    expect(screen.queryByText(/階建中/)).not.toBeInTheDocument();
    expect(screen.getByText(/階建$/)).toBeInTheDocument();
  });

  it('defaultValue propsが指定された場合、その値で初期化されること', () => {
    const defaultValue = { structure: '1', housingType: '2', totalFloors: '10', residentFloor: '6' };
    render(<HousingOverviewSection onChange={vi.fn()} defaultValue={defaultValue} />);
    const inputs = screen.getAllByDisplayValue('10');
    expect(inputs.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByDisplayValue('6')).toBeInTheDocument();
  });
});
