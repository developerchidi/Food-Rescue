import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FileText, Shield, AlertCircle, CheckCircle2 } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      <Navbar />

      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-8xl">
          {/* Hero Section */}
          <div className="text-center mb-6">
            {/* <div className="w-20 h-20 bg-mint-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-mint-darker" />
            </div> */}
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-[#2d3436]">
              Điều khoản <span className="text-mint-darker">Sử dụng</span>
            </h1>
            <p className="text-lg text-foreground/70">
              Cập nhật lần cuối: 25 tháng 1, 2026
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-6">
            <div className="bg-white rounded-2xl p-8 border border-black/5">
              <p className="text-foreground/70 leading-relaxed">
                Chào mừng bạn đến với Food Rescue. Bằng cách truy cập và sử dụng nền tảng của chúng tôi,
                bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu trong tài liệu này.
                Vui lòng đọc kỹ trước khi sử dụng dịch vụ của chúng tôi.
              </p>
            </div>
          </section>

          {/* Terms Sections */}
          <div className="space-y-6">
            {[
              {
                icon: Shield,
                title: "1. Chấp nhận điều khoản",
                content: [
                  "Bằng việc truy cập hoặc sử dụng Food Rescue, bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý bị ràng buộc bởi các điều khoản này.",
                  "Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng dịch vụ của chúng tôi."
                ]
              },
              {
                icon: CheckCircle2,
                title: "2. Định nghĩa dịch vụ",
                content: [
                  "Food Rescue là nền tảng kết nối các nhà hàng, cửa hàng thực phẩm có thực phẩm dư thừa với người tiêu dùng.",
                  "Chúng tôi cung cấp dịch vụ trung gian và không chịu trách nhiệm về chất lượng, an toàn thực phẩm của các sản phẩm được đăng bán.",
                  "Người bán (đối tác) chịu trách nhiệm về chất lượng và an toàn của thực phẩm họ cung cấp."
                ]
              },
              {
                icon: AlertCircle,
                title: "3. Trách nhiệm người dùng",
                content: [
                  "Bạn phải đảm bảo thông tin đăng ký tài khoản là chính xác và cập nhật.",
                  "Bạn chịu trách nhiệm bảo mật thông tin tài khoản và mật khẩu của mình.",
                  "Bạn không được sử dụng dịch vụ cho mục đích bất hợp pháp hoặc vi phạm quyền của người khác.",
                  "Bạn phải tuân thủ tất cả các luật và quy định hiện hành khi sử dụng dịch vụ."
                ]
              },
              {
                icon: FileText,
                title: "4. Quyền và nghĩa vụ",
                content: [
                  "Người mua có quyền nhận thực phẩm đúng như mô tả và trong tình trạng tốt.",
                  "Người bán có nghĩa vụ cung cấp thông tin chính xác về sản phẩm và đảm bảo chất lượng.",
                  "Food Rescue có quyền từ chối hoặc chấm dứt dịch vụ đối với bất kỳ người dùng nào vi phạm điều khoản.",
                  "Chúng tôi có quyền cập nhật, sửa đổi hoặc thay đổi các điều khoản này bất cứ lúc nào."
                ]
              },
              {
                icon: Shield,
                title: "5. Miễn trừ trách nhiệm",
                content: [
                  "Food Rescue không chịu trách nhiệm về bất kỳ thiệt hại nào phát sinh từ việc sử dụng dịch vụ.",
                  "Chúng tôi không đảm bảo tính liên tục, không bị gián đoạn hoặc không có lỗi của dịch vụ.",
                  "Người dùng sử dụng dịch vụ với rủi ro của chính họ."
                ]
              },
              {
                icon: AlertCircle,
                title: "6. Giải quyết tranh chấp",
                content: [
                  "Mọi tranh chấp phát sinh sẽ được giải quyết thông qua thương lượng thiện chí.",
                  "Nếu không thể giải quyết, tranh chấp sẽ được đưa ra Tòa án có thẩm quyền tại TP. Hồ Chí Minh, Việt Nam.",
                  "Luật áp dụng: Pháp luật nước Cộng hòa Xã hội Chủ nghĩa Việt Nam."
                ]
              }
            ].map((section, i) => (
              <section key={i} className="bg-white rounded-2xl p-8 border border-black/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-mint-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <section.icon className="w-6 h-6 text-mint-darker" />
                  </div>
                  <h2 className="text-2xl font-black text-[#2d3436]">{section.title}</h2>
                </div>
                <ul className="space-y-4">
                  {section.content.map((item, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="text-mint-darker font-black mt-1">•</span>
                      <span className="text-foreground/70 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {/* Contact Section */}
          <section className="mt-6 bg-mint-primary/10 rounded-2xl p-8 border border-mint-primary/20">
            <h3 className="text-xl font-black mb-4 text-[#2d3436]">Liên hệ với chúng tôi</h3>
            <p className="text-foreground/70 leading-relaxed mb-4">
              Nếu bạn có bất kỳ câu hỏi nào về các điều khoản sử dụng này, vui lòng liên hệ với chúng tôi:
            </p>
            <div className="space-y-2 text-foreground/70">
              <p><strong>Email:</strong> nguyenchidi.dev@gmail.com</p>
              <p><strong>Điện thoại:</strong> 0352 641 606</p>
              <p><strong>Địa chỉ:</strong> Tòa nhà Green Tech, Quận 1, TP. Hồ Chí Minh</p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
