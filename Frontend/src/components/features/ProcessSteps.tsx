import { Search, ShoppingBag, Truck } from "lucide-react";

export default function ProcessSteps() {
  const steps = [
    {
      title: "Tìm món ăn",
      description: "Duyệt qua danh sách thực phẩm tươi ngon đang chờ giải cứu gần bạn.",
      icon: Search,
      color: "bg-blue-50",
      iconColor: "text-blue-500"
    },
    {
      title: "Đặt hàng nhanh",
      description: "Thanh toán dễ dàng và giữ món ăn với mức giá ưu đãi cực lớn.",
      icon: ShoppingBag,
      color: "bg-orange-50",
      iconColor: "text-orange-primary"
    },
    {
      title: "Tới lấy hoặc Ship",
      description: "Chọn phương thức nhận hàng thuận tiện nhất cho bạn.",
      icon: Truck,
      color: "bg-emerald-50",
      iconColor: "text-mint-darker"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-black mb-6 text-[#2d3436]">Giải cứu trong tầm tay</h2>
          <p className="text-foreground/60 text-lg">Chỉ với 3 bước đơn giản, bạn đã góp phần giảm lãng phí thực phẩm và tiết kiệm chi phí cho chính mình.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center group">
              {/* Connector Line (Desktop Only) */}
              {index < 2 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-[2px] bg-black/5" />
              )}

              <div className={`w-32 h-32 ${step.color} rounded-[3rem] flex items-center justify-center mb-8 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                <step.icon className={`w-12 h-12 ${step.iconColor}`} />
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center font-black text-foreground/20 text-xl border border-black/5">
                  0{index + 1}
                </div>
              </div>

              <h3 className="text-2xl font-black mb-4 text-[#2d3436]">{step.title}</h3>
              <p className="text-foreground/60 leading-relaxed max-w-[280px]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
