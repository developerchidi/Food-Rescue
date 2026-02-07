"use client";

import React, { useState } from "react";
import { Bell, User, Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import MerchantSidebar from "./MerchantSidebar";

interface MerchantTopbarProps {
  title: string;
  subtitle?: string;
}

export default function MerchantTopbar({ title, subtitle }: MerchantTopbarProps) {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Desktop Topbar */}
      <header className="fixed top-0 left-0 right-0 h-24 bg-white border-b border-slate-100 z-50 hidden md:block">
        <div className="h-full flex items-center justify-between px-8 md:pl-72">
          {/* Title Section */}
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-slate-500 font-medium">{subtitle}</p>
            )}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Notification */}
            <button className="relative w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors group">
              <Bell className="w-5 h-5 text-slate-600 group-hover:text-slate-900 transition-colors" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-orange-primary rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-mint-primary/10 flex items-center justify-center">
                <span className="text-sm font-black text-mint-primary">
                  {session?.user?.name?.[0] || "M"}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-slate-900">
                  {session?.user?.name || "Merchant"}
                </p>
                <p className="text-xs text-slate-500 font-medium">Seller</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-100 z-50 md:hidden flex items-center justify-between px-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-slate-900" />
        </button>

        <h1 className="text-lg font-black text-slate-900">{title}</h1>

        <div className="flex items-center gap-2">
          <button className="relative w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200">
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-primary rounded-full"></span>
          </button>
          <button className="w-10 h-10 rounded-lg bg-mint-primary/10 flex items-center justify-center">
            <span className="text-xs font-black text-mint-primary">
              {session?.user?.name?.[0] || "M"}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden">
          <div className="fixed left-0 top-0 w-64 h-screen bg-slate-900">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <div className="pt-20">
              <MerchantSidebar />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
