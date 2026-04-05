import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function OrdersLoading() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-6 animate-pulse">
          <header className="mb-16 space-y-4">
            <div className="h-12 w-80 max-w-full rounded-2xl bg-slate-100" />
            <div className="h-5 w-[28rem] max-w-full rounded-xl bg-slate-100" />
          </header>

          <div className="space-y-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center gap-8"
              >
                <div className="w-full lg:w-48 aspect-[4/3] lg:aspect-square rounded-2xl bg-slate-100 shrink-0" />

                <div className="flex-grow space-y-5">
                  <div className="space-y-3">
                    <div className="h-8 w-72 max-w-full rounded-xl bg-slate-100" />
                    <div className="h-4 w-56 max-w-full rounded-lg bg-slate-100" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 pt-4 border-t border-slate-50">
                    <div className="h-14 rounded-xl bg-slate-100" />
                    <div className="h-14 rounded-xl bg-slate-100" />
                  </div>
                </div>

                <div className="shrink-0 w-full lg:w-56 h-14 rounded-2xl bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
