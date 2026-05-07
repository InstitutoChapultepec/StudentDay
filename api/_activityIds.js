/**
 * Upstash may return hash fields as already-parsed arrays; older writes may store JSON strings.
 */
export function parseActivityIds(raw) {
  if (raw == null || raw === '') return [];
  if (Array.isArray(raw)) {
    return raw.map((id) => Number(id)).filter((n) => Number.isInteger(n));
  }
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed)
        ? parsed.map((id) => Number(id)).filter((n) => Number.isInteger(n))
        : [];
    } catch {
      return [];
    }
  }
  return [];
}
