import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContractorInfoConfirmationSection } from '../components/confirmation/ContractorInfoConfirmationSection';
import type { ContractorInfoData } from '../components/application/ContractorInfoSection';

describe('ContractorInfoConfirmationSection コンポーネント', () => {
  const personalData: ContractorInfoData = {
    contractType: '1', corporateName: '', corporateNameKana: '', positionName: '',
    name: '山田太郎', nameKana: 'ヤマダタロウ', sex: '1', birthYear: '1980', birthMonth: '01', birthDay: '15',
    postalCode: '123-4567', address: '東京都新宿区西新宿1-1-1', buildingName: 'テストビル101', addressKana: 'トウキョウトシンジュククニシシンジュク1-1-1',
    phone1: '03', phone2: '1234', phone3: '5678',
  };
  const corporateData: ContractorInfoData = {
    ...personalData,
    contractType: '2', corporateName: 'テスト株式会社', corporateNameKana: 'テストカブシキガイシャ', positionName: '社長',
  };

  it('見出し「④ ご契約者様の情報」が表示されること', () => {
    render(<ContractorInfoConfirmationSection data={personalData} />);
    expect(screen.getByRole('heading', { name: /④ ご契約者様の情報/ })).toBeInTheDocument();
  });

  it('個人選択時に契約種別が「個人」と表示されること', () => {
    render(<ContractorInfoConfirmationSection data={personalData} />);
    expect(screen.getByText('個人')).toBeInTheDocument();
  });

  it('個人選択時に法人フィールドが表示されないこと', () => {
    render(<ContractorInfoConfirmationSection data={personalData} />);
    expect(screen.queryByText('法人名')).not.toBeInTheDocument();
  });

  it('法人選択時に法人名が表示されること', () => {
    render(<ContractorInfoConfirmationSection data={corporateData} />);
    expect(screen.getByText('テスト株式会社')).toBeInTheDocument();
    expect(screen.getByText('テストカブシキガイシャ')).toBeInTheDocument();
    expect(screen.getByText('社長')).toBeInTheDocument();
  });

  it('法人選択時に氏名ラベルが「役職者氏名」となること', () => {
    render(<ContractorInfoConfirmationSection data={corporateData} />);
    expect(screen.getByText('役職者氏名')).toBeInTheDocument();
  });

  it('生年月日がスラッシュ区切りで表示されること', () => {
    render(<ContractorInfoConfirmationSection data={personalData} />);
    expect(screen.getByText('1980/01/15')).toBeInTheDocument();
  });

  it('電話番号がハイフン区切りで表示されること', () => {
    render(<ContractorInfoConfirmationSection data={personalData} />);
    expect(screen.getByText('03-1234-5678')).toBeInTheDocument();
  });

  it('性別が表示ラベルに変換されること', () => {
    render(<ContractorInfoConfirmationSection data={personalData} />);
    expect(screen.getByText('男性')).toBeInTheDocument();
  });

  it('ConfirmationRowコンポーネントを使用していること', () => {
    const { container } = render(<ContractorInfoConfirmationSection data={personalData} />);
    const grids = container.querySelectorAll('.grid');
    const firstRowGrid = grids[0];
    expect(firstRowGrid.className).toContain('grid-cols-1');
    expect(firstRowGrid.className).toContain('min-[875px]:grid-cols-[260px_1fr]');
  });
});
