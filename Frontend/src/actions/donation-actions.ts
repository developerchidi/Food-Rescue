"use server";

import { auth } from "@/auth";
import { fetchFromBackend } from "@/lib/proxy";
import { revalidatePath } from "next/cache";

export type ActionState = {
  success: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
  data?: any;
};

export async function createDonation(data: any): Promise<ActionState> {
  const session = await auth();

  // 1. Check Auth
  if (!session || !session.user || !session.user.id) {
    return { success: false, message: "Bạn cần đăng nhập để thực hiện thao tác này." };
  }

  try {
    const result = await fetchFromBackend("/donations", {
      method: "POST",
      body: JSON.stringify(data)
    });

    // 5. Success
    revalidatePath("/marketplace");
    revalidatePath(`/post/${data.postId}`);
    revalidatePath("/profile/history");

    return { success: true, message: "Giải cứu thành công!", data: result };

  } catch (error: any) {
    console.error("CREATE_DONATION_ERROR:", error);

    return {
      success: false,
      message: error.message || "Lỗi hệ thống khi tạo đơn hàng."
    };
  }
}
