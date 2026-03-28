import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, MapPin, Clock, ShieldCheck, Info, AlertTriangle } from "lucide-react";
import Link from "next/link";
import RescueConfirmForm from "./RescueConfirmForm";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface ConfirmPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RescueConfirmPage({ params }: ConfirmPageProps) {
  const session = await auth();
  const { id } = await params;

  if (!session?.user?.id) {
    redirect("/login");
  }

  const post = await prisma.foodPost.findUnique({
    where: { id },
    include: {
      donor: {
        select: {
          name: true,
          latitude: true,
          longitude: true,
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  const discount = post.originalPrice && post.rescuePrice
    ? Math.round(((post.originalPrice - post.rescuePrice) / post.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-6">
          {/* Simple Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-12">
            <Link href="/marketplace" className="hover:text-mint-darker transition-colors">Marketplace</Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900">Xác nhận đơn hàng</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Product Info & Shop Profile */}
            <div className="lg:col-span-7 space-y-16 animate-in fade-in slide-in-from-bottom-3 duration-500">
              <section className="space-y-10">
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                  <Image
                    src={post.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white shadow-sm rounded-full text-[10px] font-black text-red-500 border border-slate-100">
                    -{discount}%
                  </div>
                </div>

                <div className="space-y-3">
                  <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none italic">
                    {post.title}
                  </h1>

                  {/* Minimal Info Bar */}
                  <div className="flex flex-wrap gap-x-8 gap-y-3 pt-6 text-[11px] font-bold text-slate-500 border-t border-slate-100 mt-6">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-slate-400" />
                      <span>Hạn lấy: <span className="text-slate-900">{new Date(post.expiryDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={14} className="text-emerald-400" />
                      <span className="text-slate-900 uppercase">An toàn đã kiểm định</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-xl italic">
                  "{post.description || "Chung tay giải cứu món ăn ngon để bảo vệ môi trường và cộng đồng."}"
                </p>
              </section>

              {/* Minimalist Instructions */}
              <section className="pt-12 border-t border-slate-100 space-y-8">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Hướng dẫn lấy món</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                  {[
                    "Xác nhận đúng thời gian hẹn",
                    "Chuẩn bị dụng cụ túi đựng",
                    "Kiểm tra món ăn khi nhận",
                    "Giao tiếp chân thành, lịch sự"
                  ].map((rule, i) => (
                    <div key={i} className="flex gap-4 text-xs font-bold text-slate-600 group">
                      <span className="text-slate-300 group-hover:text-mint-primary transition-colors">0{i + 1}</span>
                      <p className="leading-snug">{rule}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Shop Profile Section (Bottom) */}
              <section className="pt-16 border-t border-slate-100 space-y-8">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Thông tin đối tác</h3>
                <div className="flex items-center gap-6 p-6 rounded-2xl bg-white border border-slate-100 group hover:border-mint-primary transition-all">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0 flex items-center justify-center">
                    <span className="text-xl font-black text-mint-primary">{post.donor.name?.[0] || '?'}</span>
                  </div>
                  <div className="flex-grow space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-black text-slate-900">{post.donor.name}</h4>
                      <div className="px-1.5 py-0.5 bg-mint-primary/10 text-mint-primary rounded text-[8px] font-black uppercase tracking-widest">Verified</div>
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px] font-bold text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-slate-400" />
                        <span>Khu vực tin cậy</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-500">
                        <span>●</span>
                        <span>Đang online</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/shop/${post.donorId}`}
                    className="hidden sm:block px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
                  >
                    Xem Shop
                  </Link>
                </div>
              </section>
            </div>

            {/* Right Column: Checkout Sidebar */}
            <aside className="lg:col-span-5 sticky top-28 animate-in fade-in slide-in-from-right-3 duration-700">
              <RescueConfirmForm post={JSON.parse(JSON.stringify(post))} />
              <div className="mt-8 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-loose">
                  Trao đi món ngon • Nhận lại nụ cười
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
