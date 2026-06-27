import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContractCourseConfirmationSection } from '../components/confirmation/ContractCourseConfirmationSection';
import type { ContractCourseData } from '../components/application/ContractCourseSection';

describe('ContractCourseConfirmationSection コンポーネント', () => {
  const defaultData: ContractCourseData = {
    insurancePeriod: '1',
    paymentMethod: '5',
    product: 'K008',
    planType: '1Y8C',
  };

  it('見出し「② ご契約コース」が表示されること', () => {
    render(<ContractCourseConfirmationSection data={defaultData} />);
    expect(screen.getByRole('heading', { name: /② ご契約コース/ })).toBeInTheDocument();
  });

  it('保険期間の値が表示ラベルに変換されること', () => {
    render(<ContractCourseConfirmationSection data={defaultData} />);
    expect(screen.getByText('１年')).toBeInTheDocument();
  });

  it('保険期間2年の値が正しく表示されること', () => {
    render(<ContractCourseConfirmationSection data={{ ...defaultData, insurancePeriod: '2' }} />);
    expect(screen.getByText('２年')).toBeInTheDocument();
  });

  it('保険料のお支払方法が表示されること', () => {
    render(<ContractCourseConfirmationSection data={defaultData} />);
    expect(screen.getByText('クレジットカード払')).toBeInTheDocument();
  });

  it('商品名が表示されること', () => {
    render(<ContractCourseConfirmationSection data={defaultData} />);
    expect(screen.getByText('メロンの新家財保険')).toBeInTheDocument();
  });

  it('プラン種別が表示されること', () => {
    render(<ContractCourseConfirmationSection data={defaultData} />);
    expect(screen.getByText('１Ｙ８')).toBeInTheDocument();
  });

  it('planTypeが空文字の場合は空欄で表示されること', () => {
    render(<ContractCourseConfirmationSection data={{ ...defaultData, planType: '' }} />);
    expect(screen.getByText('プラン種別')).toBeInTheDocument();
  });
});
