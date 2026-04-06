import { BackendApiError, fetchFromBackend } from "@/lib/proxy";
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

  let donation: Awaited<ReturnType<typeof fetchFromBackend>>;
  try {
    donation = await fetchFromBackend(`/donations/${id}`);
  } catch (err) {
    if (
      err instanceof BackendApiError &&
      (err.status === 403 || err.status === 404)
    ) {
      notFound();
    }
    throw err;
  }

  if (!donation) {
    notFound();
  }

  const d = donation as {
    viewerIsReceiver?: boolean;
    status?: string;
    fulfillmentMethod?: string;
    qrCode?: string | null;
    id?: string;
    post?: {
      title?: string;
      imageUrl?: string | null;
      rescuePrice?: number | null;
      expiryDate?: string;
      donor?: { name?: string | null };
    };
    quantity?: number;
    deliveryAddress?: string | null;
    deliveryPhone?: string | null;
  };

  if (!d.viewerIsReceiver) {
    notFound();
  }

  const status = d.status ?? "REQUESTED";
  const isPickup = d.fulfillmentMethod === "PICKUP";

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
                      src={d.post?.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"}
                      alt={d.post?.title ?? "Món ăn"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-grow py-1 space-y-1">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{d.post?.title}</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Số lượng: <span className="text-slate-900">{d.quantity} suất</span></p>
                    <p className="text-sm font-black text-mint-darker italic pt-2">{((d.post?.rescuePrice ?? 0) * (d.quantity ?? 1)).toLocaleString()}đ</p>
                  </div>
                </div>

                {/* Logistics Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-slate-100">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Địa điểm lấy hàng</h4>
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-mint-primary mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-sm font-black text-slate-900 leading-tight">{d.post?.donor?.name}</p>
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
                          {d.post?.expiryDate
                            ? `${new Date(d.post.expiryDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • ${new Date(d.post.expiryDate).toLocaleDateString("vi-VN")}`
                            : "—"}
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
                  <span className="text-amber-700 font-black uppercase tracking-wider">Lưu ý quan trọng:</span>{" "}
                  {d.fulfillmentMethod === "DELIVERY"
                    ? status === "REQUESTED"
                      ? "Cửa hàng sẽ duyệt đơn trước. Sau khi duyệt, đối tác có thể liên hệ giao hàng — giữ máy bận."
                      : "Đối tác sẽ liên hệ để giao hàng. Hãy đảm bảo điện thoại có thể liên lạc."
                    : status === "REQUESTED"
                      ? "Đơn đang chờ cửa hàng duyệt. Sau khi được duyệt, hãy mang mã QR bên cạnh đến quầy; nhân viên chỉ quét hoàn tất khi đã duyệt."
                      : status === "APPROVED"
                        ? "Đơn đã được duyệt. Xuất trình mã QR cho nhân viên tại quầy để quét hoàn tất khi bạn nhận hàng."
                        : "Đơn đã hoàn tất. Cảm ơn bạn đã giải cứu thực phẩm cùng chúng tôi."}
                </p>
              </div>
            </div>

            {/* Right Column: QR Code / Tracking Section */}
            <aside className="lg:col-span-5 sticky top-32 animate-in fade-in slide-in-from-right-3 duration-700 space-y-10">
              <div className="bg-white rounded-2xl border border-slate-100 p-10 space-y-10">
                <div className="text-center space-y-1">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
                    {status === "COMPLETED"
                      ? "Hoàn tất"
                      : d.fulfillmentMethod === "DELIVERY"
                        ? "Giao hàng & mã xác nhận"
                        : "Mã nhận hàng của bạn"}
                  </h3>
                  <div className="w-12 h-1 bg-mint-primary mx-auto rounded-full mt-4" />
                </div>

                <div className="flex flex-col items-center gap-8">
                  {status === "COMPLETED" ? (
                    <div className="space-y-6 py-6 text-center">
                      <CheckCircle2
                        className="mx-auto text-emerald-500"
                        size={56}
                        strokeWidth={2}
                      />
                      <div className="space-y-2">
                        <h4 className="text-xl font-black italic tracking-tighter text-slate-900">
                          Đơn đã hoàn tất
                        </h4>
                        <p className="mx-auto max-w-[260px] text-xs font-bold text-slate-400">
                          Cảm ơn bạn đã đồng hành giải cứu thực phẩm.
                        </p>
                      </div>
                    </div>
                  ) : d.fulfillmentMethod === "DELIVERY" && status === "REQUESTED" ? (
                    <div className="space-y-8 py-4 text-center">
                      <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-slate-100 bg-slate-50">
                        <Truck size={40} className="text-slate-200" />
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-xl font-black italic tracking-tighter text-slate-900">
                          Chờ cửa hàng duyệt
                        </h4>
                        <p className="mx-auto max-w-[260px] text-xs font-bold leading-relaxed text-slate-400">
                          Sau khi được duyệt, bạn sẽ thấy mã QR để đối tác quét khi giao hàng.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {isPickup && status === "REQUESTED" && (
                        <div className="w-full rounded-xl border border-amber-100 bg-amber-50/90 p-4 text-center text-xs font-bold text-amber-950">
                          Chờ shop duyệt. Mã bên dưới chỉ được quét hoàn tất sau khi cửa hàng đã duyệt đơn.
                        </div>
                      )}
                      {isPickup && status === "APPROVED" && (
                        <div className="w-full rounded-xl border border-sky-100 bg-sky-50/90 p-4 text-center text-xs font-bold text-sky-950">
                          Đã duyệt — xuất trình mã này để nhân viên quét khi bạn nhận hàng.
                        </div>
                      )}
                      {d.fulfillmentMethod === "DELIVERY" && status === "APPROVED" && (
                        <div className="w-full rounded-xl border border-sky-100 bg-sky-50/90 p-4 text-center text-xs font-bold text-sky-950">
                          Đã duyệt — giữ mã QR khi nhận hàng; shipper/shop sẽ quét để hoàn tất đơn.
                        </div>
                      )}
                      <QRCodeDisplay value={d.qrCode || id} />
                      <div className="text-center">
                        <p className="text-4xl font-black tracking-[0.5em] tabular-nums italic text-slate-900">
                          {d.qrCode?.split("-").pop()?.toUpperCase() ||
                            id.slice(-6).toUpperCase()}
                        </p>
                        <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                          Code định danh giải cứu
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-4 pt-10 border-t border-slate-50">
                  <button className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-slate-900 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-slate-900/10 transition-all hover:bg-slate-800">
                    <Phone size={14} />
                    Liên hệ{" "}
                    {d.fulfillmentMethod === "DELIVERY"
                      ? "Đối tác giao hàng"
                      : "Người cho thực phẩm"}
                  </button>
                  <p className="select-none text-center text-[9px] font-bold uppercase tracking-[0.1em] text-slate-300">
                    ID Giao dịch:{" "}
                    <span className="text-slate-200">{d.id}</span>
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
