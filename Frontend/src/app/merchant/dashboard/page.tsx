import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { auth } from "@/auth";
import { fetchFromBackend } from "@/lib/proxy";
import { redirect } from "next/navigation";
import { HeartHandshake, Wallet, Star } from "lucide-react";

interface MerchantStats {
  totalMealsRescued: number;
  totalRevenue: number;
  rating: number;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
};

export default async function MerchantDashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const stats = (await fetchFromBackend("/donations/merchant/stats")) as MerchantStats;

  const cards = [
    {
      title: "Tổng bữa ăn đã cứu",
      value: `${stats.totalMealsRescued}`,
      icon: HeartHandshake,
      accent: "bg-emerald-500",
      glow: "shadow-emerald-200",
    },
    {
      title: "Doanh thu",
      value: formatCurrency(stats.totalRevenue),
      icon: Wallet,
      accent: "bg-mint-darker",
      glow: "shadow-emerald-100",
    },
    {
      title: "Đánh giá",
      value: stats.rating === 0 ? "Chưa có" : `${stats.rating}/5`,
      icon: Star,
      accent: "bg-green-600",
      glow: "shadow-green-100",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f6fdf9]">
      <Navbar />

      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#1f2d2a]">
              Merchant <span className="text-mint-darker">Dashboard</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-[#4f6b62] max-w-2xl">
              Theo dõi tác động và hiệu quả kinh doanh của bạn theo thời gian thực.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card) => (
              <article
                key={card.title}
                className="rounded-3xl border border-emerald-100 bg-white p-7 shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-[#6a877d]">
                      {card.title}
                    </p>
                    <p className="mt-4 text-3xl font-black tracking-tight text-[#1f2d2a] break-words">
                      {card.value}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl ${card.accent} ${card.glow} shadow-lg flex items-center justify-center`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
