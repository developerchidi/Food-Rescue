"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { completeReservation } from "@/lib/actions/rescue";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function ReservationCompleteButton({
  reservationId,
}: {
  reservationId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleComplete = async () => {
    setLoading(true);
    setError(null);
    const result = await completeReservation(reservationId);
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }
    if (result.donationId) {
      router.push(`/rescue/success/${result.donationId}`);
      router.refresh();
    }
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleComplete}
        disabled={loading}
        className="w-full h-14 bg-slate-900 text-white font-black text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-3 hover:bg-slate-800 disabled:opacity-50 transition-all shadow-xl shadow-slate-900/10"
      >
        {loading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <CheckCircle2 size={20} />
        )}
        {loading ? "Đang xử lý..." : "Hoàn tất đơn (trừ kho & tạo mã QR)"}
      </button>
      {error && (
        <p className="text-sm font-bold text-red-600 text-center">{error}</p>
      )}
    </div>
  );
}
