import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResidenceLocationConfirmationSection } from '../components/confirmation/ResidenceLocationConfirmationSection';
import type { ResidenceLocationData } from '../components/application/ResidenceLocationSection';

describe('ResidenceLocationConfirmationSection コンポーネント', () => {
  const data: ResidenceLocationData = {
    postalCode: '100-0001',
    address: '東京都千代田区千代田1-1',
    buildingName: '皇居',
    addressKana: 'トウキョウトチヨダクチヨダ1-1',
  };

  it('見出し「⑤ 住居の所在地」が表示されること', () => {
    render(<ResidenceLocationConfirmationSection data={data} />);
    expect(screen.getByRole('heading', { name: /⑤ 住居の所在地/ })).toBeInTheDocument();
  });

  it('郵便番号が表示されること', () => {
    render(<ResidenceLocationConfirmationSection data={data} />);
    expect(screen.getByText('100-0001')).toBeInTheDocument();
  });

  it('住所が表示されること', () => {
    render(<ResidenceLocationConfirmationSection data={data} />);
    expect(screen.getByText('東京都千代田区千代田1-1')).toBeInTheDocument();
  });

  it('建物名・部屋番号が表示されること', () => {
    render(<ResidenceLocationConfirmationSection data={data} />);
    expect(screen.getByText('皇居')).toBeInTheDocument();
  });

  it('住所フリガナが表示されること', () => {
    render(<ResidenceLocationConfirmationSection data={data} />);
    expect(screen.getByText('トウキョウトチヨダクチヨダ1-1')).toBeInTheDocument();
  });

  it('postalCodeが空文字の場合もエラーにならないこと', () => {
    render(<ResidenceLocationConfirmationSection data={{ ...data, postalCode: '' }} />);
    expect(screen.getByText('郵便番号')).toBeInTheDocument();
  });

  it('ConfirmationRowコンポーネントを使用していること', () => {
    const { container } = render(<ResidenceLocationConfirmationSection data={data} />);
    const grids = container.querySelectorAll('.grid');
    const firstRowGrid = grids[0];
    expect(firstRowGrid.className).toContain('grid-cols-1');
    expect(firstRowGrid.className).toContain('min-[875px]:grid-cols-[260px_1fr]');
  });
});
