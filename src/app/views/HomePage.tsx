import { useState, useEffect } from 'react';
import type { InsuranceProduct } from '../../modules/products/types';
import { getInsuranceProducts } from '../../modules/products/api';

function HomePage() {
  const [products, setProducts] = useState<InsuranceProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInsuranceProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">保険商品一覧</h1>
      {loading ? (
        <p>読み込み中...</p>
      ) : products.length === 0 ? (
        <p>保険商品が見つかりません</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
              <span className="mt-1 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                {product.category}
              </span>
              <p className="mt-2 text-gray-600">{product.coverage}</p>
              <p className="mt-1 text-xl font-bold text-gray-900">
                月額 {product.premium.toLocaleString()} 円
              </p>
              <p className="mt-2 text-sm text-gray-500">{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
