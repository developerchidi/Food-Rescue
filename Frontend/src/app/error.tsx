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
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#fdfcf8] flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-32 px-6 relative overflow-hidden">
        {/* Background Decorative Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-peach-accent/10 rounded-full -z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-peach-accent/5 rounded-full -z-0"></div>

        <div className="max-w-2xl w-full text-center relative z-10">
          <div className="mb-10 inline-flex items-center justify-center w-24 h-24 bg-peach-accent/10 rounded-3xl text-peach-deep animate-bounce">
            <AlertTriangle size={48} />
          </div>

          <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tighter italic">
            Ops! <span className="text-peach-deep">Có lỗi xảy ra</span>
          </h1>

          <p className="text-xl font-medium text-slate-500 mb-10 leading-relaxed italic max-w-lg mx-auto">
            "Hệ thống đang gặp một chút sự cố kỹ thuật. Đội ngũ giải cứu của chúng tôi đã được thông báo và đang xử lý."
          </p>

          <div className="bg-white border border-slate-100 rounded-[2rem] p-6 mb-12 shadow-sm max-w-md mx-auto">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Mã lỗi hệ thống</p>
            <code className="text-xs font-mono text-peach-deep bg-peach-accent/5 px-3 py-1 rounded-full">
              {error.digest || "INTERNAL_SERVER_ERROR"}
            </code>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => reset()}
              className="px-10 h-16 bg-peach-deep text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-peach-accent transition-all active:scale-95 shadow-xl shadow-peach-deep/20 w-full sm:w-auto"
            >
              <RefreshCw size={18} />
              Thử lại ngay
            </button>

            <Link
              href="/"
              className="px-10 h-16 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-95 w-full sm:w-auto"
            >
              <Home size={18} />
              Về trang chủ
            </Link>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-100">
            <p className="text-slate-400 font-bold text-sm flex items-center justify-center gap-2 italic">
              <MessageCircle size={16} />
              Vẫn gặp sự cố? <Link href="/contact" className="text-peach-deep hover:underline">Liên hệ hỗ trợ</Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
