import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Utensils, Globe, Store, Users, Sprout, Gift, TrendingUp, Heart, Leaf, Award, CheckCircle2 } from "lucide-react";

export default function ImpactPage() {
  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      <Navbar />

      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-mint-primary/5 rounded-full blur-[100px] -z-10"></div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 text-[#2d3436]">
              Tác động <span className="text-mint-darker">Cộng đồng</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Mỗi hành động nhỏ đều góp phần kiến tạo một thực tế lớn lao.
              Cùng Food Rescue biến thực phẩm dư thừa thành giá trị bền vững.
            </p>
          </div>

          {/* Main Stats Bento Grid */}
          <section className="mb-32">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  label: "Bữa ăn đã cứu",
                  value: "15,800+",
                  icon: Utensils,
                  color: "bg-red-50",
                  textColor: "text-red-500",
                  description: "Nguồn dinh dưỡng được trân trọng"
                },
                {
                  label: "CO2 giảm thiểu",
                  value: "4,600 kg",
                  icon: Globe,
                  color: "bg-blue-50",
                  textColor: "text-blue-500",
                  description: "Lá phổi xanh được bảo vệ"
                },
                {
                  label: "Nhà hàng đối tác",
                  value: "200+",
                  icon: Store,
                  color: "bg-mint-primary/10",
                  textColor: "text-mint-darker",
                  description: "Mạng lưới sẻ chia ngày càng rộng"
                },
                {
                  label: "Cộng đồng cứu hộ",
                  value: "8,500+",
                  icon: Users,
                  color: "bg-orange-50",
                  textColor: "text-orange-primary",
                  description: "Những trái tim nhân ái kết nối"
                }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-[1.5rem] p-8 border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                      <stat.icon className={`w-7 h-7 ${stat.textColor}`} />
                    </div>
                    <h3 className="text-lg font-bold text-[#2d3436]">{stat.label}</h3>
                  </div>
                  <div className="text-4xl font-black mb-3 text-[#2d3436] tracking-tight">{stat.value}</div>
                  <p className="text-sm text-foreground/40 leading-relaxed">{stat.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Impact Stories Section - Refactored for consistency */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-4 text-[#2d3436]">Giá trị chúng tôi kiến tạo</h2>
              <p className="text-foreground/60 text-lg">Không chỉ là những con số, đó là những câu chuyện thay đổi tích cực.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Nhân văn & Chia sẻ",
                  description: "Mỗi bữa ăn được giải cứu là một thông điệp trân trọng nguồn lực và công sức lao động của cộng đồng.",
                  stat: "Lan tỏa yêu thương",
                  color: "bg-red-50",
                  iconColor: "text-red-500"
                },
                {
                  icon: Leaf,
                  title: "Bền vững môi trường",
                  description: "Xây dựng thói quen tiêu dùng có trách nhiệm, giảm áp lực lên bãi rác và hệ sinh thái tự nhiên.",
                  stat: "Hành tinh xanh",
                  color: "bg-mint-primary/10",
                  iconColor: "text-mint-darker"
                },
                {
                  icon: TrendingUp,
                  title: "Hiệu quả kinh tế",
                  description: "Biến lãng phí thành giá trị, giúp các đối tác tối ưu hóa doanh thu và người dùng tiết kiệm chi phí.",
                  stat: "Tối ưu nguồn lực",
                  color: "bg-orange-50",
                  iconColor: "text-orange-primary"
                }
              ].map((story, i) => (
                <div key={i} className="group bg-white rounded-[2.5rem] p-10 border border-black/5 hover:border-mint-primary/30 transition-all duration-500">
                  <div className="flex items-center gap-6 mb-8">
                    <div className={`w-16 h-16 ${story.color} rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                      <story.icon className={`w-8 h-8 ${story.iconColor}`} />
                    </div>
                    <h3 className="text-2xl font-black text-[#2d3436] leading-tight">{story.title}</h3>
                  </div>
                  <div className="text-sm font-black text-mint-darker mb-4 uppercase tracking-widest">{story.stat}</div>
                  <p className="text-foreground/60 leading-relaxed text-lg">{story.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Special Feature Highlight */}
          <section className="mb-32">
            <div className="bg-[#1a1c1e] rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-mint-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-peach-primary/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]"></div>

              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-mint-primary text-sm font-bold mb-8 backdrop-blur-md border border-white/5">
                    <Gift size={16} />
                    <span>Tính năng độc quyền</span>
                  </div>
                  <h2 className="text-5xl font-black mb-8 leading-tight">Mystery Box: <br /><span className="text-mint-primary">Bất ngờ trong từng bữa ăn</span></h2>
                  <p className="text-white/60 text-xl leading-relaxed mb-10">
                    Giải pháp tối ưu nhất cho các nhà hàng để giải phóng thực phẩm cuối ngày
                    trong khi mang đến cho bạn những món ngon thượng hạng chỉ với 30% giá gốc.
                  </p>
                  <div className="space-y-4">
                    {[
                      "Giảm 70% chi phí so với giá niêm yết",
                      "Món ăn bất ngờ, chất lượng đảm bảo",
                      "Đóng góp trực tiếp vào mục tiêu không rác thải"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-6 h-6 bg-mint-primary/20 rounded-full flex items-center justify-center">
                          <CheckCircle2 size={14} className="text-mint-primary" />
                        </div>
                        <span className="text-white/80 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button className="mt-12 px-10 py-5 bg-mint-primary text-[#1a1c1e] font-black rounded-2xl hover:bg-mint-light transition-all shadow-xl shadow-mint-primary/20">
                    Khám phá ngay
                  </button>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-4 bg-mint-primary/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative aspect-square rounded-[3rem] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center p-12 overflow-hidden">
                    <Gift size={200} className="text-mint-primary/40 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-9xl font-black text-white/5">70%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Environmental Impact Details */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-4 text-[#2d3436]">Chỉ số môi trường</h2>
              <p className="text-foreground/60 text-lg">Mỗi bước đi của chúng ta đều được thiên nhiên ghi nhận.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  icon: Globe,
                  title: "Khí thải Carbon",
                  value: "3,200 kg CO2",
                  impact: "Tương đương 160 cây xanh đã trồng",
                  desc: "Lượng khí methane và CO2 được ngăn chặn phát thải từ các bãi rác."
                },
                {
                  icon: Leaf,
                  title: "Tài nguyên Nước",
                  value: "450,000 Lít",
                  impact: "Đủ dùng cho một gia đình trong 5 năm",
                  desc: "Nước ảo tiết kiệm được từ quá trình sản xuất và chế biến thực phẩm."
                },
                {
                  icon: Sprout,
                  title: "Đất trồng hữu ích",
                  value: "12,450 kg",
                  impact: "Bảo vệ hệ sinh thái khỏi ô nhiễm",
                  desc: "Khối lượng thực phẩm được chuyển hóa thành năng lượng thay vì rác thải."
                }
              ].map((item, i) => (
                <div key={i} className="text-center group">
                  <div className="w-24 h-24 bg-white rounded-3xl shadow-lg border border-black/5 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:shadow-2xl transition-all duration-500">
                    <item.icon className="w-12 h-12 text-mint-darker" />
                  </div>
                  <div className="text-5xl font-black text-[#2d3436] mb-4 tracking-tighter">{item.value}</div>
                  <h3 className="text-2xl font-black text-mint-darker mb-4">{item.title}</h3>
                  <div className="inline-block px-4 py-1 bg-mint-primary/10 rounded-full text-mint-darker text-sm font-bold mb-4">
                    {item.impact}
                  </div>
                  <p className="text-foreground/50 leading-relaxed max-w-sm mx-auto">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recognition & Awards */}
          <section className="mb-32">
            <div className="bg-mint-darker rounded-[3rem] p-12 lg:p-20 text-white text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-20 pointer-events-none"></div>
              <h2 className="text-4xl font-black mb-16 relative z-10">Thành tựu và Công nhận</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {[
                  {
                    title: "Top 10 Startup Xanh 2025",
                    desc: "Vinh danh bởi Hiệp hội Môi trường Việt Nam cho những đóng góp đột phá trong giải cứu thực phẩm.",
                    award: "Innovation Award"
                  },
                  {
                    title: "Sustainable Solution of the Year",
                    desc: "Được công nhận là giải pháp bền vững hiệu quả nhất bởi diễn đàn Kinh tế xanh khu vực.",
                    award: "Green Excellence"
                  }
                ].map((award, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/10 hover:bg-white/20 transition-all">
                    <Award className="w-12 h-12 text-mint-primary mx-auto mb-6" />
                    <div className="text-mint-primary text-xs font-black uppercase tracking-widest mb-2">{award.award}</div>
                    <h3 className="text-2xl font-black mb-4">{award.title}</h3>
                    <p className="text-white/60 leading-relaxed">{award.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA Refactored */}
          <section className="text-center">
            <h2 className="text-5xl md:text-6xl font-black mb-8 text-[#2d3436] leading-tight">
              Sẵn sàng trở thành <br /><span className="text-mint-darker">Một Phần Của Sự Thay Đổi?</span>
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto mb-16">
              Tham gia cùng 8,500+ thành viên khác để cùng nhau giải cứu thực phẩm và bảo vệ hành tinh của chúng ta ngay hôm nay.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="px-12 py-6 bg-mint-darker text-white font-black rounded-3xl hover:bg-[#1a4d44] transition-all shadow-2xl hover:scale-105 active:scale-95 text-lg">
                Giải cứu món ngon ngay
              </button>
              <button className="px-12 py-6 bg-white text-[#2d3436] border border-black/10 font-black rounded-3xl hover:bg-gray-50 transition-all shadow-sm hover:scale-105 active:scale-95 text-lg">
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
