import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useApplicationFormStore } from '../store/applicationFormStore';
import ApplicationConfirmationPage from '../app/views/ApplicationConfirmationPage';

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
  });

  it('ステップナビゲーションのステップ4が表示されること', () => {
    render(<BrowserRouter><ApplicationConfirmationPage /></BrowserRouter>);
    expect(screen.getByText('④申込内容確認')).toBeInTheDocument();
  });

  it('全7セクションの見出しが表示されること', () => {
    render(<BrowserRouter><ApplicationConfirmationPage /></BrowserRouter>);
    expect(screen.getByRole('heading', { name: /① 契約希望日/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /② ご契約コース/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /③ 住居の概要/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /④ ご契約者様の情報/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /⑤ 住居の所在地/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /⑥ 主たる居住者/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /⑦ 同居人の明細/ })).toBeInTheDocument();
  });

  it('Q&Aサイドバーが表示されること', () => {
    render(<BrowserRouter><ApplicationConfirmationPage /></BrowserRouter>);
    expect(screen.getByText('よくある質問')).toBeInTheDocument();
  });

  it('戻るボタンと次へボタンが表示されること', () => {
    render(<BrowserRouter><ApplicationConfirmationPage /></BrowserRouter>);
    expect(screen.getByRole('button', { name: /戻る/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /次へ/ })).toBeInTheDocument();
  });
});
