"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HelpCircle, MessageCircle, Book, Video, Mail, Phone, Send, Search, CheckCircle2, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HelpPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (error) {
      alert("Có lỗi xảy ra. Vui lòng thử lại sáu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [isFocused, setIsFocused] = useState(false);

  // Search Filtering Logic
  const filteredCategories = helpCategories.filter(cat =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLinks = quickLinks.filter(link =>
    link.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasResults = filteredCategories.length > 0 || filteredLinks.length > 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChatClick = () => {
    alert("Đang kết nối với nhân viên hỗ trợ...\n(Tính năng Chat sẽ sớm ra mắt!)");
  };

  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      <Navbar />

      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-8xl">
          {/* Hero Section */}
          <div className="text-center mb-16 relative z-10">
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-[#2d3436]">
              Trung tâm <span className="text-mint-darker">Trợ giúp</span>
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-8">
              Chúng tôi ở đây để giúp bạn! Tìm câu trả lời, xem hướng dẫn hoặc liên hệ với đội ngũ hỗ trợ của chúng tôi.
            </p>

            {/* Search Bar Container */}
            <div className="relative max-w-8xl mx-auto">
              <form onSubmit={handleSearch} className="relative z-20">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                  placeholder="Tìm kiếm câu trả lời..."
                  className={`w-full h-16 pl-16 pr-6 bg-white border rounded-2xl focus:outline-none focus:ring-4 focus:ring-mint-primary/5 transition-all font-medium text-lg shadow-sm ${isFocused && searchQuery ? 'rounded-b-none border-b-0 border-mint-primary/30' : 'border-black/5 focus:border-mint-primary/30'
                    }`}
                />
                <button type="submit" className="absolute left-5 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-mint-darker transition-colors">
                  <Search size={24} />
                </button>
              </form>

              {/* Dropdown Results */}
              {isFocused && searchQuery && (
                <div className="absolute top-16 left-0 right-0 bg-white border border-t-0 border-mint-primary/30 rounded-b-2xl shadow-xl overflow-hidden z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                  {!hasResults ? (
                    <div className="p-8 text-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Search size={24} className="text-gray-400" />
                      </div>
                      <p className="text-foreground/60 font-medium">
                        Không tìm thấy kết quả nào cho "{searchQuery}"
                      </p>
                    </div>
                  ) : (
                    <div className="max-h-[60vh] overflow-y-auto">
                      {filteredCategories.length > 0 && (
                        <div className="p-2">
                          <h4 className="px-4 py-2 text-xs font-bold text-foreground/40 uppercase tracking-wider">Danh mục</h4>
                          {filteredCategories.map((category, i) => (
                            <Link
                              key={i}
                              href={category.link}
                              className="flex items-center gap-4 p-4 hover:bg-mint-primary/5 rounded-xl transition-colors group"
                            >
                              <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center shrink-0`}>
                                <category.icon className={`w-5 h-5 ${category.iconColor}`} />
                              </div>
                              <div className="text-left">
                                <h3 className="font-bold text-[#2d3436] group-hover:text-mint-darker transition-colors">{category.title}</h3>
                                <p className="text-sm text-foreground/60 line-clamp-1">{category.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}

                      {filteredLinks.length > 0 && (
                        <div className="p-2 border-t border-black/5">
                          <h4 className="px-4 py-2 text-xs font-bold text-foreground/40 uppercase tracking-wider">Liên kết nhanh</h4>
                          {filteredLinks.map((link, i) => (
                            <Link
                              key={i}
                              href={link.link}
                              className="flex items-center gap-3 p-4 hover:bg-mint-primary/5 rounded-xl transition-colors group"
                            >
                              <HelpCircle className="w-5 h-5 text-mint-darker/60 group-hover:text-mint-darker transition-colors" />
                              <span className="font-medium text-foreground/70 group-hover:text-mint-darker transition-colors">
                                {link.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
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
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 ${category.color} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                      <category.icon className={`w-7 h-7 ${category.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-black text-[#2d3436]">{category.title}</h3>
                  </div>
                  <p className="text-foreground/60 text-sm leading-relaxed">{category.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-16 items-start">
            {/* Quick Links - Sidebar Style */}
            <section className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl p-8 border border-black/5 h-full">
                <h2 className="text-2xl font-black mb-6 text-[#2d3436]">Liên kết nhanh</h2>
                <div className="grid grid-cols-1 gap-3">
                  {quickLinks.map((link, i) => (
                    <Link
                      key={i}
                      href={link.link}
                      className="group flex items-center gap-4 p-4 rounded-xl hover:bg-mint-primary/5 border border-transparent hover:border-mint-primary/20 transition-all bg-gray-50"
                    >
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm text-mint-darker group-hover:scale-110 transition-transform">
                        <HelpCircle size={20} />
                      </div>
                      <span className="font-bold text-foreground/70 group-hover:text-mint-darker transition-colors">{link.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* Contact Support - Compacted */}
            <section className="lg:col-span-3 bg-mint-darker rounded-[1.5rem] p-6 lg:p-8 text-white h-full flex flex-col">
              <div className="mb-6 shrink-0">
                <h2 className="text-3xl font-black mb-2">Vẫn cần hỗ trợ?</h2>
                <p className="text-lg text-white/70">
                  Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn 24/7.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 grow">
                {/* Left Side: Contact Form (3/5) */}
                <div className="lg:col-span-3 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 relative overflow-hidden order-2 lg:order-1 flex flex-col">
                  <h3 className="text-xl font-black mb-4 flex items-center gap-2 shrink-0">
                    <Send size={20} className="text-white/70" />
                    Gửi yêu cầu
                  </h3>

                  {isSuccess ? (
                    <div className="absolute inset-0 bg-mint-darker flex flex-col items-center justify-center text-center p-6 animate-in fade-in zoom-in duration-300 z-10">
                      <div className="w-16 h-16 bg-white/20 text-white rounded-full flex items-center justify-center mb-4">
                        <CheckCircle2 size={32} className="animate-bounce" />
                      </div>
                      <h3 className="text-2xl font-black text-white mb-2">Đã gửi!</h3>
                      <p className="text-white/70 text-sm mb-6">Chúng tôi sẽ sớm phản hồi.</p>
                      <button
                        onClick={() => setIsSuccess(false)}
                        className="px-6 py-2 bg-white text-mint-darker font-bold rounded-xl hover:bg-mint-light transition-all text-sm"
                      >
                        Gửi lại
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-3 flex-1 flex flex-col">
                      <div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Tên của bạn"
                          disabled={isSubmitting}
                          className="w-full h-10 px-3 bg-white/20 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all disabled:opacity-50 text-base"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="Email của bạn"
                          disabled={isSubmitting}
                          className="w-full h-10 px-3 bg-white/20 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all disabled:opacity-50 text-base"
                        />
                      </div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Mô tả vấn đề..."
                        rows={4}
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 bg-white/20 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all resize-none disabled:opacity-50 text-base grow"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-10 bg-white text-mint-darker font-bold rounded-lg hover:bg-mint-light transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-base shrink-0"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-mint-darker/30 border-t-mint-darker rounded-full animate-spin" />
                            Đang gửi...
                          </>
                        ) : (
                          <>
                            Gửi yêu cầu
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>

                {/* Right Side: Contact Methods (2/5) */}
                <div className="lg:col-span-2 flex flex-col gap-6 order-1 lg:order-2 h-max">
                  <div className="flex items-center gap-5 bg-white/10 rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-colors flex-1">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                      <MessageCircle className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg mb-1">Chat trực tuyến</h3>
                      <button onClick={handleChatClick} className="text-white/80 text-sm md:text-base font-medium hover:text-white hover:underline transition-colors text-left truncate w-full">Bắt đầu chat ngay</button>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 bg-white/10 rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-colors flex-1">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg mb-1">Email hỗ trợ</h3>
                      <a href="mailto:support@foodrescue.vn" className="text-white/80 text-sm md:text-base font-medium hover:text-white hover:underline transition-colors block truncate">support@foodrescue.vn</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 bg-white/10 rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-colors flex-1">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                      <Phone className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg mb-1">Hotline</h3>
                      <a href="tel:1900123456" className="text-white/80 text-sm md:text-base font-medium hover:text-white hover:underline transition-colors block truncate">1900 123 456</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 bg-white/10 rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-colors flex-1">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg mb-1">Văn phòng</h3>
                      <span className="text-white/80 text-sm md:text-base font-medium block truncate">Tòa nhà Green Tech, Q1, HCM</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

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
