"use client";

import MerchantTopbar from "@/components/layout/merchant/MerchantTopbar";
import { createFoodPost } from "@/actions/merchant-actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Package } from "lucide-react";
import Image from "next/image";

export default function CreateFoodPostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    originalPrice: "",
    rescuePrice: "",
    quantity: "1",
    expiryDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData((prev) => ({
          ...prev,
          imageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate required fields
    if (!formData.title || !formData.rescuePrice || !formData.expiryDate) {
      setError("Vui lòng điền đầy đủ các trường bắt buộc");
      setLoading(false);
      return;
    }

    const result = await createFoodPost({
      ...formData,
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      rescuePrice: parseFloat(formData.rescuePrice),
      quantity: parseInt(formData.quantity),
    });

    if (result.success) {
      router.push("/merchant/posts");
    } else {
      setError(result.error || "Không thể tạo bài đăng");
    }

    setLoading(false);
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <div className="px-6 md:px-8 pb-12">
      <MerchantTopbar
        title="Đăng thực phẩm mới"
        subtitle="Chia sẻ thực phẩm dư thừa với cộng đồng"
      />

      <div className="max-w-2xl mx-auto mt-8">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-900">Lỗi</h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 p-8 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3">
              Hình ảnh
            </label>
            <div className="relative">
              {imagePreview ? (
                <div className="relative w-full h-48 rounded-xl overflow-hidden bg-slate-100">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData((prev) => ({
                        ...prev,
                        imageUrl: "",
                      }));
                    }}
                    className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-lg text-xs font-bold hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <div className="text-center">
                    <Package className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm font-bold text-slate-600">
                      Tải lên hình ảnh thực phẩm
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">
              Tên thực phẩm *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Ví dụ: Cơm gà chiên, Pizza nguyên cánh..."
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-primary font-medium"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">
              Mô tả chi tiết
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Mô tả thực phẩm, thành phần, điều kiện bảo quản..."
              rows={4}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-primary font-medium"
            />
          </div>

          {/* Prices Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Original Price */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Giá gốc (tuỳ chọn)
              </label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    originalPrice: e.target.value,
                  }))
                }
                placeholder="50000"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-primary font-medium"
              />
            </div>

            {/* Rescue Price */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Giá giải cứu * (đ)
              </label>
              <input
                type="number"
                value={formData.rescuePrice}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    rescuePrice: e.target.value,
                  }))
                }
                placeholder="15000"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-primary font-medium"
              />
            </div>
          </div>

          {/* Quantity and Expiry */}
          <div className="grid grid-cols-2 gap-4">
            {/* Quantity */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Số lượng *
              </label>
              <input
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, quantity: e.target.value }))
                }
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-primary font-medium"
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Hết hạn * (ngày)
              </label>
              <input
                type="datetime-local"
                value={formData.expiryDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    expiryDate: e.target.value,
                  }))
                }
                min={new Date().toISOString().slice(0, 16)}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-primary font-medium"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 bg-slate-100 text-slate-900 rounded-lg font-bold hover:bg-slate-200 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-mint-primary text-slate-900 rounded-lg font-bold hover:bg-mint-darker transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Đang tải..." : "Đăng bài"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
