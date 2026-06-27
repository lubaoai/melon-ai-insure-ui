export function getDefaultContractDate(baseDate?: Date): string {
  const base = baseDate ?? new Date();
  const result = new Date(base.getFullYear(), base.getMonth(), base.getDate() + 7);
  const yyyy = result.getFullYear();
  const mm = String(result.getMonth() + 1).padStart(2, '0');
  const dd = String(result.getDate()).padStart(2, '0');
  return `${yyyy}/${mm}/${dd}`;
}
