import { prisma } from "@/lib/prisma";
import MarketplaceClient from "@/components/features/marketplace/MarketplaceClient";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export default async function MarketplacePage() {
  // Fetch real data
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

      <div className="pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <MarketplaceClient
            initialData={JSON.parse(JSON.stringify(foodPosts))}
          />
        </div>
      </div>

      <Footer />
    </main>
  );
}
