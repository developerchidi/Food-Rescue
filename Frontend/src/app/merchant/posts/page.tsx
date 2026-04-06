import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { auth } from "@/auth";
import { fetchFromBackend } from "@/lib/proxy";
import { redirect } from "next/navigation";
import Link from "next/link";
import MerchantPostsClient, { type MinePostRow } from "./MerchantPostsClient";

export default async function MerchantPostsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.role !== "DONOR") {
    redirect("/profile");
  }

  let posts: MinePostRow[] = [];
  try {
    posts = (await fetchFromBackend("/posts/mine")) as MinePostRow[];
  } catch {
    posts = [];
  }

  return (
    <main className="min-h-screen bg-[#f6fdf9]">
      <Navbar />

      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#1f2d2a]">
                Quản lý{" "}
                <span className="text-mint-darker">bài đăng</span>
              </h1>
              <p className="mt-3 max-w-2xl text-base text-[#4f6b62] md:text-lg">
                Xem, chỉnh sửa hoặc xóa các món bạn đã đăng. Chỉnh sửa số lượng
                và trạng thái để phù hợp kho thực tế.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/merchant/dashboard"
                className="rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-bold text-[#1f2d2a] shadow-sm hover:bg-emerald-50"
              >
                Dashboard
              </Link>
              <Link
                href="/merchant/orders"
                className="rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-bold text-[#1f2d2a] shadow-sm hover:bg-emerald-50"
              >
                Đơn shop
              </Link>
              <Link
                href="/merchant/scan"
                className="rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-bold text-[#1f2d2a] shadow-sm hover:bg-emerald-50"
              >
                Quét QR
              </Link>
              <Link
                href="/rescue/create"
                className="rounded-full bg-[#009975] px-6 py-3 text-sm font-bold text-white shadow-lg hover:shadow-[#009975]/25"
              >
                Tạo bài mới
              </Link>
            </div>
          </header>

          <MerchantPostsClient posts={posts} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
