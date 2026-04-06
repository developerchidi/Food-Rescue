import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getBackendApiBaseForServer } from "@/lib/backend-url";
import ShopGrid, { type ShopPost } from "./ShopGrid";
import {
  MapPin,
  Phone,
  Calendar,
  Package,
  ShieldCheck,
  Store,
  ChevronRight,
  Leaf,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";

export type ShopDonor = {
  id: string;
  name: string | null;
  role: string;
  avatarUrl: string | null;
  bio: string | null;
  address: string | null;
  phone: string | null;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
  points: number;
};

type ShopPayload = {
  donor: ShopDonor;
  posts: ShopPost[];
};

async function loadShop(donorId: string): Promise<ShopPayload | null> {
  const base = getBackendApiBaseForServer();
  const res = await fetch(`${base}/posts/shop/${donorId}`, {
    next: { revalidate: 60 },
  });
  if (res.status === 404) return null;
  if (!res.ok) return null;
  return res.json() as Promise<ShopPayload>;
}

function formatJoined(iso: string) {
  try {
    return new Intl.DateTimeFormat("vi-VN", {
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

interface ShopPageProps {
  params: Promise<{ id: string }>;
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { id } = await params;
  const data = await loadShop(id);
  if (!data?.donor) {
    notFound();
  }

  const { donor, posts } = data;
  const list = posts || [];
  const count = list.length;
  const hasMap =
    donor.latitude != null &&
    donor.longitude != null &&
    !Number.isNaN(Number(donor.latitude)) &&
    !Number.isNaN(Number(donor.longitude));
  const mapsHref = hasMap
    ? `https://www.google.com/maps?q=${donor.latitude},${donor.longitude}`
    : null;

  return (
    <main className="min-h-screen bg-[#f6fbf8] text-[#1f2d2a]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-emerald-100/80 bg-gradient-to-br from-[#e8f7f0] via-[#f0faf5] to-[#fdfcf8] pt-24 pb-20 md:pt-28 md:pb-24">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-mint-primary/15 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-emerald-200/25 blur-3xl"
          aria-hidden
        />

        <div className="relative z-[1] mx-auto max-w-6xl px-6">
          <nav className="mb-8 flex flex-wrap items-center gap-1 text-xs font-bold uppercase tracking-widest text-slate-500">
            <Link href="/" className="hover:text-mint-darker transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" aria-hidden />
            <Link href="/marketplace" className="hover:text-mint-darker transition-colors">
              Marketplace
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" aria-hidden />
            <span className="max-w-[200px] truncate text-mint-darker md:max-w-md">
              {donor.name || "Cửa hàng"}
            </span>
          </nav>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            <div className="relative mx-auto shrink-0 lg:mx-0">
              <div className="relative h-32 w-32 overflow-hidden rounded-3xl border-4 border-white bg-white shadow-xl shadow-emerald-900/10 md:h-40 md:w-40">
                {donor.avatarUrl ? (
                  <Image
                    src={donor.avatarUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 128px, 160px"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-mint-primary/30 to-emerald-100">
                    <span className="text-4xl font-black text-mint-darker md:text-5xl">
                      {(donor.name || "?").charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-white bg-mint-darker text-white shadow-lg">
                <Store className="h-5 w-5" aria-hidden />
              </div>
            </div>

            <div className="min-w-0 flex-1 text-center lg:text-left">
              <div className="mb-3 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-mint-darker shadow-sm ring-1 ring-emerald-100">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                  Đối tác FoodRescue
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-800 ring-1 ring-emerald-200/80">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                  Đã xác minh
                </span>
              </div>

              <h1 className="text-3xl font-black tracking-tight text-[#14221f] md:text-5xl md:leading-[1.1]">
                {donor.name || "Cửa hàng đối tác"}
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 lg:mx-0 lg:text-lg">
                {donor.bio?.trim()
                  ? donor.bio
                  : "Đối tác đồng hành cùng FoodRescue — mang món ngon đến cộng đồng, giảm lãng phí thực phẩm và bảo vệ môi trường."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats + thông tin */}
      <div className="relative z-[2] mx-auto -mt-10 max-w-6xl px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/80 bg-white/90 p-5 shadow-lg shadow-emerald-900/5 backdrop-blur-md ring-1 ring-emerald-100/60">
            <div className="mb-2 flex items-center gap-2 text-mint-darker">
              <Package className="h-5 w-5 shrink-0" aria-hidden />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                Đang mở bán
              </span>
            </div>
            <p className="text-3xl font-black tabular-nums text-[#14221f]">{count}</p>
            <p className="mt-1 text-xs font-medium text-slate-500">
              món có thể giải cứu ngay trên marketplace
            </p>
          </div>

          <div className="rounded-2xl border border-white/80 bg-white/90 p-5 shadow-lg shadow-emerald-900/5 backdrop-blur-md ring-1 ring-emerald-100/60">
            <div className="mb-2 flex items-center gap-2 text-mint-darker">
              <Calendar className="h-5 w-5 shrink-0" aria-hidden />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                Tham gia
              </span>
            </div>
            <p className="text-lg font-black capitalize text-[#14221f]">
              {formatJoined(donor.createdAt) || "—"}
            </p>
            <p className="mt-1 text-xs font-medium text-slate-500">
              đồng hành cùng nền tảng
            </p>
          </div>

          <div className="rounded-2xl border border-white/80 bg-white/90 p-5 shadow-lg shadow-emerald-900/5 backdrop-blur-md ring-1 ring-emerald-100/60 sm:col-span-2 lg:col-span-1">
            <div className="mb-2 flex items-center gap-2 text-mint-darker">
              <MapPin className="h-5 w-5 shrink-0" aria-hidden />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                Khu vực / Địa chỉ
              </span>
            </div>
            {donor.address?.trim() ? (
              <p className="text-sm font-bold leading-snug text-[#14221f]">{donor.address.trim()}</p>
            ) : (
              <p className="text-sm font-medium italic text-slate-500">
                Địa chỉ sẽ hiển thị khi đối tác cập nhật trong hồ sơ.
              </p>
            )}
            {mapsHref && (
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs font-black text-mint-darker underline decoration-mint-darker/30 underline-offset-4 hover:decoration-mint-darker"
              >
                Mở bản đồ
                <ChevronRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            )}
          </div>

          <div className="rounded-2xl border border-white/80 bg-white/90 p-5 shadow-lg shadow-emerald-900/5 backdrop-blur-md ring-1 ring-emerald-100/60">
            <div className="mb-2 flex items-center gap-2 text-mint-darker">
              <Phone className="h-5 w-5 shrink-0" aria-hidden />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                Liên hệ
              </span>
            </div>
            {donor.phone?.trim() ? (
              <a
                href={`tel:${donor.phone.replace(/\s/g, "")}`}
                className="text-lg font-black text-[#14221f] hover:text-mint-darker"
              >
                {donor.phone.trim()}
              </a>
            ) : (
              <p className="text-sm font-medium text-slate-500">
                Đặt món qua FoodRescue — SĐT sẽ hiện khi cửa hàng cập nhật hồ sơ.
              </p>
            )}
            <p className="mt-2 text-[11px] font-medium text-slate-400">
              Điểm cống hiến:{" "}
              <span className="font-black text-mint-darker">{donor.points ?? 0}</span>
            </p>
          </div>
        </div>

        {/* Thực đơn */}
        <section className="mt-16 md:mt-20">
          <div className="mb-8 flex flex-col gap-3 border-b border-emerald-100 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-[#14221f] md:text-3xl">
                Thực đơn giải cứu
              </h2>
              <p className="mt-2 max-w-xl text-sm font-medium text-slate-600">
                Món đang mở bán, còn hạn sử dụng — đặt nhanh để không bỏ lỡ suất giải cứu.
              </p>
            </div>
            <Link
              href="/marketplace"
              className="inline-flex items-center justify-center gap-2 self-start rounded-xl border-2 border-[#14221f]/10 bg-white px-5 py-2.5 text-xs font-black uppercase tracking-widest text-[#14221f] transition-all hover:border-mint-darker hover:bg-emerald-50/80"
            >
              Xem toàn bộ marketplace
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <ShopGrid posts={list} />
        </section>

        {/* Cam kết */}
        <section className="mt-16 md:mt-20">
          <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/50 p-8 shadow-inner ring-1 ring-emerald-100/80 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-mint-darker text-white shadow-lg shadow-mint-darker/25">
                <Leaf className="h-7 w-7" aria-hidden />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#14221f] md:text-xl">
                  Giải cứu thực phẩm có trách nhiệm
                </h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
                  Mọi đơn trên FoodRescue góp phần giảm lãng phí và hỗ trợ cộng đồng. Vui lòng đến đúng giờ hẹn,
                  kiểm tra món khi nhận và phản hồi trung thực để cửa hàng và người mua cùng có trải nghiệm tốt.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </main>
  );
}
