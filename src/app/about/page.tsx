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
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-[#2d3436]">
              Về <span className="text-mint-darker">Food Rescue</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Chúng tôi là nền tảng công nghệ kết nối cộng đồng, giảm thiểu lãng phí thực phẩm và bảo vệ môi trường.
            </p>
          </div>

          {/* Mission Section */}
          <section className="mb-20">
            <div className="bg-white rounded-[3rem] p-12 lg:p-16 border border-black/5 shadow-sm">
              <h2 className="text-4xl font-black mb-8 text-[#2d3436]">Sứ mệnh của chúng tôi</h2>
              <p className="text-lg text-foreground/70 leading-relaxed mb-8">
                Food Rescue được sinh ra từ niềm tin rằng mỗi bữa ăn đều có giá trị. Chúng tôi tận dụng công nghệ để kết nối 
                các nhà hàng, cửa hàng thực phẩm có thực phẩm dư thừa với những người cần giải cứu món ngon với giá cực kỳ ưu đãi.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Mục tiêu của chúng tôi không chỉ là giảm thiểu lãng phí thực phẩm, mà còn tạo ra một cộng đồng cùng nhau 
                bảo vệ hành tinh và lan tỏa yêu thương.
              </p>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-black mb-12 text-center text-[#2d3436]">Giá trị cốt lõi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Tận tâm",
                  description: "Chúng tôi đặt cộng đồng và môi trường lên hàng đầu trong mọi quyết định."
                },
                {
                  icon: Users,
                  title: "Kết nối",
                  description: "Xây dựng mạng lưới đối tác và người dùng mạnh mẽ để tạo tác động tích cực."
                },
                {
                  icon: Leaf,
                  title: "Bền vững",
                  description: "Hướng tới tương lai xanh, giảm thiểu tác động tiêu cực đến môi trường."
                },
                {
                  icon: Target,
                  title: "Đổi mới",
                  description: "Sử dụng công nghệ để tối ưu hóa quy trình và trải nghiệm người dùng."
                }
              ].map((value, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 border border-black/5 hover:border-mint-primary/30 transition-all">
                  <div className="w-16 h-16 bg-mint-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <value.icon className="w-8 h-8 text-mint-darker" />
                  </div>
                  <h3 className="text-xl font-black mb-3 text-[#2d3436]">{value.title}</h3>
                  <p className="text-foreground/60 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Impact Stats */}
          <section className="bg-mint-darker rounded-[3rem] p-12 lg:p-16 text-white">
            <h2 className="text-4xl font-black mb-12 text-center">Tác động của chúng tôi</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: "10,000+", label: "Bữa ăn đã giải cứu" },
                { number: "150+", label: "Đối tác tin tưởng" },
                { number: "25,000kg", label: "CO2 đã tiết kiệm" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-5xl font-black mb-4">{stat.number}</div>
                  <div className="text-white/70 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
