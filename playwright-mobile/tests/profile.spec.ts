import { test, expect } from '@playwright/test';

test('Profile UI mobile', async ({ page }) => {
  await page.goto('http://localhost:3000/profile'); // sửa link

  // kiểm tra avatar
  const avatar = page.locator('img');
  await expect(avatar).toBeVisible();

  // kiểm tra thông tin hiển thị
  const name = page.locator('text=Name');
  await expect(name).toBeVisible();

  // chụp ảnh
  await page.screenshot({ path: 'screenshots/profile.png', fullPage: true });

  // dừng ở đây để giữ trình duyệt mở và cho phép bạn giả lập tương tác
  await page.pause();
});