import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Store, TrendingUp, Heart, CheckCircle2, Users, Award, BarChart3, Shield, UserPlus, PlusCircle, Truck } from "lucide-react";

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      <Navbar />

      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-[#2d3436]">
              Đối tác & <span className="text-mint-darker">Merchant</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Tham gia mạng lưới Food Rescue để biến thực phẩm dư thừa thành doanh thu và giá trị cho cộng đồng.
            </p>
          </div>

          {/* Benefits Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-black mb-12 text-center text-[#2d3436]">Lợi ích khi tham gia</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Store,
                  title: "Tăng doanh thu",
                  description: "Giảm thiểu tổn thất tài chính từ thực phẩm không bán hết. Biến thực phẩm dư thừa thành nguồn thu mới."
                },
                {
                  icon: TrendingUp,
                  title: "Tìm khách hàng mới",
                  description: "Tiếp cận cộng đồng người dùng quan tâm đến môi trường. Mở rộng thị trường và tăng độ nhận diện thương hiệu."
                },
                {
                  icon: Heart,
                  title: "Xây dựng thương hiệu",
                  description: "Nâng cao hình ảnh trách nhiệm xã hội và sống xanh. Tạo dấu ấn tích cực trong lòng khách hàng."
                }
              ].map((benefit, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 border border-black/5 hover:border-mint-primary/30 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-mint-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <benefit.icon className="w-7 h-7 text-mint-darker" />
                    </div>
                    <h3 className="text-xl font-black text-[#2d3436]">{benefit.title}</h3>
                  </div>
                  <p className="text-foreground/60 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section className="mb-20">
            <div className="bg-mint-darker rounded-[1.5rem] p-12 lg:p-16 text-white">
              <div className="text-center mb-12">
                <div className="text-7xl font-black mb-4">150+</div>
                <p className="text-2xl text-white/70 mb-8 uppercase tracking-[0.2em] font-bold">Thương hiệu tin tưởng</p>
                <p className="text-lg text-white/60 max-w-2xl mx-auto">
                  Hàng trăm nhà hàng, cửa hàng thực phẩm đã tham gia mạng lưới Food Rescue và tạo ra tác động tích cực cho cộng đồng.
                </p>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-black mb-12 text-center text-[#2d3436]">Tính năng dành cho đối tác</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: BarChart3,
                  title: "Dashboard quản lý",
                  description: "Theo dõi doanh thu và thống kê bán hàng trực quan"
                },
                {
                  icon: Shield,
                  title: "Bảo mật cao",
                  description: "Hệ thống thanh toán và dữ liệu được bảo vệ an toàn"
                },
                {
                  icon: Users,
                  title: "Hỗ trợ 24/7",
                  description: "Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ"
                },
                {
                  icon: Award,
                  title: "Chứng nhận xanh",
                  description: "Nhận chứng nhận đối tác bền vững từ Food Rescue"
                }
              ].map((feature, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-black/5 hover:border-mint-primary/30 transition-all flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-mint-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <feature.icon className="w-6 h-6 text-mint-darker" />
                    </div>
                    <h4 className="text-lg font-black text-[#2d3436]">{feature.title}</h4>
                  </div>
                  <p className="text-sm text-foreground/60 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How It Works Section */}
          <section className="mb-24">
            <h2 className="text-4xl font-black mb-16 text-center text-[#2d3436]">Quy trình đơn giản</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  icon: UserPlus,
                  title: "Đăng ký đối tác",
                  description: "Tạo tài khoản đối tác nhanh chóng và cung cấp thông tin cửa hàng.",
                  color: "bg-blue-50",
                  iconColor: "text-blue-500"
                },
                {
                  icon: PlusCircle,
                  title: "Đăng bài thực phẩm",
                  description: "Tải lên hình ảnh và thông tin về thực phẩm cần giải cứu lên hệ thống.",
                  color: "bg-orange-50",
                  iconColor: "text-orange-primary"
                },
                {
                  icon: Truck,
                  title: "Giao hàng & Hoàn tất",
                  description: "Xác nhận đơn hàng và trao thực phẩm tận tay khách hàng của bạn.",
                  color: "bg-emerald-50",
                  iconColor: "text-mint-darker"
                }
              ].map((item, i) => (
                <div key={i} className="relative flex flex-col items-center text-center group px-4">
                  {/* Connector Line (Desktop Only) */}
                  {i < 2 && (
                    <div className="hidden md:block absolute top-16 left-1/2 w-full h-[2px] bg-black/5" />
                  )}

                  <div className={`w-32 h-32 ${item.color} rounded-[3rem] flex items-center justify-center mb-8 relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm`}>
                    <item.icon className={`w-12 h-12 ${item.iconColor}`} />
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center font-black text-foreground/20 text-xl border border-black/5">
                      0{i + 1}
                    </div>
                  </div>

                  <h3 className="text-2xl font-black mb-4 text-[#2d3436]">{item.title}</h3>
                  <p className="text-foreground/60 leading-relaxed max-w-[280px]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-mint-darker rounded-[1.5rem] p-12 lg:p-16 text-white text-center">
            <h2 className="text-4xl font-black mb-6">Sẵn sàng bắt đầu?</h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              Tham gia cùng chúng tôi ngay hôm nay và trở thành một phần của cộng đồng Food Rescue.
            </p>
            <button className="px-12 py-5 bg-white text-mint-darker font-black rounded-2xl hover:bg-mint-light transition-all shadow-xl active:scale-95 text-lg">
              Bắt đầu hợp tác ngay
            </button>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
