/**
 * URL gốc của API Express (…/api).
 * Trên server: ưu tiên BACKEND_INTERNAL_URL (tránh nhầm với Next :3000).
 * Trên client: chỉ NEXT_PUBLIC_* — nếu nghi ngờ nhầm cổng 3000 thì fallback 3001.
 */
const trimSlash = (s: string) => s.replace(/\/+$/, "");

function isNextDevOrigin(url: string): boolean {
  return /localhost:3000/i.test(url) || /127\.0\.0\.1:3000/i.test(url);
}

/**
 * Dùng trong Route Handler, Server Actions, `fetchFromBackend` (chạy trên server).
 */
export function getBackendApiBaseForServer(): string {
  const internal = process.env.BACKEND_INTERNAL_URL?.trim();
  if (internal) {
    return `${trimSlash(internal)}/api`;
  }

  const explicit = process.env.NEXT_PUBLIC_BACKEND_API_BASE?.trim();
  if (explicit && !isNextDevOrigin(explicit)) {
    return trimSlash(explicit);
  }

  const fromPublic = process.env.NEXT_PUBLIC_API_URL?.trim();
  const origin = trimSlash(
    fromPublic && !isNextDevOrigin(fromPublic)
      ? fromPublic
      : "http://127.0.0.1:3001"
  );

  return `${origin}/api`;
}

/**
 * Bundle client (ít dùng — ưu tiên gọi `/api/...` qua Route Handler).
 */
export function getBackendApiBaseForClient(): string {
  const explicit = process.env.NEXT_PUBLIC_BACKEND_API_BASE?.trim();
  if (explicit && !isNextDevOrigin(explicit)) {
    return trimSlash(explicit);
  }
  const fromPublic = process.env.NEXT_PUBLIC_API_URL?.trim();
  const origin = trimSlash(
    fromPublic && !isNextDevOrigin(fromPublic)
      ? fromPublic
      : "http://127.0.0.1:3001"
  );
  return `${origin}/api`;
}

/** @deprecated Dùng getBackendApiBaseForServer / getBackendApiBaseForClient hoặc fetch("/api/...") */
export const BACKEND_API_BASE = getBackendApiBaseForClient();
