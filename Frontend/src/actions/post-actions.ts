"use server";

import { auth } from "@/auth"; // Đường dẫn auth có thể thay đổi tùy config, check lại nếu lỗi
import { fetchFromBackend } from "@/lib/proxy";
import { revalidatePath } from "next/cache";
import { CreateFoodPostSchema, type CreateFoodPostInput } from "@/lib/validators/posts";

export type ActionState = {
  success: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
  data?: any;
};

export async function createFoodPost(data: CreateFoodPostInput): Promise<ActionState> {
  const session = await auth();

  // 1. Check Auth & Role
  if (!session || !session.user || !session.user.id) {
    return { success: false, message: "Bạn chưa đăng nhập." };
  }

  try {
    const parsed = CreateFoodPostSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: "Dữ liệu bài đăng không hợp lệ.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }

    // 2. Call Service via API
    const post = await fetchFromBackend("/posts", {
      method: "POST",
      body: JSON.stringify({
        title: parsed.data.title,
        description: parsed.data.description,
        type: parsed.data.type,
        originalPrice: parsed.data.originalPrice ?? 0,
        rescuePrice: parsed.data.rescuePrice ?? 0,
        quantity: parsed.data.quantity,
        expiryDate: parsed.data.expiryDate,
        imageUrl: parsed.data.imageUrl,
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
