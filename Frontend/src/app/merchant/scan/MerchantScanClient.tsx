"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import useQRScanner from "@/hooks/useQRScanner";
import { verifyDonationQR } from "@/actions/qr-actions";
import { CheckCircle2, QrCode, TriangleAlert } from "lucide-react";

export default function MerchantScanClient() {
  const regionId = "merchant-qr-scan-region";
  const [result, setResult] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);
  const busyRef = useRef(false);

  const onScanSuccess = useCallback(async (decodedText: string) => {
    if (busyRef.current) return;
    busyRef.current = true;
    const token = decodedText.trim();
    const out = await verifyDonationQR(token);
    setResult({
      ok: out.success,
      message: out.message,
    });
    busyRef.current = false;
  }, []);

  const onScanError = useCallback(() => {
    /* html5-qrcode noise — ignore */
  }, []);

  useQRScanner(regionId, onScanSuccess, onScanError);

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <div className="rounded-3xl border border-emerald-100 bg-white p-4 shadow-xl">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-900">
          <div id={regionId} className="h-full w-full" />
          <div
            className="pointer-events-none absolute inset-6 rounded-2xl border-2 border-emerald-400/80"
            aria-hidden
          />
        </div>
        <p className="mt-4 text-center text-xs font-bold text-[#6a877d]">
          Hướng camera vào mã QR trên điện thoại khách. Đơn phải đã «Duyệt đơn» trong
          Đơn shop trước — nếu chưa, hệ thống sẽ báo lỗi.
        </p>
      </div>

      {result && (
        <div
          className={`flex gap-4 rounded-2xl border p-5 ${
            result.ok
              ? "border-emerald-200 bg-emerald-50/80"
              : "border-red-100 bg-red-50/80"
          }`}
          role="status"
        >
          {result.ok ? (
            <CheckCircle2 className="h-8 w-8 shrink-0 text-emerald-600" />
          ) : (
            <TriangleAlert className="h-8 w-8 shrink-0 text-red-500" />
          )}
          <p className="text-sm font-bold text-[#1f2d2a]">{result.message}</p>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/merchant/orders"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-bold text-[#1f2d2a] shadow-sm hover:bg-emerald-50"
        >
          <QrCode className="h-4 w-4" />
          Danh sách đơn
        </Link>
        <Link
          href="/merchant/dashboard"
          className="inline-flex items-center justify-center rounded-full bg-[#009975] px-6 py-3 text-sm font-bold text-white shadow-lg hover:shadow-[#009975]/25"
        >
          Về dashboard
        </Link>
      </div>
    </div>
  );
}
