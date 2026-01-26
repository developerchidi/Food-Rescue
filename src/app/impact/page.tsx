import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Utensils, Globe, Store, Users, Sprout, Gift, TrendingUp, Heart, Leaf, Award } from "lucide-react";

export default function ImpactPage() {
  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      <Navbar />
      
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-[#2d3436]">
              Tác động <span className="text-mint-darker">Cộng đồng</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Mỗi nỗ lực nhỏ của bạn đều góp phần vào một thay đổi lớn lao. Cùng nhau, chúng ta đang tạo ra tác động tích cực cho môi trường và cộng đồng.
            </p>
          </div>

          {/* Main Stats Section */}
          <section className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  label: "Bữa ăn đã cứu", 
                  value: "12,450+", 
                  icon: Utensils, 
                  color: "bg-mint-primary/20", 
                  textColor: "text-mint-primary",
                  description: "Bữa ăn ngon đã được giải cứu khỏi bãi rác"
                },
                { 
                  label: "CO2 giảm thiểu", 
                  value: "3,200 kg", 
                  icon: Globe, 
                  color: "bg-peach-accent/20", 
                  textColor: "text-peach-accent",
                  description: "Khí thải carbon đã được tiết kiệm"
                },
                { 
                  label: "Nhà hàng đối tác", 
                  value: "150+", 
                  icon: Store, 
                  color: "bg-sage/20", 
                  textColor: "text-sage",
                  description: "Đối tác đang tham gia mạng lưới"
                },
                { 
                  label: "Cộng đồng cứu hộ", 
                  value: "5,800+", 
                  icon: Users, 
                  color: "bg-peach-deep/20", 
                  textColor: "text-peach-deep",
                  description: "Thành viên tích cực trong cộng đồng"
                }
              ].map((stat, index) => (
                <div key={index} className="bento-card flex flex-col items-center group hover:scale-105 transition-transform">
                  <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <stat.icon className={`w-8 h-8 ${stat.textColor}`} />
                  </div>
                  <div className="text-4xl font-black mb-2 text-[#2d3436]">{stat.value}</div>
                  <div className="text-foreground/70 font-bold mb-2 text-center">{stat.label}</div>
                  <div className="text-xs text-foreground/50 text-center">{stat.description}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Impact Stories Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-black mb-12 text-center text-[#2d3436]">Câu chuyện tác động</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Giảm lãng phí thực phẩm",
                  description: "Mỗi bữa ăn được giải cứu giúp giảm thiểu lượng thực phẩm bị vứt bỏ, góp phần bảo vệ môi trường và tài nguyên thiên nhiên.",
                  stat: "Giảm 85% lãng phí"
                },
                {
                  icon: Leaf,
                  title: "Bảo vệ môi trường",
                  description: "Giảm thiểu khí thải CO2 từ việc phân hủy thực phẩm, góp phần chống biến đổi khí hậu và bảo vệ hành tinh xanh.",
                  stat: "Tiết kiệm 3,200kg CO2"
                },
                {
                  icon: Users,
                  title: "Xây dựng cộng đồng",
                  description: "Kết nối mọi người trong một mạng lưới chia sẻ và quan tâm, tạo ra giá trị xã hội và tinh thần đoàn kết.",
                  stat: "5,800+ thành viên"
                }
              ].map((story, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 border border-black/5 hover:border-mint-primary/30 transition-all">
                  <div className="w-16 h-16 bg-mint-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <story.icon className="w-8 h-8 text-mint-darker" />
                  </div>
                  <div className="text-sm font-black text-mint-darker mb-3 uppercase tracking-wider">{story.stat}</div>
                  <h3 className="text-xl font-black mb-3 text-[#2d3436]">{story.title}</h3>
                  <p className="text-foreground/60 leading-relaxed">{story.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Green Journey Section */}
          <section className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bento-card bg-mint-primary/10 border-mint-primary/10 overflow-hidden relative group">
                <div className="relative z-10 max-w-md">
                  <h3 className="text-3xl font-black mb-4 text-sage">Hành trình sống xanh</h3>
                  <p className="text-foreground/70 mb-6 leading-relaxed">
                    Theo dõi các cột mốc giải cứu thực phẩm của bạn và nhận những phần quà ý nghĩa từ các đối tác bền vững. 
                    Mỗi bữa ăn bạn giải cứu đều được ghi nhận và đóng góp vào hành trình bảo vệ môi trường.
                  </p>
                  <button className="px-8 py-3 bg-sage text-white rounded-xl font-black hover:bg-sage/90 transition-all shadow-lg">
                    Tham gia ngay
                  </button>
                </div>
                <div className="absolute right-[-20px] bottom-[-20px] opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <Sprout size={180} className="text-sage" />
                </div>
              </div>

              <div className="bento-card bg-peach-accent/10 border-peach-accent/10 flex flex-col justify-center items-center text-center p-8">
                <Gift className="w-16 h-16 text-peach-accent mb-4" />
                <h3 className="text-2xl font-black mb-3 text-[#2d3436]">Mystery Box</h3>
                <p className="text-foreground/70 mb-4 leading-relaxed">
                  Trình làng tính năng hộp quà bí ẩn. Nhận đồ ăn ngon từ quán bạn thích chỉ với 30% giá gốc!
                </p>
                <div className="text-2xl font-black text-peach-deep">-70%</div>
              </div>
            </div>
          </section>

          {/* Environmental Impact Section */}
          <section className="mb-20">
            <div className="bg-mint-darker rounded-[3rem] p-12 lg:p-16 text-white">
              <h2 className="text-4xl font-black mb-12 text-center">Tác động môi trường</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Globe,
                    title: "Giảm khí thải nhà kính",
                    value: "3,200 kg CO2",
                    description: "Tương đương với việc trồng 160 cây xanh"
                  },
                  {
                    icon: Leaf,
                    title: "Tiết kiệm nước",
                    value: "450,000 lít",
                    description: "Nước được tiết kiệm từ việc không sản xuất thực phẩm mới"
                  },
                  {
                    icon: TrendingUp,
                    title: "Giảm chất thải",
                    value: "12,450 kg",
                    description: "Thực phẩm được cứu khỏi bãi rác"
                  }
                ].map((impact, i) => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <impact.icon className="w-8 h-8 text-mint-primary" />
                    </div>
                    <div className="text-4xl font-black mb-2">{impact.value}</div>
                    <h4 className="text-xl font-black mb-2">{impact.title}</h4>
                    <p className="text-white/60 text-sm">{impact.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Community Achievements */}
          <section className="mb-20">
            <h2 className="text-4xl font-black mb-12 text-center text-[#2d3436]">Thành tựu cộng đồng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: Award,
                  title: "Top 10 Startup Xanh",
                  description: "Food Rescue được vinh danh là một trong 10 startup xanh hàng đầu Việt Nam năm 2025",
                  year: "2025"
                },
                {
                  icon: Users,
                  title: "5,800+ Thành viên",
                  description: "Cộng đồng người dùng tích cực đang cùng nhau tạo ra tác động tích cực mỗi ngày",
                  year: "Hiện tại"
                }
              ].map((achievement, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 border border-black/5 hover:border-mint-primary/30 transition-all">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-mint-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                      <achievement.icon className="w-8 h-8 text-mint-darker" />
                    </div>
                    <div className="flex-grow">
                      <div className="text-sm font-black text-mint-darker mb-2 uppercase tracking-wider">{achievement.year}</div>
                      <h3 className="text-2xl font-black mb-3 text-[#2d3436]">{achievement.title}</h3>
                      <p className="text-foreground/60 leading-relaxed">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-mint-primary/20 to-peach-accent/20 rounded-[3rem] p-12 lg:p-16 text-center">
            <h2 className="text-4xl font-black mb-6 text-[#2d3436]">Bạn cũng có thể tạo ra tác động!</h2>
            <p className="text-xl text-foreground/70 mb-10 max-w-2xl mx-auto">
              Tham gia Food Rescue ngay hôm nay và trở thành một phần của cộng đồng đang thay đổi thế giới.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-4 bg-mint-darker text-white font-black rounded-2xl hover:bg-mint-dark transition-all shadow-xl">
                Bắt đầu giải cứu
              </button>
              <button className="px-10 py-4 bg-white text-mint-darker font-black rounded-2xl hover:bg-mint-primary/10 transition-all border-2 border-mint-darker">
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
