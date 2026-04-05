import { test, expect } from '@playwright/test';

test('Register UI mobile', async ({ page }) => {
  await page.goto('http://localhost:3000/register'); // sửa link của bạn

  // focus vào input password
  const passwordInput = page.locator('input[type="password"]');
  await passwordInput.click();

  // kiểm tra input có hiển thị
  await expect(passwordInput).toBeVisible();

  // kiểm tra nút submit có bấm được
  const button = page.locator('button[type="submit"]');
  await expect(button).toBeVisible();

  // chụp ảnh
  await page.screenshot({ path: 'screenshots/register.png', fullPage: true });
});