"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  BarChart3,
  LogOut,
  Leaf,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/cn";

export default function MerchantSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      href: "/merchant",
      label: "Dashboard",
      icon: LayoutDashboard,
      description: "Tổng quan",
    },
    {
      href: "/merchant/posts",
      label: "Bài đăng của tôi",
      icon: Package,
      description: "Quản lý thực phẩm",
    },
    {
      href: "/merchant/donations",
      label: "Lời yêu cầu",
      icon: ShoppingCart,
      description: "Lượt giải cứu",
    },
    {
      href: "/merchant/scanner",
      label: "Quét mã QR",
      icon: BarChart3,
      description: "Xác nhận giao dịch",
    },
    {
      href: "/merchant/settings",
      label: "Cài đặt",
      icon: Settings,
      description: "Thông tin tài khoản",
    },
  ];

  const isActive = (href: string) => {
    if (href === "/merchant") {
      return pathname === "/merchant";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-slate-900 text-white border-r border-slate-800 pt-24 flex flex-col z-40">
      {/* Logo Section */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-mint-primary rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-slate-900" />
          </div>
          <span className="font-black text-lg tracking-tight">FoodRescue</span>
        </div>
        <p className="text-[11px] text-slate-400 font-medium">Merchant Dashboard</p>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                active
                  ? "bg-mint-primary text-slate-900 shadow-lg shadow-mint-primary/20"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon className={cn("w-5 h-5", active && "text-slate-900")} />
              <div className="flex-1">
                <p className="text-sm font-bold">{item.label}</p>
                <p className="text-[10px] text-slate-400 group-hover:text-slate-300">
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Logout Section */}
      <div className="px-3 pb-6 border-t border-slate-800 pt-4">
        <button
          onClick={() => signOut({ redirectTo: "/" })}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-red-900/20 hover:text-red-400 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-bold">Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}
