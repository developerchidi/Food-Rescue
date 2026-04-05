"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart, Loader2, MapPin, Truck } from "lucide-react";
import { rescueFood } from "@/lib/actions/rescue";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

  const discount = post.originalPrice && post.rescuePrice
    ? Math.round(((post.originalPrice - post.rescuePrice) / post.originalPrice) * 100)
    : 0;

  const handleIncrement = () => {
    if (quantity < post.quantity) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleConfirm = async () => {
    if (method === "DELIVERY" && (!address || !phone)) {
      setError("Vui lòng nhập đầy đủ địa chỉ và số điện thoại để giao hàng.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const result = await rescueFood(post.id, quantity, method, address, phone);

    if (result.error) {
      setError(result.error);
      setIsSubmitting(false);
    } else {
      router.push(`/rescue/success/${result.donationId}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-8 space-y-10">
      <div className="space-y-1">
        <h3 className="text-lg font-black text-slate-900 tracking-tight">Xác nhận Đơn hàng</h3>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Hoàn tất bước giải cứu</p>
      </div>

      {/* Simplified Quantity */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-slate-500 px-1">
          <span>Số lượng suất</span>
          <span className="text-emerald-600 italic">Còn {post.quantity} suất</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-slate-100">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={quantity <= 1}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-50 disabled:opacity-20 transition-all text-slate-400"
          >
            <Minus size={18} />
          </button>
          <div className="text-3xl font-black text-slate-900 tabular-nums tracking-tighter">
            {quantity}
          </div>
          <button
            type="button"
            onClick={handleIncrement}
            disabled={quantity >= post.quantity}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-50 disabled:opacity-20 transition-all text-slate-400"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Minimal Method Selector */}
      <div className="space-y-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 px-1">Phương thức nhận</p>
        <div className="space-y-1">
          {[
            { id: "PICKUP", label: "Tự đến lấy", icon: MapPin },
            { id: "DELIVERY", label: "Giao tận nhà", icon: Truck }
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setMethod(opt.id as any)}
              className={`w-full flex items-center gap-4 py-3 px-1 rounded-xl transition-all text-left ${method === opt.id ? "bg-slate-50" : "hover:bg-slate-50/50"
                }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full transition-all ${method === opt.id ? "bg-mint-primary scale-150" : "bg-slate-100"}`} />
              <div className="flex-grow flex items-center justify-between">
                <span className={`text-xs font-bold ${method === opt.id ? "text-slate-900" : "text-slate-400"}`}>{opt.label}</span>
                <opt.icon size={14} className={method === opt.id ? "text-mint-primary" : "text-slate-200"} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Minimal Inputs */}
      {method === "DELIVERY" && (
        <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300 pt-2">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Địa chỉ giao hàng"
            className="w-full py-2 bg-transparent border-b border-slate-100 text-xs font-bold focus:outline-none focus:border-mint-primary transition-all placeholder:text-slate-200"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Số điện thoại"
            className="w-full py-2 bg-transparent border-b border-slate-100 text-xs font-bold focus:outline-none focus:border-mint-primary transition-all placeholder:text-slate-200"
          />
        </div>
      )}

      {/* Minimal Receipt */}
      <div className="pt-8 space-y-4">
        <div className="space-y-2 text-[11px] font-bold">
          <div className="flex justify-between items-center text-slate-500">
            <span>Tạm tính ({quantity} suất)</span>
            <span>{(post.originalPrice * quantity).toLocaleString()}đ</span>
          </div>
          <div className="flex justify-between items-center text-red-500/80">
            <span>Tiết kiệm giải cứu</span>
            <span>-{((post.originalPrice - post.rescuePrice) * quantity).toLocaleString()}đ</span>
          </div>
          <div className="flex justify-between items-center pt-4 text-sm text-slate-900 border-t border-slate-50">
            <span className="font-medium">Tổng cộng</span>
            <span className="text-xl font-black italic">{(post.rescuePrice * quantity).toLocaleString()}đ</span>
          </div>
        </div>

        {error && (
          <p className="text-[10px] font-bold text-red-500 text-center animate-pulse">{error}</p>
        )}

        <button
          onClick={handleConfirm}
          disabled={isSubmitting}
          className="w-full h-14 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all disabled:opacity-20 flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10"
        >
          {isSubmitting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              <ShoppingCart size={14} />
              Xác nhận giải cứu
            </>
          )}
        </button>
      </div>
    </div>
  );
}
