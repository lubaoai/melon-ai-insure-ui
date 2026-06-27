export function generateReceptionNumber(): string {
  const now = new Date();
  const yyyymmdd = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  const random = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
  return `${yyyymmdd}-${random}`;
}
