"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type VerifyQRResult = {
  success: boolean;
  message: string;
  data?: any;
};

export async function verifyDonationQR(token: string): Promise<VerifyQRResult> {
  const session = await auth();

  // 1. Check Auth
  if (!session || !session.user || !session.user.id) {
    return { success: false, message: "Bạn cần đăng nhập để thực hiện thao tác này." };
  }

  const merchantId = session.user.id;

  if (!token) {
    return { success: false, message: "Mã QR không hợp lệ." };
  }

  try {
    // 2. Find Donation by QR Token
    const donation = await prisma.donation.findUnique({
      where: { qrCode: token },
      include: {
        post: true, // Include post to check donorId
        receiver: true, // Include receiver to show info
      },
    });

    // 3. Validate existence
    if (!donation) {
      return { success: false, message: "Không tìm thấy đơn hàng tương ứng với mã QR này." };
    }

    // 4. Validate Ownership (Security: Only the merchant who posted can verify)
    if (donation.post.donorId !== merchantId) {
      return { success: false, message: "Bạn không có quyền xác thực đơn hàng này." };
    }

    // 5. Validate Status
    if (donation.status === "COMPLETED") {
      return { success: false, message: "Đơn hàng này đã được xác thực trước đó." };
    }

    if (donation.status === "CANCELLED") {
      return { success: false, message: "Đơn hàng này đã bị hủy." };
    }

    // Allow REQUESTED or APPROVED or PENDING to be verifying
    // For now, let's assume REQUESTED is the main state.

    // 6. Update Status
    const updatedDonation = await prisma.donation.update({
      where: { id: donation.id },
      data: {
        status: "COMPLETED",
        updatedAt: new Date(),
      },
    });

    // 7. Revalidate
    revalidatePath("/marketplace");
    revalidatePath("/manage/orders");

    return {
      success: true,
      message: "Xác thực thành công! Đơn hàng đã hoàn tất.",
      data: updatedDonation
    };

  } catch (error) {
    console.error("VERIFY_QR_ERROR:", error);
    return { success: false, message: "Lỗi hệ thống khi xác thực mã QR." };
  }
}
