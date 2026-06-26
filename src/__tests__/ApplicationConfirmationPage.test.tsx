import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { useApplicationFormStore } from '../store/applicationFormStore';
import ApplicationConfirmationPage from '../app/views/ApplicationConfirmationPage';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const filledState = {
  contractDate: '2026/07/01',
  contractCourse: { insurancePeriod: '1', paymentMethod: '5', product: 'K008', planType: '1Y8C' },
  housingOverview: { structure: '1', housingType: '2', totalFloors: '5', residentFloor: '3' },
  contractorInfo: {
    contractType: '1', corporateName: '', corporateNameKana: '', positionName: '',
    name: '山田太郎', nameKana: 'ヤマダタロウ', sex: '1', birthYear: '1980', birthMonth: '01', birthDay: '15',
    postalCode: '123-4567', address: '東京都新宿区西新宿1-1', buildingName: '', addressKana: 'トウキョウト',
    phone1: '03', phone2: '1234', phone3: '5678',
  },
  residenceLocation: { postalCode: '123-4567', address: '東京都新宿区西新宿1-1', buildingName: '', addressKana: 'トウキョウト' },
  primaryResident: { residentType: '0', name: '', nameKana: '', sex: '1', birthYear: '', birthMonth: '', birthDay: '', relationship: '', relationshipNote: '', phone1: '', phone2: '', phone3: '' },
  coResident: { hasCoResident: false, residents: [] },
};

describe('ApplicationConfirmationPage', () => {
  beforeEach(() => {
    useApplicationFormStore.setState(filledState);
    vi.mocked(useNavigate).mockReturnValue(vi.fn());
  });

  it('ステップナビゲーションのステップ4が表示されること', () => {
    render(<MemoryRouter><ApplicationConfirmationPage /></MemoryRouter>);
    expect(screen.getByText('④申込内容確認')).toBeInTheDocument();
  });

  it('全7セクションの見出しが表示されること', () => {
    render(<MemoryRouter><ApplicationConfirmationPage /></MemoryRouter>);
    expect(screen.getByRole('heading', { name: /① 契約希望日/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /② ご契約コース/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /③ 住居の概要/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /④ ご契約者様の情報/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /⑤ 住居の所在地/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /⑥ 主たる居住者/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /⑦ 同居人の明細/ })).toBeInTheDocument();
  });

  it('Q&Aサイドバーが表示されること', () => {
    render(<MemoryRouter><ApplicationConfirmationPage /></MemoryRouter>);
    expect(screen.getByText('よくある質問')).toBeInTheDocument();
  });

  it('戻るボタンと次へボタンが表示されること', () => {
    render(<MemoryRouter><ApplicationConfirmationPage /></MemoryRouter>);
    expect(screen.getByRole('button', { name: /戻る/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /次へ/ })).toBeInTheDocument();
  });

  it('ストアにデータが存在しない場合は/application-inputにリダイレクトされること', () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    // ストアを空の状態にリセット
    useApplicationFormStore.setState({
      contractDate: '',
      contractCourse: { insurancePeriod: '1', paymentMethod: '5', product: 'K008', planType: '' },
      housingOverview: { structure: '1', housingType: '2', totalFloors: '', residentFloor: '' },
      contractorInfo: {
        contractType: '1', corporateName: '', corporateNameKana: '', positionName: '',
        name: '', nameKana: '', sex: '1', birthYear: '', birthMonth: '', birthDay: '',
        postalCode: '', address: '', buildingName: '', addressKana: '',
        phone1: '', phone2: '', phone3: '',
      },
      residenceLocation: { postalCode: '', address: '', buildingName: '', addressKana: '' },
      primaryResident: {
        residentType: '', name: '', nameKana: '', sex: '1',
        birthYear: '', birthMonth: '', birthDay: '',
        relationship: '', relationshipNote: '',
        phone1: '', phone2: '', phone3: '',
      },
      coResident: { hasCoResident: false, residents: [] },
    });

    render(<MemoryRouter><ApplicationConfirmationPage /></MemoryRouter>);
    expect(mockNavigate).toHaveBeenCalledWith('/application-input', { replace: true });
  });
});
