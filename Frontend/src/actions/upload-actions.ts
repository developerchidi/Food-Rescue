"use server"

import { uploadImage, deleteImage } from "@/lib/cloudinary"
import { auth } from "@/auth"

/**
 * Server Action để upload ảnh dành cho Client Components
 */
export const uploadImageAction = async (base64Data: string, folder: string) => {
  const session = await auth()

  if (!session) {
    return { success: false, error: "Bạn cần đăng nhập để thực hiện thao tác này." }
  }

  return await uploadImage(base64Data, folder)
}

/**
 * Server Action để xóa ảnh dành cho Client Components
 */
export const deleteImageAction = async (publicId: string) => {
  const session = await auth()

  if (!session) {
    return { success: false, error: "Bạn cần đăng nhập để thực hiện thao tác này." }
  }

  // Chặn trường hợp xóa ảnh không có publicId hợp lệ
  if (!publicId || !publicId.startsWith("food-rescue/")) {
    return { success: false, error: "Public ID không hợp lệ." }
  }

  return await deleteImage(publicId)
}
