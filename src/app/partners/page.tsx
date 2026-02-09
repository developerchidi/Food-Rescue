import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {Store,TrendingUp,Heart,Users,Award,BarChart3,Shield,UserPlus, PlusCircle, Truck} from "lucide-react";

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      <Navbar />

      <div className="pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero */}
          <div className="text-center mb-14 md:mb-20">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight mb-4 md:mb-6 text-[#2d3436]">
              Đối tác &{" "}
              <span className="text-mint-darker">Merchant</span>
            </h1>
            <p className="text-base md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Tham gia mạng lưới Food Rescue để biến thực phẩm dư thừa thành doanh
              thu và giá trị cho cộng đồng.
            </p>
          </div>

          {/* Benefits */}
          <section className="mb-16 md:mb-20">
            <h2 className="text-2xl md:text-4xl font-black mb-10 md:mb-12 text-center text-[#2d3436]">
              Lợi ích khi tham gia
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: Store,
                  title: "Tăng doanh thu",
                  description:
                    "Giảm thiểu tổn thất từ thực phẩm dư thừa và tạo nguồn thu mới.",
                },
                {
                  icon: TrendingUp,
                  title: "Tìm khách hàng mới",
                  description:
                    "Tiếp cận cộng đồng quan tâm môi trường, mở rộng tệp khách hàng.",
                },
                {
                  icon: Heart,
                  title: "Xây dựng thương hiệu",
                  description:
                    "Gia tăng hình ảnh trách nhiệm xã hội và giá trị bền vững.",
                },
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 md:p-8 border border-black/5 hover:border-mint-primary/30 transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-mint-primary/10 rounded-xl flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 md:w-7 md:h-7 text-mint-darker" />
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-[#2d3436]">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-foreground/60 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section className="mb-16 md:mb-20">
            <div className="bg-mint-darker rounded-3xl p-8 md:p-12 lg:p-16 text-white text-center">
              <div className="text-5xl md:text-7xl font-black mb-4">
                150+
              </div>
              <p className="text-sm md:text-2xl text-white/70 mb-6 md:mb-8 uppercase tracking-[0.2em] font-bold">
                Thương hiệu tin tưởng
              </p>
              <p className="text-sm md:text-lg text-white/60 max-w-2xl mx-auto">
                Hàng trăm nhà hàng và cửa hàng đã tham gia Food Rescue và tạo ra
                tác động tích cực cho cộng đồng.
              </p>
            </div>
          </section>

          {/* Features */}
          <section className="mb-16 md:mb-20">
            <h2 className="text-2xl md:text-4xl font-black mb-10 md:mb-12 text-center text-[#2d3436]">
              Tính năng dành cho đối tác
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: BarChart3,
                  title: "Dashboard quản lý",
                  description:
                    "Theo dõi doanh thu và thống kê bán hàng trực quan",
                },
                {
                  icon: Shield,
                  title: "Bảo mật cao",
                  description:
                    "Dữ liệu và thanh toán được bảo vệ an toàn",
                },
                {
                  icon: Users,
                  title: "Hỗ trợ 24/7",
                  description:
                    "Đội ngũ chăm sóc khách hàng luôn sẵn sàng",
                },
                {
                  icon: Award,
                  title: "Chứng nhận xanh",
                  description:
                    "Nhận chứng nhận đối tác bền vững",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-black/5 hover:border-mint-primary/30 transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-mint-primary/10 rounded-xl flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-mint-darker" />
                    </div>
                    <h4 className="text-base md:text-lg font-black text-[#2d3436]">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* How it works */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-4xl font-black mb-12 md:mb-16 text-center text-[#2d3436]">
              Quy trình đơn giản
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  icon: UserPlus,
                  title: "Đăng ký đối tác",
                  description:
                    "Tạo tài khoản và cung cấp thông tin cửa hàng.",
                  color: "bg-blue-50",
                  iconColor: "text-blue-500",
                },
                {
                  icon: PlusCircle,
                  title: "Đăng bài thực phẩm",
                  description:
                    "Đăng tải thông tin và hình ảnh thực phẩm.",
                  color: "bg-orange-50",
                  iconColor: "text-orange-primary",
                },
                {
                  icon: Truck,
                  title: "Giao hàng & Hoàn tất",
                  description:
                    "Xác nhận đơn và trao thực phẩm cho khách.",
                  color: "bg-emerald-50",
                  iconColor: "text-mint-darker",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center px-4"
                >
                  <div
                    className={`w-28 h-28 md:w-32 md:h-32 ${item.color} rounded-[2.5rem] md:rounded-[3rem] flex items-center justify-center mb-6 shadow-sm`}
                  >
                    <item.icon
                      className={`w-10 h-10 md:w-12 md:h-12 ${item.iconColor}`}
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black mb-3 text-[#2d3436]">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-foreground/60 max-w-xs">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-mint-darker rounded-3xl p-8 md:p-12 lg:p-16 text-white text-center">
            <h2 className="text-2xl md:text-4xl font-black mb-4 md:mb-6">
              Sẵn sàng bắt đầu?
            </h2>
            <p className="text-base md:text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Tham gia cùng chúng tôi và trở thành một phần của cộng đồng Food
              Rescue.
            </p>
            <button className="px-8 md:px-12 py-4 md:py-5 bg-white text-mint-darker font-black rounded-2xl hover:bg-mint-light transition-all shadow-xl active:scale-95 text-sm md:text-lg">
              Bắt đầu hợp tác ngay
            </button>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
