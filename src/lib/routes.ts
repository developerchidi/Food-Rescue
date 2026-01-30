/**
 * Danh sach cac route cong khai khong cam dang nhap
 */
export const publicRoutes = [
  "/",
  "/about",
  "/contact",
  "/faq",
  "/impact",
  "/partners",
  "/privacy",
  "/terms",
  "/help",
];

/**
 * Danh sach cac route dung de xac thuc
 * Nhung route nay se redirect nguoi dung ve trang chu neu ho da dang nhap
 */
export const authRoutes = [
  "/login",
  "/register",
  "/api/auth/register", // Endpoint dang ky
];

/**
 * Prefix cho cac route API xac thuc
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Redirect mac dinh sau khi dang nhap
 */
export const DEFAULT_LOGIN_REDIRECT = "/";

/**
 * Danh sach cac API endpoint can ap dung Rate Limiting
 */
export const ratelimitRoutes = [
  "/api/auth/register",
  "/api/auth/callback/credentials", // Mac dinh cua NextAuth
  "/api/contact",
];
