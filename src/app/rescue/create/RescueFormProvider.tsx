"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, ImagePlus } from "lucide-react";

type FoodType = "INDIVIDUAL" | "MYSTERY_BOX";

export default function RescueFormProvider() {
  const [step, setStep] = useState(1);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    if (Number(form.rescuePrice) >= Number(form.originalPrice)) {
      alert("❌ Giá cứu phải nhỏ hơn giá gốc");
      return;
    }

    if (new Date(form.expiryDate) <= new Date()) {
      alert("❌ Thời gian hết hạn không hợp lệ");
      return;
    }

    console.log("POST DATA 👉", form);
    alert("🎉 Tạo bài đăng thành công (mock)");
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-sm">
      {/* Progress */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`flex-1 h-1 rounded-full transition ${
              step >= s ? "bg-mint-darker" : "bg-mint-light"
            }`}
          />
        ))}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">
            🥗 Thông tin món ăn
          </h2>

          <input
            name="title"
            placeholder="Tên món"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border text-sm sm:text-base"
          />

          <textarea
            name="description"
            placeholder="Mô tả ngắn"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border text-sm sm:text-base"
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border text-sm sm:text-base"
          >
            <option value="INDIVIDUAL">🍱 Món cụ thể</option>
            <option value="MYSTERY_BOX">🎁 Hộp bí ẩn</option>
          </select>
        </section>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">
            💰 Giá & số lượng
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="originalPrice"
              type="number"
              placeholder="Giá gốc"
              value={form.originalPrice}
              onChange={handleChange}
              className="px-4 py-3 rounded-xl border"
            />
            <input
              name="rescuePrice"
              type="number"
              placeholder="Giá cứu"
              value={form.rescuePrice}
              onChange={handleChange}
              className="px-4 py-3 rounded-xl border"
            />
          </div>

          <input
            name="quantity"
            type="number"
            min={1}
            value={form.quantity}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border"
          />
        </section>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">
            ⏰ Thời hạn & hình ảnh
          </h2>

          <input
            name="expiryDate"
            type="datetime-local"
            value={form.expiryDate}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border"
          />

          <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
            <ImagePlus />
            <span className="text-sm">
              {form.image ? form.image.name : "Chọn hình ảnh"}
            </span>
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) =>
                setForm({ ...form, image: e.target.files?.[0] || null })
              }
            />
          </label>
        </section>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-semibold">✅ Xác nhận</h2>

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

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between mt-8">
        {step > 1 ? (
          <button
            onClick={prevStep}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border"
          >
            <ArrowLeft size={18} /> Quay lại
          </button>
        ) : <div />}

        {step < 4 ? (
          <button
            onClick={nextStep}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-mint-darker text-white"
          >
            Tiếp tục <ArrowRight size={18} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-3 rounded-xl bg-orange-primary text-white"
          >
            Đăng bài
          </button>
        )}
      </div>
    </div>
  );
}
