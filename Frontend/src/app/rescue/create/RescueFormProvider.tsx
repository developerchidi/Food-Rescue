"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, ImagePlus, Loader2 } from "lucide-react";
import { createFoodPost } from "@/actions/post-actions";
import { uploadImageAction } from "@/actions/upload-actions";
import { useRouter } from "next/navigation";

type FoodType = "INDIVIDUAL" | "MYSTERY_BOX";

export default function RescueFormProvider() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "INDIVIDUAL" as FoodType,
    originalPrice: "",
    rescuePrice: "",
    quantity: 1,
    expiryDate: "",
    image: null as File | null,
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("Không thể đọc file ảnh."));
      reader.readAsDataURL(file);
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "quantity"
          ? Number(value)
          : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, image: e.target.files?.[0] || null });
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);

    if (
      Number(form.rescuePrice) >= Number(form.originalPrice)
    ) {
      setError("Giá cứu phải nhỏ hơn giá gốc.");
      return;
    }

    if (new Date(form.expiryDate) <= new Date()) {
      setError("Thời gian hết hạn không hợp lệ.");
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl: string | undefined;

      if (form.image) {
        const base64Image = await fileToBase64(form.image);
        const uploadResult = await uploadImageAction(base64Image, "posts");

        if (!uploadResult.success) {
          setError(uploadResult.error || "Không thể tải ảnh lên Cloudinary.");
          return;
        }

        imageUrl = uploadResult.url;
      }

      const result = await createFoodPost({
        title: form.title,
        description: form.description || undefined,
        type: form.type,
        originalPrice: Number(form.originalPrice || 0),
        rescuePrice: Number(form.rescuePrice || 0),
        quantity: form.quantity,
        expiryDate: new Date(form.expiryDate),
        imageUrl,
      });

      if (!result.success) {
        setError(result.message || "Không thể tạo bài đăng.");
        return;
      }

      setSuccess("Đăng bài thành công. Ảnh đã được tải lên Cloudinary.");
      router.push("/marketplace");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi khi đăng bài.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bento-card bg-white">
      {/* Progress */}
      <div className="flex justify-between mb-6">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`flex-1 h-1 mx-1 rounded-full ${
              step >= s ? "bg-mint-darker" : "bg-mint-light"
            }`}
          />
        ))}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">🥗 Thông tin món ăn</h2>

          <input
            name="title"
            placeholder="Tên món"
            title="Tên món"
            aria-label="Tên món"
            value={form.title}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 rounded-xl border"
          />

          <textarea
            name="description"
            placeholder="Mô tả ngắn"
            title="Mô tả ngắn"
            aria-label="Mô tả ngắn"
            value={form.description}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 rounded-xl border"
          />

          <select
            name="type"
            title="Loại món"
            aria-label="Loại món"
            value={form.type}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border"
          >
            <option value="INDIVIDUAL">🍱 Món cụ thể</option>
            <option value="MYSTERY_BOX">🎁 Hộp bí ẩn</option>
          </select>
        </section>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">💰 Giá & số lượng</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              name="originalPrice"
              type="number"
              placeholder="Giá gốc"
              title="Giá gốc"
              aria-label="Giá gốc"
              value={form.originalPrice}
              onChange={handleChange}
              className="px-4 py-3 rounded-xl border"
            />
            <input
              name="rescuePrice"
              type="number"
              placeholder="Giá cứu"
              title="Giá cứu"
              aria-label="Giá cứu"
              value={form.rescuePrice}
              onChange={handleChange}
              className="px-4 py-3 rounded-xl border"
            />
          </div>

          <input
            name="quantity"
            type="number"
            min={1}
            title="Số lượng"
            aria-label="Số lượng"
            value={form.quantity}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border"
          />
        </section>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">⏰ Thời hạn & hình ảnh</h2>

          <input
            name="expiryDate"
            type="datetime-local"
            title="Thời hạn hết hạn"
            aria-label="Thời hạn hết hạn"
            value={form.expiryDate}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 rounded-xl border"
          />

          <label className="flex items-center gap-3 cursor-pointer text-sage">
            <ImagePlus />
            <span>{form.image ? form.image.name : "Chọn hình ảnh"}</span>
            <input
              type="file"
              hidden
              accept="image/*"
              title="Chọn hình ảnh"
              aria-label="Chọn hình ảnh"
              onChange={handleFileChange}
            />
          </label>
          <p className="mt-3 text-xs text-foreground/50">
            Ảnh sẽ được tải lên Cloudinary khi bạn bấm đăng bài.
          </p>
        </section>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">✅ Xác nhận</h2>

          <ul className="text-sm space-y-2">
            <li><b>Món:</b> {form.title}</li>
            <li><b>Loại:</b> {form.type}</li>
            <li><b>Giá gốc:</b> {form.originalPrice}</li>
            <li><b>Giá cứu:</b> {form.rescuePrice}</li>
            <li><b>Số lượng:</b> {form.quantity}</li>
            <li><b>Hết hạn:</b> {form.expiryDate}</li>
          </ul>
        </section>
      )}

      {(error || success) && (
        <div className={`mt-6 rounded-xl px-4 py-3 text-sm ${error ? "bg-red-50 text-red-700 border border-red-200" : "bg-green-50 text-green-700 border border-green-200"}`}>
          {error || success}
        </div>
      )}

      {/* ACTIONS */}
      <div className="flex justify-between mt-8">
        {step > 1 ? (
          <button
            onClick={prevStep}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border"
          >
            <ArrowLeft size={18} /> Quay lại
          </button>
        ) : <div />}

        {step < 4 ? (
          <button
            onClick={nextStep}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-mint-darker text-white"
          >
            Tiếp tục <ArrowRight size={18} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-3 rounded-xl bg-orange-primary text-white disabled:opacity-70 flex items-center gap-2"
          >
            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : null}
            {isSubmitting ? "Đang đăng..." : "Đăng bài"}
          </button>
        )}
      </div>
    </div>
  );
}
