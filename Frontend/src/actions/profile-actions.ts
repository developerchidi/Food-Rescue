"use server";

import { auth } from "@/auth";
import { UserService } from "@/lib/services/user-service";
import {
  UpdateProfileSchema,
  type UpdateProfileInput,
} from "@/lib/validators/profile";
import { revalidatePath } from "next/cache";

export type ActionState = {
  success: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
  data?: unknown;
};

export async function updateUserProfile(
  data: UpdateProfileInput
): Promise<ActionState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Bạn cần đăng nhập để thực hiện thao tác này.",
    };
  }

  const validated = UpdateProfileSchema.safeParse(data);
  if (!validated.success) {
    return {
      success: false,
      message: "Dữ liệu không hợp lệ.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await UserService.updateProfile(validated.data);

    revalidatePath("/profile");
    revalidatePath("/profile/history");

    return {
      success: true,
      message: "Cập nhật hồ sơ thành công.",
      data: result,
    };
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error("UPDATE_PROFILE_ERROR:", error);
    return {
      success: false,
      message: err.message || "Đã xảy ra lỗi khi cập nhật hồ sơ.",
    };
  }
}
