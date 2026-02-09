"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const NavLink = ({
  href,
  label,
}: {
  href: string;
  label: string;
}) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`font-medium transition-colors ${
        active
          ? "text-mint-darker"
          : "text-foreground/50 hover:text-mint-darker"
      }`}
    >
      {label}
    </Link>
  );
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/5 pt-20 sm:pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-3xl font-black tracking-tight text-sage block mb-4"
            >
              Food<span className="text-mint-darker">Rescue</span>
            </Link>
            <p className="text-foreground/50 leading-relaxed mb-8 max-w-xs">
              Chúng tôi tận dụng công nghệ để kết nối cộng đồng, giảm thiểu lãng
              phí thực phẩm và bảo vệ môi trường.
            </p>

            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <button
                  key={i}
                  aria-label="social"
                  className="w-10 h-10 rounded-full bg-sage/5 flex items-center justify-center text-sage hover:bg-mint-darker hover:text-white transition"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-lg font-black mb-4 text-[#2d3436]">
              Khám phá
            </h4>
            <ul className="space-y-2">
              <li><NavLink href="/" label="Trang chủ" /></li>
              <li><NavLink href="/marketplace" label="Bản đồ thực phẩm" /></li>
              <li><NavLink href="/about" label="Về chúng tôi" /></li>
              <li><NavLink href="/partners" label="Đối tác & Merchant" /></li>
              <li><NavLink href="/impact" label="Tác động cộng đồng" /></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-black mb-4 text-[#2d3436]">
              Hỗ trợ
            </h4>
            <ul className="space-y-2">
              <li><NavLink href="/terms" label="Điều khoản sử dụng" /></li>
              <li><NavLink href="/privacy" label="Chính sách bảo mật" /></li>
              <li><NavLink href="/faq" label="Câu hỏi thường gặp" /></li>
              <li><NavLink href="/help" label="Trung tâm trợ giúp" /></li>
              <li><NavLink href="/contact" label="Liên hệ hợp tác" /></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-black mb-4 text-[#2d3436]">
              Liên hệ
            </h4>
            <ul className="space-y-3">
              <li className="flex gap-3 items-start">
                <MapPin size={18} className="text-mint-darker mt-0.5" />
                <span className="text-foreground/50 text-sm font-medium">
                  Toà nhà Green Tech, Quận 1, TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={18} className="text-mint-darker" />
                <span className="text-foreground/50 text-sm font-medium">
                  hello@foodrescue.vn
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={18} className="text-mint-darker" />
                <span className="text-foreground/50 text-sm font-medium">
                  1900 123 456
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-foreground/30 text-sm font-medium text-center md:text-left">
            © 2026 Food Rescue Project. Powered by Green Tech for a better world.
          </p>

          <div className="flex gap-6">
            <button className="text-foreground/30 text-sm font-medium hover:text-foreground/50">
              VN
            </button>
            <button className="text-foreground/30 text-sm font-medium hover:text-foreground/50">
              EN
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
