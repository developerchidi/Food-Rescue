import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Store,
  Phone,
  MapPin,
  Clock,
  BadgeCheck,
  Globe,
  Image as ImageIcon,
  ShieldCheck,
  Truck,
  Mail,
} from "lucide-react";

export default function MerchantSettingsPage() {
  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      <Navbar />

      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-mint-primary/30 rounded-full blur-3xl" />
        <div className="absolute top-40 -left-20 w-64 h-64 bg-peach-accent/40 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-mint-primary/20 flex items-center justify-center text-mint-darker">
                    <Store size={28} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Cửa hàng của bạn
                    </p>
                    <h3 className="text-lg font-black text-slate-900">Green Bowl Kitchen</h3>
                    <p className="text-sm text-slate-500">Donor • Hoạt động</p>
                  </div>
                </div>
                <div className="mt-6 space-y-3 text-sm font-medium text-slate-600">
                  <div className="flex items-center gap-3">
                    <BadgeCheck className="text-emerald-500" size={18} />
                    <span>Đã xác minh thông tin</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-mint-darker" size={18} />
                    <span>Tin cậy cao với người dùng</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="text-orange-primary" size={18} />
                    <span>Hỗ trợ giao hàng nội thành</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Hình ảnh cửa hàng
                </p>
                <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 h-40 flex flex-col items-center justify-center text-slate-400 gap-2">
                  <ImageIcon size={24} />
                  <span className="text-xs font-bold">Tải lên ảnh đại diện</span>
                </div>
                <button className="mt-4 w-full h-11 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em]">
                  Tải hình mới
                </button>
              </div>
            </aside>

            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Store className="text-mint-darker" size={20} />
                  <h2 className="text-lg font-black text-slate-900">Thông tin cơ bản</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tên cửa hàng</label>
                    <input
                      className="w-full h-12 px-4 rounded-2xl border border-slate-200 focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 outline-none"
                      placeholder="Ví dụ: Green Bowl Kitchen"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loại hình</label>
                    <input
                      className="w-full h-12 px-4 rounded-2xl border border-slate-200 focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 outline-none"
                      placeholder="Nhà hàng, siêu thị, bakery..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email liên hệ</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                      <input
                        className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200 focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 outline-none"
                        placeholder="contact@cuahang.vn"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Số điện thoại</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                      <input
                        className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200 focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 outline-none"
                        placeholder="0909 000 000"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mô tả ngắn</label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 outline-none"
                      placeholder="Giới thiệu ngắn về cửa hàng, điểm mạnh và cam kết của bạn"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="text-mint-darker" size={20} />
                  <h2 className="text-lg font-black text-slate-900">Địa chỉ và bản đồ</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Địa chỉ đầy đủ</label>
                    <input
                      className="w-full h-12 px-4 rounded-2xl border border-slate-200 focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 outline-none"
                      placeholder="Số nhà, đường, quận, thành phố"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Thành phố</label>
                    <input
                      className="w-full h-12 px-4 rounded-2xl border border-slate-200 focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 outline-none"
                      placeholder="TP. Hồ Chí Minh"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mã bưu điện</label>
                    <input
                      className="w-full h-12 px-4 rounded-2xl border border-slate-200 focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 outline-none"
                      placeholder="700000"
                    />
                  </div>
                  <div className="md:col-span-2 rounded-2xl border border-slate-100 bg-slate-50 h-48 flex items-center justify-center text-slate-400 text-sm font-medium">
                    Khu vực bản đồ sẽ được hiển thị ở đây
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="text-mint-darker" size={20} />
                  <h2 className="text-lg font-black text-slate-900">Giờ hoạt động</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mở cửa</label>
                    <input
                      className="w-full h-12 px-4 rounded-2xl border border-slate-200 focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 outline-none"
                      placeholder="07:00"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Đóng cửa</label>
                    <input
                      className="w-full h-12 px-4 rounded-2xl border border-slate-200 focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 outline-none"
                      placeholder="22:00"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ngày hoạt động</label>
                    <input
                      className="w-full h-12 px-4 rounded-2xl border border-slate-200 focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 outline-none"
                      placeholder="Thứ 2 - Chủ nhật"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="text-mint-darker" size={20} />
                  <h2 className="text-lg font-black text-slate-900">Liên kết & giao nhận</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Website</label>
                    <input
                      className="w-full h-12 px-4 rounded-2xl border border-slate-200 focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 outline-none"
                      placeholder="https://cuahang.vn"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Facebook</label>
                    <input
                      className="w-full h-12 px-4 rounded-2xl border border-slate-200 focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 outline-none"
                      placeholder="fb.com/cuahang"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hướng dẫn nhận hàng</label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 outline-none"
                      placeholder="Mô tả ngắn quy trình nhận hàng, yêu cầu xuất trình mã QR..."
                    />
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-3 text-xs font-bold text-slate-500">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint-primary/10 text-mint-darker">
                    Vận chuyển nội thành
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-primary/10 text-orange-primary">
                    Giao trong 2 giờ
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-end gap-4">
            <button className="h-12 px-6 rounded-2xl border border-mint-primary/30 text-mint-darker font-bold hover:bg-emerald-50 transition-all">
              Xem hồ sơ công khai
            </button>
            <button className="h-12 px-8 rounded-2xl bg-mint-darker text-white font-bold hover:shadow-lg hover:shadow-mint-darker/30 transition-all">
              Lưu thay đổi
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
