"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// Validation schemas
const CreateFoodPostSchema = z.object({
  title: z.string().min(3, "Tiêu đề phải có ít nhất 3 ký tự"),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  originalPrice: z.number().positive().optional(),
  rescuePrice: z.number().positive(),
  quantity: z.number().int().positive().min(1),
  expiryDate: z.string().datetime(),
});

const UpdateDonationStatusSchema = z.object({
  donationId: z.string(),
  status: z.enum(["APPROVED", "COMPLETED", "CANCELLED"]),
});

const VerifyQRSchema = z.object({
  qrCode: z.string().min(1),
});

export type CreateFoodPostInput = z.infer<typeof CreateFoodPostSchema>;
export type UpdateDonationStatusInput = z.infer<typeof UpdateDonationStatusSchema>;

// Get merchant's food posts
export async function getMerchantPosts() {
  try {
    const session = await auth();
    const userRole = (session?.user as any)?.role;
    if (!session?.user?.id || userRole !== "DONOR") {
      return { error: "Unauthorized" };
    }

    const posts = await prisma.foodPost.findMany({
      where: {
        donorId: session.user.id,
      },
      include: {
        donations: {
          select: {
            id: true,
            quantity: true,
            status: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, posts };
  } catch (error) {
    console.error("Get posts error:", error);
    return { error: "Failed to fetch posts" };
  }
}

// Create new food post
export async function createFoodPost(data: CreateFoodPostInput) {
  try {
    const session = await auth();
    const userRole = (session?.user as any)?.role;
    if (!session?.user?.id || userRole !== "DONOR") {
      return { error: "Bạn phải là nhà cho để đăng thực phẩm" };
    }

    const validated = CreateFoodPostSchema.safeParse(data);
    if (!validated.success) {
      return {
        error: "Dữ liệu không hợp lệ",
        fields: validated.error.flatten().fieldErrors,
      };
    }

    const post = await prisma.foodPost.create({
      data: {
        ...validated.data,
        donorId: session.user.id,
        expiryDate: new Date(validated.data.expiryDate),
      },
    });

    revalidatePath("/merchant/posts");
    return { success: true, postId: post.id };
  } catch (error) {
    console.error("Create post error:", error);
    return { error: "Failed to create post" };
  }
}

// Update food post
export async function updateFoodPost(
  postId: string,
  data: Partial<CreateFoodPostInput>
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    // Check ownership
    const post = await prisma.foodPost.findUnique({
      where: { id: postId },
    });

    if (!post || post.donorId !== session.user.id) {
      return { error: "Bạn không có quyền chỉnh sửa bài đăng này" };
    }

    const updated = await prisma.foodPost.update({
      where: { id: postId },
      data: {
        ...data,
        expiryDate: data.expiryDate
          ? new Date(data.expiryDate)
          : undefined,
      },
    });

    revalidatePath("/merchant/posts");
    return { success: true, post: updated };
  } catch (error) {
    console.error("Update post error:", error);
    return { error: "Không thể cập nhật bài đăng" };
  }
}

// Delete food post
export async function deleteFoodPost(postId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    const post = await prisma.foodPost.findUnique({
      where: { id: postId },
    });

    if (!post || post.donorId !== session.user.id) {
      return { error: "Bạn không có quyền xóa bài đăng này" };
    }

    await prisma.foodPost.delete({
      where: { id: postId },
    });

    revalidatePath("/merchant/posts");
    return { success: true };
  } catch (error) {
    console.error("Delete post error:", error);
    return { error: "Không thể xóa bài đăng" };
  }
}

// Get merchant's donations (requests)
export async function getMerchantDonations() {
  try {
    const session = await auth();
    const userRole = (session?.user as any)?.role;
    if (!session?.user?.id || userRole !== "DONOR") {
      return { error: "Unauthorized" };
    }

    const donations = await prisma.donation.findMany({
      where: {
        post: {
          donorId: session.user.id,
        },
      },
      include: {
        post: {
          select: {
            id: true,
            title: true,
            imageUrl: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, donations };
  } catch (error) {
    console.error("Get donations error:", error);
    return { error: "Failed to fetch donations" };
  }
}

// Update donation status
export async function updateDonationStatus(
  donationId: string,
  status: "APPROVED" | "COMPLETED" | "CANCELLED"
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    // Check merchant owns this post
    const donation = await prisma.donation.findUnique({
      where: { id: donationId },
      include: {
        post: true,
      },
    });

    if (!donation || donation.post.donorId !== session.user.id) {
      return { error: "Không có quyền cập nhật đơn này" };
    }

    const updated = await prisma.donation.update({
      where: { id: donationId },
      data: { status },
    });

    revalidatePath("/merchant/donations");
    return { success: true, donation: updated };
  } catch (error) {
    console.error("Update donation status error:", error);
    return { error: "Không thể cập nhật trạng thái" };
  }
}

// Verify QR code and get donation details
export async function verifyQRCode(qrCode: string) {
  try {
    const session = await auth();
    const userRole = (session?.user as any)?.role;
    if (!session?.user?.id || userRole !== "DONOR") {
      return { error: "Unauthorized" };
    }

    const donation = await prisma.donation.findUnique({
      where: { qrCode },
      include: {
        post: true,
        receiver: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!donation) {
      return { error: "Mã QR không hợp lệ" };
    }

    // Check merchant owns this post
    if (donation.post.donorId !== session.user.id) {
      return { error: "Mã QR này không thuộc về bạn" };
    }

    return { success: true, donation };
  } catch (error) {
    console.error("Verify QR error:", error);
    return { error: "Không thể xác thực mã QR" };
  }
}

// Get merchant dashboard stats
export async function getMerchantStats() {
  try {
    const session = await auth();
    const userRole = (session?.user as any)?.role;
    if (!session?.user?.id || userRole !== "DONOR") {
      return { error: "Unauthorized" };
    }

    const [totalPosts, activePosts, totalDonations, completedDonations] =
      await Promise.all([
        prisma.foodPost.count({
          where: { donorId: session.user.id },
        }),
        prisma.foodPost.count({
          where: {
            donorId: session.user.id,
            status: "AVAILABLE",
          },
        }),
        prisma.donation.count({
          where: {
            post: { donorId: session.user.id },
          },
        }),
        prisma.donation.count({
          where: {
            post: { donorId: session.user.id },
            status: "COMPLETED",
          },
        }),
      ]);

    const totalRevenue = await prisma.donation.aggregate({
      where: {
        post: { donorId: session.user.id },
        status: "COMPLETED",
      },
      _sum: {
        post: {
          rescuePrice: true,
        },
      },
    });

    return {
      success: true,
      stats: {
        totalPosts,
        activePosts,
        totalDonations,
        completedDonations,
        // totalRevenue: (totalRevenue._sum.post as any)?.rescuePrice || 0,
      },
    };
  } catch (error) {
    console.error("Get stats error:", error);
    return { error: "Failed to fetch stats" };
  }
}
