import { fetchFromBackend } from "@/lib/proxy";
import MarketplaceClient from "@/components/features/marketplace/MarketplaceClient";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export default async function MarketplacePage() {
  // Fetch real data from Backend API
  const foodPosts = await fetchFromBackend("/posts", { next: { revalidate: 60 } }) || [];

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
