"use client";

import AuthLayout from "@/components/features/auth/AuthLayout";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState, Suspense } from "react";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const successMessage = searchParams.get("success");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Email hoặc mật khẩu không chính xác");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("Đã xảy ra lỗi không mong muốn");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-black text-[#2d3436] mb-3">Chào mừng trở lại!</h1>
        <p className="text-foreground/50 font-medium">Hãy đăng nhập để tiếp tục hành trình giải cứu của bạn.</p>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-mint-darker rounded-2xl text-sm font-bold">
          Đăng ký thành công! Hãy đăng nhập ngay.
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold">
          {error}
        </div>
      )}

      <div className="space-y-4 mb-8">
        <button className="w-full h-14 bg-white border border-black/5 rounded-2xl flex items-center justify-center gap-4 hover:bg-black/5 transition-all font-bold text-[#2d3436] shadow-sm">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
          Tiếp tục bằng Google
        </button>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="h-[1px] bg-black/5 flex-grow" />
        <span className="text-xs font-bold text-foreground/20 uppercase tracking-widest">Hoặc bằng Email</span>
        <div className="h-[1px] bg-black/5 flex-grow" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              className="w-full h-14 pl-12 pr-12 bg-white border border-black/5 rounded-2xl focus:outline-none focus:border-mint-primary focus:ring-4 focus:ring-mint-primary/10 transition-all font-medium"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/20 hover:text-mint-darker transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="text-right mt-3">
            <button type="button" className="text-sm font-bold text-mint-darker hover:underline">
              Quên mật khẩu?
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 bg-mint-darker text-white font-black rounded-2xl shadow-xl shadow-mint-darker/20 hover:shadow-2xl hover:shadow-mint-darker/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          <ArrowRight size={20} />
        </button>
      </form>

      <p className="mt-10 text-center text-foreground/40 font-medium">
        Bạn chưa có tài khoản?{" "}
        <Link href="/register" className="text-mint-darker font-black hover:underline">
          Đăng ký ngay
        </Link>
      </p>
    </>
  );
}

export default function LoginPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div className="p-8 text-center text-gray-500">Đang tải...</div>}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
