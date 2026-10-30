import { test, expect } from "@playwright/test";

test("อัปโหลดรูปปกติแล้วเห็นผลประเมิน", async ({ page }) => {
  await page.goto("/");
  await page.locator('input[type="file"]').setInputFiles("e2e/fixtures/beans.jpg");
  await page.getByRole("button", { name: "เริ่มประเมินราคา" }).click();
  await expect(page.getByText("ราคาประเมิน")).toBeVisible();
});

test("ชื่อไฟล์มี dark แสดงเหตุผล reject", async ({ page }) => {
  await page.goto("/");
  await page.locator('input[type="file"]').setInputFiles("e2e/fixtures/dark.png");
  await page.getByRole("button", { name: "เริ่มประเมินราคา" }).click();
  await expect(page.getByText("รูปมืดเกินไป ·")).toBeVisible();
});
