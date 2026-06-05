import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { http, HttpResponse, delay } from 'msw';
import HomePage from '../app/views/HomePage';

const mockProducts = [
  {
    id: '1',
    name: '医療保険プレミアム',
    category: '医療',
    premium: 5000,
    coverage: '入院一時金50万円 / 手術一時金20万円',
    description: '充実の保障内容で万が一の入院・手術に備える医療保険',
  },
  {
    id: '2',
    name: '生命保険スタンダード',
    category: '生命',
    premium: 8000,
    coverage: '死亡保障3,000万円',
    description: 'ご家族の暮らしを守る基本の生命保険',
  },
  {
    id: '3',
    name: 'がん保険エッセンス',
    category: 'がん',
    premium: 3000,
    coverage: 'がん診断一時金100万円 / 抗がん剤治療支援',
    description: 'がんに特化した手厚い保障を提供するがん保険',
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

describe('HomePage', () => {
  it('データ取得中にローディング表示がされること', async () => {
    server.use(
      http.get('/api/products', async () => {
        await delay(100);
        return HttpResponse.json(mockProducts);
      }),
    );
    render(<HomePage />);
    expect(screen.getByText('読み込み中...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('医療保険プレミアム')).toBeInTheDocument();
    });
  });

  it('ページタイトル「保険商品一覧」が表示されること', () => {
    render(<HomePage />);
    expect(screen.getByText('保険商品一覧')).toBeInTheDocument();
  });

  it('ローディング中表示後に保険商品カードが表示されること', async () => {
    render(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText('医療保険プレミアム')).toBeInTheDocument();
    });
    expect(screen.getByText('生命保険スタンダード')).toBeInTheDocument();
    expect(screen.getByText('がん保険エッセンス')).toBeInTheDocument();
  });

  it('各商品にカテゴリが表示されること', async () => {
    render(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText('医療')).toBeInTheDocument();
    });
    expect(screen.getByText('生命')).toBeInTheDocument();
    expect(screen.getByText('がん')).toBeInTheDocument();
  });

  it('各商品に保険料が表示されること', async () => {
    render(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText(/月額 5,000/)).toBeInTheDocument();
    });
    expect(screen.getByText(/月額 8,000/)).toBeInTheDocument();
    expect(screen.getByText(/月額 3,000/)).toBeInTheDocument();
  });

  it('商品データが空のときメッセージが表示されること', async () => {
    server.use(http.get('/api/products', () => HttpResponse.json([])));
    render(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText('保険商品が見つかりません')).toBeInTheDocument();
    });
  });
});
