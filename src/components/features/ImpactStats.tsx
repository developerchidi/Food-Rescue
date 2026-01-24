import { Utensils, Globe, Store, Users, Sprout, Gift } from "lucide-react";

export default function ImpactStats() {
  const stats = [
    { label: "Bữa ăn đã cứu", value: "12,450+", icon: Utensils, color: "bg-mint-primary/20", textColor: "text-mint-primary" },
    { label: "CO2 giảm thiểu", value: "3,200 kg", icon: Globe, color: "bg-peach-accent/20", textColor: "text-peach-accent" },
    { label: "Nhà hàng đối tác", value: "150+", icon: Store, color: "bg-sage/20", textColor: "text-sage" },
    { label: "Cộng đồng cứu hộ", value: "5,800+", icon: Users, color: "bg-peach-deep/20", textColor: "text-peach-deep" },
  ];

  return (
    <section id="impact" className="py-24 bg-sage/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Tác động của chúng ta</h2>
          <p className="text-foreground/60 text-lg">Mỗi nỗ lực nhỏ của bạn đều góp phần vào một thay đổi lớn lao.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bento-card flex flex-col items-center group">
              <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-8 h-8 ${stat.textColor}`} />
              </div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-foreground/60 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Highlight Bento Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2 bento-card bg-mint-primary/10 border-mint-primary/10 overflow-hidden relative group">
            <div className="relative z-10 max-w-md">
              <h3 className="text-2xl font-bold mb-4 text-sage">Hành trình sống xanh</h3>
              <p className="text-foreground/70 mb-6">Theo dõi các cột mốc giải cứu thực phẩm của bạn và nhận những phần quà ý nghĩa từ các đối tác bền vững.</p>
              <button className="px-6 py-2 bg-sage text-white rounded-xl font-bold hover:bg-sage/90 transition-all">Tham gia ngay</button>
            </div>
            <div className="absolute right-[-20px] bottom-[-20px] opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-500">
              <Sprout size={180} className="text-sage" />
            </div>
          </div>

          <div className="bento-card bg-peach-accent/10 border-peach-accent/10 flex flex-col justify-center items-center text-center">
            <h3 className="text-xl font-bold mb-2">Mystery Box</h3>
            <p className="text-foreground/70 mb-4 text-sm">Trình làng tính năng hộp quà bí ẩn. Nhận đồ ăn ngon từ quán bạn thích chỉ với 30% giá gốc!</p>
            <div className="mt-4">
              <Gift size={48} className="text-peach-accent opacity-80" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
