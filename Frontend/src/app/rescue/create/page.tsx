import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import RescueForm from "@/components/RescueForm";

export default async function CreateRescuePage() {
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
