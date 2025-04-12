export function getPublicUrl(filePath: string): string {
  const base = process.env.SERVER_URL || 'http://localhost:3001';
  return `${base}/${filePath.replace(/\\/g, '/')}`;
}
