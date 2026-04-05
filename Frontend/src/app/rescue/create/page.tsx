import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RescueForm from "@/components/RescueForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function CreateRescuePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4">
          <RescueForm />
        </div>
      </div>

      <Footer />
    </main>
  );
}
