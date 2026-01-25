"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="bg-white border-t border-black/5 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-3xl font-black tracking-tight text-sage mb-4 block">
              Food<span className="text-mint-darker">Rescue</span>
            </Link>
            <p className="text-foreground/50 leading-relaxed mb-8 max-w-[280px]">
              Chúng tôi tận dụng công nghệ để kết nối cộng đồng, giảm thiểu lãng phí thực phẩm và bảo vệ môi trường.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-full bg-sage/5 flex items-center justify-center text-sage hover:bg-mint-darker hover:text-white transition-all">
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-black mb-4 text-[#2d3436]">Khám phá</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className={`transition-colors font-medium ${
                    pathname === "/" 
                      ? "text-mint-darker" 
                      : "text-foreground/50 hover:text-mint-darker"
                  }`}
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link 
                  href="/marketplace" 
                  className={`transition-colors font-medium ${
                    pathname === "/marketplace" 
                      ? "text-mint-darker" 
                      : "text-foreground/50 hover:text-mint-darker"
                  }`}
                >
                  Bản đồ thực phẩm
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className={`transition-colors font-medium ${
                    pathname === "/about" 
                      ? "text-mint-darker" 
                      : "text-foreground/50 hover:text-mint-darker"
                  }`}
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link 
                  href="/partners" 
                  className={`transition-colors font-medium ${
                    pathname === "/partners" 
                      ? "text-mint-darker" 
                      : "text-foreground/50 hover:text-mint-darker"
                  }`}
                >
                  Đối tác & Merchant
                </Link>
              </li>
              <li>
                <Link 
                  href="/impact" 
                  className={`transition-colors font-medium ${
                    pathname === "/impact" 
                      ? "text-mint-darker" 
                      : "text-foreground/50 hover:text-mint-darker"
                  }`}
                >
                  Tác động cộng đồng
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-black mb-4 text-[#2d3436]">Hỗ trợ</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/terms" 
                  className={`transition-colors font-medium ${
                    pathname === "/terms" 
                      ? "text-mint-darker" 
                      : "text-foreground/50 hover:text-mint-darker"
                  }`}
                >
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy" 
                  className={`transition-colors font-medium ${
                    pathname === "/privacy" 
                      ? "text-mint-darker" 
                      : "text-foreground/50 hover:text-mint-darker"
                  }`}
                >
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq" 
                  className={`transition-colors font-medium ${
                    pathname === "/faq" 
                      ? "text-mint-darker" 
                      : "text-foreground/50 hover:text-mint-darker"
                  }`}
                >
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/50 hover:text-mint-darker transition-colors font-medium">
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/50 hover:text-mint-darker transition-colors font-medium">
                  Liên hệ hợp tác
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-lg font-black mb-4 text-[#2d3436]">Liên hệ</h4>
            <ul className="space-y-2">
              <li className="flex gap-4 items-start">
                <MapPin className="text-mint-darker shrink-0" size={20} />
                <span className="text-foreground/50 text-sm font-medium">Toà nhà Green Tech, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex gap-4 items-center">
                <Mail className="text-mint-darker shrink-0" size={20} />
                <span className="text-foreground/50 text-sm font-medium">hello@foodrescue.vn</span>
              </li>
              <li className="flex gap-4 items-center">
                <Phone className="text-mint-darker shrink-0" size={20} />
                <span className="text-foreground/50 text-sm font-medium">1900 123 456</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-foreground/30 text-sm font-medium">
            © 2026 Food Rescue Project. Powered by Green Tech for a better world.
          </p>
          <div className="flex gap-8">
            <span className="text-foreground/30 text-sm font-medium hover:text-foreground/50 cursor-pointer">VN</span>
            <span className="text-foreground/30 text-sm font-medium hover:text-foreground/50 cursor-pointer">EN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
