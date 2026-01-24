import { Store, TrendingUp, Heart } from "lucide-react";

export default function PartnerSection() {
  return (
    <section id="partners" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="bg-mint-darker rounded-[4rem] p-8 lg:p-12 text-white relative overflow-hidden">
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white opacity-5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

          <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="w-full lg:w-1/2">
              <h2 className="text-5xl font-black mb-2 leading-tight">
                Bạn là chủ nhà hàng?
              </h2>
              <p className="text-xl text-white/70 mb-2 leading-relaxed">
                Tham gia mạng lưới Food Rescue để biến thực phẩm dư thừa thành doanh thu và giá trị cho cộng đồng.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-4">
                {[
                  { icon: Store, title: "Tăng doanh thu", desc: "Giảm thiểu tổn thất tài chính từ thực phẩm không bán hết." },
                  { icon: TrendingUp, title: "Tìm khách hàng mới", desc: "Tiếp cận cộng đồng người dùng quan tâm đến môi trường." },
                  { icon: Heart, title: "Xây dựng thương hiệu", desc: "Nâng cao hình ảnh trách nhiệm xã hội và sống xanh." }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-mint-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="px-10 py-5 bg-white text-mint-darker font-black rounded-2xl hover:bg-mint-light transition-all shadow-xl active:scale-95">
                Bắt đầu hợp tác ngay
              </button>
            </div>

            {/* Illustration / Stats Box */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white/10 backdrop-blur-md rounded-[3rem] p-12 border border-white/10">
                <div className="text-center">
                  <div className="text-7xl font-black mb-4">150+</div>
                  <p className="text-lg text-white/60 mb-12 uppercase tracking-[0.2em] font-bold">Thương hiệu tin tưởng</p>
                </div>

                <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                  {/* Placeholder for Logos */}
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="w-20 h-12 bg-white rounded-lg flex items-center justify-center font-bold text-mint-darker text-xs">LOGO</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
