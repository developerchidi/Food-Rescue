"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {ShoppingCart, CreditCard,Truck, Shield, User, Gift,Search,Minus,Plus,Phone, Mail,} from "lucide-react";
import { useState, useMemo } from "react";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  const toggleItem = (c: number, q: number) => {
    const key = `${c}-${q}`;
    setExpandedItems((p) => ({ ...p, [key]: !p[key] }));
  };

  const faqCategories = [
    {
      icon: ShoppingCart,
      title: "Mua hàng & Đơn hàng",
      description: "Hướng dẫn đặt hàng, thay đổi và hủy đơn",
      questions: [
        {
          q: "Làm thế nào để đặt mua thực phẩm giải cứu?",
          a: "Bạn chỉ cần duyệt marketplace, chọn món, xác nhận và nhận mã QR.",
        },
        {
          q: "Tôi có thể hủy đơn hàng không?",
          a: "Bạn có thể hủy trong vòng 30 phút sau khi đặt.",
        },
      ],
    },
    {
      icon: CreditCard,
      title: "Thanh toán",
      description: "Phương thức và hoàn tiền",
      questions: [
        {
          q: "Có những phương thức thanh toán nào?",
          a: "Thẻ, ví điện tử, chuyển khoản ngân hàng.",
        },
      ],
    },
    {
      icon: Truck,
      title: "Vận chuyển & Nhận hàng",
      description: "Giao hàng và nhận tại cửa hàng",
      questions: [
        {
          q: "Có những hình thức nhận hàng nào?",
          a: "Tự đến lấy hoặc giao tận nơi.",
        },
      ],
    },
    {
      icon: User,
      title: "Tài khoản",
      description: "Đăng ký & bảo mật",
      questions: [
        {
          q: "Làm sao để đăng ký?",
          a: "Đăng ký bằng email và xác nhận.",
        },
      ],
    },
    {
      icon: Gift,
      title: "Mystery Box",
      description: "Quà bất ngờ & ưu đãi",
      questions: [
        {
          q: "Mystery Box là gì?",
          a: "Hộp quà ngẫu nhiên với giá ưu đãi.",
        },
      ],
    },
    {
      icon: Shield,
      title: "Bảo mật & An toàn",
      description: "Chính sách & cam kết",
      questions: [
        {
          q: "Thông tin có được bảo mật không?",
          a: "Có, chúng tôi dùng SSL/TLS.",
        },
      ],
    },
  ];

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return faqCategories;
    const q = searchQuery.toLowerCase();
    return faqCategories
      .map((c) => ({
        ...c,
        questions: c.questions.filter(
          (i) =>
            i.q.toLowerCase().includes(q) ||
            i.a.toLowerCase().includes(q)
        ),
      }))
      .filter((c) => c.questions.length);
  }, [searchQuery]);

  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      <Navbar />

      <div className="pt-28 sm:pt-32 pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* HERO */}
          <div className="text-center mb-10 sm:mb-14">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5">
              Câu hỏi{" "}
              <span className="text-mint-darker">Thường gặp</span>
            </h1>
            <p className="text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto">
              Tổng hợp những câu hỏi phổ biến nhất để giúp bạn nhanh chóng
              sử dụng Food Rescue.
            </p>
          </div>

          {/* SEARCH */}
          <div className="mb-8">
            <div className="relative max-w-3xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm câu hỏi..."
                className="w-full h-12 sm:h-14 pl-11 pr-4 rounded-xl border border-black/5 focus:ring-4 focus:ring-mint-primary/10"
              />
            </div>
          </div>

          {/* FAQ LIST */}
          <div className="space-y-5">
            {filteredCategories.map((cat, ci) => (
              <div
                key={ci}
                className="bg-white rounded-2xl p-4 sm:p-6 border border-black/5"
              >
                <div className="flex gap-4 items-start mb-4 pb-4 border-b">
                  <div className="w-12 h-12 bg-mint-primary/10 rounded-xl flex items-center justify-center">
                    <cat.icon className="w-6 h-6 text-mint-darker" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-black">
                      {cat.title}
                    </h2>
                    <p className="text-sm sm:text-base text-foreground/60">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {cat.questions.map((faq, qi) => {
                    const open = expandedItems[`${ci}-${qi}`];
                    return (
                      <div
                        key={qi}
                        className={`rounded-xl ${
                          open
                            ? "bg-mint-primary/5"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <button
                          onClick={() => toggleItem(ci, qi)}
                          className="w-full px-4 sm:px-6 py-4 flex justify-between gap-4 text-left"
                        >
                          <span className="font-semibold text-sm sm:text-base">
                            {faq.q}
                          </span>
                          <span className="shrink-0">
                            {open ? (
                              <Minus className="text-mint-darker" />
                            ) : (
                              <Plus className="text-gray-500" />
                            )}
                          </span>
                        </button>

                        <div
                          className={`grid transition-all ${
                            open
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden px-4 sm:px-6 pb-4 text-sm sm:text-base text-foreground/70">
                            {faq.a}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 bg-[#2d3436] rounded-2xl p-6 sm:p-10 text-white text-center">
            <h3 className="text-xl sm:text-2xl font-black mb-4">
              Vẫn còn thắc mắc?
            </h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="tel:1900123456"
                className="px-6 py-3 rounded-xl bg-white/10 flex items-center justify-center gap-2"
              >
                <Phone size={18} /> 1900 123 456
              </a>
              <a
                href="mailto:support@foodrescue.vn"
                className="px-6 py-3 rounded-xl bg-white/10 flex items-center justify-center gap-2"
              >
                <Mail size={18} /> support@foodrescue.vn
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
