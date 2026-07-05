import type { InsuranceProduct } from '../../modules/products/types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Icon } from '../ui/Icon';

interface ProductCardProps {
  product: InsuranceProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card hoverable>
      <h2 className="text-lg font-bold text-text-primary">{product.name}</h2>
      <div className="mt-1">
        <Badge>{product.category}</Badge>
      </div>
      <p className="mt-2 text-text-light">{product.coverage}</p>
      <p className="mt-1 text-xl font-bold text-text-primary">
        月額 {product.premium.toLocaleString()} 円
      </p>
      <p className="mt-2 text-sm text-text-light">{product.description}</p>
      <button className="mt-4 inline-flex items-center gap-1 rounded-lg bg-cta px-4 py-2 font-bold text-text-white shadow-soft transition-colors duration-150 ease-out hover:bg-cta-hover hover:text-text-primary">
        <Icon name="arrow-right-circle" size="sm" />
        詳しく見る
      </button>
    </Card>
  );
}
