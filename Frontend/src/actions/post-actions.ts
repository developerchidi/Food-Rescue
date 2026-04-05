"use server";

import { auth } from "@/auth"; // Đường dẫn auth có thể thay đổi tùy config, check lại nếu lỗi
import { fetchFromBackend } from "@/lib/proxy";
import { CreateFoodPostSchema } from "@/lib/validators/posts";
import { revalidatePath } from "next/cache";

export type ActionState = {
  success: boolean;
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  data?: any;
};

export async function createFoodPost(data: unknown): Promise<ActionState> {
  const session = await auth();

  // 1. Check Auth & Role
  if (!session || !session.user || !session.user.id) {
    return { success: false, message: "Bạn chưa đăng nhập." };
  }

  const parsed = CreateFoodPostSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Dữ liệu không hợp lệ.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const body = parsed.data;

  try {
    const post = await fetchFromBackend("/posts", {
      method: "POST",
      body: JSON.stringify({
        title: body.title,
        description: body.description,
        type: body.type,
        originalPrice: body.originalPrice ?? 0,
        rescuePrice: body.rescuePrice ?? 0,
        quantity: body.quantity,
        expiryDate: body.expiryDate,
        imageUrl: body.imageUrl,
      }),
    });

    revalidatePath("/marketplace");
    revalidatePath("/manage/posts");

    return { success: true, message: "Đăng bài thành công!", data: post };
  } catch (error: unknown) {
    console.error("CREATE_POST_ERROR:", error);
    const err = error as Error & {
      fieldErrors?: Record<string, string[] | undefined>;
    };
    return {
      success: false,
      message: err.message || "Lỗi hệ thống khi tạo bài đăng.",
      fieldErrors: err.fieldErrors,
    };
  }
}
