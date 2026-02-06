import { test, expect } from '@playwright/test';

test.describe('Login Auth Flow', () => {
  test('Login page should load and have correct elements', async ({ page }) => {
    await page.goto('/login');

    // Check main heading
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Chào mừng trở lại');

    // Check description text
    await expect(page.getByText('Hãy đăng nhập để tiếp tục hành trình giải cứu của bạn')).toBeVisible();

    // Check email input field
    const emailInput = page.locator('input[name="email"]');
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute('type', 'email');
    await expect(emailInput).toHaveAttribute('placeholder', /ten@ví-dụ.com/i);

    // Check password input field
    const passwordInput = page.locator('input[name="password"]');
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toHaveAttribute('type', 'password');
    await expect(passwordInput).toHaveAttribute('placeholder', '••••••••');

    // Check submit button
    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toContainText('Đăng nhập');

    // Check forgot password link
    await expect(page.getByText('Quên mật khẩu')).toBeVisible();

    // Check sign up link
    const signupLink = page.getByRole('link', { name: /Đăng ký ngay/i });
    await expect(signupLink).toBeVisible();
    await expect(signupLink).toHaveAttribute('href', '/register');
  });

  test('Show password toggle should work correctly', async ({ page }) => {
    await page.goto('/login');

    const passwordInput = page.locator('input[name="password"]');
    const toggleButton = page.locator('button[type="button"]').filter({ hasText: /Eye/ });

    // Initially, password input should be type="password"
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // Click toggle button
    await toggleButton.click();

    // Now it should be type="text"
    await expect(passwordInput).toHaveAttribute('type', 'text');

    // Click again to toggle back
    await toggleButton.click();

    // Back to type="password"
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('Form validation - empty email field should prevent submission', async ({ page }) => {
    await page.goto('/login');

    const passwordInput = page.locator('input[name="password"]');
    const submitBtn = page.locator('button[type="submit"]');

    // Fill only password field
    await passwordInput.fill('test1234');

    // Email field should have HTML5 validation
    const emailInput = page.locator('input[name="email"]');
    await expect(emailInput).toHaveAttribute('required');

    // Try to submit - should be blocked by HTML5 validation
    await submitBtn.click();

    // Check if browser validation message appears
    const isInvalid = await emailInput.evaluate((el) => {
      return (el as HTMLInputElement).validity.valid === false;
    });
    expect(isInvalid).toBe(true);
  });

  test('Form validation - empty password field should prevent submission', async ({ page }) => {
    await page.goto('/login');

    const emailInput = page.locator('input[name="email"]');
    const submitBtn = page.locator('button[type="submit"]');

    // Fill only email field
    await emailInput.fill('test@example.com');

    // Password field should have HTML5 validation
    const passwordInput = page.locator('input[name="password"]');
    await expect(passwordInput).toHaveAttribute('required');

    // Try to submit - should be blocked by HTML5 validation
    await submitBtn.click();

    // Check if browser validation message
    const isInvalid = await passwordInput.evaluate((el) => {
      return (el as HTMLInputElement).validity.valid === false;
    });
    expect(isInvalid).toBe(true);
  });

  test('Form validation - invalid email format', async ({ page }) => {
    await page.goto('/login');

    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');

    // Fill with invalid email
    await emailInput.fill('invalid-email');
    await passwordInput.fill('test1234');

    // Check email validity
    const isInvalid = await emailInput.evaluate((el) => {
      return (el as HTMLInputElement).validity.valid === false;
    });
    expect(isInvalid).toBe(true);
  });

  test('Login form submission with invalid credentials shows error message', async ({ page }) => {
    await page.goto('/login');

    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');
    const submitBtn = page.locator('button[type="submit"]');

    // Fill form with invalid credentials
    await emailInput.fill('nonexistent@example.com');
    await passwordInput.fill('wrongpassword');

    // Click submit
    await submitBtn.click();

    // Wait for error message
    await expect(page.getByText(/Email hoặc mật khẩu không chính xác/i)).toBeVisible();
  });

  test('Login button should be disabled during submission', async ({ page }) => {
    await page.goto('/login');

    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');
    const submitBtn = page.locator('button[type="submit"]');

    // Fill form
    await emailInput.fill('test@example.com');
    await passwordInput.fill('test1234');

    // Submit button should show loading state
    await submitBtn.click();

    // Button should be disabled during submission
    await expect(submitBtn).toHaveAttribute('disabled');
    
    // Button text should change to loading state
    await expect(submitBtn).toContainText('Đang đăng nhập');
  });

  test('Success message should show when redirected from register page', async ({ page }) => {
    await page.goto('/login?success=Account created');

    // Check success message
    await expect(page.getByText(/Đăng ký thành công/i)).toBeVisible();
  });

  test('Email input should have correct attributes', async ({ page }) => {
    await page.goto('/login');

    const emailInput = page.locator('input[name="email"]');

    await expect(emailInput).toHaveAttribute('type', 'email');
    await expect(emailInput).toHaveAttribute('required');
  });

  test('Password input should have correct attributes', async ({ page }) => {
    await page.goto('/login');

    const passwordInput = page.locator('input[name="password"]');

    await expect(passwordInput).toHaveAttribute('required');
  });

  test('LoginForm should render inside AuthLayout', async ({ page }) => {
    await page.goto('/login');

    // Check if the page renders the AuthLayout (left side testimonial)
    const testimonial = page.getByText(/Nền tảng tuyệt vời nhất để tôi có thể đóng góp/i);
    await expect(testimonial).toBeVisible();

    // Check if Food Rescue branding is visible
    const branding = page.getByText(/Food Rescue/i).first();
    await expect(branding).toBeVisible();
  });

  test('Google login button should be visible', async ({ page }) => {
    await page.goto('/login');

    const googleBtn = page.getByRole('button', { name: /Tiếp tục bằng Google/i });
    await expect(googleBtn).toBeVisible();
  });

  test('Divider text between OAuth and Email login should be visible', async ({ page }) => {
    await page.goto('/login');

    const dividerText = page.getByText(/Hoặc bằng Email/i).first();
    await expect(dividerText).toBeVisible();
  });
});
