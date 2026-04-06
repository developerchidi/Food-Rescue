"use server";

import { auth } from "@/auth";
import { fetchFromBackend } from "@/lib/proxy";
import { revalidatePath } from "next/cache";

export type VerifyQRResult = {
  success: boolean;
  message: string;
  data?: any;
};

export async function verifyDonationQR(token: string): Promise<VerifyQRResult> {
  const session = await auth();

  // 1. Check Auth
  if (!session || !session.user || !session.user.id) {
    return { success: false, message: "Bạn cần đăng nhập để thực hiện thao tác này." };
  }

  if (!token) {
    return { success: false, message: "Mã QR không hợp lệ." };
  }

  try {
    const data = await fetchFromBackend("/donations/qr/verify", {
      method: "POST",
      body: JSON.stringify({ token }),
    });

    revalidatePath("/marketplace");
    revalidatePath("/orders");
    revalidatePath("/merchant/orders");
    revalidatePath("/merchant/dashboard");
    if (data && typeof data === "object" && "id" in data) {
      revalidatePath(`/rescue/success/${String((data as { id: string }).id)}`);
    }

    return {
      success: true,
      message: "Xác thực thành công! Đơn hàng đã hoàn tất.",
      data
    };

  } catch (error: any) {
    console.error("VERIFY_QR_ERROR:", error);
    return { success: false, message: error.message || "Lỗi hệ thống khi xác thực mã QR." };
  }
}
