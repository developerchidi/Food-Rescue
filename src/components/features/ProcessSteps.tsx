import { Search, ShoppingBag, Truck } from "lucide-react";

export default function ProcessSteps() {
  const steps = [
    {
      title: "Tìm món ăn",
      description:
        "Duyệt qua danh sách thực phẩm tươi ngon đang chờ giải cứu gần bạn.",
      icon: Search,
      color: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      title: "Đặt hàng nhanh",
      description:
        "Thanh toán dễ dàng và giữ món ăn với mức giá ưu đãi cực lớn.",
      icon: ShoppingBag,
      color: "bg-orange-50",
      iconColor: "text-orange-primary",
    },
    {
      title: "Tới lấy hoặc Ship",
      description:
        "Chọn phương thức nhận hàng thuận tiện nhất cho bạn.",
      icon: Truck,
      color: "bg-emerald-50",
      iconColor: "text-mint-darker",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 sm:py-24 bg-white"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black mb-4 text-[#2d3436]">
            Giải cứu trong tầm tay
          </h2>
          <p className="text-foreground/60 text-base sm:text-lg">
            Chỉ với 3 bước đơn giản, bạn đã góp phần giảm lãng phí thực phẩm
            và tiết kiệm chi phí cho chính mình.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-[72px] left-1/2 w-full h-[2px] bg-black/5" />
              )}

              {/* Icon box */}
              <div
                className={`
                  relative z-10 mb-6
                  w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32
                  ${step.color}
                  rounded-[2.5rem]
                  flex items-center justify-center
                  transition-transform duration-500
                  group-hover:scale-110 group-hover:rotate-3
                `}
              >
                <step.icon
                  className={`w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 ${step.iconColor}`}
                />

                {/* Step number */}
                <div className="absolute -top-2 -right-2 w-9 h-9 bg-white rounded-full flex items-center justify-center border border-black/5 shadow-md">
                  <span className="text-sm font-black text-foreground/40">
                    0{index + 1}
                  </span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl sm:text-2xl font-black mb-3 text-[#2d3436]">
                {step.title}
              </h3>
              <p className="text-foreground/60 leading-relaxed max-w-[280px] text-sm sm:text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
