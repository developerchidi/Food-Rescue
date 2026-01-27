import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Heart, Users, Leaf, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      <Navbar />

      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-24">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 text-[#2d3436]">
              Về <span className="text-mint-darker">Food Rescue</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed font-medium">
              Kiến tạo tương lai bền vững thông qua việc giải cứu thực phẩm và kết nối cộng đồng.
            </p>
          </div>

          {/* Story Section */}
          <section className="mb-32 select-none">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-4xl font-black mb-8 text-[#2d3436]">Câu chuyện của chúng tôi</h2>
                <div className="space-y-6 text-lg text-foreground/70 leading-relaxed">
                  <p>
                    Mọi thứ bắt đầu từ một quan sát đơn giản nhưng nhức nhối: Hàng tấn thực phẩm tươi ngon bị lãng phí mỗi ngày
                    tại các nhà hàng, trong khi hàng triệu người vẫn đang nỗ lực tìm kiếm những bữa ăn chất lượng với chi phí hợp lý.
                  </p>
                  <p>
                    Food Rescue ra đời vào năm 2026 với sứ mệnh xóa bỏ khoảng cách này. Chúng tôi tin rằng giải pháp nằm ở sức mạnh
                    của công nghệ và lòng trắc ẩn của cộng đồng. Bằng cách số hóa quy trình "cứu trợ" thực phẩm, chúng tôi biến
                    lãng phí thành cơ hội, và biến dư thừa thành sẻ chia.
                  </p>
                  <p>
                    Hành trình của chúng tôi không chỉ là về việc tiết kiệm bữa ăn; đó là về việc thay đổi tư duy tiêu dùng,
                    xây dựng thói quen sống bền vững và tạo ra tác động tích cực đến hệ sinh thái toàn cầu.
                  </p>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-mint-primary/10 rounded-[2rem] blur-2xl group-hover:bg-mint-primary/20 transition-all duration-500"></div>
                  <img
                    src="/logo-reflection.png"
                    alt="Food Rescue Logo"
                    className="relative rounded-[2rem] shadow-2xl hover:scale-[1.02] transition-transform duration-500 pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Vision Section */}
          <section className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-[2rem] p-10 lg:p-12 border border-black/5 shadow-sm hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-mint-primary/10 rounded-2xl flex items-center justify-center mb-8">
                <Target className="w-8 h-8 text-mint-darker" />
              </div>
              <h2 className="text-3xl font-black mb-6 text-[#2d3436]">Sứ mệnh</h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Tận dụng sức mạnh công nghệ để kết nối các nguồn lực thực phẩm dư thừa, giảm thiểu tối đa lãng phí
                và cung cấp những bữa ăn giá trị, bổ dưỡng cho mọi tầng lớp trong xã hội.
              </p>
            </div>
            <div className="bg-mint-darker rounded-[2rem] p-10 lg:p-12 text-white shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-black mb-6">Tầm nhìn</h2>
              <p className="text-lg text-white/80 leading-relaxed">
                Trở thành hệ sinh thái giải cứu thực phẩm hàng đầu Đông Nam Á, nơi mọi thực phẩm dư thừa
                đều được trân trọng và chuyển hóa thành giá trị thiết thực cho cộng đồng và môi trường.
              </p>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-4 text-[#2d3436]">Giá trị cốt lõi</h2>
              <p className="text-foreground/60 text-lg">Những nguyên tắc dẫn dắt mọi hành động của chúng tôi.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Tận tâm",
                  description: "Chúng tôi đặt cộng đồng và môi trường lên hàng đầu trong mọi quyết định.",
                  color: "bg-red-50",
                  iconColor: "text-red-500"
                },
                {
                  icon: Users,
                  title: "Kết nối",
                  description: "Xây dựng mạng lưới đối tác và người dùng mạnh mẽ để tạo tác động tích cực.",
                  color: "bg-blue-50",
                  iconColor: "text-blue-500"
                },
                {
                  icon: Leaf,
                  title: "Bền vững",
                  description: "Hướng tới tương lai xanh, giảm thiểu tác động tiêu cực đến môi trường.",
                  color: "bg-mint-primary/10",
                  iconColor: "text-mint-darker"
                },
                {
                  icon: Target,
                  title: "Đổi mới",
                  description: "Sử dụng công nghệ để tối ưu hóa quy trình và trải nghiệm người dùng.",
                  color: "bg-orange-50",
                  iconColor: "text-orange-primary"
                }
              ].map((value, i) => (
                <div key={i} className="group bg-white rounded-2xl p-8 border border-black/5 hover:border-mint-primary/30 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 ${value.color} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                      <value.icon className={`w-7 h-7 ${value.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-black text-[#2d3436]">{value.title}</h3>
                  </div>
                  <p className="text-foreground/60 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-4 text-[#2d3436]">Đội ngũ sáng lập</h2>
              <p className="text-foreground/60 text-lg">Những con người tâm huyết đứng sau dự án.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "Chidi", role: "Project Lead / Architect", emoji: "⚡" },
                { name: "Nghi", role: "Frontend Lead", emoji: "🎨" },
                { name: "Kiên", role: "Backend Dev", emoji: "⚙️" },
                { name: "Cơ", role: "Frontend Dev", emoji: "🚀" },
                { name: "Mẫn", role: "Frontend Dev", emoji: "✨" },
                { name: "Toàn", role: "QA / Tester", emoji: "🛡️" },
                { name: "Kiệt", role: "QA / Tester", emoji: "🔍" }
              ].map((member, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 border border-black/5 text-center hover:border-mint-primary/30 hover:shadow-lg transition-all">
                  <div className="text-5xl mb-6">{member.emoji}</div>
                  <h3 className="text-xl font-black text-[#2d3436] mb-2">{member.name}</h3>
                  <p className="text-mint-darker font-bold text-sm uppercase tracking-wider">{member.role}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Impact Stats */}
          <section className="mb-32">
            <div className="bg-mint-darker rounded-[2rem] p-12 lg:p-20 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-mint-primary/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                {[
                  { number: "10.000+", label: "Bữa ăn đã giải cứu", desc: "Giảm lãng phí mỗi ngày" },
                  { number: "150+", label: "Đối tác tin tưởng", desc: "Nhà hàng & Tiệm bánh" },
                  { number: "25.000kg", label: "CO2 đã tiết kiệm", desc: "Bảo vệ hành tinh xanh" }
                ].map((stat, i) => (
                  <div key={i} className="space-y-4">
                    <div className="text-6xl font-black">{stat.number}</div>
                    <div className="text-xl font-bold text-white/90">{stat.label}</div>
                    <p className="text-white/60 text-sm italic">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="text-center pb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-8 text-[#2d3436]">Sẵn sàng đồng hành cùng chúng tôi?</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto mb-12">
              Dù bạn là doanh nghiệp muốn đóng góp hay người dùng muốn trải nghiệm,
              luôn có chỗ cho bạn trong hành trình giải cứu thực phẩm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-5 bg-mint-darker text-white font-black rounded-2xl hover:bg-[#1a4d44] transition-all shadow-xl active:scale-95">
                Bắt đầu giải cứu ngay
              </button>
              <button className="px-10 py-5 bg-white text-[#2d3436] border border-black/10 font-black rounded-2xl hover:bg-gray-50 transition-all shadow-sm active:scale-95">
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
