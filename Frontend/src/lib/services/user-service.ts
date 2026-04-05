import { deleteImage, uploadImage } from "@/lib/cloudinary";
import { fetchFromBackend } from "@/lib/proxy";
import type { UpdateProfileInput } from "@/lib/validators/profile";

type UpdateProfilePayload = Omit<UpdateProfileInput, "avatarBase64"> & {
  avatarUrl?: string | null;
  avatarPublicId?: string | null;
};

export const UserService = {
  async updateProfile(input: UpdateProfileInput) {
    let uploadedPublicId: string | null = null;

    try {
      const payload: UpdateProfilePayload = {
        name: input.name,
        phone: input.phone,
        address: input.address,
        bio: input.bio,
        removeAvatar: input.removeAvatar,
      };

      if (input.avatarBase64) {
        const uploadedAvatar = await uploadImage(input.avatarBase64, "avatars");
        if (!uploadedAvatar.success || !uploadedAvatar.url || !uploadedAvatar.publicId) {
          throw new Error(uploadedAvatar.error || "Không thể tải avatar lên.");
        }

        uploadedPublicId = uploadedAvatar.publicId;
        payload.avatarUrl = uploadedAvatar.url;
        payload.avatarPublicId = uploadedAvatar.publicId;

        if (input.currentAvatarPublicId && input.currentAvatarPublicId !== uploadedAvatar.publicId) {
          await deleteImage(input.currentAvatarPublicId);
        }
      } else if (input.removeAvatar) {
        payload.avatarUrl = null;
        payload.avatarPublicId = null;

        if (input.currentAvatarPublicId) {
          await deleteImage(input.currentAvatarPublicId);
        }
      }

      return await fetchFromBackend("/users/profile", {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
    } catch (error) {
      if (uploadedPublicId) {
        await deleteImage(uploadedPublicId);
      }
      throw error;
    }
  },
};
