import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HelpCircle, MessageCircle, Book, Video, Mail, Phone, Send, Search } from "lucide-react";
import Link from "next/link";

export default function HelpPage() {
  const helpCategories = [
    {
      icon: Book,
      title: "Hướng dẫn sử dụng",
      description: "Tìm hiểu cách sử dụng Food Rescue từ A đến Z",
      link: "/help/getting-started",
      color: "bg-mint-primary/10",
      iconColor: "text-mint-darker"
    },
    {
      icon: MessageCircle,
      title: "Liên hệ hỗ trợ",
      description: "Chat trực tiếp với đội ngũ hỗ trợ của chúng tôi",
      link: "/help/contact",
      color: "bg-peach-accent/10",
      iconColor: "text-peach-deep"
    },
    {
      icon: Video,
      title: "Video hướng dẫn",
      description: "Xem các video hướng dẫn chi tiết về các tính năng",
      link: "/help/videos",
      color: "bg-sage/10",
      iconColor: "text-sage"
    },
    {
      icon: Book,
      title: "Tài liệu",
      description: "Tải xuống tài liệu hướng dẫn chi tiết",
      link: "/help/docs",
      color: "bg-mint-primary/10",
      iconColor: "text-mint-darker"
    }
  ];

  const quickLinks = [
    { title: "Làm thế nào để đặt hàng?", link: "/faq" },
    { title: "Các phương thức thanh toán", link: "/faq" },
    { title: "Chính sách hoàn tiền", link: "/privacy" },
    { title: "Cách sử dụng mã QR", link: "/help/qr-code" },
    { title: "Hướng dẫn đăng ký đối tác", link: "/partners" },
    { title: "Câu hỏi thường gặp", link: "/faq" }
  ];

  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      <Navbar />
      
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-mint-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-10 h-10 text-mint-darker" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-[#2d3436]">
              Trung tâm <span className="text-mint-darker">Trợ giúp</span>
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-8">
              Chúng tôi ở đây để giúp bạn! Tìm câu trả lời, xem hướng dẫn hoặc liên hệ với đội ngũ hỗ trợ của chúng tôi.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Tìm kiếm câu trả lời..."
                className="w-full h-16 pl-16 pr-6 bg-white border border-black/5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-mint-primary/5 focus:border-mint-primary/30 transition-all font-medium text-lg shadow-sm"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-foreground/30" size={24} />
            </div>
          </div>

          {/* Help Categories */}
          <section className="mb-16">
            <h2 className="text-3xl font-black mb-8 text-center text-[#2d3436]">Chúng tôi có thể giúp gì cho bạn?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {helpCategories.map((category, i) => (
                <Link
                  key={i}
                  href={category.link}
                  className="bg-white rounded-2xl p-6 border border-black/5 hover:border-mint-primary/30 transition-all group"
                >
                  <div className={`w-14 h-14 ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <category.icon className={`w-7 h-7 ${category.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-black mb-2 text-[#2d3436]">{category.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">{category.description}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Quick Links */}
          <section className="mb-16">
            <h2 className="text-3xl font-black mb-8 text-center text-[#2d3436]">Liên kết nhanh</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.link}
                  className="bg-white rounded-xl p-4 border border-black/5 hover:border-mint-primary/30 hover:bg-mint-primary/5 transition-all flex items-center gap-3 group"
                >
                  <HelpCircle className="w-5 h-5 text-mint-darker group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-foreground/70 group-hover:text-mint-darker transition-colors">
                    {link.title}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Contact Support */}
          <section className="bg-mint-darker rounded-[3rem] p-12 lg:p-16 text-white">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4">Vẫn cần hỗ trợ?</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn 24/7. 
                Liên hệ với chúng tôi qua các kênh sau:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-black mb-2">Chat trực tuyến</h3>
                <p className="text-white/70 mb-4 text-sm">Trò chuyện với chúng tôi ngay bây giờ</p>
                <button className="px-6 py-3 bg-white text-mint-darker font-black rounded-xl hover:bg-mint-light transition-all">
                  Bắt đầu chat
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-black mb-2">Email hỗ trợ</h3>
                <p className="text-white/70 mb-4 text-sm">support@foodrescue.vn</p>
                <p className="text-white/60 text-xs">Phản hồi trong vòng 24 giờ</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-black mb-2">Hotline</h3>
                <p className="text-white/70 mb-4 text-sm">1900 123 456</p>
                <p className="text-white/60 text-xs">Thứ 2 - Chủ nhật: 8:00 - 22:00</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-black mb-6 text-center">Gửi yêu cầu hỗ trợ</h3>
              <form className="space-y-4 max-w-2xl mx-auto">
                <div>
                  <input
                    type="text"
                    placeholder="Tên của bạn"
                    className="w-full h-12 px-4 bg-white/20 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    className="w-full h-12 px-4 bg-white/20 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Mô tả vấn đề của bạn..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white/20 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-14 bg-white text-mint-darker font-black rounded-xl hover:bg-mint-light transition-all flex items-center justify-center gap-3"
                >
                  <Send size={20} />
                  Gửi yêu cầu
                </button>
              </form>
            </div>
          </section>

          {/* Additional Resources */}
          <section className="mt-16">
            <h2 className="text-3xl font-black mb-8 text-center text-[#2d3436]">Tài nguyên bổ sung</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/faq"
                className="bg-white rounded-2xl p-8 border border-black/5 hover:border-mint-primary/30 transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-mint-primary/10 rounded-xl flex items-center justify-center">
                    <HelpCircle className="w-6 h-6 text-mint-darker" />
                  </div>
                  <h3 className="text-xl font-black text-[#2d3436]">Câu hỏi thường gặp</h3>
                </div>
                <p className="text-foreground/60 leading-relaxed">
                  Tìm câu trả lời cho những câu hỏi phổ biến nhất về Food Rescue.
                </p>
              </Link>

              <Link
                href="/terms"
                className="bg-white rounded-2xl p-8 border border-black/5 hover:border-mint-primary/30 transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-mint-primary/10 rounded-xl flex items-center justify-center">
                    <Book className="w-6 h-6 text-mint-darker" />
                  </div>
                  <h3 className="text-xl font-black text-[#2d3436]">Điều khoản & Chính sách</h3>
                </div>
                <p className="text-foreground/60 leading-relaxed">
                  Xem các điều khoản sử dụng và chính sách bảo mật của chúng tôi.
                </p>
              </Link>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
