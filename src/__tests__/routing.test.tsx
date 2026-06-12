import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { AppRoutes } from '../router';

const server = setupServer(
  http.get('/api/products', () => {
    return HttpResponse.json([]);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ルーティング', () => {
  it('ルートパスでHomePageが表示されること', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    );
    expect(screen.getByText('①重要事項同意')).toBeInTheDocument();
  });

  it('/application-inputでApplicationInputPageが表示されること', () => {
    render(
      <MemoryRouter initialEntries={['/application-input']}>
        <AppRoutes />
      </MemoryRouter>,
    );
    expect(screen.getByText('③申込内容入力')).toBeInTheDocument();
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
