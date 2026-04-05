import { auth } from "@/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function fetchFromBackend(endpoint: string, options: RequestInit = {}) {
  const session = await auth();
  const token = (session as any)?.accessToken;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = "API Client Error";
    let fieldErrors: Record<string, string[] | undefined> | undefined;
    try {
      const errBody = (await response.json()) as {
        error?: string;
        message?: string;
        fieldErrors?: Record<string, string[] | undefined>;
      };
      errorMessage = errBody.error || errBody.message || errorMessage;
      if (errBody.fieldErrors) {
        fieldErrors = errBody.fieldErrors;
      }
    } catch {
      errorMessage = response.statusText;
    }
    const err = new Error(errorMessage) as Error & {
      fieldErrors?: Record<string, string[] | undefined>;
      status?: number;
    };
    err.fieldErrors = fieldErrors;
    err.status = response.status;
    throw err;
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
