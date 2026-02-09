import Image from "next/image";
import { Store, TrendingUp, Heart } from "lucide-react";

const BENEFITS = [
  {
    icon: Store,
    title: "Tăng doanh thu",
    desc: "Giảm thiểu tổn thất tài chính từ thực phẩm không bán hết."
  },
  {
    icon: TrendingUp,
    title: "Tìm khách hàng mới",
    desc: "Tiếp cận cộng đồng người dùng quan tâm đến môi trường."
  },
  {
    icon: Heart,
    title: "Xây dựng thương hiệu",
    desc: "Nâng cao hình ảnh trách nhiệm xã hội và sống xanh."
  }
];

export default function PartnerSection() {
  return (
    <section id="partners" className="overflow-hidden bg-white py-24">
      <div className="container mx-auto px-6">
        <div className="relative rounded-[3rem] bg-mint-darker p-8 text-white lg:p-12">
          <div className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/2 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-16 lg:flex-row">
            {/* Left */}
            <div className="lg:w-1/2">
              <h2 className="mb-2 text-5xl font-black leading-tight">
                Bạn là chủ nhà hàng?
              </h2>
              <p className="mb-10 text-xl text-white/70">
                Biến thực phẩm dư thừa thành doanh thu và giá trị cho cộng đồng.
              </p>

              <div className="mb-10 grid gap-8 sm:grid-cols-2">
                {BENEFITS.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                      <item.icon className="h-6 w-6 text-mint-primary" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-bold">{item.title}</h4>
                      <p className="text-sm text-white/60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="rounded-2xl bg-white px-10 py-5 font-black text-mint-darker transition hover:bg-mint-light active:scale-95">
                Bắt đầu hợp tác ngay
              </button>
            </div>

            {/* Right */}
            <div className="lg:w-1/2">
              <div className="rounded-[3rem] border border-white/10 bg-white/10 p-12 backdrop-blur-md">
                <div className="mb-12 text-center">
                  <div className="text-7xl font-black">150+</div>
                  <p className="mt-2 text-sm font-bold uppercase tracking-widest text-white/60">
                    Thương hiệu tin tưởng
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-10">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="relative h-16 w-28 overflow-hidden rounded-lg border border-white/10 bg-white/10"
                    >
                      <Image
                        src={`/partners/logo-${i}.png`}
                        alt={`Partner ${i}`}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
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
