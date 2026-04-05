"use server";

import { auth } from "@/auth";
import { fetchFromBackend } from "@/lib/proxy";
import { MerchantToggleSchema } from "@/lib/validators/profile";

export type MerchantToggleState = {
  success: boolean;
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  user?: { id: string; name: string | null; email: string; role: string };
};

export async function toggleMerchantProfile(
  registerAsMerchant: boolean
): Promise<MerchantToggleState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: "Bạn cần đăng nhập." };
  }

  const parsed = MerchantToggleSchema.safeParse({ registerAsMerchant });
  if (!parsed.success) {
    return {
      success: false,
      message: "Dữ liệu không hợp lệ.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await fetchFromBackend("/users/merchant", {
      method: "PATCH",
      body: JSON.stringify(parsed.data),
    });
    return {
      success: true,
      message: result?.message || "Đã cập nhật vai trò.",
      user: result?.user,
    };
  } catch (error: unknown) {
    const err = error as Error & {
      fieldErrors?: Record<string, string[] | undefined>;
    };
    return {
      success: false,
      message: err.message || "Không thể cập nhật vai trò.",
      fieldErrors: err.fieldErrors,
    };
  }
}
