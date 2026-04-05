"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Store, MapPin, Phone, FileText, ImagePlus, Save, CheckCircle2, AlertTriangle } from "lucide-react";

// TODO: Replace this with shared schema import when Backend ships it.
// Example: import { ProfileSchema } from "@shared/schemas/profile";
export const ProfileSchema = z.object({
  storeName: z
    .string()
    .min(2, "Tên cửa hàng phải có ít nhất 2 ký tự")
    .max(80, "Tên cửa hàng tối đa 80 ký tự"),
  description: z
    .string()
    .min(20, "Mô tả phải có ít nhất 20 ký tự")
    .max(500, "Mô tả tối đa 500 ký tự"),
  address: z
    .string()
    .min(8, "Địa chỉ phải có ít nhất 8 ký tự")
    .max(200, "Địa chỉ tối đa 200 ký tự"),
  phone: z
    .string()
    .regex(/^(0|\+84)[0-9]{9,10}$/, "Số điện thoại không hợp lệ"),
});

type MerchantProfileInput = z.infer<typeof ProfileSchema>;

type ToastState = {
  type: "success" | "error";
  message: string;
} | null;

const defaultValues: MerchantProfileInput = {
  storeName: "Merchant Demo Store",
  description:
    "Cửa hàng chuyên cung cấp thực phẩm chất lượng với cam kết giảm lãng phí và tăng giá trị cho cộng đồng địa phương.",
  address: "123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
  phone: "0901234567",
};

export default function MerchantProfileForm() {
  const [toast, setToast] = useState<ToastState>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MerchantProfileInput>({
    resolver: zodResolver(ProfileSchema),
    mode: "onChange",
    defaultValues,
  });

  const onPickAvatar = (file?: File) => {
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
  };

  const onPickBanner = (file?: File) => {
    if (!file) return;
    setBannerPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (_values: MerchantProfileInput) => {
    try {
      // TODO: Connect API call when profile endpoint is available.
      await new Promise((resolve) => setTimeout(resolve, 700));
      setToast({ type: "success", message: "Lưu hồ sơ cửa hàng thành công" });
    } catch {
      setToast({ type: "error", message: "Lưu thất bại, vui lòng thử lại" });
    }

    setTimeout(() => setToast(null), 2500);
  };

  const toastClass = useMemo(() => {
    if (!toast) return "";
    return toast.type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : "border-red-200 bg-red-50 text-red-700";
  }, [toast]);

  return (
    <div className="space-y-6">
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
              {errors.storeName && <p className="text-xs font-bold text-red-500">{errors.storeName.message}</p>}
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
              {errors.description && <p className="text-xs font-bold text-red-500">{errors.description.message}</p>}
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
              {errors.address && <p className="text-xs font-bold text-red-500">{errors.address.message}</p>}
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
              {errors.phone && <p className="text-xs font-bold text-red-500">{errors.phone.message}</p>}
            </div>
          </div>
        </section>

        <section className="bg-white rounded-3xl border border-emerald-100 p-6 md:p-8 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-[#1f2d2a]">Avatar / Banner</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="text-sm font-bold text-[#35544a]">Avatar cửa hàng</p>
              <label className="cursor-pointer block">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onPickAvatar(e.target.files?.[0])}
                />
                <div className="rounded-2xl border border-dashed border-emerald-300 p-4 hover:bg-emerald-50 transition-colors">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar preview" className="w-28 h-28 rounded-2xl object-cover mx-auto" />
                  ) : (
                    <div className="h-28 flex flex-col items-center justify-center text-[#5e7f74] gap-2">
                      <ImagePlus size={22} />
                      <p className="text-xs font-bold">Chọn ảnh avatar và xem trước</p>
                    </div>
                  )}
                </div>
              </label>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-bold text-[#35544a]">Banner cửa hàng</p>
              <label className="cursor-pointer block">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onPickBanner(e.target.files?.[0])}
                />
                <div className="rounded-2xl border border-dashed border-emerald-300 p-4 hover:bg-emerald-50 transition-colors">
                  {bannerPreview ? (
                    <img src={bannerPreview} alt="Banner preview" className="w-full h-28 rounded-2xl object-cover" />
                  ) : (
                    <div className="h-28 flex flex-col items-center justify-center text-[#5e7f74] gap-2">
                      <ImagePlus size={22} />
                      <p className="text-xs font-bold">Chọn ảnh banner và xem trước</p>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-xl bg-mint-darker text-white px-6 py-3 text-sm font-black hover:opacity-90 disabled:opacity-60 transition-opacity"
        >
          <Save size={16} />
          {isSubmitting ? "Đang lưu..." : "Lưu thông tin"}
        </button>
      </form>
    </div>
  );
}
