import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CompletionSummarySection } from '../components/completion/CompletionSummarySection';
import type { ContractCourseData } from '../components/application/ContractCourseSection';

const defaultData: ContractCourseData = {
  insurancePeriod: '1',
  paymentMethod: '5',
  product: 'K008',
  planType: '1Y8C',
};

describe('CompletionSummarySection コンポーネント', () => {
  it('見出し「申込内容」が表示されること', () => {
    render(<CompletionSummarySection data={defaultData} amount={15000} />);
    expect(screen.getByRole('heading', { name: /申込内容/ })).toBeInTheDocument();
  });

  it('保険期間が表示されること', () => {
    render(<CompletionSummarySection data={defaultData} amount={15000} />);
    expect(screen.getByText('１年')).toBeInTheDocument();
  });

  it('お支払方法が表示されること', () => {
    render(<CompletionSummarySection data={defaultData} amount={15000} />);
    expect(screen.getByText('クレジットカード払')).toBeInTheDocument();
  });

  it('商品名が表示されること', () => {
    render(<CompletionSummarySection data={defaultData} amount={15000} />);
    expect(screen.getByText('メロンの新家財保険')).toBeInTheDocument();
  });

  it('プラン種別が表示されること', () => {
    render(<CompletionSummarySection data={defaultData} amount={15000} />);
    expect(screen.getByText('１Ｙ８')).toBeInTheDocument();
  });

  it('保険料合計がカンマ区切りで表示されること', () => {
    render(<CompletionSummarySection data={defaultData} amount={15000} />);
    expect(screen.getByText('15,000円')).toBeInTheDocument();
  });

  it('保険料が0円の場合', () => {
    render(<CompletionSummarySection data={defaultData} amount={0} />);
    expect(screen.getByText('0円')).toBeInTheDocument();
  });
});
