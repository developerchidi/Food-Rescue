"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Handshake, Mail, Phone, MapPin, Send, Building2, Users, Briefcase, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    type: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: 'PARTNERSHIP', // Signal API to use partnership template
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          type: formData.type,
          message: formData.message
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setFormData({ company: "", name: "", email: "", phone: "", type: "", message: "" });
    } catch (error) {
      alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      <Navbar />

      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-8xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-[#2d3436]">
              Liên hệ <span className="text-mint-darker">Hợp tác</span>
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Bạn muốn hợp tác với Food Rescue? Chúng tôi luôn tìm kiếm các đối tác chiến lược để cùng nhau tạo ra tác động tích cực cho cộng đồng và môi trường.
            </p>
          </div>

          {/* Partnership Types */}
          <section className="mb-6">
            <h2 className="text-3xl font-black mb-8 text-center text-[#2d3436]">Các hình thức hợp tác</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Building2,
                  title: "Đối tác Nhà hàng",
                  description: "Tham gia mạng lưới Food Rescue để bán thực phẩm dư thừa với giá ưu đãi",
                  color: "bg-mint-primary/10",
                  iconColor: "text-mint-darker"
                },
                {
                  icon: Users,
                  title: "Đối tác Cộng đồng",
                  description: "Tổ chức, hiệp hội muốn lan tỏa thông điệp giảm lãng phí thực phẩm",
                  color: "bg-peach-accent/10",
                  iconColor: "text-peach-deep"
                },
                {
                  icon: Briefcase,
                  title: "Đối tác Doanh nghiệp",
                  description: "Công ty, tập đoàn muốn hợp tác chiến lược hoặc tài trợ",
                  color: "bg-sage/10",
                  iconColor: "text-sage"
                }
              ].map((type, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 border border-black/5 hover:border-mint-primary/30 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 ${type.color} rounded-xl flex items-center justify-center shrink-0`}>
                      <type.icon className={`w-7 h-7 ${type.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-black text-[#2d3436]">{type.title}</h3>
                  </div>
                  <p className="text-foreground/60 leading-relaxed">{type.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Form & Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contact Form */}
            <section className="bg-white rounded-2xl p-8 lg:p-10 border border-black/5 lg:col-span-2 relative overflow-hidden">
              {isSuccess ? (
                <div className="absolute inset-0 bg-white flex flex-col items-center justify-center text-center p-8 animate-in fade-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-mint-primary/20 text-mint-darker rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="animate-bounce" />
                  </div>
                  <h3 className="text-3xl font-black text-[#2d3436] mb-4">Gửi yêu cầu thành công!</h3>
                  <p className="text-foreground/60 max-w-md mx-auto mb-8">
                    Cảm ơn bạn đã quan tâm. Đội ngũ Food Rescue sẽ liên hệ lại với bạn qua email hoặc số điện thoại trong vòng 24 giờ tới.
                  </p>
                  <button
                    onClick={() => { setIsSuccess(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-8 py-3 bg-mint-primary/10 text-mint-darker font-bold rounded-xl hover:bg-mint-primary/20 transition-all"
                  >
                    Gửi yêu cầu khác
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-black mb-6 text-[#2d3436]">Gửi yêu cầu hợp tác</h2>
                  <p className="text-foreground/60 mb-8 leading-relaxed">
                    Điền thông tin bên dưới và chúng tôi sẽ liên hệ với bạn trong vòng 24-48 giờ.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-black text-[#2d3436] mb-2">
                        Tên công ty / Tổ chức <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        placeholder="Nhập tên công ty của bạn"
                        className="w-full h-12 px-4 bg-white border border-black/5 rounded-xl focus:outline-none focus:ring-4 focus:ring-mint-primary/5 focus:border-mint-primary/30 transition-all font-medium disabled:opacity-50 disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-black text-[#2d3436] mb-2">
                        Họ và tên <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        placeholder="Nhập họ và tên của bạn"
                        className="w-full h-12 px-4 bg-white border border-black/5 rounded-xl focus:outline-none focus:ring-4 focus:ring-mint-primary/5 focus:border-mint-primary/30 transition-all font-medium disabled:opacity-50 disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-black text-[#2d3436] mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        placeholder="your@email.com"
                        className="w-full h-12 px-4 bg-white border border-black/5 rounded-xl focus:outline-none focus:ring-4 focus:ring-mint-primary/5 focus:border-mint-primary/30 transition-all font-medium disabled:opacity-50 disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-black text-[#2d3436] mb-2">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        placeholder="0123 456 789"
                        className="w-full h-12 px-4 bg-white border border-black/5 rounded-xl focus:outline-none focus:ring-4 focus:ring-mint-primary/5 focus:border-mint-primary/30 transition-all font-medium disabled:opacity-50 disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-black text-[#2d3436] mb-2">
                        Loại hình hợp tác <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full h-12 px-4 bg-white border border-black/5 rounded-xl focus:outline-none focus:ring-4 focus:ring-mint-primary/5 focus:border-mint-primary/30 transition-all font-medium disabled:opacity-50 disabled:bg-gray-50"
                      >
                        <option value="">Chọn loại hình hợp tác</option>
                        <option value="Đối tác Nhà hàng">Đối tác Nhà hàng</option>
                        <option value="Đối tác Cộng đồng">Đối tác Cộng đồng</option>
                        <option value="Đối tác Doanh nghiệp">Đối tác Doanh nghiệp</option>
                        <option value="Khác">Khác</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-black text-[#2d3436] mb-2">
                        Mô tả đề xuất hợp tác <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        rows={5}
                        placeholder="Vui lòng mô tả chi tiết về đề xuất hợp tác của bạn..."
                        className="w-full px-4 py-3 bg-white border border-black/5 rounded-xl focus:outline-none focus:ring-4 focus:ring-mint-primary/5 focus:border-mint-primary/30 transition-all font-medium resize-none disabled:opacity-50 disabled:bg-gray-50"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-mint-darker text-white font-black rounded-xl hover:bg-mint-dark transition-all shadow-xl shadow-mint-darker/20 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Đang gửi...
                        </>
                      ) : (
                        <>
                          <Send size={20} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                          Gửi yêu cầu hợp tác
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </section>

            {/* Contact Information */}
            <section className="space-y-6">
              <div className="bg-mint-darker rounded-2xl p-8 lg:p-10 text-white">
                <h2 className="text-3xl font-black mb-6">Thông tin liên hệ</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-black mb-1">Địa chỉ</h3>
                      <p className="text-white/70 leading-relaxed">
                        Tòa nhà Green Tech, Quận 1, TP. Hồ Chí Minh, Việt Nam
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-black mb-1">Email</h3>
                      <p className="text-white/70">partnership@foodrescue.vn</p>
                      <p className="text-white/60 text-sm">Phản hồi trong vòng 24-48 giờ</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-black mb-1">Hotline</h3>
                      <p className="text-white/70">1900 123 456</p>
                      <p className="text-white/60 text-sm">Thứ 2 - Chủ nhật: 8:00 - 22:00</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Partner Section */}
              <div className="bg-white rounded-2xl p-8 border border-black/5">
                <h3 className="text-2xl font-black mb-6 text-[#2d3436]">Tại sao hợp tác với chúng tôi?</h3>
                <ul className="space-y-4">
                  {[
                    "Mạng lưới đối tác rộng lớn với 150+ nhà hàng và cửa hàng thực phẩm",
                    "Cộng đồng người dùng tích cực với hơn 5,800+ thành viên",
                    "Tác động xã hội và môi trường được công nhận",
                    "Hỗ trợ marketing và quảng bá thương hiệu",
                    "Hệ thống công nghệ hiện đại và dễ sử dụng",
                    "Đội ngũ hỗ trợ chuyên nghiệp 24/7"
                  ].map((benefit, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-mint-darker font-black shrink-0">✓</span>
                      <span className="text-foreground/70 leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links */}
              <div className="bg-mint-primary/10 rounded-2xl p-6 border border-mint-primary/20">
                <h4 className="font-black mb-4 text-[#2d3436]">Tài liệu liên quan</h4>
                <div className="space-y-2">
                  <a href="/partners" className="block text-sm font-medium text-mint-darker hover:underline">
                    → Xem thông tin đối tác
                  </a>
                  <a href="/about" className="block text-sm font-medium text-mint-darker hover:underline">
                    → Về chúng tôi
                  </a>
                  <a href="/impact" className="block text-sm font-medium text-mint-darker hover:underline">
                    → Tác động cộng đồng
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
