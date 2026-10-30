export const GOOD_BEAN_ID = 1;
const Z_95 = 1.96;

export function countTotal(counts) {
  return Object.values(counts).reduce((sum, n) => sum + n, 0);
}

export function goodRatio(counts) {
  const total = countTotal(counts);
  if (total === 0) return 0;
  return counts[GOOD_BEAN_ID] / total;
}

export function calcPrice(counts, marketPrice) {
  return Math.round(marketPrice * goodRatio(counts));
}

export function goodRatioRange(counts) {
  const n = countTotal(counts);
  if (n === 0) return { low: 0, high: 0 };
  const p = goodRatio(counts);
  const z2 = Z_95 * Z_95;
  const denom = 1 + z2 / n;
  const center = (p + z2 / (2 * n)) / denom;
  const half = (Z_95 * Math.sqrt((p * (1 - p)) / n + z2 / (4 * n * n))) / denom;
  return { low: Math.max(0, center - half), high: Math.min(1, center + half) };
}

export function priceRange(counts, marketPrice) {
  const { low, high } = goodRatioRange(counts);
  return {
    min: Math.round(marketPrice * low),
    max: Math.round(marketPrice * high),
  };
}
