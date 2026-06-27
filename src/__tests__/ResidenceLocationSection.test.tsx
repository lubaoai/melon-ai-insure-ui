import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResidenceLocationSection } from '../components/application/ResidenceLocationSection';

describe('ResidenceLocationSection コンポーネント', () => {
  it('見出し「⑤ 住居の所在地」が表示されること', () => {
    render(<ResidenceLocationSection onChange={vi.fn()} contractorAddress={null} />);
    expect(screen.getByRole('heading', { name: /⑤ 住居の所在地/ })).toBeInTheDocument();
  });

  it('「契約者と同じ」ボタンが表示されること', () => {
    render(<ResidenceLocationSection onChange={vi.fn()} contractorAddress={null} />);
    expect(screen.getByText('契約者と同じ')).toBeInTheDocument();
  });

  it('郵便番号の入力フィールドが表示されること', () => {
    render(<ResidenceLocationSection onChange={vi.fn()} contractorAddress={null} />);
    expect(screen.getByPlaceholderText('郵便番号')).toBeInTheDocument();
  });

  it('建物名の入力フィールドが表示されること', () => {
    render(<ResidenceLocationSection onChange={vi.fn()} contractorAddress={null} />);
    expect(screen.getByPlaceholderText(/建物名/)).toBeInTheDocument();
  });

  it('住所フリガナの入力フィールドが表示されること', () => {
    render(<ResidenceLocationSection onChange={vi.fn()} contractorAddress={null} />);
    expect(screen.getByPlaceholderText(/フリガナ/)).toBeInTheDocument();
  });

  it('「契約者と同じ」ボタンクリックで住所がコピーされること', async () => {
    const contractorAddress = {
      postalCode: '1000001',
      address: '東京都千代田区千代田１－１',
      buildingName: '皇居マンション',
      addressKana: 'ﾄｳｷｮｳﾄﾁﾖﾀﾞｸ...',
    };
    render(<ResidenceLocationSection onChange={vi.fn()} contractorAddress={contractorAddress} />);
    await userEvent.click(screen.getByText('契約者と同じ'));
    expect(screen.getByPlaceholderText('郵便番号')).toHaveValue('1000001');
  });

  it('必須バッジが表示されること', () => {
    render(<ResidenceLocationSection onChange={vi.fn()} contractorAddress={null} />);
    const badges = screen.getAllByText('必須');
    expect(badges.length).toBeGreaterThanOrEqual(3);
  });

  it('defaultValue propsが指定された場合、その値で初期化されること', () => {
    const defaultValue = {
      postalCode: '1040041', address: '東京都中央区新富2-5-10',
      buildingName: 'アパホテル', addressKana: 'トウキョウト チュウオウク シントミ 2-5-10',
    };
    render(
      <ResidenceLocationSection
        onChange={vi.fn()}
        contractorAddress={null}
        defaultValue={defaultValue}
      />,
    );
    expect(screen.getByDisplayValue('1040041')).toBeInTheDocument();
    expect(screen.getByDisplayValue('東京都中央区新富2-5-10')).toBeInTheDocument();
    expect(screen.getByDisplayValue('アパホテル')).toBeInTheDocument();
    expect(screen.getByDisplayValue('トウキョウト チュウオウク シントミ 2-5-10')).toBeInTheDocument();
  });
});
