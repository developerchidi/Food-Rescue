import { auth } from "@/auth";
import { getBackendApiBaseForServer } from "@/lib/backend-url";

export class BackendApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "BackendApiError";
    this.status = status;
  }
}

export type FetchFromBackendOptions = RequestInit & {
  /** Trả về `null` thay vì ném lỗi khi backend 404 (trang chi tiết / notFound). */
  allowNotFound?: boolean;
};

export async function fetchFromBackend(
  endpoint: string,
  options: FetchFromBackendOptions = {}
) {
  const { allowNotFound, ...fetchOptions } = options;
  const session = await auth();
  const token = (session as any)?.accessToken;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...fetchOptions.headers,
  };

  const base = getBackendApiBaseForServer();
  const response = await fetch(`${base}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    if (allowNotFound && response.status === 404) {
      return null;
    }
    let errorMessage = "API Client Error";
    try {
      const errBody = await response.json();
      errorMessage = errBody.error || errBody.message || errorMessage;
    } catch {
      errorMessage = response.statusText;
    }
    throw new BackendApiError(errorMessage, response.status);
  }

  // Handle empty responses
  if (response.status === 204) {
    return null;
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}
