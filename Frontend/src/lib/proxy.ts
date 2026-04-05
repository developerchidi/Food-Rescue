import { auth } from "@/auth";
import { BACKEND_API_BASE } from "@/lib/backend-url";

export class BackendApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "BackendApiError";
    this.status = status;
  }
}

export async function fetchFromBackend(endpoint: string, options: RequestInit = {}) {
  const session = await auth();
  const token = (session as any)?.accessToken;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BACKEND_API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
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
