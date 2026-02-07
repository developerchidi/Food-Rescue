"use client";

import MerchantTopbar from "@/components/layout/merchant/MerchantTopbar";
import { useSession } from "next-auth/react";
import { Bell, Mail, Phone, MapPin, Shield, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function MerchantSettingsPage() {
  const { data: session } = useSession();
  const [saving, setSaving] = useState(false);

  const handleLogout = () => {
    if (confirm("Bạn chắc chắn muốn đăng xuất?")) {
      signOut({ redirectTo: "/login" });
    }
  };

  return (
    <div className="px-6 md:px-8">
      <MerchantTopbar
        title="Cài đặt"
        subtitle="Quản lý thông tin tài khoản và cài đặt hệ thống"
      />

      <div className="max-w-2xl mt-8 space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl border border-slate-100 p-8">
          <h2 className="text-xl font-black text-slate-900 mb-6">
            Thông tin tài khoản
          </h2>

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Tên
              </label>
              <input
                type="text"
                value={session?.user?.name || ""}
                disabled
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium disabled:opacity-75"
              />
              <p className="text-xs text-slate-500 mt-1">
                Liên hệ admin để thay đổi tên
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                value={session?.user?.email || ""}
                disabled
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium disabled:opacity-75"
              />
            </div>

            {/* Role Badge */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Vai trò
              </label>
              <div className="px-4 py-3 bg-mint-primary/10 border border-mint-primary/20 rounded-lg">
                <span className="font-bold text-mint-darker">Nhà cho (Merchant)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-2xl border border-slate-100 p-8">
          <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
            <Bell className="w-6 h-6 text-mint-primary" />
            Thông báo
          </h2>

          <div className="space-y-4">
            {[
              { label: "Thông báo lời yêu cầu mới", enabled: true },
              { label: "Cập nhật trạng thái đơn hàng", enabled: true },
              { label: "Thông báo email", enabled: false },
              { label: "Thông báo quảng cáo", enabled: false },
            ].map((notif) => (
              <label
                key={notif.label}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <input type="checkbox" defaultChecked={notif.enabled} />
                <span className="font-medium text-slate-900">{notif.label}</span>
              </label>
            ))}
          </div>

          <button
            onClick={() => setSaving(true)}
            disabled={saving}
            className="mt-6 w-full px-4 py-3 bg-mint-primary text-slate-900 font-bold rounded-lg hover:bg-mint-darker transition-colors disabled:opacity-50"
          >
            {saving ? "Đang lưu..." : "Lưu cài đặt"}
          </button>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl border border-slate-100 p-8">
          <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-orange-primary" />
            An toàn
          </h2>

          <div className="space-y-4">
            <div>
              <p className="font-medium text-slate-900 mb-2">Đổi mật khẩu</p>
              <p className="text-sm text-slate-600 mb-4">
                Thay đổi mật khẩu để bảo vệ tài khoản
              </p>
              <button className="px-4 py-2 bg-slate-100 text-slate-900 rounded-lg font-bold hover:bg-slate-200 transition-colors text-sm">
                Đổi mật khẩu
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-2xl border-2 border-red-200 p-8">
          <h2 className="text-xl font-black text-red-900 mb-6">Vùng nguy hiểm</h2>

          <div className="space-y-4">
            <div>
              <p className="font-medium text-red-900 mb-2">Đăng xuất</p>
              <p className="text-sm text-red-700 mb-4">
                Đăng xuất khỏi tài khoản trên thiết bị này
              </p>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
                Đăng xuất
              </button>
            </div>

            <hr className="border-red-200" />

            <div>
              <p className="font-medium text-red-900 mb-2">Xóa tài khoản</p>
              <p className="text-sm text-red-700 mb-4">
                Xóa vĩnh viễn tất cả dữ liệu. Hành động này không thể hoàn tác.
              </p>
              <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors text-sm">
                Xóa tài khoản vĩnh viễn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
