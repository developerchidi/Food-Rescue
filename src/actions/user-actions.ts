"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import {
  UpdateProfileInput,
  UpdateProfileSchema,
} from "@/lib/validators/profile";
import { UserService } from "@/services/UserService";

export type UpdateProfileActionState = {
  success: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
  data?: unknown;
};

export async function updateUserProfile(
  data: UpdateProfileInput
): Promise<UpdateProfileActionState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Bạn cần đăng nhập để thực hiện thao tác này.",
    };
  }

  const parsed = UpdateProfileSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Dữ liệu không hợp lệ.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const updatedUser = await UserService.updateProfile({
      userId: session.user.id,
      name: parsed.data.name,
      latitude: parsed.data.latitude,
      longitude: parsed.data.longitude,
      avatarBase64: parsed.data.avatarBase64,
    });

    revalidatePath("/");
    revalidatePath("/orders");

    return {
      success: true,
      message: "Cập nhật hồ sơ thành công.",
      data: updatedUser,
    };
  } catch (error) {
    console.error("UPDATE_USER_PROFILE_ERROR:", error);
    return {
      success: false,
      message: "Lỗi hệ thống khi cập nhật hồ sơ.",
    };
  }
}
