import type { InsuranceProduct } from './types';

export async function getInsuranceProducts(): Promise<InsuranceProduct[]> {
  const response = await fetch('/api/products');
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json() as Promise<InsuranceProduct[]>;
}
