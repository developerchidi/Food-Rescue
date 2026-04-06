"use server";

import { auth } from "@/auth";
import { fetchFromBackend, BackendApiError } from "@/lib/proxy";
import { revalidatePath } from "next/cache";

export type MerchantPostUpdate = {
  title?: string;
  description?: string | null;
  type?: "INDIVIDUAL" | "MYSTERY_BOX";
  originalPrice?: number;
  rescuePrice?: number;
  quantity?: number;
  expiryDate?: string;
  imageUrl?: string | null;
  status?: "AVAILABLE" | "PENDING" | "TAKEN" | "EXPIRED";
};

export async function updateMerchantPost(
  postId: string,
  patch: MerchantPostUpdate
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Bạn cần đăng nhập." };
  }

  try {
    await fetchFromBackend(`/posts/${postId}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    });
    revalidatePath("/merchant/posts");
    revalidatePath("/marketplace");
    return { success: true as const };
  } catch (e: unknown) {
    const msg =
      e instanceof BackendApiError
        ? e.message
        : "Không thể cập nhật bài đăng.";
    return { error: msg };
  }
}

export async function deleteMerchantPost(postId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Bạn cần đăng nhập." };
  }

  try {
    await fetchFromBackend(`/posts/${postId}`, { method: "DELETE" });
    revalidatePath("/merchant/posts");
    revalidatePath("/marketplace");
    return { success: true as const };
  } catch (e: unknown) {
    const msg =
      e instanceof BackendApiError ? e.message : "Không thể xóa bài đăng.";
    return { error: msg };
  }
}
