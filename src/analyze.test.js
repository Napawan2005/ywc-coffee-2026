import { test } from "node:test";
import assert from "node:assert/strict";
import { fakeAnalyze } from "./analyze.js";
import { sampleResult } from "./data.js";

test("fakeAnalyze: ชื่อไฟล์ปกติได้ sampleResult", async () => {
  const result = await fakeAnalyze({ name: "beans.png" });
  assert.deepEqual(result, sampleResult);
});

test("fakeAnalyze: ชื่อไฟล์มีคำว่า dark ถูก reject พร้อม reason", async () => {
  await assert.rejects(fakeAnalyze({ name: "dark.png" }), {
    reason: "รูปมืดเกินไป",
  });
});

test("fakeAnalyze: คำว่า dark อยู่กลางชื่อก็ถูก reject", async () => {
  await assert.rejects(fakeAnalyze({ name: "coffee-dark-01.jpg" }));
});

test("fakeAnalyze: คืนค่าเป็น Promise ไม่ได้ตอบทันที", () => {
  const p = fakeAnalyze({ name: "beans.png" });
  assert.ok(p instanceof Promise);
  return p;
});
