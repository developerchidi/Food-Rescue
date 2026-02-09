"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {HelpCircle, MessageCircle, Book, Video, Mail, Phone, Send, Search, CheckCircle2, MapPin,} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HelpPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const helpCategories = [
    {
      icon: Book,
      title: "Hướng dẫn sử dụng",
      description: "Tìm hiểu cách sử dụng Food Rescue từ A đến Z",
      link: "/help/getting-started",
      color: "bg-mint-primary/10",
      iconColor: "text-mint-darker",
    },
    {
      icon: MessageCircle,
      title: "Liên hệ hỗ trợ",
      description: "Chat trực tiếp với đội ngũ hỗ trợ",
      link: "/help/contact",
      color: "bg-peach-accent/10",
      iconColor: "text-peach-deep",
    },
    {
      icon: Video,
      title: "Video hướng dẫn",
      description: "Xem video hướng dẫn chi tiết",
      link: "/help/videos",
      color: "bg-sage/10",
      iconColor: "text-sage",
    },
    {
      icon: Book,
      title: "Tài liệu",
      description: "Tải tài liệu hướng dẫn",
      link: "/help/docs",
      color: "bg-mint-primary/10",
      iconColor: "text-mint-darker",
    },
  ];

  const quickLinks = [
    { title: "Làm thế nào để đặt hàng?", link: "/faq" },
    { title: "Phương thức thanh toán", link: "/faq" },
    { title: "Chính sách hoàn tiền", link: "/privacy" },
    { title: "Cách sử dụng mã QR", link: "/help/qr-code" },
    { title: "Đăng ký đối tác", link: "/partners" },
    { title: "Câu hỏi thường gặp", link: "/faq" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    }, 1200);
  };

  const filteredCategories = helpCategories.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLinks = quickLinks.filter((l) =>
    l.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      <Navbar />

      <div className="pt-24 md:pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">

          {/* HERO */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4">
              Trung tâm <span className="text-mint-darker">Trợ giúp</span>
            </h1>
            <p className="text-sm sm:text-base text-foreground/70 max-w-xl mx-auto mb-6">
              Tìm câu trả lời, xem hướng dẫn hoặc liên hệ hỗ trợ
            </p>

            {/* SEARCH */}
            <div className="relative max-w-2xl mx-auto">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 150)}
                placeholder="Tìm kiếm..."
                className="w-full h-12 sm:h-14 pl-12 pr-4 rounded-xl border bg-white focus:ring-2 focus:ring-mint-primary/20"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              {isFocused && searchQuery && (
                <div className="absolute top-full left-0 right-0 bg-white rounded-xl shadow-lg mt-2 max-h-64 overflow-y-auto z-20">
                  {[...filteredCategories, ...filteredLinks].map((item, i) => (
                    <Link
                      key={i}
                      href={item.link}
                      className="block px-4 py-3 hover:bg-mint-primary/5 text-sm"
                    >
                      {"title" in item ? item.title : item}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CATEGORIES */}
          <section className="mb-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {helpCategories.map((c, i) => (
                <Link
                  key={i}
                  href={c.link}
                  className="bg-white rounded-xl p-5 border hover:border-mint-primary/30 transition"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 ${c.color} rounded-lg flex items-center justify-center`}>
                      <c.icon className={`w-5 h-5 ${c.iconColor}`} />
                    </div>
                    <h3 className="font-bold">{c.title}</h3>
                  </div>
                  <p className="text-sm text-foreground/60">{c.description}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* CONTACT */}
          <section className="bg-mint-darker rounded-2xl p-5 md:p-8 text-white grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 order-2 lg:order-1">
              <h3 className="font-black text-lg mb-3">Gửi yêu cầu</h3>

              {isSuccess ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="mx-auto mb-3" />
                  <p>Gửi thành công 🎉</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    placeholder="Tên"
                    className="w-full h-10 px-3 rounded-lg bg-white/20"
                  />
                  <input
                    placeholder="Email"
                    className="w-full h-10 px-3 rounded-lg bg-white/20"
                  />
                  <textarea
                    placeholder="Nội dung"
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg bg-white/20"
                  />
                  <button className="w-full h-10 bg-white text-mint-darker rounded-lg font-bold">
                    Gửi
                  </button>
                </form>
              )}
            </div>

            <div className="lg:col-span-2 order-1 lg:order-2 space-y-4">
              {[MessageCircle, Mail, Phone, MapPin].map((Icon, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-white/10 p-4 rounded-xl"
                >
                  <Icon />
                  <span className="text-sm">Liên hệ hỗ trợ</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
