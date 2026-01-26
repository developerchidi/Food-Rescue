"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HelpCircle, ShoppingCart, CreditCard, Truck, Shield, User, Gift, MapPin, Search, ChevronDown, Minus, Plus, Phone, Mail, MessageCircle } from "lucide-react";
import { useState, useMemo } from "react";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const faqCategories = [
    {
      icon: ShoppingCart,
      title: "Mua hàng & Đơn hàng",
      description: "Hướng dẫn đặt hàng, thay đổi và hủy đơn",
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
      description: "Phương thức, hoàn tiền và bảo mật",
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
      description: "Giao hàng, phí ship và điểm nhận hàng",
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
      description: "Đăng ký, bảo mật và cài đặt",
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
      description: "Quà tặng bất ngờ và mã giảm giá",
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
      description: "Chính sách và cam kết chất lượng",
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

  // Filtering Logic
  const filteredCategories = useMemo(() => {
    if (!searchQuery) return faqCategories;

    const query = searchQuery.toLowerCase();

    return faqCategories.map(cat => ({
      ...cat,
      questions: cat.questions.filter(q =>
        q.q.toLowerCase().includes(query) ||
        q.a.toLowerCase().includes(query)
      )
    })).filter(cat => cat.questions.length > 0);
  }, [searchQuery]);

  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      <Navbar />

      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-8xl">
          {/* Hero Section */}
          <div className="text-center mb-4 relative">
            {/* <div className="w-20 h-20 bg-mint-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 transform -rotate-3 border border-mint-primary/20">
              <HelpCircle className="w-10 h-10 text-mint-darker" />
            </div> */}

            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-[#2d3436]">
              Câu hỏi <span className="text-mint-darker relative inline-block">
                Thường gặp
                {/* <svg className="absolute w-full h-3 -bottom-1 left-0 text-mint-accent/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path width="100%" height="100%" d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg> */}
              </span>
            </h1>

            <p className="text-xl text-foreground/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              Bạn có thắc mắc? Đừng lo, chúng tôi đã tổng hợp những câu hỏi phổ biến nhất tại đây để giúp bạn.
            </p>

            {/* Search Bar */}
            <div className="max-w-8xl mx-auto relative z-10">
              <div className="relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Nhập từ khóa để tìm kiếm (ví dụ: thanh toán, hủy đơn...)"
                  className="w-full h-16 pl-14 pr-6 bg-white border border-black/5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-mint-primary/10 focus:border-mint-primary/30 transition-all font-medium text-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] placeholder:text-gray-400 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-mint-darker transition-colors" size={24} />
              </div>
            </div>
          </div>

          {/* Results Stats */}
          {searchQuery && (
            <div className="text-start mb-4 animate-in fade-in slide-in-from-bottom-2">
              <p className="text-foreground/60 font-medium bg-white inline-block px-4 py-2 rounded-full border border-black/5">
                Tìm thấy {filteredCategories.reduce((acc, cat) => acc + cat.questions.length, 0)} kết quả cho "{searchQuery}"
              </p>
            </div>
          )}

          {/* FAQ Content */}
          <div className="space-y-4">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, catIndex) => (
                <div
                  key={catIndex}
                  className="bg-white rounded-[1.5rem] p-4 border border-black/5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                >
                  {/* Category Header */}
                  <div className="flex items-start md:items-center gap-5 mb-4 pb-4 border-b border-gray-100">
                    <div className="w-16 h-16 bg-mint-primary/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <category.icon className="w-8 h-8 text-mint-darker" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-[#2d3436] mb-1">{category.title}</h2>
                      <p className="text-foreground/60">{category.description}</p>
                    </div>
                  </div>

                  {/* Questions Accordion */}
                  <div className="space-y-3">
                    {category.questions.map((faq, index) => {
                      const isOpen = expandedItems[`${catIndex}-${index}`];
                      return (
                        <div
                          key={index}
                          className={`rounded-xl transition-all duration-300 ${isOpen ? 'bg-mint-primary/5' : 'hover:bg-gray-50'}`}
                        >
                          <button
                            onClick={() => toggleItem(catIndex, index)}
                            className="w-full text-left px-6 py-4 flex items-start justify-between gap-4"
                          >
                            <span className={`font-bold text-lg leading-relaxed ${isOpen ? 'text-mint-darker' : 'text-[#2d3436]'}`}>
                              {faq.q}
                            </span>
                            <span className={`shrink-0 mt-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                              {isOpen ? (
                                <div className="w-6 h-6 bg-mint-darker text-white rounded-full flex items-center justify-center">
                                  <Minus size={14} strokeWidth={3} />
                                </div>
                              ) : (
                                <div className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center group-hover:bg-mint-primary/20 group-hover:text-mint-darker transition-colors">
                                  <Plus size={14} strokeWidth={3} />
                                </div>
                              )}
                            </span>
                          </button>

                          <div
                            className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                          >
                            <div className="overflow-hidden">
                              <p className="px-6 pb-6 text-foreground/70 leading-relaxed">
                                {faq.a}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy kết quả</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  Chúng tôi không tìm thấy câu trả lời nào phù hợp với từ khóa của bạn. Hãy thử tìm kiếm với từ khóa khác hoặc liên hệ trực tiếp.
                </p>
              </div>
            )}
          </div>

          {/* Contact CTA */}
          <section className="mt-8">
            <div className="bg-[#2d3436] rounded-[1.5rem] p-10 md:p-14 text-white relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-mint-primary opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-peach-primary opacity-10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="text-center md:text-left max-w-xl">
                  <h2 className="text-3xl md:text-4xl font-black mb-4">Vẫn còn thắc mắc?</h2>
                  <p className="text-white/60 text-lg leading-relaxed mb-8">
                    Nếu bạn không tìm thấy câu trả lời mình cần, đừng ngần ngại liên hệ với đội ngũ hỗ trợ thân thiện của chúng tôi.
                  </p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <a href="tel:1900123456" className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/10 font-medium">
                      <Phone size={20} className="text-mint-primary" />
                      <span>1900 123 456</span>
                    </a>
                    <a href="mailto:support@foodrescue.vn" className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/10 font-medium">
                      <Mail size={20} className="text-peach-primary" />
                      <span>support@foodrescue.vn</span>
                    </a>
                  </div>
                </div>

                <div className="shrink-0 bg-white/5 p-2 rounded-3xl border border-white/10 backdrop-blur-sm">
                  <div className="bg-white/5 rounded-2xl p-6 text-center w-full md:w-64">
                    {/* <div className="w-16 h-16 bg-mint-primary rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#2d3436] shadow-lg shadow-mint-primary/20">
                      <MessageCircle size={32} strokeWidth={2.5} />
                    </div> */}
                    <h3 className="font-bold text-xl mb-1">Chat ngay</h3>
                    <p className="text-white/50 text-sm mb-4">Phản hồi trong 5 phút</p>
                    <button className="w-full py-3 bg-white text-[#2d3436] font-black rounded-xl hover:bg-mint-light transition-colors">
                      Bắt đầu chat
                    </button>
                  </div>
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
