"use server";

import { auth } from "@/auth";
import { fetchFromBackend } from "@/lib/proxy";
import { UserService } from "@/lib/services/user-service";
import {
  UpdateProfileSchema,
  type UpdateProfileInput,
} from "@/lib/validators/profile";
import { revalidatePath } from "next/cache";

export type UserProfileDto = {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  address: string | null;
  bio: string | null;
  avatarUrl: string | null;
  avatarPublicId: string | null;
  role: string;
  points: number;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
};

/** Hồ sơ người dùng đăng nhập (GET /api/users/profile). */
export async function getUserProfile(): Promise<UserProfileDto | null> {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }
  try {
    return (await fetchFromBackend("/users/profile")) as UserProfileDto;
  } catch {
    return null;
  }
}

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
