import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../router';

describe('ルーティング', () => {
  it('ルートパスでHomePageが表示されること', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    );
    expect(screen.getByText('保険商品一覧')).toBeInTheDocument();
  });

  it('存在しないパスで404ページが表示されること', () => {
    render(
      <MemoryRouter initialEntries={['/nonexistent-path']}>
        <AppRoutes />
      </MemoryRouter>,
    );
    expect(screen.getByText('ページが見つかりません')).toBeInTheDocument();
  });
});
