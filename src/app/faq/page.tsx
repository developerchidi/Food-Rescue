import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HelpCircle, ShoppingCart, CreditCard, Truck, Shield, User, Gift, MapPin } from "lucide-react";

export default function FAQPage() {
  const faqCategories = [
    {
      icon: ShoppingCart,
      title: "Mua hàng & Đơn hàng",
      questions: [
        {
          q: "Làm thế nào để đặt mua thực phẩm giải cứu?",
          a: "Bạn chỉ cần duyệt qua marketplace, chọn món ăn bạn muốn giải cứu, nhấn 'Giải cứu ngay', chọn số lượng và phương thức nhận hàng (tự đến lấy hoặc giao tận nhà), sau đó xác nhận đơn hàng. Bạn sẽ nhận được mã QR để nhận hàng."
        },
        {
          q: "Tôi có thể hủy đơn hàng sau khi đã đặt không?",
          a: "Bạn có thể hủy đơn hàng trong vòng 30 phút sau khi đặt. Sau thời gian này, vui lòng liên hệ trực tiếp với đối tác hoặc bộ phận hỗ trợ khách hàng của chúng tôi."
        },
        {
          q: "Thực phẩm giải cứu có đảm bảo chất lượng không?",
          a: "Tất cả thực phẩm trên Food Rescue đều được kiểm tra và đảm bảo an toàn. Tuy nhiên, vì đây là thực phẩm gần hết hạn, chúng tôi khuyến nghị bạn sử dụng ngay sau khi nhận. Nếu phát hiện vấn đề về chất lượng, vui lòng liên hệ ngay với chúng tôi."
        },
        {
          q: "Tôi có thể đặt nhiều món từ cùng một đối tác không?",
          a: "Có, bạn hoàn toàn có thể đặt nhiều món từ cùng một đối tác trong một đơn hàng để tiết kiệm thời gian và chi phí vận chuyển."
        }
      ]
    },
    {
      icon: CreditCard,
      title: "Thanh toán",
      questions: [
        {
          q: "Các phương thức thanh toán nào được chấp nhận?",
          a: "Chúng tôi chấp nhận thanh toán qua thẻ tín dụng, thẻ ghi nợ, ví điện tử (MoMo, ZaloPay, VNPay), và chuyển khoản ngân hàng. Thanh toán được xử lý an toàn qua các cổng thanh toán uy tín."
        },
        {
          q: "Khi nào tôi cần thanh toán?",
          a: "Thanh toán được thực hiện ngay khi bạn xác nhận đơn hàng. Đơn hàng chỉ được xử lý sau khi thanh toán thành công."
        },
        {
          q: "Tôi có được hoàn tiền nếu không hài lòng không?",
          a: "Nếu bạn gặp vấn đề với chất lượng thực phẩm hoặc đơn hàng không đúng như mô tả, vui lòng liên hệ hỗ trợ trong vòng 24 giờ. Chúng tôi sẽ xem xét và xử lý hoàn tiền nếu hợp lệ."
        }
      ]
    },
    {
      icon: Truck,
      title: "Vận chuyển & Nhận hàng",
      questions: [
        {
          q: "Tôi có thể chọn phương thức nhận hàng nào?",
          a: "Bạn có thể chọn tự đến lấy tại cửa hàng (PICKUP) hoặc giao tận nhà (DELIVERY). Với phương thức giao hàng, bạn cần cung cấp địa chỉ và số điện thoại liên hệ."
        },
        {
          q: "Phí vận chuyển là bao nhiêu?",
          a: "Phí vận chuyển phụ thuộc vào khoảng cách và đối tác vận chuyển. Bạn sẽ thấy phí vận chuyển trước khi xác nhận đơn hàng. Một số đối tác cung cấp miễn phí vận chuyển cho đơn hàng trên một giá trị nhất định."
        },
        {
          q: "Tôi cần làm gì khi nhận hàng?",
          a: "Khi đến nhận hàng, bạn cần xuất trình mã QR đã nhận được sau khi đặt hàng. Đối với giao hàng, đối tác sẽ liên hệ với bạn trước để xác nhận thời gian giao hàng."
        },
        {
          q: "Tôi có thể thay đổi địa chỉ giao hàng sau khi đặt không?",
          a: "Bạn có thể thay đổi địa chỉ giao hàng trong vòng 1 giờ sau khi đặt hàng. Sau thời gian này, vui lòng liên hệ trực tiếp với đối tác hoặc bộ phận hỗ trợ."
        }
      ]
    },
    {
      icon: User,
      title: "Tài khoản",
      questions: [
        {
          q: "Làm thế nào để đăng ký tài khoản?",
          a: "Bạn có thể đăng ký bằng cách nhấn nút 'Đăng nhập' ở góc trên bên phải, chọn 'Đăng ký', điền thông tin email, mật khẩu và tên của bạn. Sau đó xác nhận email để kích hoạt tài khoản."
        },
        {
          q: "Tôi quên mật khẩu, làm sao để lấy lại?",
          a: "Trên trang đăng nhập, nhấn 'Quên mật khẩu', nhập email của bạn. Chúng tôi sẽ gửi link đặt lại mật khẩu qua email. Vui lòng kiểm tra hộp thư (kể cả thư mục spam)."
        },
        {
          q: "Tôi có thể xóa tài khoản của mình không?",
          a: "Có, bạn có thể xóa tài khoản trong phần Cài đặt tài khoản. Lưu ý: Việc xóa tài khoản là vĩnh viễn và không thể hoàn tác. Một số thông tin có thể được giữ lại theo yêu cầu pháp lý."
        },
        {
          q: "Làm thế nào để cập nhật thông tin cá nhân?",
          a: "Bạn có thể cập nhật thông tin cá nhân trong phần 'Tài khoản' hoặc 'Cài đặt'. Thông tin sẽ được cập nhật ngay lập tức."
        }
      ]
    },
    {
      icon: Gift,
      title: "Mystery Box & Ưu đãi",
      questions: [
        {
          q: "Mystery Box là gì?",
          a: "Mystery Box là hộp quà bí ẩn chứa các món ăn ngẫu nhiên từ đối tác với giá cực kỳ ưu đãi (thường chỉ 30% giá gốc). Bạn sẽ không biết chính xác món gì bên trong cho đến khi nhận hàng - tạo cảm giác bất ngờ thú vị!"
        },
        {
          q: "Tôi có thể chọn món trong Mystery Box không?",
          a: "Không, Mystery Box được thiết kế để tạo sự bất ngờ. Tuy nhiên, bạn có thể chọn loại Mystery Box (ví dụ: đồ chay, đồ mặn, đồ ngọt) nếu đối tác cung cấp các lựa chọn này."
        },
        {
          q: "Có chương trình khuyến mãi nào không?",
          a: "Chúng tôi thường xuyên có các chương trình khuyến mãi, giảm giá đặc biệt và mã giảm giá. Hãy theo dõi trang chủ và email để không bỏ lỡ các ưu đãi hấp dẫn."
        }
      ]
    },
    {
      icon: Shield,
      title: "Bảo mật & An toàn",
      questions: [
        {
          q: "Thông tin của tôi có được bảo mật không?",
          a: "Có, chúng tôi sử dụng mã hóa SSL/TLS để bảo vệ thông tin của bạn. Thông tin thanh toán được xử lý bởi các cổng thanh toán uy tín và không được lưu trữ trên hệ thống của chúng tôi. Xem thêm trong Chính sách Bảo mật."
        },
        {
          q: "Tôi có thể tin tưởng các đối tác trên Food Rescue không?",
          a: "Tất cả đối tác đều được chúng tôi xác minh và kiểm tra kỹ lưỡng trước khi được phép đăng bán. Chúng tôi có hệ thống đánh giá và phản hồi để đảm bảo chất lượng dịch vụ."
        },
        {
          q: "Điều gì xảy ra nếu tôi gặp vấn đề với đơn hàng?",
          a: "Nếu bạn gặp bất kỳ vấn đề nào, vui lòng liên hệ ngay với bộ phận hỗ trợ khách hàng qua email support@foodrescue.vn hoặc hotline 1900 123 456. Chúng tôi sẽ xử lý trong vòng 24 giờ."
        }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      <Navbar />
      
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-mint-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-10 h-10 text-mint-darker" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-[#2d3436]">
              Câu hỏi <span className="text-mint-darker">Thường gặp</span>
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Tìm câu trả lời cho những thắc mắc phổ biến về Food Rescue. 
              Không tìm thấy câu trả lời? Liên hệ với chúng tôi!
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Tìm kiếm câu hỏi..."
                className="w-full h-14 pl-14 pr-6 bg-white border border-black/5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-mint-primary/5 focus:border-mint-primary/30 transition-all font-medium text-lg shadow-sm"
              />
              <HelpCircle className="absolute left-5 top-1/2 -translate-y-1/2 text-foreground/30" size={22} />
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <section key={categoryIndex} className="bg-white rounded-2xl p-8 lg:p-10 border border-black/5">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-mint-primary/10 rounded-xl flex items-center justify-center">
                    <category.icon className="w-7 h-7 text-mint-darker" />
                  </div>
                  <h2 className="text-3xl font-black text-[#2d3436]">{category.title}</h2>
                </div>
                
                <div className="space-y-6">
                  {category.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="border-b border-black/5 last:border-0 pb-6 last:pb-0">
                      <h3 className="text-xl font-black mb-3 text-[#2d3436] flex items-start gap-3">
                        <span className="text-mint-darker font-black shrink-0">Q:</span>
                        <span>{faq.q}</span>
                      </h3>
                      <p className="text-foreground/70 leading-relaxed ml-8">
                        <span className="text-mint-darker font-bold">A: </span>
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Contact Section */}
          <section className="mt-16 bg-mint-primary/10 rounded-2xl p-8 lg:p-10 border border-mint-primary/20">
            <div className="text-center">
              <h3 className="text-3xl font-black mb-4 text-[#2d3436]">Vẫn còn thắc mắc?</h3>
              <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
                Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn. 
                Liên hệ với chúng tôi qua các kênh sau:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl border border-black/5">
                  <MapPin className="text-mint-darker" size={20} />
                  <span className="font-bold text-foreground/70">Tòa nhà Green Tech, Q1, HCM</span>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl border border-black/5">
                  <Shield className="text-mint-darker" size={20} />
                  <span className="font-bold text-foreground/70">support@foodrescue.vn</span>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl border border-black/5">
                  <User className="text-mint-darker" size={20} />
                  <span className="font-bold text-foreground/70">1900 123 456</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
