import { Utensils, Globe, Store, Users, Sprout, Gift } from "lucide-react";

export default function ImpactStats() {
  const stats = [
    { label: "Bữa ăn đã cứu", value: "12,450+", icon: Utensils, color: "bg-mint-primary/20", textColor: "text-mint-primary" },
    { label: "CO2 giảm thiểu", value: "3,200 kg", icon: Globe, color: "bg-peach-accent/20", textColor: "text-peach-accent" },
    { label: "Nhà hàng đối tác", value: "150+", icon: Store, color: "bg-sage/20", textColor: "text-sage" },
    { label: "Cộng đồng cứu hộ", value: "5,800+", icon: Users, color: "bg-peach-deep/20", textColor: "text-peach-deep" },
  ];

  return (
    <section id="impact" className="py-16 md:py-24 bg-sage/5">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black mb-3 sm:mb-4 text-[#2d3436]">
            Tác động của chúng ta
          </h2>
          <p className="text-foreground/60 text-base sm:text-lg max-w-xl mx-auto">
            Mỗi nỗ lực nhỏ của bạn đều góp phần vào một thay đổi lớn lao.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bento-card flex flex-col items-center text-center px-4 py-6 sm:py-8"
            >
              <div
                className={`w-12 h-12 sm:w-16 sm:h-16 ${stat.color} 
                            rounded-xl sm:rounded-2xl flex items-center justify-center 
                            mb-4 sm:mb-6 transition-transform group-hover:scale-110`}
              >
                <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.textColor}`} />
              </div>

              <div className="text-xl sm:text-3xl font-black mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-foreground/60 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          
          {/* Journey */}
          <div className="md:col-span-2 bento-card bg-mint-primary/10 
                          border-mint-primary/10 overflow-hidden relative">
            <div className="relative z-10 max-w-md">
              <h3 className="text-xl sm:text-2xl font-black mb-3 text-sage">
                Hành trình sống xanh
              </h3>
              <p className="text-foreground/70 text-sm sm:text-base mb-5">
                Theo dõi các cột mốc giải cứu thực phẩm của bạn và nhận những phần quà
                ý nghĩa từ các đối tác bền vững.
              </p>
              <button className="px-6 py-2.5 bg-sage text-white rounded-xl font-bold 
                                 hover:bg-sage/90 transition-all active:scale-95">
                Tham gia ngay
              </button>
            </div>

            {/* Decor icon – giảm size mobile */}
            <div className="absolute right-[-10px] bottom-[-10px] opacity-10 
                            rotate-12 hidden sm:block">
              <Sprout size={160} className="text-sage" />
            </div>
          </div>

          {/* Mystery box */}
          <div className="bento-card bg-peach-accent/10 border-peach-accent/10 
                          flex flex-col justify-center items-center text-center px-6 py-8">
            <h3 className="text-lg sm:text-xl font-black mb-2">
              Mystery Box
            </h3>
            <p className="text-foreground/70 text-sm mb-4 max-w-xs">
              Nhận đồ ăn ngon từ quán bạn thích chỉ với 30% giá gốc!
            </p>
            <Gift size={40} className="sm:size-[48px] text-peach-accent opacity-80" />
          </div>
        </div>

      </div>
    </section>
  );
}
