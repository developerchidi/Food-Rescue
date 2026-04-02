import { z } from "zod";

export const UpdateProfileSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, {
        message: "Họ tên phải có ít nhất 2 ký tự.",
      })
      .max(100, {
        message: "Họ tên không được quá 100 ký tự.",
      })
      .optional(),
    latitude: z.coerce
      .number({
        message: "Vĩ độ phải là một số.",
      })
      .min(-90, {
        message: "Vĩ độ không hợp lệ.",
      })
      .max(90, {
        message: "Vĩ độ không hợp lệ.",
      })
      .optional(),
    longitude: z.coerce
      .number({
        message: "Kinh độ phải là một số.",
      })
      .min(-180, {
        message: "Kinh độ không hợp lệ.",
      })
      .max(180, {
        message: "Kinh độ không hợp lệ.",
      })
      .optional(),
    avatarBase64: z
      .string()
      .trim()
      .startsWith("data:image/", {
        message: "Ảnh đại diện không hợp lệ.",
      })
      .optional(),
  })
  .refine(
    (data) =>
      data.name !== undefined ||
      data.latitude !== undefined ||
      data.longitude !== undefined ||
      data.avatarBase64 !== undefined,
    {
      message: "Vui lòng cung cấp ít nhất một trường để cập nhật.",
      path: ["name"],
    }
  );

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
