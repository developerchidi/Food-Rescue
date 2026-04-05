"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-3" : "py-6"}`}
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-6">
        <div className="glass-nav rounded-3xl px-8 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-sage focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-primary"
          >
            Food<span className="text-mint-primary">Rescue</span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/"
              className="text-[15px] font-medium hover:text-mint-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-primary"
            >
              Trang chủ
            </Link>
            <Link
              href="/marketplace"
              className="text-[15px] font-medium hover:text-mint-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-primary"
            >
              Khám phá
            </Link>
            <Link
              href="/orders"
              className="text-[15px] font-medium hover:text-mint-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-primary"
            >
              Đơn hàng
            </Link>
            <Link
              href="/#map"
              className="text-[15px] font-medium hover:text-mint-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-primary"
            >
              Bản đồ
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {status === "authenticated" ? (
              <div className="flex items-center gap-4">
                <div
                  className="flex items-center gap-2 px-4 py-2 bg-mint-primary/10 rounded-2xl border border-mint-primary/20"
                  aria-label="User profile"
                >
                  <div className="w-8 h-8 rounded-full bg-mint-darker flex items-center justify-center text-white">
                    <User size={18} />
                  </div>
                  <span className="text-sm font-bold text-mint-darker hidden sm:block">
                    {session.user?.name || "Người dùng"}
                  </span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-foreground/40 hover:bg-red-50 hover:text-red-500 transition-all active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                  title="Đăng xuất"
                  aria-label="Sign out"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-[15px] font-bold px-8 py-3 bg-[#009975] text-white rounded-full hover:shadow-lg hover:shadow-[#009975]/20 transition-all active:scale-95 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#009975]"
                aria-label="Log in"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
