import { expect, test } from "@playwright/test";

const backendBase = process.env.E2E_BACKEND_URL ?? "http://127.0.0.1:3001";
const testPassword = process.env.E2E_TEST_PASSWORD ?? "Test@123456";
const testEmail = process.env.E2E_RECEIVER_EMAIL ?? "e2e.receiver@foodrescue.local";

async function ensureAccount(email: string, password: string) {
  const registerRes = await fetch(`${backendBase}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "E2E Receiver",
      email,
      password,
    }),
  });

  if (!registerRes.ok && registerRes.status !== 400) {
    const body = await registerRes.text();
    throw new Error(`Cannot prepare test account ${email}. Status ${registerRes.status}. ${body}`);
  }
}

test.describe("P0 Smoke - Auth Login", () => {
  test.beforeAll(async () => {
    await ensureAccount(testEmail, testPassword);
  });

  test("login thành công và điều hướng tới trang chủ", async ({ page }) => {
    await page.goto("/login");

    await page.getByTestId("login-email").fill(testEmail);
    await page.getByTestId("login-password").fill(testPassword);
    await page.getByTestId("login-submit").click();

    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("link", { name: "Đơn hàng" })).toBeVisible();
  });

  test("login thất bại với mật khẩu sai", async ({ page }) => {
    await page.goto("/login");

    await page.getByTestId("login-email").fill(testEmail);
    await page.getByTestId("login-password").fill("WrongPassword@123");
    await page.getByTestId("login-submit").click();

    await expect(page.getByText("Email hoặc mật khẩu không chính xác")).toBeVisible();
  });
});
