"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail,Phone,MapPin,Send,Building2,Users,Briefcase,CheckCircle2,} from "lucide-react";
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
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((r) => setTimeout(r, 1200));
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      alert("Có lỗi xảy ra");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      <Navbar />

      <div className="pt-28 sm:pt-32 pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* HERO */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 text-[#2d3436]">
              Liên hệ <span className="text-mint-darker">Hợp tác</span>
            </h1>
            <p className="text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto">
              Bạn muốn hợp tác với Food Rescue? Chúng tôi luôn tìm kiếm các đối tác
              chiến lược để tạo ra tác động tích cực cho cộng đồng.
            </p>
          </div>

          {/* PARTNERSHIP TYPES */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black mb-8 text-center text-[#2d3436]">
              Các hình thức hợp tác
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {[
                {
                  icon: Building2,
                  title: "Đối tác Nhà hàng",
                  desc: "Bán thực phẩm dư thừa với giá ưu đãi",
                },
                {
                  icon: Users,
                  title: "Đối tác Cộng đồng",
                  desc: "Lan tỏa thông điệp giảm lãng phí",
                },
                {
                  icon: Briefcase,
                  title: "Đối tác Doanh nghiệp",
                  desc: "Hợp tác chiến lược & tài trợ",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-5 sm:p-6 lg:p-8 border border-black/5"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-mint-primary/10 rounded-xl flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-mint-darker" />
                    </div>
                    <h3 className="font-black text-lg">{item.title}</h3>
                  </div>
                  <p className="text-foreground/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FORM + INFO */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* FORM */}
            <section className="bg-white rounded-2xl p-5 sm:p-6 lg:p-10 border border-black/5 lg:col-span-2 relative">
              {isSuccess ? (
                <div className="flex flex-col items-center text-center py-16">
                  <CheckCircle2 className="w-14 h-14 text-mint-darker mb-4" />
                  <h3 className="text-2xl sm:text-3xl font-black mb-3">
                    Gửi thành công!
                  </h3>
                  <p className="text-foreground/60 max-w-md">
                    Chúng tôi sẽ liên hệ với bạn trong vòng 24–48 giờ.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl sm:text-3xl font-black mb-6">
                    Gửi yêu cầu hợp tác
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {[
                      { name: "company", label: "Tên công ty / Tổ chức" },
                      { name: "name", label: "Họ và tên" },
                      { name: "email", label: "Email", type: "email" },
                      { name: "phone", label: "Số điện thoại" },
                    ].map((f) => (
                      <div key={f.name}>
                        <label className="block text-sm font-black mb-2">
                          {f.label}
                        </label>
                        <input
                          type={f.type || "text"}
                          name={f.name}
                          value={(formData as any)[f.name]}
                          onChange={handleInputChange}
                          className="w-full h-12 px-4 rounded-xl border border-black/5 focus:ring-4 focus:ring-mint-primary/10"
                          required
                        />
                      </div>
                    ))}

                    <div>
                      <label className="block text-sm font-black mb-2">
                        Nội dung
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-black/5 focus:ring-4 focus:ring-mint-primary/10 resize-none"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-mint-darker text-white rounded-xl font-black flex items-center justify-center gap-3"
                    >
                      <Send size={18} />
                      {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
                    </button>
                  </form>
                </>
              )}
            </section>

            {/* INFO */}
            <section className="space-y-6">
              <div className="bg-mint-darker text-white rounded-2xl p-6 sm:p-8 lg:p-10">
                <h3 className="text-xl sm:text-2xl font-black mb-6">
                  Thông tin liên hệ
                </h3>

                <div className="space-y-5 text-sm sm:text-base">
                  <div className="flex gap-3">
                    <MapPin /> TP. Hồ Chí Minh
                  </div>
                  <div className="flex gap-3">
                    <Mail /> partnership@foodrescue.vn
                  </div>
                  <div className="flex gap-3">
                    <Phone /> 1900 123 456
                  </div>
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
