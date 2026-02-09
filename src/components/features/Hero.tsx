import { Gift, MapPin, Globe, Pizza, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 overflow-hidden bg-[#fdfcf8]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT */}
          <div className="max-w-xl order-2 lg:order-1 mt-8 lg:mt-0">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-emerald-50 border border-emerald-100">
              <div className="w-2 h-2 rounded-full bg-mint-darker animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-mint-darker tracking-wide">
                Nền tảng #1 Việt Nam
              </span>
            </div>

            <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-[#2d3436]">
              Đừng để <br />
              thực phẩm tốt <br />
              <span className="text-mint-darker">bị lãng phí</span>
            </h1>

            <p className="text-base sm:text-lg text-foreground/70 mb-8 sm:mb-12 leading-relaxed">
              Kết nối nhà hàng, siêu thị với cộng đồng. Cứu thực phẩm – Bảo vệ hành tinh – Lan tỏa yêu thương.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12 sm:mb-16">
              <button className="h-14 px-8 bg-orange-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-orange-600 transition-all active:scale-95 group shadow-xl shadow-orange-primary/20">
                <Gift className="w-5 h-5" />
                Quyên góp ngay
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="h-14 px-8 bg-white border-2 border-mint-primary/30 text-mint-darker font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-50 transition-all shadow-sm">
                <MapPin className="w-5 h-5" />
                Tìm thực phẩm
              </button>
            </div>

            {/* STATS */}
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 border-t border-black/5 pt-8 sm:pt-12">
              <div>
                <div className="text-3xl sm:text-4xl font-black text-mint-darker">5.000+</div>
                <div className="text-xs sm:text-sm font-medium text-foreground/40 mt-1 uppercase tracking-wider">
                  bữa ăn
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-orange-primary">2.150kg</div>
                <div className="text-xs sm:text-sm font-medium text-foreground/40 mt-1 uppercase tracking-wider">
                  hành động
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-sage">180</div>
                <div className="text-xs sm:text-sm font-medium text-foreground/40 mt-1 uppercase tracking-wider">
                  đối tác
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center order-1 lg:order-2 mb-12 lg:mb-0">
            <div className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[540px] aspect-square">
              {/* MAIN CARD */}
              <div className="absolute inset-0 bg-[#e9f7f4] rounded-[3rem] sm:rounded-[4rem] lg:rounded-[5rem] flex flex-col items-center justify-center shadow-2xl shadow-mint-primary/20 border-8 border-white overflow-hidden group">
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 transition-transform duration-700 group-hover:scale-110">
                  <div className="absolute inset-0 bg-white rounded-full blur-3xl opacity-40" />
                  <Image
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"
                    alt="Food bowl"
                    fill
                    className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
                  />
                </div>

                <div className="mt-6 sm:mt-8 text-center">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-mint-darker mb-2">
                    Thực phẩm tươi
                  </h3>
                  <p className="text-sm sm:text-lg text-foreground/40 font-medium italic">
                    Chờ bạn “giải cứu”
                  </p>
                </div>
              </div>

              {/* BADGE TOP RIGHT */}
              <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-white p-4 sm:p-6 rounded-3xl shadow-2xl flex items-center gap-3 sm:gap-4 border border-emerald-50 animate-float">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-primary">
                  <Pizza size={24} />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-orange-primary">-70%</div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-foreground/30 uppercase tracking-[0.2em]">
                    Giá ưu đãi
                  </div>
                </div>
              </div>

              {/* BADGE BOTTOM LEFT */}
              <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 bg-white p-4 sm:p-6 rounded-3xl shadow-2xl flex items-center gap-3 sm:gap-4 border border-emerald-50 animate-float-delayed">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                  <Globe size={24} />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-blue-600">Eco</div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-foreground/30 uppercase tracking-[0.2em]">
                    Môi trường
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
