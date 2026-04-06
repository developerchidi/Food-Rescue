import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import MerchantScanClient from "./MerchantScanClient";

export default async function MerchantScanPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.role !== "DONOR") {
    redirect("/profile");
  }

  return (
    <main className="min-h-screen bg-[#f6fdf9]">
      <Navbar />

      <section className="pb-24 pt-32">
        <div className="container mx-auto px-6">
          <header className="mb-10 text-center">
            <h1 className="text-3xl font-black tracking-tight text-[#1f2d2a] md:text-4xl">
              Quét mã <span className="text-mint-darker">nhận hàng</span>
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm font-medium text-[#4f6b62] md:text-base">
              Chỉ hoàn tất được khi đơn đã được duyệt trước trong Đơn shop. Quét
              mã QR của khách — đơn chuyển sang «Hoàn tất».
            </p>
          </header>

          <MerchantScanClient />
        </div>
      </section>

      <Footer />
    </main>
  );
}
