"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut, Menu, X } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="glass-nav rounded-3xl px-6 sm:px-8 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold tracking-tight text-sage"
          >
            Food<span className="text-mint-primary">Rescue</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {[
              { href: "/", label: "Trang chủ" },
              { href: "/marketplace", label: "Khám phá" },
              { href: "/orders", label: "Đơn hàng" },
              { href: "/#map", label: "Bản đồ" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[15px] font-medium hover:text-mint-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth + Mobile Button */}
          <div className="flex items-center gap-3">
            {/* Auth Desktop */}
            {status === "authenticated" ? (
              <div className="hidden sm:flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-mint-primary/10 rounded-2xl border border-mint-primary/20">
                  <div className="w-8 h-8 rounded-full bg-mint-darker flex items-center justify-center text-white">
                    <User size={18} />
                  </div>
                  <span className="text-sm font-bold text-mint-darker">
                    {session.user?.name || "Người dùng"}
                  </span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-foreground/40 hover:bg-red-50 hover:text-red-500 transition active:scale-95"
                  title="Đăng xuất"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex text-[14px] font-bold px-6 py-3 bg-mint-darker text-white rounded-full hover:shadow-lg hover:shadow-mint-darker/20 transition active:scale-95"
              >
                Đăng nhập
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 transition"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden mt-4 glass-nav rounded-3xl px-6 py-6 space-y-4 animate-fade-in">
            {[
              { href: "/", label: "Trang chủ" },
              { href: "/marketplace", label: "Khám phá" },
              { href: "/orders", label: "Đơn hàng" },
              { href: "/#map", label: "Bản đồ" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block text-base font-semibold text-slate-800 hover:text-mint-primary"
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-black/5">
              {status === "authenticated" ? (
                <button
                  onClick={() => {
                    setOpen(false);
                    signOut();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 text-red-600 font-bold"
                >
                  <LogOut size={18} />
                  Đăng xuất
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-center py-3 rounded-xl bg-mint-darker text-white font-bold"
                >
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
