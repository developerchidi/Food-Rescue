"use client";

import AuthLayout from "@/components/features/auth/AuthLayout";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Đăng ký không thành công");
      }

      router.push("/login?success=Account created");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-10">
        <h1 className="text-4xl font-black text-[#2d3436] mb-3">Tạo tài khoản mới</h1>
        <p className="text-foreground/50 font-medium">Bắt đầu hành trình sống xanh của bạn ngay hôm nay.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold animate-shake">
            {error}
          </div>
        )}
        <div>
          <label className="block text-sm font-black text-[#2d3436] mb-2 px-1 text-left">Họ và Tên</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-mint-darker transition-colors">
              <User size={20} />
            </div>
            <input
              name="name"
              type="text"
              placeholder="Nguyễn Văn A"
              required
              className="w-full h-14 pl-12 pr-4 bg-white border border-black/5 rounded-2xl focus:outline-none focus:border-mint-primary focus:ring-4 focus:ring-mint-primary/10 transition-all font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-black text-[#2d3436] mb-2 px-1 text-left">Email</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-mint-darker transition-colors">
              <Mail size={20} />
            </div>
            <input
              name="email"
              type="email"
              placeholder="ten@ví-dụ.com"
              required
              className="w-full h-14 pl-12 pr-4 bg-white border border-black/5 rounded-2xl focus:outline-none focus:border-mint-primary focus:ring-4 focus:ring-mint-primary/10 transition-all font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-black text-[#2d3436] mb-2 px-1 text-left">Mật khẩu</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-mint-darker transition-colors">
              <Lock size={20} />
            </div>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full h-14 pl-12 pr-4 bg-white border border-black/5 rounded-2xl focus:outline-none focus:border-mint-primary focus:ring-4 focus:ring-mint-primary/10 transition-all font-medium"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 text-white font-black rounded-2xl shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 bg-mint-darker shadow-mint-darker/20 hover:shadow-mint-darker/30 disabled:opacity-50"
        >
          {loading ? "Đang xử lý..." : "Đăng ký tài khoản"}
          <ArrowRight size={20} />
        </button>
      </form>

      <p className="mt-10 text-center text-foreground/40 font-medium">
        Bạn đã có tài khoản?{" "}
        <Link href="/login" className="text-mint-darker font-black hover:underline">
          Đăng nhập
        </Link>
      </p>
    </AuthLayout>
  );
}
