import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { auth } from "@/auth";
import { BackendApiError, fetchFromBackend } from "@/lib/proxy";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Package, QrCode, Truck, User } from "lucide-react";
import { donationStatusLabel } from "@/lib/donation-status";
import CancelDonationButton from "@/components/orders/CancelDonationButton";
import ApproveDonationButton from "@/components/orders/ApproveDonationButton";

export type MerchantOrderRow = {
  id: string;
  status: string;
  quantity: number;
  fulfillmentMethod: string;
  createdAt: string;
  deliveryAddress?: string | null;
  deliveryPhone?: string | null;
  post: {
    id: string;
    title: string;
    imageUrl: string | null;
    rescuePrice: number | null;
  };
  receiver: {
    id: string;
    name: string | null;
    email: string;
    phone: string | null;
  };
};

interface PageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function MerchantOrdersPage({ searchParams }: PageProps) {
  const session = await auth();
  const sp = await searchParams;
  const statusFilter =
    typeof sp.status === "string" && sp.status.trim() ? sp.status.trim() : "";

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.role !== "DONOR") {
    redirect("/profile");
  }

  let orders: MerchantOrderRow[] = [];
  let loadError: string | null = null;

  try {
    const q = statusFilter
      ? `/donations/merchant/orders?status=${encodeURIComponent(statusFilter)}`
      : "/donations/merchant/orders";
    orders = (await fetchFromBackend(q)) as MerchantOrderRow[];
    if (!Array.isArray(orders)) orders = [];
  } catch (e) {
    if (e instanceof BackendApiError && (e.status === 401 || e.status === 403)) {
      redirect("/login?reason=expired&next=/merchant/orders");
    }
    loadError =
      e instanceof Error ? e.message : "Không tải được danh sách đơn hàng.";
  }

  const filters = [
    { label: "Tất cả", value: "" },
    { label: "Chờ duyệt", value: "REQUESTED" },
    { label: "Đã duyệt", value: "APPROVED" },
    { label: "Hoàn tất", value: "COMPLETED" },
    { label: "Đã hủy", value: "CANCELLED" },
  ];

  return (
    <main className="min-h-screen bg-[#f6fdf9]">
      <Navbar />

      <section className="pb-24 pt-32">
        <div className="container mx-auto px-6">
          <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-[#1f2d2a] md:text-5xl">
                Đơn hàng <span className="text-mint-darker">của shop</span>
              </h1>
              <p className="mt-3 max-w-2xl text-base text-[#4f6b62] md:text-lg">
                Bước 1: <strong className="text-[#1f2d2a]">Duyệt đơn</strong> khi
                bạn chấp nhận. Bước 2: Khi khách đến lấy / giao xong, dùng{" "}
                <strong className="text-[#1f2d2a]">Quét QR</strong> để hoàn tất
                (chỉ quét được sau khi đã duyệt).
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/merchant/scan"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#009975] px-6 py-3 text-sm font-bold text-white shadow-lg hover:shadow-[#009975]/25"
              >
                <QrCode className="h-4 w-4" />
                Quét QR
              </Link>
              <Link
                href="/merchant/dashboard"
                className="rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-bold text-[#1f2d2a] shadow-sm hover:bg-emerald-50"
              >
                Dashboard
              </Link>
            </div>
          </header>

          <div className="mb-8 flex flex-wrap gap-2">
            {filters.map((f) => {
              const active = statusFilter === f.value;
              const href =
                f.value === ""
                  ? "/merchant/orders"
                  : `/merchant/orders?status=${encodeURIComponent(f.value)}`;
              return (
                <Link
                  key={f.value || "all"}
                  href={href}
                  className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors ${
                    active
                      ? "bg-[#009975] text-white shadow-md"
                      : "border border-emerald-100 bg-white text-[#4f6b62] hover:bg-emerald-50"
                  }`}
                >
                  {f.label}
                </Link>
              );
            })}
          </div>

          {loadError ? (
            <div className="rounded-3xl border border-red-100 bg-red-50/60 p-8 text-center text-sm font-bold text-red-800">
              {loadError}
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-3xl border border-emerald-100 bg-white p-12 text-center shadow-lg">
              <Package className="mx-auto h-12 w-12 text-emerald-200" />
              <p className="mt-4 font-black text-[#1f2d2a]">Chưa có đơn nào</p>
              <p className="mt-2 text-sm font-medium text-[#6a877d]">
                Khi có người đặt món từ bài đăng của bạn, đơn sẽ hiện tại đây.
              </p>
            </div>
          ) : (
            <ul className="space-y-5">
              {orders.map((o) => (
                <li
                  key={o.id}
                  className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-lg transition-all hover:-translate-y-0.5"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                        <Image
                          src={
                            o.post.imageUrl ||
                            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&auto=format&fit=crop"
                          }
                          alt={o.post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-lg font-black text-[#1f2d2a]">
                          {o.post.title}
                        </p>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#6a877d]">
                          {o.quantity} suất ·{" "}
                          {o.fulfillmentMethod === "DELIVERY"
                            ? "Giao hàng"
                            : "Tự đến lấy"}
                        </p>
                        <p className="mt-1 text-sm font-bold text-mint-darker">
                          {(
                            (o.post.rescuePrice ?? 0) * o.quantity
                          ).toLocaleString("vi-VN")}
                          đ
                        </p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex w-fit rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-wider ${
                        o.status === "COMPLETED"
                          ? "bg-emerald-100 text-emerald-800"
                          : o.status === "CANCELLED"
                            ? "bg-slate-200 text-slate-700"
                            : o.status === "APPROVED"
                              ? "bg-sky-100 text-sky-900"
                              : "bg-amber-100 text-amber-900"
                      }`}
                    >
                      {donationStatusLabel(o.status)}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3 border-t border-slate-100 pt-5 text-sm md:grid-cols-2">
                    <div className="flex items-start gap-2">
                      <User className="mt-0.5 h-4 w-4 shrink-0 text-[#6a877d]" />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-wider text-[#6a877d]">
                          Khách
                        </p>
                        <p className="font-bold text-[#1f2d2a]">
                          {o.receiver.name || o.receiver.email}
                        </p>
                        {o.receiver.phone && (
                          <p className="text-xs text-[#4f6b62]">
                            {o.receiver.phone}
                          </p>
                        )}
                      </div>
                    </div>
                    {o.fulfillmentMethod === "DELIVERY" &&
                      (o.deliveryAddress || o.deliveryPhone) && (
                        <div className="flex items-start gap-2">
                          <Truck className="mt-0.5 h-4 w-4 shrink-0 text-[#6a877d]" />
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-wider text-[#6a877d]">
                              Giao hàng
                            </p>
                            {o.deliveryAddress && (
                              <p className="font-medium text-[#1f2d2a]">
                                {o.deliveryAddress}
                              </p>
                            )}
                            {o.deliveryPhone && (
                              <p className="text-xs text-[#4f6b62]">
                                {o.deliveryPhone}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 pt-4">
                    <p className="mr-auto text-[10px] font-bold uppercase tracking-wider text-slate-300">
                      Đặt lúc{" "}
                      {new Date(o.createdAt).toLocaleString("vi-VN")} · ID{" "}
                      {o.id.slice(0, 8)}…
                    </p>
                    {o.status === "REQUESTED" && (
                      <ApproveDonationButton donationId={o.id} />
                    )}
                    {(o.status === "REQUESTED" || o.status === "APPROVED") && (
                      <CancelDonationButton donationId={o.id} variant="merchant" />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
