"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fdfcf8] flex flex-col">
      {/* Có thể bật Navbar nếu muốn đồng bộ layout */}
      {/* <Navbar /> */}

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 pt-28 pb-20 relative overflow-hidden">
        {/* Background blur – giảm kích thước trên mobile */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-mint-primary/5 rounded-full blur-[100px] -z-0 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-peach-accent/5 rounded-full blur-[100px] -z-0 animate-pulse delay-1000" />

        <div className="relative z-10 w-full max-w-xl text-center">
          {/* 404 */}
          <div className="mb-8 sm:mb-12 relative inline-block">
            <div className="text-[120px] sm:text-[180px] font-black text-slate-900/5 leading-none select-none tracking-tighter">
              404
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tight italic">
            Món quà này{" "}
            <span className="text-mint-primary">bị thất lạc</span> rồi!
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg font-medium text-slate-500 mb-10 leading-relaxed italic max-w-md mx-auto">
            Có vẻ như trang bạn đang tìm kiếm đã được giải cứu bởi một ai đó,
            hoặc đường dẫn đã thay đổi.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="h-14 px-8 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-slate-800 transition active:scale-95 shadow-lg shadow-slate-900/10 w-full sm:w-auto"
            >
              <Home size={18} />
              Trang chủ
            </Link>

            <button
              onClick={() => window.history.back()}
              className="h-14 px-8 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:border-mint-primary hover:text-mint-darker transition active:scale-95 w-full sm:w-auto"
            >
              <ArrowLeft size={18} />
              Quay lại
            </button>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
