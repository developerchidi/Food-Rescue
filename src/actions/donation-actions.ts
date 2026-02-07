"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { RescueSchema, RescueInput } from "@/lib/validators/donations";
import { ReservationService } from "@/services/ReservationService";
import { revalidatePath } from "next/cache";

export type ActionState = {
  success: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
  data?: any;
};

export async function createDonation(data: RescueInput): Promise<ActionState> {
  const session = await auth();

  // 1. Check Auth
  if (!session || !session.user || !session.user.id) {
    return { success: false, message: "Bạn cần đăng nhập để thực hiện thao tác này." };
  }

  const userId = session.user.id;

  // 2. Validate Input
  const parsed = RescueSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Dữ liệu không hợp lệ.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const payload = parsed.data;

  // 3. Redis Reservation (Pessimistic Check)
  const isReserved = await ReservationService.reserveItem(payload.postId, payload.quantity);

  if (!isReserved) {
    return { success: false, message: "Rất tiếc, món ăn này vừa hết hàng hoặc không đủ số lượng." };
  }

  try {
    // 4. DB Transaction
    // Use transaction to ensure both Donation creation and Post update happen together
    const result = await prisma.$transaction(async (tx) => {
      // 4.1. Double check Post status & concurrency in DB
      const post = await tx.foodPost.findUnique({
        where: { id: payload.postId },
      });

      if (!post) {
        throw new Error("Bài đăng không tồn tại.");
      }

      if (post.status !== "AVAILABLE") {
        throw new Error("Bài đăng không còn khả dụng.");
      }

      if (new Date(post.expiryDate) < new Date()) {
        throw new Error("Bài đăng đã hết hạn.");
      }

      // Check DB quantity just in case Redis was out of sync (Optional but safe)
      if (post.quantity < payload.quantity) {
        throw new Error("Số lượng trong kho không đủ.");
      }

      // 4.2. Create Donation
      const donation = await tx.donation.create({
        data: {
          postId: payload.postId,
          receiverId: userId,
          quantity: payload.quantity,
          fulfillmentMethod: payload.fulfillmentMethod,
          deliveryAddress: payload.address,
          deliveryPhone: payload.phone,
          status: "REQUESTED",
        },
      });

      // 4.3. Update Post Quantity
      const updatedPost = await tx.foodPost.update({
        where: { id: payload.postId },
        data: {
          quantity: { decrement: payload.quantity },
          // If quantity reaches 0, should we update status?
          // Let's keep it simple for now, maybe status update is a separate trigger or handled casually.
          // Or update status if new quantity is 0?
        },
      });

      if (updatedPost.quantity < 0) {
        throw new Error("Overselling detected during DB update.");
      }

      // Auto-update status to TAKEN if 0? 
      if (updatedPost.quantity === 0) {
        await tx.foodPost.update({
          where: { id: payload.postId },
          data: { status: "TAKEN" }
        });
      }

      return donation;
    });

    // 5. Success
    revalidatePath("/marketplace");
    revalidatePath(`/post/${payload.postId}`);
    revalidatePath("/profile/history");

    return { success: true, message: "Giải cứu thành công!", data: result };

  } catch (error: any) {
    // 6. Rollback Redis if DB fails
    console.error("CREATE_DONATION_ERROR:", error);
    await ReservationService.releaseItem(payload.postId, payload.quantity);

    return {
      success: false,
      message: error.message || "Lỗi hệ thống khi tạo đơn hàng."
    };
  }
}
