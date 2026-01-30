import { prisma } from "@/lib/prisma";
import MarketplaceClient from "@/components/features/marketplace/MarketplaceClient";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export default async function MarketplacePage() {
  // Fetch real data from Supabase
  const foodPosts = await prisma.foodPost.findMany({
    where: {
      status: "AVAILABLE",
    },
    include: {
      donor: {
        select: {
          name: true,
          latitude: true,
          longitude: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      <Navbar />
      <div className="pt-32 pb-20">
        <MarketplaceClient initialData={JSON.parse(JSON.stringify(foodPosts))} />
      </div>
      <Footer />
    </main>
  );
}
