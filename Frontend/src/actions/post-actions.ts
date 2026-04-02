"use server";

import { auth } from "@/auth"; // Đường dẫn auth có thể thay đổi tùy config, check lại nếu lỗi
import { fetchFromBackend } from "@/lib/proxy";
import { revalidatePath } from "next/cache";

export type ActionState = {
  success: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
  data?: any;
};

export async function createFoodPost(data: any): Promise<ActionState> {
  const session = await auth();

  // 1. Check Auth & Role
  if (!session || !session.user || !session.user.id) {
    return { success: false, message: "Bạn chưa đăng nhập." };
  }

  try {
    // 2. Call Service via API
    const post = await fetchFromBackend("/posts", {
      method: "POST",
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        type: data.type,
        originalPrice: data.originalPrice || 0,
        rescuePrice: data.rescuePrice || 0,
        quantity: data.quantity,
        expiryDate: data.expiryDate,
        imageUrl: data.imageUrl,
      }),
    });

    // 3. Revalidate & Return
    revalidatePath("/marketplace");
    revalidatePath("/manage/posts"); // Giả định route quản lý

    return { success: true, message: "Đăng bài thành công!", data: post };
  } catch (error: any) {
    console.error("CREATE_POST_ERROR:", error);
    return { success: false, message: error.message || "Lỗi hệ thống khi tạo bài đăng." };
  }
}
