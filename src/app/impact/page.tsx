import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {Utensils, Globe, Store, Users, Gift, TrendingUp,Heart,Leaf,Award,CheckCircle2,} from "lucide-react";

export default function ImpactPage() {
  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      <Navbar />

      <div className="pt-24 md:pt-32 pb-20 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">

          {/* HERO */}
          <section className="text-center mb-20 md:mb-24 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 md:w-96 md:h-96 bg-mint-primary/5 rounded-full blur-[100px] -z-10" />
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6">
              Tác động <span className="text-mint-darker">Cộng đồng</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
              Mỗi hành động nhỏ đều góp phần kiến tạo một thực tế lớn lao.
              Cùng Food Rescue biến thực phẩm dư thừa thành giá trị bền vững.
            </p>
          </section>

          {/* STATS */}
          <section className="mb-20 md:mb-32">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: "Bữa ăn đã cứu",
                  value: "15,800+",
                  icon: Utensils,
                  color: "bg-red-50",
                  textColor: "text-red-500",
                  description: "Nguồn dinh dưỡng được trân trọng",
                },
                {
                  label: "CO2 giảm thiểu",
                  value: "4,600 kg",
                  icon: Globe,
                  color: "bg-blue-50",
                  textColor: "text-blue-500",
                  description: "Lá phổi xanh được bảo vệ",
                },
                {
                  label: "Nhà hàng đối tác",
                  value: "200+",
                  icon: Store,
                  color: "bg-mint-primary/10",
                  textColor: "text-mint-darker",
                  description: "Mạng lưới sẻ chia ngày càng rộng",
                },
                {
                  label: "Cộng đồng cứu hộ",
                  value: "8,500+",
                  icon: Users,
                  color: "bg-orange-50",
                  textColor: "text-orange-primary",
                  description: "Những trái tim nhân ái kết nối",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 md:p-8 border border-black/5 hover:shadow-xl transition"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                    </div>
                    <h3 className="font-black">{stat.label}</h3>
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-mint-darker text-center mb-2">
                    {stat.value}
                  </div>
                  <p className="text-center text-sm text-mint-darker bg-mint-primary/20 rounded-full px-3 py-1 inline-block">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* VALUES */}
          <section className="mb-20 md:mb-32">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-mint-darker mb-3">
                Giá trị chúng tôi kiến tạo
              </h2>
              <p className="text-foreground/60">
                Không chỉ là con số, mà là tác động tích cực.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: Heart,
                  title: "Nhân văn & Chia sẻ",
                  desc: "Trân trọng công sức và nguồn lực cộng đồng.",
                  color: "bg-red-50",
                  iconColor: "text-red-500",
                },
                {
                  icon: Leaf,
                  title: "Bền vững môi trường",
                  desc: "Giảm rác thải và bảo vệ hệ sinh thái.",
                  color: "bg-mint-primary/10",
                  iconColor: "text-mint-darker",
                },
                {
                  icon: TrendingUp,
                  title: "Hiệu quả kinh tế",
                  desc: "Biến lãng phí thành giá trị thực.",
                  color: "bg-orange-50",
                  iconColor: "text-orange-primary",
                },
              ].map((v, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 md:p-10 border">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 ${v.color} rounded-xl flex items-center justify-center`}>
                      <v.icon className={`w-6 h-6 ${v.iconColor}`} />
                    </div>
                    <h3 className="font-black text-lg">{v.title}</h3>
                  </div>
                  <p className="text-foreground/60">{v.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4">
              Sẵn sàng trở thành <br />
              <span className="text-mint-darker">Một Phần Của Sự Thay Đổi?</span>
            </h2>
            <p className="text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto mb-8">
              Tham gia cùng cộng đồng để giải cứu thực phẩm và bảo vệ hành tinh.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-mint-darker text-white font-black rounded-xl">
                Giải cứu món ngon
              </button>
              <button className="px-8 py-4 bg-white border font-black rounded-xl">
                Tìm hiểu thêm
              </button>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
