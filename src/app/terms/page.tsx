import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FileText, Shield, AlertCircle, CheckCircle2 } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#fdfcf8] font-sans">
      <Navbar />

      <div className="pt-28 sm:pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          {/* HERO */}
          <header className="text-center mb-12">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#2d3436]">
              Điều khoản{" "}
              <span className="text-mint-darker">Sử dụng</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-foreground/60">
              Cập nhật lần cuối: 25 tháng 1, 2026
            </p>
          </header>

          {/* INTRO */}
          <section className="mb-10">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/5">
              <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                Chào mừng bạn đến với Food Rescue. Bằng cách truy cập và sử dụng nền
                tảng của chúng tôi, bạn đồng ý tuân thủ các điều khoản và điều kiện
                được nêu trong tài liệu này. Vui lòng đọc kỹ trước khi sử dụng dịch
                vụ.
              </p>
            </div>
          </section>

          {/* TERMS */}
          <div className="space-y-8">
            {[
              {
                icon: Shield,
                title: "1. Chấp nhận điều khoản",
                content: [
                  "Bằng việc truy cập hoặc sử dụng Food Rescue, bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý bị ràng buộc bởi các điều khoản này.",
                  "Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng dịch vụ."
                ]
              },
              {
                icon: CheckCircle2,
                title: "2. Định nghĩa dịch vụ",
                content: [
                  "Food Rescue là nền tảng kết nối các nhà hàng, cửa hàng thực phẩm có thực phẩm dư thừa với người tiêu dùng.",
                  "Chúng tôi chỉ đóng vai trò trung gian và không chịu trách nhiệm về chất lượng thực phẩm.",
                  "Người bán chịu trách nhiệm hoàn toàn về an toàn và chất lượng sản phẩm."
                ]
              },
              {
                icon: AlertCircle,
                title: "3. Trách nhiệm người dùng",
                content: [
                  "Cung cấp thông tin tài khoản chính xác và cập nhật.",
                  "Bảo mật thông tin đăng nhập của bạn.",
                  "Không sử dụng dịch vụ cho mục đích trái pháp luật.",
                  "Tuân thủ các quy định pháp luật hiện hành."
                ]
              },
              {
                icon: FileText,
                title: "4. Quyền và nghĩa vụ",
                content: [
                  "Người mua có quyền nhận thực phẩm đúng mô tả.",
                  "Người bán có nghĩa vụ cung cấp thông tin chính xác.",
                  "Food Rescue có quyền chấm dứt dịch vụ nếu phát hiện vi phạm.",
                  "Điều khoản có thể được cập nhật mà không cần báo trước."
                ]
              },
              {
                icon: Shield,
                title: "5. Miễn trừ trách nhiệm",
                content: [
                  "Food Rescue không chịu trách nhiệm về các thiệt hại phát sinh.",
                  "Không đảm bảo dịch vụ luôn hoạt động liên tục.",
                  "Người dùng tự chịu rủi ro khi sử dụng nền tảng."
                ]
              },
              {
                icon: AlertCircle,
                title: "6. Giải quyết tranh chấp",
                content: [
                  "Ưu tiên thương lượng thiện chí.",
                  "Nếu không đạt được thỏa thuận, tranh chấp sẽ do Tòa án TP.HCM giải quyết.",
                  "Luật áp dụng: Pháp luật Việt Nam."
                ]
              }
            ].map((section, i) => (
              <section
                key={i}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-black/5"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-mint-primary/10 rounded-xl flex items-center justify-center">
                    <section.icon className="w-5 h-5 sm:w-6 sm:h-6 text-mint-darker" />
                  </div>
                  <h2 className="text-lg sm:text-2xl font-black text-[#2d3436]">
                    {section.title}
                  </h2>
                </div>

                <ul className="space-y-3 sm:space-y-4">
                  {section.content.map((item, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="text-mint-darker font-black">•</span>
                      <span className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {/* CONTACT */}
          <section className="mt-12 bg-mint-primary/10 rounded-2xl p-6 sm:p-8 border border-mint-primary/20">
            <h3 className="text-lg sm:text-xl font-black mb-4 text-[#2d3436]">
              Liên hệ với chúng tôi
            </h3>
            <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-4">
              Nếu bạn có bất kỳ câu hỏi nào liên quan đến điều khoản sử dụng, vui
              lòng liên hệ:
            </p>

            <div className="space-y-2 text-sm sm:text-base text-foreground/70">
              <p><strong>Email:</strong> nguyenchidi.dev@gmail.com</p>
              <p><strong>Điện thoại:</strong> 0352 641 606</p>
              <p><strong>Địa chỉ:</strong> Quận 1, TP. Hồ Chí Minh</p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
