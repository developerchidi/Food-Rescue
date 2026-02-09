import { MapPin, Navigation } from "lucide-react";

export default function MapSection() {
  return (
    <section id="map" className="py-16 md:py-24 bg-[#fdfcf8]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          
          {/* Map mockup */}
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-[4/3] rounded-[2rem] sm:rounded-[3rem] lg:rounded-[4rem] 
                            bg-[#e9f7f4] border-4 sm:border-8 border-white 
                            shadow-xl sm:shadow-2xl relative overflow-hidden">
              
              {/* Grid */}
              <div className="absolute inset-0 opacity-10 
                              bg-[radial-gradient(#2d5a27_1px,transparent_1px)] 
                              [background-size:32px_32px] sm:[background-size:40px_40px]" />

              {/* Markers */}
              {[
                { top: "20%", left: "30%", color: "text-orange-primary", delay: "" },
                { top: "50%", left: "60%", color: "text-mint-darker", delay: "animation-delay-500" },
                { top: "70%", left: "25%", color: "text-blue-500", delay: "animation-delay-1000" },
              ].map((m, i) => (
                <div
                  key={i}
                  className="absolute animate-bounce"
                  style={{ top: m.top, left: m.left }}
                >
                  <MapPin className={`w-8 h-8 sm:w-10 sm:h-10 ${m.color}`} />
                </div>
              ))}

              {/* User location */}
              <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2
                              px-4 sm:px-6 py-2.5 sm:py-3 bg-white 
                              rounded-xl sm:rounded-2xl shadow-lg 
                              flex items-center gap-2 sm:gap-3 border border-black/5">
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping" />
                <span className="text-xs sm:text-sm font-bold">
                  Vị trí của bạn (Quận 1, TP.HCM)
                </span>
              </div>
            </div>

            {/* Floating card – chỉ hiện desktop */}
            <div className="hidden lg:block absolute -top-8 -right-8 
                            p-6 bg-white rounded-3xl shadow-2xl border border-black/5">
              <Navigation className="text-mint-darker mb-2" />
              <div className="text-sm font-bold">12 cửa hàng</div>
              <div className="text-xs text-foreground/40 mt-1">
                Sẵn sàng trong bán kính 2km
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="inline-block px-4 py-1.5 mb-4 sm:mb-6 
                            rounded-full bg-blue-50 border border-blue-100">
              <span className="text-xs sm:text-sm font-bold text-blue-600">
                Tính năng sắp tới
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl 
                           font-black mb-6 sm:mb-8 leading-tight text-[#2d3436]">
              Tìm thực phẩm <br />
              <span className="text-blue-600">quanh bạn</span>
            </h2>

            <p className="text-base sm:text-lg text-foreground/60 
                          mb-8 sm:mb-10 leading-relaxed">
              Dễ dàng theo dõi các địa điểm đang có ưu đãi giải cứu theo thời gian thực.
              Bản đồ thông minh giúp bạn tìm thấy bữa ăn ngon nhất chỉ với vài bước chân.
            </p>

            <div className="space-y-4 sm:space-y-6">
              {[
                "Hiển thị khoảng cách chính xác",
                "Chỉ đường trực quan qua Google Maps",
                "Thông báo ngay khi quán yêu thích có đồ mới",
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4"
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-[#2d3436]">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
