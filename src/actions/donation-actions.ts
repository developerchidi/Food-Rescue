"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { type RescueInput, RescueSchema } from "@/lib/validators/donations";
import { generateSecureQRToken } from "@/lib/qr";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function createDonation(data: RescueInput) {
  try {
    // 1. Auth check
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Bạn cần đăng nhập để thực hiện chức năng này." };
    }

    const userId = session.user.id;

    // 2. Validate input
    const validatedFields = RescueSchema.safeParse(data);
    if (!validatedFields.success) {
      return { error: "Dữ liệu không hợp lệ.", fields: validatedFields.error.flatten().fieldErrors };
    }

    const { postId, quantity, fulfillmentMethod, address, phone } = validatedFields.data;

    // 3. Atomic Transaction: Check quantity, decrement, and create record
    const donation = await prisma.$transaction(async (tx) => {
      // Lock and get post
      const post = await tx.foodPost.findUnique({
        where: { id: postId },
      });

      if (!post) {
        throw new Error("Bài viết không tồn tại.");
      }

      if (post.status !== "AVAILABLE") {
        throw new Error("Món ăn này không còn khả dụng.");
      }

      const currentDate = new Date();
      if (post.expiryDate < currentDate) {
        throw new Error("Món ăn đã hết hạn.");
      }

      if (post.quantity < quantity) {
        throw new Error(`Chỉ còn lại ${post.quantity} suất.`);
      }

      // Generate Secure QR Token
      const qrToken = await generateSecureQRToken();

      // Decrement quantity
      const updatedPost = await tx.foodPost.update({
        where: { id: postId },
        data: {
          quantity: { decrement: quantity },
          // If quantity becomes 0, mark as PENDING (or TAKEN depending on logic, but usually we wait for pickup)
          // For now, let's keep it AVAILABLE but 0 quantity, logic elsewhere handles display
          status: post.quantity - quantity === 0 ? "TAKEN" : "AVAILABLE",
        },
      });

      // Create Donation
      const newDonation = await tx.donation.create({
        data: {
          postId,
          receiverId: userId,
          quantity,
          fulfillmentMethod,
          deliveryAddress: address,
          deliveryPhone: phone,
          status: "REQUESTED",
          qrCode: qrToken,
        },
      });

      return newDonation;
    });

    // 4. Revalidate
    revalidatePath("/marketplace");
    revalidatePath(`/marketplace/${postId}`);
    revalidatePath("/donations");

    return { success: true, donationId: donation.id };

  } catch (error) {
    console.error("Donation error:", error);
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Đã có lỗi xảy ra. Vui lòng thử lại sau." };
  }
}
