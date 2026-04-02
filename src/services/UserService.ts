import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary";
import { User, UserRole } from "@prisma/client";

export class UserService {
  static async createUser(data: {
    email: string;
    name?: string;
    role: UserRole;
    latitude?: number;
    longitude?: number;
  }): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  static async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  static async updateUserPoints(id: string, points: number) {
    return prisma.user.update({
      where: { id },
      data: {
        points: {
          increment: points,
        },
      },
    });
  }

  static async getDonorsNear(lat: number, lng: number, radiusKm: number = 10) {
    // Basic implementation for now (can be optimized with PostGIS later)
    return prisma.user.findMany({
      where: {
        role: UserRole.DONOR,
      },
    });
  }

  static async updateProfile(data: {
    userId: string;
    name?: string;
    latitude?: number;
    longitude?: number;
    avatarBase64?: string;
  }): Promise<User & { avatarUrl?: string | null }> {
    let avatarUrl: string | null = null;

    if (data.avatarBase64) {
      const uploadResult = await uploadImage(data.avatarBase64, "avatars");

      if (!uploadResult.success || !uploadResult.url) {
        throw new Error(uploadResult.error || "Không thể tải ảnh đại diện lên.");
      }

      avatarUrl = uploadResult.url;
    }

    const user = await prisma.user.update({
      where: { id: data.userId },
      data: {
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.latitude !== undefined ? { latitude: data.latitude } : {}),
        ...(data.longitude !== undefined ? { longitude: data.longitude } : {}),
      },
    });

    return {
      ...user,
      avatarUrl,
    };
  }
}
