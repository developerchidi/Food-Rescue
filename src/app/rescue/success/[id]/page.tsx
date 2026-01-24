import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import QRCodeDisplay from "@/components/features/marketplace/QRCodeDisplay";
import { CheckCircle2, MapPin, Clock, ArrowLeft, Phone, Info, Truck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface SuccessPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RescueSuccessPage({ params }: SuccessPageProps) {
  const session = await auth();
  const { id } = await params;

  if (!session?.user?.id) {
    redirect("/login");
  }

  const donation = await prisma.donation.findUnique({
    where: { id },
    include: {
      post: {
        include: {
          donor: true,
        },
      },
    },
  });

  if (!donation) {
    notFound();
  }

  // Security Check: Only the receiver can view their success page
  if (donation.receiverId !== session.user.id) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-6">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-12 hover:text-mint-darker transition-colors"
          >
            <ArrowLeft size={14} />
            Quay lại chợ thực phẩm
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            {/* Left Column: Success Message & Product Info */}
            <div className="lg:col-span-7 space-y-16 animate-in fade-in slide-in-from-bottom-3 duration-500">
              <section className="space-y-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-mint-primary">
                    <CheckCircle2 size={32} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Thanh toán hoàn tất</span>
                  </div>
                  <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none italic">
                    Giải cứu <span className="text-mint-primary">thành công!</span>
                  </h1>
                  <p className="text-base font-medium text-slate-500 leading-relaxed max-w-xl italic">
                    "Cảm ơn bạn đã chung tay bảo vệ môi trường và giảm thiểu lãng phí thực phẩm cho cộng đồng."
                  </p>
                </div>

                {/* Product Summary Card - Minimalist */}
                <div className="flex gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100 group">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                    <Image
                      src={donation.post.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"}
                      alt={donation.post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-grow py-1 space-y-1">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{donation.post.title}</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Số lượng: <span className="text-slate-900">{donation.quantity} suất</span></p>
                    <p className="text-sm font-black text-mint-darker italic pt-2">{(donation.post.rescuePrice! * donation.quantity).toLocaleString()}đ</p>
                  </div>
                </div>

                {/* Logistics Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-slate-100">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Địa điểm lấy hàng</h4>
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-mint-primary mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-sm font-black text-slate-900 leading-tight">{donation.post.donor.name}</p>
                        <p className="text-[11px] font-bold text-slate-400">Vui lòng kiểm tra địa chỉ trên bản đồ trước khi đi.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Thời hạn lấy món</h4>
                    <div className="flex items-start gap-3">
                      <Clock size={18} className="text-mint-primary mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-sm font-black text-slate-900 leading-tight">
                          {new Date(donation.post.expiryDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(donation.post.expiryDate).toLocaleDateString('vi-VN')}
                        </p>
                        <p className="text-[11px] font-bold text-red-400/80 uppercase">Vui lòng lấy trước thời gian này</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Minimal Note */}
              <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-100 flex gap-4 items-start">
                <Info className="text-amber-500 shrink-0 mt-0.5" size={18} />
                <p className="text-xs font-bold text-slate-600 leading-relaxed">
                  <span className="text-amber-700 font-black uppercase tracking-wider">Lưu ý quan trọng:</span> {donation.fulfillmentMethod === "DELIVERY"
                    ? "Đối tác sẽ sớm liên hệ với bạn để giao hàng. Hãy đảm bảo điện thoại của bạn luôn trong trạng thái có thể liên lạc được."
                    : "Hãy xuất trình mã QR bên cạnh cho đối tác khi nhận hàng. Món ăn của bạn đang chờ được \"giải cứu\" đúng hẹn."}
                </p>
              </div>
            </div>

            {/* Right Column: QR Code / Tracking Section */}
            <aside className="lg:col-span-5 sticky top-32 animate-in fade-in slide-in-from-right-3 duration-700 space-y-10">
              <div className="bg-white rounded-2xl border border-slate-100 p-10 space-y-10">
                <div className="text-center space-y-1">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
                    {donation.fulfillmentMethod === "DELIVERY" ? "Thông tin vận chuyển" : "Mã nhận hàng của bạn"}
                  </h3>
                  <div className="w-12 h-1 bg-mint-primary mx-auto rounded-full mt-4" />
                </div>

                <div className="flex flex-col items-center gap-8">
                  {donation.fulfillmentMethod === "DELIVERY" ? (
                    <div className="space-y-8 text-center py-4">
                      <div className="w-28 h-28 bg-slate-50 rounded-full flex items-center justify-center mx-auto border border-slate-100">
                        <Truck size={40} className="text-slate-200" />
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-xl font-black text-slate-900 italic tracking-tighter">Đang chờ xác nhận...</h4>
                        <p className="text-xs font-bold text-slate-400 leading-relaxed max-w-[240px] mx-auto">Đối tác đang xử lý thông tin giao hàng và sẽ liên hệ với bạn trong giây lát.</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <QRCodeDisplay value={donation.qrCode || donation.id} />
                      <div className="text-center">
                        <p className="text-4xl font-black text-slate-900 tracking-[0.5em] tabular-nums italic">
                          {donation.qrCode?.split('-').pop()?.toUpperCase() || id.slice(-6).toUpperCase()}
                        </p>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mt-4">Code định danh giải cứu</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-4 pt-10 border-t border-slate-50">
                  <button className="w-full h-14 bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">
                    <Phone size={14} />
                    Liên hệ {donation.fulfillmentMethod === "DELIVERY" ? "Đối tác giao hàng" : "Người cho thực phẩm"}
                  </button>
                  <p className="text-[9px] text-center text-slate-300 font-bold uppercase tracking-[0.1em] select-none">
                    ID Giao dịch: <span className="text-slate-200">{donation.id}</span>
                  </p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-[10px] font-black text-slate-200 uppercase tracking-[0.3em] italic">
                  #GiảiCứuThựcPhẩm #FoodRescueSuccess
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
