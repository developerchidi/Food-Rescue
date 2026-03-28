import { Leaf, Gift, MapPin, Globe, Pizza, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden bg-[#fdfcf8]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Cột Trái: Nội dung */}
          <div className="max-w-xl order-2 lg:order-1 mt-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-2 rounded-full bg-emerald-50 border border-emerald-100">
              <div className="w-2 h-2 rounded-full bg-mint-darker animate-pulse" />
              <span className="text-sm font-bold text-mint-darker tracking-wide">Nền tảng #1 Việt Nam</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-[#2d3436]">
              Đừng để <br />
              thực phẩm tốt <br />
              <span className="text-mint-darker">bị lãng phí</span>
            </h1>

            <p className="text-lg text-foreground/70 mb-12 leading-relaxed">
              Kết nối nhà hàng, siêu thị với cộng đồng. Cứu thực phẩm - Bảo vệ hành tinh - Lan tỏa yêu thương.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
              <button className="h-14 px-8 bg-orange-primary text-white font-bold rounded-2xl flex items-center gap-2 hover:bg-orange-600 transition-all active:scale-95 group shadow-xl shadow-orange-primary/20">
                <Gift className="w-5 h-5" />
                Quyên góp ngay
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="h-14 px-8 bg-white border-2 border-mint-primary/30 text-mint-darker font-bold rounded-2xl flex items-center gap-2 hover:bg-emerald-50 transition-all shadow-sm">
                <MapPin className="w-5 h-5" />
                Tìm thực phẩm
              </button>
            </div>

            {/* Stats Integrated */}
            <div className="flex gap-12 border-t border-black/5 pt-12">
              <div>
                <div className="text-4xl font-black text-mint-darker">5.000+</div>
                <div className="text-sm font-medium text-foreground/40 mt-1 uppercase tracking-wider">bữa ăn</div>
              </div>
              <div>
                <div className="text-4xl font-black text-orange-primary">2.150kg</div>
                <div className="text-sm font-medium text-foreground/40 mt-1 uppercase tracking-wider">hành động</div>
              </div>
              <div>
                <div className="text-4xl font-black text-sage">180</div>
                <div className="text-sm font-medium text-foreground/40 mt-1 uppercase tracking-wider">đối tác</div>
              </div>
            </div>
          </div>

          {/* Cột Phải: Visual Card */}
          <div className="relative flex justify-center lg:justify-center order-1 lg:order-2 mb-12 lg:mb-0">
            <div className="relative w-full max-w-[540px] aspect-square">
              {/* Card chính (Bình thường là Image Slider, đây là visual đại diện) */}
              <div className="absolute inset-0 bg-[#e9f7f4] rounded-[5rem] flex flex-col items-center justify-center shadow-2xl shadow-mint-primary/20 border-8 border-white overflow-hidden group">
                <div className="relative w-80 h-80 transition-transform duration-700 group-hover:scale-110">
                  <div className="absolute inset-0 bg-white rounded-full blur-3xl opacity-40" />
                  <Image
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"
                    alt="Food bowl"
                    fill
                    className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
                  />
                </div>
                <div className="mt-8 text-center">
                  <h3 className="text-4xl font-black text-mint-darker tracking-tight leading-none mb-2">Thực phẩm tươi</h3>
                  <p className="text-lg text-foreground/40 font-medium italic">Chờ bạn "giải cứu"</p>
                </div>
              </div>

              {/* Badge nổi 1 (Top-right) */}
              <div className="absolute -top-4 -right-4 bg-white p-6 rounded-[2.5rem] shadow-2xl flex items-center gap-4 border border-emerald-50 animate-float">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-primary">
                  <Pizza size={28} />
                </div>
                <div>
                  <div className="text-2xl font-black text-orange-primary">-70%</div>
                  <div className="text-[10px] font-bold text-foreground/30 uppercase tracking-[0.2em]">Giá ưu đãi</div>
                </div>
              </div>

              {/* Badge nổi 2 (Bottom-left) */}
              <div className="absolute -bottom-4 -left-4 bg-white p-6 rounded-[2.5rem] shadow-2xl flex items-center gap-4 border border-emerald-50 animate-float-delayed">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                  <Globe size={28} />
                </div>
                <div>
                  <div className="text-2xl font-black text-blue-600">Eco</div>
                  <div className="text-[10px] font-bold text-foreground/30 uppercase tracking-[0.2em]">Môi trường</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-20">
        </div>
      </div>
    </section>
  );
}
