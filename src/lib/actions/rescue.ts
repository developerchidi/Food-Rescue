"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { RescueSchema } from "@/lib/validators/donations";
import { createReservation, getReservation, releaseReservation } from "@/lib/redis-reservation";

/**
 * Bước 1 – Giữ chỗ (Reservation): Tạo bản ghi tạm giữ trên Redis, không trừ DB.
 * Người dùng có 10 phút để hoàn tất đơn; sau đó gọi completeReservation để tạo Donation và trừ DB.
 */
export async function rescueFood(
  postId: string,
  quantity: number,
  fulfillmentMethod: "PICKUP" | "DELIVERY" = "PICKUP",
  address?: string,
  phone?: string
) {
  try {
    const parsed = RescueSchema.parse({
      postId,
      quantity,
      fulfillmentMethod,
      address,
      phone,
    });

    postId = parsed.postId;
    quantity = parsed.quantity;
    fulfillmentMethod = parsed.fulfillmentMethod;
    address = parsed.address;
    phone = parsed.phone;
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        error: "Dữ liệu không hợp lệ.",
        issues: error.issues,
      };
    }
    throw error;
  }

  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Bạn cần đăng nhập để thực hiện hành động này." };
  }

  const userId = session.user.id;

  try {
    const post = await prisma.foodPost.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return { error: "Không tìm thấy bài đăng." };
    }

    if (post.status !== "AVAILABLE") {
      return { error: "Sản phẩm không còn khả dụng." };
    }

    const reservation = await createReservation(
      postId,
      userId,
      quantity,
      post.quantity,
      fulfillmentMethod,
      address,
      phone
    );

    if ("error" in reservation) {
      return { error: reservation.error };
    }

    revalidatePath("/marketplace");
    return {
      success: true,
      reservationId: reservation.reservationId,
      expiresAt: reservation.expiresAt,
    };
  } catch (error: any) {
    return { error: error.message || "Đã xảy ra lỗi khi xử lý yêu cầu." };
  }
}

/**
 * Bước 2 – Hoàn tất đơn: Tạo Donation trong DB, trừ kho, xóa reservation trên Redis.
 * Gọi trong vòng 10 phút sau khi giữ chỗ.
 */
export async function completeReservation(reservationId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Bạn cần đăng nhập để hoàn tất đơn." };
  }

  const record = await getReservation(reservationId);
  if (!record) {
    return { error: "Mã giữ chỗ không tồn tại hoặc đã hết hạn." };
  }

  if (record.userId !== session.user.id) {
    return { error: "Bạn không có quyền hoàn tất đơn này." };
  }

  const userId = session.user.id;

  try {
    const donation = await prisma.$transaction(async (tx) => {
      const post = await tx.foodPost.findUnique({
        where: { id: record.postId },
      });

      if (!post) {
        throw new Error("Không tìm thấy bài đăng.");
      }
      if (post.status !== "AVAILABLE" || post.quantity < record.quantity) {
        throw new Error("Sản phẩm đã hết hoặc không đủ số lượng.");
      }

      const newDonation = await tx.donation.create({
        data: {
          postId: record.postId,
          receiverId: userId,
          quantity: record.quantity,
          fulfillmentMethod: record.fulfillmentMethod,
          deliveryAddress: record.deliveryAddress,
          deliveryPhone: record.deliveryPhone,
          status: "REQUESTED",
          qrCode: `${
            record.fulfillmentMethod === "DELIVERY" ? "SHIP" : "REC"
          }-${record.postId.slice(0, 4)}-${userId.slice(0, 4)}-${Date.now()
            .toString()
            .slice(-6)}`,
        },
      });

      const newQuantity = post.quantity - record.quantity;
      await tx.foodPost.update({
        where: { id: record.postId },
        data: {
          quantity: newQuantity,
          status: newQuantity === 0 ? "TAKEN" : "AVAILABLE",
        },
      });

      return newDonation;
    });

    await releaseReservation(reservationId);
    revalidatePath("/marketplace");
    revalidatePath("/orders");
    return { success: true, donationId: donation.id };
  } catch (error: any) {
    return { error: error.message || "Không thể hoàn tất đơn." };
  }
}