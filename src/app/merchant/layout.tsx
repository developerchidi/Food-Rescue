import MerchantSidebar from "@/components/layout/merchant/MerchantSidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function MerchantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userRole = (session.user as any).role;
  if (userRole !== "DONOR") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <MerchantSidebar />
      <main className="md:ml-64 min-h-screen pt-24 md:pt-24 pb-8">
        {children}
      </main>
    </div>
  );
}
