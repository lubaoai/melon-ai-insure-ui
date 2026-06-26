import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PrimaryResidentConfirmationSection } from '../components/confirmation/PrimaryResidentConfirmationSection';
import type { PrimaryResidentData } from '../components/application/PrimaryResidentSection';

describe('PrimaryResidentConfirmationSection コンポーネント', () => {
  const sameData: PrimaryResidentData = {
    residentType: '0', name: '', nameKana: '', sex: '1',
    birthYear: '', birthMonth: '', birthDay: '',
    relationship: '', relationshipNote: '',
    phone1: '', phone2: '', phone3: '',
  };
  const differentData: PrimaryResidentData = {
    residentType: '1', name: '鈴木花子', nameKana: 'スズキハナコ', sex: '2',
    birthYear: '1985', birthMonth: '03', birthDay: '20',
    relationship: '1', relationshipNote: '',
    phone1: '090', phone2: '1234', phone3: '5678',
  };
  const otherRelationData: PrimaryResidentData = {
    ...differentData,
    relationship: '8', relationshipNote: '従兄弟',
  };

  it('見出し「⑥ 主たる居住者」が表示されること', () => {
    render(<PrimaryResidentConfirmationSection data={sameData} />);
    expect(screen.getByRole('heading', { name: /⑥ 主たる居住者/ })).toBeInTheDocument();
  });

  it('契約者と同じ場合に区分が表示されること', () => {
    render(<PrimaryResidentConfirmationSection data={sameData} />);
    expect(screen.getByText('契約者と同じ')).toBeInTheDocument();
  });

  it('契約者と同じ場合に詳細フィールドが表示されないこと', () => {
    render(<PrimaryResidentConfirmationSection data={sameData} />);
    expect(screen.queryByText('主居住者氏名')).not.toBeInTheDocument();
  });

  it('契約者と異なる場合に氏名が表示されること', () => {
    render(<PrimaryResidentConfirmationSection data={differentData} />);
    expect(screen.getByText('鈴木花子')).toBeInTheDocument();
  });

  it('続柄が表示ラベルに変換されること', () => {
    render(<PrimaryResidentConfirmationSection data={differentData} />);
    expect(screen.getByText('配偶者')).toBeInTheDocument();
  });

  it('続柄が「その他」の場合に備考が表示されること', () => {
    render(<PrimaryResidentConfirmationSection data={otherRelationData} />);
    expect(screen.getByText('その他')).toBeInTheDocument();
    expect(screen.getByText('従兄弟')).toBeInTheDocument();
  });

  it('性別が表示ラベルに変換されること', () => {
    render(<PrimaryResidentConfirmationSection data={differentData} />);
    expect(screen.getByText('女性')).toBeInTheDocument();
  });

  it('電話番号がハイフン区切りで表示されること', () => {
    render(<PrimaryResidentConfirmationSection data={differentData} />);
    expect(screen.getByText('090-1234-5678')).toBeInTheDocument();
  });
});
