import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CoResidentConfirmationSection } from '../components/confirmation/CoResidentConfirmationSection';
import type { CoResidentData } from '../components/application/CoResidentSection';

describe('CoResidentConfirmationSection コンポーネント', () => {
  const noResidentData: CoResidentData = { hasCoResident: false, residents: [] };
  const withResidentData: CoResidentData = {
    hasCoResident: true,
    residents: [
      { name: '山田花子', nameKana: 'ヤマダハナコ', sex: '2', birthYear: '1985', birthMonth: '03', birthDay: '20', relationship: '1', relationshipNote: '' },
    ],
  };
  const withOtherRelationData: CoResidentData = {
    hasCoResident: true,
    residents: [
      { name: '山田次郎', nameKana: 'ヤマダジロウ', sex: '1', birthYear: '1990', birthMonth: '06', birthDay: '10', relationship: '8', relationshipNote: '従兄弟' },
    ],
  };
  const emptyResidentsData: CoResidentData = { hasCoResident: true, residents: [] };

  it('見出し「⑦ 同居人の明細」が表示されること', () => {
    render(<CoResidentConfirmationSection data={noResidentData} />);
    expect(screen.getByRole('heading', { name: /⑦ 同居人の明細/ })).toBeInTheDocument();
  });

  it('同居人なしの場合に「なし」と表示されること', () => {
    render(<CoResidentConfirmationSection data={noResidentData} />);
    expect(screen.getByText('なし')).toBeInTheDocument();
  });

  it('同居人ありの場合に「あり」と表示されること', () => {
    render(<CoResidentConfirmationSection data={withResidentData} />);
    expect(screen.getByText('あり')).toBeInTheDocument();
  });

  it('同居人の氏名が表示されること', () => {
    render(<CoResidentConfirmationSection data={withResidentData} />);
    expect(screen.getByText('山田花子')).toBeInTheDocument();
  });

  it('同居人の続柄が表示ラベルに変換されること', () => {
    render(<CoResidentConfirmationSection data={withResidentData} />);
    expect(screen.getByText('配偶者')).toBeInTheDocument();
  });

  it('同居人の続柄が「その他」の場合に備考が表示されること', () => {
    render(<CoResidentConfirmationSection data={withOtherRelationData} />);
    expect(screen.getByText('その他')).toBeInTheDocument();
    expect(screen.getByText('従兄弟')).toBeInTheDocument();
  });

  it('hasCoResident=trueでresidentsが空配列の場合もエラーにならないこと', () => {
    render(<CoResidentConfirmationSection data={emptyResidentsData} />);
    expect(screen.getByText('あり')).toBeInTheDocument();
  });
});
