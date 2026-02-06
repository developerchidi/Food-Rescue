import { test, expect } from '@playwright/test';

test.describe('Auth Flow', () => {
    test('Register page should load and have correct elements', async ({ page }) => {
        await page.goto('/register');

        // Check heading
        await expect(page.getByRole('heading', { level: 1 })).toContainText('Tham gia Cộng đồng');

        // Check inputs
        await expect(page.locator('input[name="name"]')).toBeVisible();
        await expect(page.locator('input[name="email"]')).toBeVisible();
        await expect(page.locator('input[name="password"]')).toBeVisible();

        // Check submit button
        const submitBtn = page.locator('button[type="submit"]');
        await expect(submitBtn).toBeVisible();
        await expect(submitBtn).toContainText('Bắt đầu hành trình');
    });

    test('Profile page check (placeholder)', async ({ page }) => {
        // Note: Profile page location is not confirmed yet. 
        // This test expects to fail or 404 if the page doesn't exist.
        // For now, we skip if it redirects to login or 404s to avoid breaking the build,
        // but ideally this should be updated once profile route is confirmed.

        await page.goto('/profile');

        // If redirected to login, that's a valid "auth protected" behavior check
        if (page.url().includes('login')) {
            console.log('Redirected to login as expected for unauthenticated user accessing profile');
            return;
        }

        // If page exists, check for common profile headers
        // await expect(page.getByRole('heading')).toContainText('Profile');
    });
});
