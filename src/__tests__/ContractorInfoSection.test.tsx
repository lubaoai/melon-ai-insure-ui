import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContractorInfoSection } from '../components/application/ContractorInfoSection';

describe('ContractorInfoSection コンポーネント', () => {
  it('見出し「④ ご契約者様の情報」が表示されること', () => {
    render(<ContractorInfoSection onChange={vi.fn()} />);
    expect(screen.getByRole('heading', { name: /④ ご契約者様の情報/ })).toBeInTheDocument();
  });

  it('契約種別のラジオボタンが表示されること', () => {
    render(<ContractorInfoSection onChange={vi.fn()} />);
    expect(screen.getByLabelText('個人')).toBeInTheDocument();
    expect(screen.getByLabelText('法人')).toBeInTheDocument();
  });

  it('個人選択時は法人フィールドが非表示であること', () => {
    render(<ContractorInfoSection onChange={vi.fn()} />);
    expect(screen.queryByPlaceholderText('法人名')).not.toBeInTheDocument();
  });

  it('法人選択時に法人フィールドが表示されること', async () => {
    render(<ContractorInfoSection onChange={vi.fn()} />);
    await userEvent.click(screen.getByLabelText('法人'));
    expect(screen.getByPlaceholderText('法人名')).toBeInTheDocument();
  });

  it('契約者氏名の入力フィールドが表示されること', () => {
    render(<ContractorInfoSection onChange={vi.fn()} />);
    const nameInputs = screen.getAllByPlaceholderText('全角');
    expect(nameInputs.length).toBeGreaterThanOrEqual(1);
  });

  it('郵便番号の入力フィールドが表示されること', () => {
    render(<ContractorInfoSection onChange={vi.fn()} />);
    expect(screen.getByPlaceholderText('郵便番号')).toBeInTheDocument();
  });

  it('電話番号が表示されること', () => {
    render(<ContractorInfoSection onChange={vi.fn()} />);
    expect(screen.getByText('電話番号')).toBeInTheDocument();
  });

  it('必須バッジが複数表示されること', () => {
    render(<ContractorInfoSection onChange={vi.fn()} />);
    const badges = screen.getAllByText('必須');
    expect(badges.length).toBeGreaterThanOrEqual(5);
  });

  it('defaultValue propsが指定された場合、その値で初期化されること', () => {
    const defaultValue = {
      contractType: '1', corporateName: '', corporateNameKana: '', positionName: '',
      name: '保険太郎', nameKana: 'ホケンタロウ', sex: '1',
      birthYear: '1975', birthMonth: '11', birthDay: '2',
      postalCode: '1040041', address: '東京都中央区新富2-5-10',
      buildingName: 'アパホテル', addressKana: 'トウキョウト チュウオウク シントミ 2-5-10',
      phone1: '0570', phone2: '044', phone3: '811',
    };
    render(<ContractorInfoSection onChange={vi.fn()} defaultValue={defaultValue} />);
    expect(screen.getByDisplayValue('保険太郎')).toBeInTheDocument();
    expect(screen.getByDisplayValue('ホケンタロウ')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1975')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1040041')).toBeInTheDocument();
    expect(screen.getByDisplayValue('東京都中央区新富2-5-10')).toBeInTheDocument();
    expect(screen.getByDisplayValue('アパホテル')).toBeInTheDocument();
    expect(screen.getByDisplayValue('トウキョウト チュウオウク シントミ 2-5-10')).toBeInTheDocument();
    expect(screen.getByDisplayValue('0570')).toBeInTheDocument();
  });
});
