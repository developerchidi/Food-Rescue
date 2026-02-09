import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import QRCodeDisplay from "@/components/features/marketplace/QRCodeDisplay";
import {CheckCircle2, MapPin,Clock,ArrowLeft,Phone,Info,Truck} from "lucide-react";
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

  if (!donation || donation.receiverId !== session.user.id) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 sm:pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Back */}
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-10 hover:text-mint-darker transition-colors"
          >
            <ArrowLeft size={14} />
            Quay lại chợ thực phẩm
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            {/* LEFT */}
            <div className="lg:col-span-7 space-y-14 animate-in fade-in slide-in-from-bottom-3 duration-500">
              {/* Success Header */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 text-mint-primary">
                  <CheckCircle2 size={28} />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                    Thanh toán hoàn tất
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none italic">
                  Giải cứu{" "}
                  <span className="text-mint-primary">thành công!</span>
                </h1>

                <p className="text-sm sm:text-base font-medium text-slate-500 leading-relaxed max-w-xl italic">
                  "Cảm ơn bạn đã chung tay bảo vệ môi trường và giảm thiểu lãng phí
                  thực phẩm cho cộng đồng."
                </p>
              </section>

              {/* Product Summary */}
              <div className="flex gap-4 sm:gap-6 p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                  <Image
                    src={
                      donation.post.imageUrl ||
                      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"
                    }
                    alt={donation.post.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-grow space-y-1">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    {donation.post.title}
                  </h3>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    Số lượng:{" "}
                    <span className="text-slate-900">
                      {donation.quantity} suất
                    </span>
                  </p>
                  <p className="text-base sm:text-lg font-black text-mint-darker italic pt-1">
                    {(donation.post.rescuePrice! * donation.quantity).toLocaleString()}đ
                  </p>
                </div>
              </div>

              {/* Logistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                    Địa điểm lấy hàng
                  </h4>
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-mint-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-black text-slate-900">
                        {donation.post.donor.name}
                      </p>
                      <p className="text-[11px] font-bold text-slate-400">
                        Vui lòng kiểm tra địa chỉ trên bản đồ trước khi đi.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                    Thời hạn lấy món
                  </h4>
                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-mint-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-black text-slate-900">
                        {new Date(donation.post.expiryDate).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        •{" "}
                        {new Date(donation.post.expiryDate).toLocaleDateString(
                          "vi-VN"
                        )}
                      </p>
                      <p className="text-[11px] font-bold text-red-400 uppercase">
                        Vui lòng lấy trước thời gian này
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/50 border border-amber-100 flex gap-4">
                <Info className="text-amber-500 mt-0.5" size={18} />
                <p className="text-xs font-bold text-slate-600 leading-relaxed">
                  <span className="text-amber-700 font-black uppercase tracking-wider">
                    Lưu ý:
                  </span>{" "}
                  {donation.fulfillmentMethod === "DELIVERY"
                    ? "Đối tác sẽ sớm liên hệ để giao hàng."
                    : "Hãy xuất trình mã QR khi nhận món."}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <aside className="lg:col-span-5 lg:sticky lg:top-32 space-y-10 animate-in fade-in slide-in-from-right-3 duration-700">
              <div className="bg-white rounded-2xl border border-slate-100 p-8 sm:p-10 space-y-10">
                <div className="text-center space-y-2">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
                    {donation.fulfillmentMethod === "DELIVERY"
                      ? "Thông tin vận chuyển"
                      : "Mã nhận hàng"}
                  </h3>
                  <div className="w-12 h-1 bg-mint-primary mx-auto rounded-full" />
                </div>

                {donation.fulfillmentMethod === "DELIVERY" ? (
                  <div className="text-center space-y-6 py-6">
                    <Truck size={40} className="mx-auto text-slate-300" />
                    <p className="text-sm font-bold text-slate-500">
                      Đang chờ đối tác xác nhận giao hàng
                    </p>
                  </div>
                ) : (
                  <>
                    <QRCodeDisplay value={donation.qrCode || donation.id} />
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-[0.3em] sm:tracking-[0.4em] lg:tracking-[0.5em] text-center italic">
                      {donation.qrCode?.split("-").pop()?.toUpperCase() ||
                        id.slice(-6).toUpperCase()}
                    </p>
                  </>
                )}

                <button className="w-full h-14 bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all">
                  <Phone size={14} />
                  Liên hệ đối tác
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
