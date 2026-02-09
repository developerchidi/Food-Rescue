"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home, MessageCircle } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#fdfcf8] flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 pt-28 pb-20 relative overflow-hidden">
        {/* Decorative rings – ẩn bớt trên mobile */}
        <div className="hidden sm:block absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-peach-accent/10 rounded-full" />
        <div className="hidden sm:block absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] border border-peach-accent/5 rounded-full" />

        <div className="relative z-10 w-full max-w-xl text-center">
          {/* Icon */}
          <div className="mx-auto mb-8 w-20 h-20 sm:w-24 sm:h-24 bg-peach-accent/10 rounded-3xl flex items-center justify-center text-peach-deep animate-bounce">
            <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Ops! <span className="text-peach-deep">Có lỗi xảy ra</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-500 mb-8 leading-relaxed max-w-md mx-auto italic">
            Hệ thống đang gặp một chút sự cố kỹ thuật. Đội ngũ giải cứu của chúng tôi
            đã được thông báo và đang xử lý.
          </p>

          {/* Error code */}
          <div className="bg-white border border-slate-100 rounded-2xl px-6 py-4 mb-10 shadow-sm max-w-sm mx-auto">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              Mã lỗi hệ thống
            </p>
            <code className="text-xs font-mono text-peach-deep bg-peach-accent/5 px-3 py-1 rounded-full inline-block">
              {error.digest || "INTERNAL_SERVER_ERROR"}
            </code>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="h-14 px-8 bg-peach-deep text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-peach-accent transition active:scale-95 shadow-lg shadow-peach-deep/20"
            >
              <RefreshCw size={18} />
              Thử lại
            </button>

            <Link
              href="/"
              className="h-14 px-8 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-slate-800 transition active:scale-95"
            >
              <Home size={18} />
              Trang chủ
            </Link>
          </div>

          {/* Support */}
          <div className="mt-12 pt-6 border-t border-slate-100">
            <p className="text-slate-400 text-sm font-semibold flex items-center justify-center gap-2 italic">
              <MessageCircle size={16} />
              Vẫn gặp lỗi?
              <Link href="/contact" className="text-peach-deep hover:underline">
                Liên hệ hỗ trợ
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
