"use server";

import { auth } from "@/auth"; // Đường dẫn auth có thể thay đổi tùy config, check lại nếu lỗi
import { prisma } from "@/lib/prisma";
import { CreateFoodPostSchema, CreateFoodPostInput } from "@/lib/validators/posts";
import { FoodPostService } from "@/services/FoodPostService";
import { revalidatePath } from "next/cache";

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

  // TODO: Check if user is DONOR (Merchant) if needed
  // if (session.user.role !== "DONOR") { 
  //   return { success: false, message: "Chỉ đối tác mới được đăng bài." };
  // }

  // 2. Validate Input
  const parsed = CreateFoodPostSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Dữ liệu không hợp lệ.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const payload = parsed.data;

  try {
    // 3. Call Service
    const post = await FoodPostService.createPost({
      donorId: session.user.id,
      title: payload.title,
      description: payload.description,
      type: payload.type,
      originalPrice: payload.originalPrice || 0,
      rescuePrice: payload.rescuePrice || 0,
      quantity: payload.quantity,
      expiryDate: payload.expiryDate,
      imageUrl: payload.imageUrl,
    });

    // 4. Revalidate & Return
    revalidatePath("/marketplace");
    revalidatePath("/manage/posts"); // Giả định route quản lý

    return { success: true, message: "Đăng bài thành công!", data: post };
  } catch (error) {
    console.error("CREATE_POST_ERROR:", error);
    return { success: false, message: "Lỗi hệ thống khi tạo bài đăng." };
  }
}
