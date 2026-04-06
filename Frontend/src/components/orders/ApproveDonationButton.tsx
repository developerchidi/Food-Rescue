"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { approveDonationAction } from "@/actions/donation-actions";
import { CheckCircle } from "lucide-react";

type Props = {
  donationId: string;
  className?: string;
};

export default function ApproveDonationButton({
  donationId,
  className = "",
}: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setPending(true);
    setError(null);
    const result = await approveDonationAction(donationId);
    setPending(false);
    if (!result.ok) {
      setError(result.message);
    } else {
      router.refresh();
    }
  }

  return (
    <div className="space-y-1">
      <button
        type="button"
        disabled={pending}
        onClick={handleClick}
        className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[#009975] px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-white shadow-md transition-opacity hover:opacity-95 disabled:opacity-50 ${className}`}
      >
        <CheckCircle className="h-4 w-4 shrink-0" />
        {pending ? "Đang xử lý…" : "Duyệt đơn"}
      </button>
      {error ? (
        <p className="text-xs font-bold text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
