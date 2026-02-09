import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock,ChevronRight,Package,QrCode, ShoppingBag,} from "lucide-react";

export default async function OrdersPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const orders = await prisma.donation.findMany({
    where: {
      receiverId: session.user.id,
    },
    include: {
      post: {
        include: {
          donor: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <header className="mb-10 md:mb-16 space-y-3 md:space-y-4">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter italic">
              Đơn hàng <span className="text-mint-primary">của tôi</span>
            </h1>
            <p className="text-sm md:text-base font-medium text-slate-500 leading-relaxed max-w-xl italic">
              "Nơi lưu giữ những hành trình giải cứu thực phẩm và những mã QR hạnh phúc của bạn."
            </p>
          </header>

          {/* Empty state */}
          {orders.length === 0 ? (
            <div className="py-20 md:py-24 text-center space-y-6 animate-in fade-in duration-700">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag size={28} className="text-slate-200" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-black text-slate-900">
                  Chưa có đơn hàng nào
                </h3>
                <p className="text-xs md:text-sm font-bold text-slate-400">
                  Hãy bắt đầu hành trình giải cứu thực phẩm ngay hôm nay!
                </p>
              </div>
              <Link
                href="/marketplace"
                className="inline-block px-6 md:px-8 py-3 md:py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-slate-800 transition-all"
              >
                Khám phá Chợ Thực Phẩm
              </Link>
            </div>
          ) : (
            <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="group relative bg-white border border-slate-100 rounded-3xl p-5 md:p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8 hover:border-mint-primary/30 hover:shadow-2xl hover:shadow-mint-primary/5 transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative w-full lg:w-48 aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                    <Image
                      src={
                        order.post.imageUrl ||
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"
                      }
                      alt={order.post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[9px] font-black text-slate-900 uppercase tracking-widest shadow-sm">
                      {order.post.type === "MYSTERY_BOX"
                        ? "Mystery Box"
                        : "Individual"}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-grow space-y-5">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight group-hover:text-mint-darker transition-colors lowercase first-letter:uppercase">
                          {order.post.title}
                        </h2>
                        <span className="px-2 py-0.5 bg-slate-900 text-white rounded text-[8px] font-black uppercase tracking-widest italic">
                          x{order.quantity} suất
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-mint-primary" />
                          <span>{order.post.donor.name}</span>
                        </div>
                        <div className="px-2 py-0.5 bg-slate-50 rounded-md border border-slate-100 italic text-[10px]">
                          {order.fulfillmentMethod === "DELIVERY"
                            ? "🚚 Giao tận nhà"
                            : "🚶 Tự đến lấy"}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                          <Clock size={18} />
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                            Hạn nhận món
                          </p>
                          <p className="text-xs font-bold text-slate-600">
                            {new Date(
                              order.post.expiryDate
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
                            •{" "}
                            {new Date(
                              order.post.expiryDate
                            ).toLocaleDateString("vi-VN")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                          <Package size={18} />
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                            Trạng thái
                          </p>
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                                order.fulfillmentMethod === "DELIVERY"
                                  ? "bg-orange-400"
                                  : "bg-emerald-400"
                              }`}
                            />
                            <p
                              className={`text-xs font-bold uppercase tracking-tighter ${
                                order.fulfillmentMethod === "DELIVERY"
                                  ? "text-orange-600"
                                  : "text-emerald-600"
                              }`}
                            >
                              {order.fulfillmentMethod === "DELIVERY"
                                ? "Đang chờ xác nhận"
                                : "Sẵn sàng nhận hàng"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-50">
                    <Link
                      href={`/rescue/success/${order.id}`}
                      className="flex items-center justify-center gap-3 w-full lg:w-56 h-12 md:h-14 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-900 uppercase tracking-[0.15em] hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all active:scale-95 px-6 shadow-sm"
                    >
                      {order.fulfillmentMethod === "DELIVERY" ? (
                        <Package size={16} />
                      ) : (
                        <QrCode size={16} />
                      )}
                      <span>
                        {order.fulfillmentMethod === "DELIVERY"
                          ? "Chi tiết giao hàng"
                          : "Mã nhận hàng"}
                      </span>
                      <ChevronRight size={14} className="opacity-40" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
