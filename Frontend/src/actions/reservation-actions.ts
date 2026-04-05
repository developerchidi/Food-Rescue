"use server";

import { auth } from "@/auth";
import { fetchFromBackend } from "@/lib/proxy";

export type CheckoutHoldActionResult =
  | { holdId: string; expiresAt: number; ttlSec: number }
  | { error: string };

/**
 * Tạo giữ chỗ Redis khi vào bước checkout / xác nhận giải cứu (TTL 5–10 phút).
 */
export async function createCheckoutHold(
  postId: string,
  quantity: number
): Promise<CheckoutHoldActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Bạn cần đăng nhập để giữ chỗ." };
  }

  try {
    const result = await fetchFromBackend("/reservations/checkout-hold", {
      method: "POST",
      body: JSON.stringify({ postId, quantity }),
    });
    if (result?.error) {
      return { error: result.error };
    }
    if (!result?.holdId) {
      return { error: "Không thể tạo giữ chỗ." };
    }
    return {
      holdId: result.holdId,
      expiresAt: result.expiresAt,
      ttlSec: result.ttlSec,
    };
  } catch (e: any) {
    return { error: e.message || "Lỗi khi tạo giữ chỗ." };
  }
}

/**
 * Hủy giữ chỗ (đổi số lượng / rời trang).
 */
export async function releaseCheckoutHold(holdId: string): Promise<void> {
  const session = await auth();
  if (!session?.user?.id || !holdId) {
    return;
  }
  try {
    await fetchFromBackend("/reservations/checkout-hold/release", {
      method: "POST",
      body: JSON.stringify({ holdId }),
    });
  } catch {
    /* best-effort */
  }
}
