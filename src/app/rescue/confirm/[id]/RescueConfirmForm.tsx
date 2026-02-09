"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart, Loader2, MapPin, Truck } from "lucide-react";
import { rescueFood } from "@/lib/actions/rescue";
import { useRouter } from "next/navigation";

interface RescueConfirmFormProps {
  post: any;
}

export default function RescueConfirmForm({ post }: RescueConfirmFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [method, setMethod] = useState<"PICKUP" | "DELIVERY">("PICKUP");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const originalPrice = post.originalPrice || 0;
  const rescuePrice = post.rescuePrice || 0;

  const handleIncrement = () => {
    if (quantity < post.quantity) setQuantity(q => q + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(q => q - 1);
  };

  const handleConfirm = async () => {
    if (method === "DELIVERY" && (!address || !phone)) {
      setError("Vui lòng nhập đầy đủ địa chỉ và số điện thoại.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const result = await rescueFood(post.id, quantity, method, address, phone);

    if (result?.error) {
      setError(result.error);
      setIsSubmitting(false);
    } else {
      router.push(`/rescue/success/${result.donationId}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-base sm:text-lg font-black text-slate-900">
          Xác nhận đơn hàng
        </h3>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          Hoàn tất bước giải cứu
        </p>
      </div>

      {/* Quantity */}
      <div className="space-y-4">
        <div className="flex justify-between text-[11px] font-bold uppercase text-slate-500">
          <span>Số lượng</span>
          <span className="text-emerald-600">Còn {post.quantity} suất</span>
        </div>

        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <button
            onClick={handleDecrement}
            disabled={quantity <= 1}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-50 disabled:opacity-30"
          >
            <Minus size={18} />
          </button>

          <div className="text-3xl font-black tabular-nums">
            {quantity}
          </div>

          <button
            onClick={handleIncrement}
            disabled={quantity >= post.quantity}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-50 disabled:opacity-30"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Method */}
      <div className="space-y-2">
        <p className="text-[11px] font-bold uppercase text-slate-500">
          Phương thức nhận
        </p>

        {[
          { id: "PICKUP", label: "Tự đến lấy", icon: MapPin },
          { id: "DELIVERY", label: "Giao tận nhà", icon: Truck },
        ].map(opt => (
          <button
            key={opt.id}
            onClick={() => setMethod(opt.id as any)}
            className={`w-full flex items-center gap-4 py-3 rounded-xl text-left px-3
              ${method === opt.id ? "bg-slate-50" : "hover:bg-slate-50/50"}`}
          >
            <div className={`w-2 h-2 rounded-full ${method === opt.id ? "bg-mint-primary" : "bg-slate-200"}`} />
            <span className="flex-1 text-xs font-bold">
              {opt.label}
            </span>
            <opt.icon size={14} />
          </button>
        ))}
      </div>

      {/* Delivery info */}
      {method === "DELIVERY" && (
        <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
          <input
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Địa chỉ giao hàng"
            className="w-full border-b border-slate-200 py-2 text-sm focus:outline-none focus:border-mint-primary"
          />
          <input
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="Số điện thoại"
            className="w-full border-b border-slate-200 py-2 text-sm focus:outline-none focus:border-mint-primary"
          />
        </div>
      )}

      {/* Summary */}
      <div className="space-y-4 pt-6 border-t border-slate-100">
        <div className="space-y-2 text-sm font-bold">
          <div className="flex justify-between text-slate-500">
            <span>Tạm tính</span>
            <span>{(originalPrice * quantity).toLocaleString()}đ</span>
          </div>

          <div className="flex justify-between text-red-500">
            <span>Tiết kiệm</span>
            <span>-{((originalPrice - rescuePrice) * quantity).toLocaleString()}đ</span>
          </div>

          <div className="flex justify-between text-base font-black pt-3">
            <span>Tổng cộng</span>
            <span className="italic">
              {(rescuePrice * quantity).toLocaleString()}đ
            </span>
          </div>
        </div>

        {error && (
          <p className="text-xs font-bold text-red-500 text-center">
            {error}
          </p>
        )}

        <button
          onClick={handleConfirm}
          disabled={isSubmitting || post.quantity === 0}
          className="w-full h-14 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 disabled:opacity-30"
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : <ShoppingCart size={14} />}
          Xác nhận giải cứu
        </button>
      </div>
    </div>
  );
}
