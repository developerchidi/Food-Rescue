"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Store,
  MapPin,
  Phone,
  FileText,
  ImagePlus,
  Save,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { updateUserProfile, type UserProfileDto } from "@/actions/profile-actions";

const phoneRe = /^(0|\+84)(\d{9})$/;

export const MerchantProfileSchema = z.object({
  storeName: z
    .string()
    .trim()
    .min(2, "Tên cửa hàng phải có ít nhất 2 ký tự")
    .max(100, "Tên cửa hàng tối đa 100 ký tự"),
  description: z.string().max(500, "Mô tả tối đa 500 ký tự"),
  address: z.string().max(255, "Địa chỉ tối đa 255 ký tự"),
  phone: z
    .string()
    .trim()
    .refine((v) => v === "" || phoneRe.test(v), {
      message: "Số điện thoại không hợp lệ (VD: 0901234567).",
    }),
});

type MerchantProfileInput = z.infer<typeof MerchantProfileSchema>;

type ToastState = {
  type: "success" | "error";
  message: string;
} | null;

function mapProfileToDefaults(p: UserProfileDto | null): MerchantProfileInput {
  if (!p) {
    return {
      storeName: "",
      description: "",
      address: "",
      phone: "",
    };
  }
  return {
    storeName: (p.name ?? "").trim(),
    description: (p.bio ?? "").trim(),
    address: (p.address ?? "").trim(),
    phone: (p.phone ?? "").trim(),
  };
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(new Error("Đọc file thất bại"));
    r.readAsDataURL(file);
  });
}

interface MerchantProfileFormProps {
  profile: UserProfileDto | null;
}

export default function MerchantProfileForm({ profile }: MerchantProfileFormProps) {
  const [toast, setToast] = useState<ToastState>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    profile?.avatarUrl ?? null
  );

  const defaults = useMemo(() => mapProfileToDefaults(profile), [profile]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MerchantProfileInput>({
    resolver: zodResolver(MerchantProfileSchema),
    mode: "onChange",
    values: defaults,
  });

  const onPickAvatar = (file?: File) => {
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (values: MerchantProfileInput) => {
    try {
      let avatarBase64: string | undefined;
      if (avatarFile) {
        avatarBase64 = await fileToDataUrl(avatarFile);
      }

      const result = await updateUserProfile({
        name: values.storeName.trim(),
        bio: values.description.trim() || undefined,
        address: values.address.trim() || undefined,
        phone: values.phone.trim() || undefined,
        avatarBase64,
        currentAvatarPublicId: profile?.avatarPublicId ?? undefined,
        removeAvatar: false,
      });

      if (!result.success) {
        setToast({
          type: "error",
          message: result.message || "Lưu thất bại",
        });
        setTimeout(() => setToast(null), 3500);
        return;
      }

      setAvatarFile(null);
      const payload = result.data as
        | { message?: string; user?: UserProfileDto }
        | undefined;
      if (payload?.user) {
        reset(mapProfileToDefaults(payload.user));
        setAvatarPreview(payload.user.avatarUrl ?? null);
      }

      setToast({ type: "success", message: result.message || "Đã lưu hồ sơ" });
      setTimeout(() => setToast(null), 2500);
    } catch {
      setToast({ type: "error", message: "Lưu thất bại, vui lòng thử lại" });
      setTimeout(() => setToast(null), 3500);
    }
  };

  const toastClass = useMemo(() => {
    if (!toast) return "";
    return toast.type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : "border-red-200 bg-red-50 text-red-700";
  }, [toast]);

  return (
    <div className="space-y-6">
      {profile === null && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 flex items-center gap-3 text-amber-900">
          <AlertTriangle size={18} />
          <p className="text-sm font-bold">
            Không tải được hồ sơ từ máy chủ. Kiểm tra Backend đang chạy và đăng nhập lại.
          </p>
        </div>
      )}

      {toast && (
        <div className={`rounded-2xl border px-4 py-3 flex items-center gap-3 ${toastClass}`}>
          {toast.type === "success" ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
          <p className="text-sm font-bold">{toast.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <section className="bg-white rounded-3xl border border-emerald-100 p-6 md:p-8 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-[#1f2d2a]">Thông tin cơ bản</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-[#35544a] flex items-center gap-2">
                <Store size={16} className="text-mint-darker" /> Tên cửa hàng
              </label>
              <input
                {...register("storeName")}
                className="w-full rounded-xl border border-emerald-200 px-4 py-3 text-sm outline-none focus:border-mint-darker"
                placeholder="Nhập tên cửa hàng"
              />
              {errors.storeName && (
                <p className="text-xs font-bold text-red-500">{errors.storeName.message}</p>
              )}
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-[#35544a] flex items-center gap-2">
                <FileText size={16} className="text-mint-darker" /> Mô tả
              </label>
              <textarea
                {...register("description")}
                rows={4}
                className="w-full rounded-xl border border-emerald-200 px-4 py-3 text-sm outline-none focus:border-mint-darker resize-none"
                placeholder="Mô tả ngắn về cửa hàng"
              />
              {errors.description && (
                <p className="text-xs font-bold text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#35544a] flex items-center gap-2">
                <MapPin size={16} className="text-mint-darker" /> Địa chỉ
              </label>
              <input
                {...register("address")}
                className="w-full rounded-xl border border-emerald-200 px-4 py-3 text-sm outline-none focus:border-mint-darker"
                placeholder="Nhập địa chỉ cửa hàng"
              />
              {errors.address && (
                <p className="text-xs font-bold text-red-500">{errors.address.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#35544a] flex items-center gap-2">
                <Phone size={16} className="text-mint-darker" /> Số điện thoại
              </label>
              <input
                {...register("phone")}
                className="w-full rounded-xl border border-emerald-200 px-4 py-3 text-sm outline-none focus:border-mint-darker"
                placeholder="Ví dụ: 0901234567"
              />
              {errors.phone && (
                <p className="text-xs font-bold text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white rounded-3xl border border-emerald-100 p-6 md:p-8 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-[#1f2d2a]">Avatar cửa hàng</h2>
          <p className="text-xs font-medium text-[#5e7f74]">
            Ảnh được tải lên Cloudinary rồi lưu URL trên máy chủ. Banner sẽ được bổ sung sau.
          </p>

          <div className="max-w-sm space-y-3">
            <label className="cursor-pointer block">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onPickAvatar(e.target.files?.[0])}
              />
              <div className="rounded-2xl border border-dashed border-emerald-300 p-4 hover:bg-emerald-50 transition-colors">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar"
                    className="w-28 h-28 rounded-2xl object-cover mx-auto"
                  />
                ) : (
                  <div className="h-28 flex flex-col items-center justify-center text-[#5e7f74] gap-2">
                    <ImagePlus size={22} />
                    <p className="text-xs font-bold">Chọn ảnh avatar</p>
                  </div>
                )}
              </div>
            </label>
          </div>
        </section>

        <button
          type="submit"
          disabled={isSubmitting || profile === null}
          className="inline-flex items-center gap-2 rounded-xl bg-mint-darker text-white px-6 py-3 text-sm font-black hover:opacity-90 disabled:opacity-60 transition-opacity"
        >
          <Save size={16} />
          {isSubmitting ? "Đang lưu..." : "Lưu thông tin"}
        </button>
      </form>
    </div>
  );
}
