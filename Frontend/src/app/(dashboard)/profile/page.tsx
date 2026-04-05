import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MerchantProfileForm from "./MerchantProfileForm";

export default function MerchantProfilePage() {
  return (
    <main className="min-h-screen bg-[#f6fdf9]">
      <Navbar />

      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#1f2d2a]">
              Merchant <span className="text-mint-darker">Profile</span>
            </h1>
            <p className="mt-3 text-base md:text-lg text-[#4f6b62] max-w-2xl">
              Cập nhật thông tin cửa hàng và bộ nhận diện thương hiệu để khách hàng dễ dàng nhận diện bạn hơn.
            </p>
          </header>

          <MerchantProfileForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
