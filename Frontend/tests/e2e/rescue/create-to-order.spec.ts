import { expect, test } from "@playwright/test";

const backendBase = process.env.E2E_BACKEND_URL ?? "http://127.0.0.1:3001";
const receiverPassword = process.env.E2E_TEST_PASSWORD ?? "Test@123456";
const receiverEmail = process.env.E2E_RECEIVER_EMAIL ?? "e2e.receiver@foodrescue.local";
const donorPassword = process.env.E2E_DONOR_PASSWORD ?? "Test@123456";
const donorEmail = process.env.E2E_DONOR_EMAIL ?? "e2e.donor@foodrescue.local";

async function ensureAccount(email: string, password: string, name: string) {
  const registerRes = await fetch(`${backendBase}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!registerRes.ok && registerRes.status !== 400) {
    const body = await registerRes.text();
    throw new Error(`Cannot prepare test account ${email}. Status ${registerRes.status}. ${body}`);
  }
}

async function loginApi(email: string, password: string): Promise<string> {
  const res = await fetch(`${backendBase}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API login failed for ${email}. Status ${res.status}. ${body}`);
  }

  const data = await res.json();
  if (!data?.token) {
    throw new Error(`API login did not return token for ${email}.`);
  }

  return data.token as string;
}

async function seedMarketplacePost() {
  await ensureAccount(donorEmail, donorPassword, "E2E Donor");
  const token = await loginApi(donorEmail, donorPassword);

  const now = Date.now();
  const postTitle = `E2E Rescue Post ${now}`;

  const res = await fetch(`${backendBase}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: postTitle,
      description: "Auto generated post for smoke E2E",
      type: "INDIVIDUAL",
      originalPrice: 100000,
      rescuePrice: 30000,
      quantity: 3,
      expiryDate: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
      imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop",
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Cannot create seeded post. Status ${res.status}. ${body}`);
  }

  const post = await res.json();
  return { id: post.id as string, title: post.title as string };
}

test.describe("P0 Smoke - Marketplace to Order", () => {
  test("login -> marketplace -> rescue -> orders", async ({ page }) => {
    await ensureAccount(receiverEmail, receiverPassword, "E2E Receiver");
    const seededPost = await seedMarketplacePost();

    await page.goto("/login");
    await page.getByTestId("login-email").fill(receiverEmail);
    await page.getByTestId("login-password").fill(receiverPassword);
    await page.getByTestId("login-submit").click();
    await expect(page).toHaveURL(/\/$/);

    await page.goto("/marketplace");
    await expect(page.getByRole("heading", { name: /kết quả/i })).toBeVisible();

    const targetCard = page.locator("div", {
      has: page.getByRole("heading", { name: seededPost.title }),
    }).first();
    const targetCardButton = targetCard.getByRole("button", { name: "Giải cứu ngay" });
    await targetCardButton.click();

    await expect(page).toHaveURL(/\/rescue\/confirm\/.+/);
    await page.getByTestId("rescue-confirm-submit").click();

    await expect(page).toHaveURL(/\/rescue\/success\/.+/);
    await expect(page.getByText(/Giải cứu/i)).toBeVisible();

    await page.goto("/orders");
    await expect(page.getByTestId("orders-title")).toBeVisible();
    await expect(page.getByText(seededPost.title).first()).toBeVisible();
  });
});
