"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cancelDonationAction } from "@/actions/donation-actions";
import { XCircle } from "lucide-react";

type Props = {
  donationId: string;
  variant?: "buyer" | "merchant";
  className?: string;
};

export default function CancelDonationButton({
  donationId,
  variant = "buyer",
  className = "",
}: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    const ok = window.confirm(
      variant === "merchant"
        ? "Hủy đơn này? Số lượng sẽ được hoàn lại vào bài đăng."
        : "Bạn chắc chắn muốn hủy đơn? Số lượng sẽ được hoàn lại cho cửa hàng."
    );
    if (!ok) return;

    setPending(true);
    setError(null);
    const result = await cancelDonationAction(donationId);
    setPending(false);
    if (!result.ok) {
      setError(result.message);
    } else {
      router.refresh();
    }
  }

  const base =
    variant === "merchant"
      ? "border border-red-100 bg-white text-red-700 hover:bg-red-50"
      : "border border-slate-200 bg-white text-slate-700 hover:bg-red-50 hover:border-red-100 hover:text-red-700";

  return (
    <div className="space-y-1">
      <button
        type="button"
        disabled={pending}
        onClick={handleClick}
        className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[10px] font-black uppercase tracking-wider transition-colors disabled:opacity-50 ${base} ${className}`}
      >
        <XCircle className="h-4 w-4 shrink-0" />
        {pending ? "Đang xử lý…" : "Hủy đơn"}
      </button>
      {error ? (
        <p className="text-xs font-bold text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
