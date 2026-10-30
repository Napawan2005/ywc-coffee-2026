import { test } from "node:test";
import assert from "node:assert/strict";
import {
  countTotal,
  goodRatio,
  calcPrice,
  goodRatioRange,
  priceRange,
} from "./pricing.js";

const sample = { 1: 86, 2: 14 };

test("countTotal: sample ได้ 100 และ {} ต้องได้ 0", () => {
  assert.equal(countTotal(sample), 100);
  assert.equal(countTotal({}), 0);
});

test("goodRatio: 86/100 = 0.86 และถ้า total เป็น 0 ต้องได้ 0 ไม่ใช่ NaN", () => {
  assert.equal(goodRatio(sample), 0.86);
  assert.equal(goodRatio({}), 0);
});

test("calcPrice: 200 × 0.86 = 172", () => {
  assert.equal(calcPrice(sample, 200), 172);
});

test("goodRatioRange: low ≤ สัดส่วน ≤ high และอยู่ในช่วง 0–1 เสมอ แม้สัดส่วนจะเป็น 0 หรือ 1", () => {
  const cases = [
    { counts: sample, p: 0.86 },
    { counts: { 1: 0, 2: 100 }, p: 0 },
    { counts: { 1: 100, 2: 0 }, p: 1 },
    { counts: {}, p: 0 },
  ];
  for (const { counts, p } of cases) {
    const { low, high } = goodRatioRange(counts);
    assert.ok(low >= 0 && high <= 1, `range อยู่นอก 0–1: ${low}, ${high}`);
    assert.ok(low <= p && p <= high, `${p} ไม่อยู่ใน [${low}, ${high}]`);
  }
});

test("priceRange: min ≤ ราคา ≤ max (sample ต้องได้ 156–183)", () => {
  const { min, max } = priceRange(sample, 200);
  assert.equal(min, 156);
  assert.equal(max, 183);
  const price = calcPrice(sample, 200);
  assert.ok(min <= price && price <= max);
});
