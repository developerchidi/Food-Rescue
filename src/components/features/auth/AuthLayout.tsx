import { Leaf } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#fdfcf8]">
      {/* LEFT – Chỉ hiện trên desktop */}
      <div className="hidden lg:flex lg:w-1/2 bg-mint-darker relative p-16 flex-col justify-between overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-peach-accent opacity-10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white relative z-10 transition-transform hover:scale-105 w-fit"
        >
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-mint-darker shadow-lg">
            <Leaf size={24} />
          </div>
          <span className="text-2xl font-black tracking-tight">
            FoodRescue
          </span>
        </Link>

        {/* Message */}
        <div className="relative z-10">
          <h2 className="text-5xl font-black text-white leading-tight mb-8">
            Cùng nhau <br />
            hành động vì <br />
            môi trường
          </h2>
          <p className="text-white/70 text-lg max-w-md leading-relaxed">
            Hợp tác để giảm thiểu lãng phí thực phẩm và mang đến những bữa ăn
            ý nghĩa cho cộng đồng.
          </p>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10">
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="text-mint-primary">
                ★
              </span>
            ))}
          </div>
          <p className="text-white text-lg font-medium italic mb-4">
            "Nền tảng tuyệt vời nhất để tôi có thể đóng góp một phần nhỏ bé của
            mình vào việc bảo vệ hành tinh."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-mint-primary rounded-full" />
            <div>
              <div className="text-white font-bold">Minh Anh</div>
              <div className="text-white/50 text-sm">
                Cộng tác viên môi trường
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT – Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-12 py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
