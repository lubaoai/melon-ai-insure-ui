import { http, HttpResponse } from 'msw';
import type { InsuranceProduct } from '../../modules/products/types';

const products: InsuranceProduct[] = [
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
  {
    id: '4',
    name: '傷害保険ベーシック',
    category: '傷害',
    premium: 1500,
    coverage: '不慮の事故による傷害保障500万円',
    description: '日常生活の不慮の事故に備える傷害保険',
  },
];

export const productsHandlers = [
  http.get('/api/products', () => {
    return HttpResponse.json(products);
  }),
];
