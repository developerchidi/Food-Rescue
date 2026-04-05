"use client";

import Link from "next/link";
import { Search, Home, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fdfcf8] flex flex-col">
      {/* <Navbar /> */}

      <main className="flex-grow flex items-center justify-center py-32 px-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mint-primary/5 rounded-full blur-[100px] -z-0 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-peach-accent/5 rounded-full blur-[100px] -z-0 animate-pulse delay-1000"></div>

        <div className="max-w-2xl w-full text-center relative z-10">
          <div className="mb-12 relative inline-block">
            <div className="text-[180px] font-black text-slate-900/5 leading-none select-none tracking-tighter">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              {/* <div className="w-32 h-32 bg-white rounded-[2.5rem] shadow-2xl shadow-mint-primary/10 flex items-center justify-center border border-mint-primary/10 rotate-12">
                <Search size={64} className="text-mint-darker" />
              </div> */}
            </div>
          </div>

          <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tighter italic">
            Món quà này <span className="text-mint-primary">bị thất lạc</span> rồi!
          </h1>

          <p className="text-xl font-medium text-slate-500 mb-12 leading-relaxed italic max-w-lg mx-auto">
            "Có vẻ như trang bạn đang tìm kiếm đã được giải cứu bởi một ai đó, hoặc đường dẫn đã thay đổi."
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="px-10 h-16 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-900/10 w-full sm:w-auto"
            >
              <Home size={18} />
              Về trang chủ
            </Link>

            <button
              onClick={() => window.history.back()}
              className="px-10 h-16 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:border-mint-primary hover:text-mint-darker transition-all active:scale-95 w-full sm:w-auto"
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
