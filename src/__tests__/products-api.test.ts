import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { getInsuranceProducts } from '../modules/products/api';

const mockProducts = [
  {
    id: '1',
    name: '医療保険プレミアム',
    category: '医療',
    premium: 5000,
    coverage: '入院一時金50万円 / 手術一時金20万円',
    description: '充実の保障内容で万が一の入院・手術に備える医療保険',
  },
];

const server = setupServer(
  http.get('/api/products', () => {
    return HttpResponse.json(mockProducts);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('getInsuranceProducts', () => {
  it('保険商品一覧を取得すること', async () => {
    const products = await getInsuranceProducts();
    expect(products).toHaveLength(1);
    expect(products[0].name).toBe('医療保険プレミアム');
  });

  it('サーバーエラー時にエラーをスローすること', async () => {
    server.use(http.get('/api/products', () => HttpResponse.error()));
    await expect(getInsuranceProducts()).rejects.toThrow();
  });
});
