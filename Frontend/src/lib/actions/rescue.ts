"use server";

import { auth } from "@/auth";
import { fetchFromBackend } from "@/lib/proxy";
import { revalidatePath } from "next/cache";

export async function rescueFood(
  postId: string,
  quantity: number,
  fulfillmentMethod: "PICKUP" | "DELIVERY" = "PICKUP",
  address?: string,
  phone?: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Bạn cần đăng nhập để thực hiện hành động này." };
  }

  try {
    const result = await fetchFromBackend("/donations", {
      method: "POST",
      body: JSON.stringify({
        postId,
        quantity,
        fulfillmentMethod,
        address,
        phone,
      })
    });

    if (result.error || result.fieldErrors) {
      return { error: result.error || "Dữ liệu không hợp lệ." };
    }

    revalidatePath("/marketplace");
    revalidatePath("/orders");
    
    return { success: true, donationId: result.id };
  } catch (error: any) {
    console.error("RESCUE_FOOD_ERROR:", error);
    return { error: error.message || "Đã xảy ra lỗi khi xử lý yêu cầu." };
  }
}