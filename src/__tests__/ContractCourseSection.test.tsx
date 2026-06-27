import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContractCourseSection } from '../components/application/ContractCourseSection';

describe('ContractCourseSection コンポーネント', () => {
  it('見出し「② ご契約コース」が表示されること', () => {
    render(<ContractCourseSection onChange={vi.fn()} />);
    expect(screen.getByRole('heading', { name: /② ご契約コース/ })).toBeInTheDocument();
  });

  it('保険期間のラジオボタンが表示されること', () => {
    render(<ContractCourseSection onChange={vi.fn()} />);
    expect(screen.getByLabelText('１年')).toBeInTheDocument();
    expect(screen.getByLabelText('２年')).toBeInTheDocument();
  });

  it('保険料のお支払方法が表示されること', () => {
    render(<ContractCourseSection onChange={vi.fn()} />);
    expect(screen.getByLabelText('クレジットカード払')).toBeInTheDocument();
  });

  it('商品のラジオボタンが表示されること', () => {
    render(<ContractCourseSection onChange={vi.fn()} />);
    expect(screen.getByLabelText(/メロンの新家財保険/)).toBeInTheDocument();
  });

  it('プラン種別のドロップダウンが表示されること', () => {
    render(<ContractCourseSection onChange={vi.fn()} />);
    expect(screen.getByLabelText('プラン種別')).toBeInTheDocument();
  });

  it('保険料が読み取り専用で表示されること', () => {
    render(<ContractCourseSection onChange={vi.fn()} />);
    expect(screen.getByText(/0円/)).toBeInTheDocument();
  });

  it('insurancePremium propsが指定された場合、その金額が表示されること', () => {
    render(<ContractCourseSection onChange={vi.fn()} insurancePremium={880} />);
    expect(screen.getByText('880円')).toBeInTheDocument();
  });

  it('defaultValue propsが指定された場合、その値で初期化されること', () => {
    const defaultValue = { insurancePeriod: '1', paymentMethod: '5', product: 'K008', planType: '1Y8C' };
    render(<ContractCourseSection onChange={vi.fn()} defaultValue={defaultValue} />);
    expect(screen.getByDisplayValue('１Ｙ８')).toBeInTheDocument();
  });

  it('必須バッジが表示されること', () => {
    render(<ContractCourseSection onChange={vi.fn()} />);
    const badges = screen.getAllByText('必須');
    expect(badges.length).toBeGreaterThanOrEqual(4);
  });
});
