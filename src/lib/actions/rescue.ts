"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
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

  const userId = session.user.id;

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Kiểm tra bài đăng còn đủ số lượng không
      const post = await tx.foodPost.findUnique({
        where: { id: postId },
      });

      if (!post) {
        throw new Error("Không tìm thấy bài đăng.");
      }

      if (post.status !== "AVAILABLE" || post.quantity < quantity) {
        throw new Error("Sản phẩm đã hết hoặc không đủ số lượng.");
      }

      // 2. Tạo bản ghi Donation
      const donation = await tx.donation.create({
        data: {
          postId: post.id,
          receiverId: userId,
          quantity: quantity,
          fulfillmentMethod: fulfillmentMethod,
          deliveryAddress: address,
          deliveryPhone: phone,
          status: "REQUESTED",
          qrCode: `${fulfillmentMethod === "DELIVERY" ? "SHIP" : "REC"}-${post.id.slice(0, 4)}-${userId.slice(0, 4)}-${Date.now().toString().slice(-6)}`,
        },
      });

      // 3. Trừ số lượng tồn kho
      const newQuantity = post.quantity - quantity;
      await tx.foodPost.update({
        where: { id: postId },
        data: {
          quantity: newQuantity,
          status: newQuantity === 0 ? "TAKEN" : "AVAILABLE",
        },
      });

      return donation;
    });

    revalidatePath("/marketplace");
    return { success: true, donationId: result.id };
  } catch (error: any) {
    return { error: error.message || "Đã xảy ra lỗi khi xử lý yêu cầu." };
  }
}
