import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {Shield,Lock,Eye,Database,UserCheck,AlertTriangle} from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      <Navbar />

      <div className="pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          {/* Hero */}
          <div className="text-center mb-10 md:mb-14">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight mb-4 md:mb-6 text-[#2d3436]">
              Chính sách <span className="text-mint-darker">Bảo mật</span>
            </h1>
            <p className="text-sm md:text-lg text-foreground/70">
              Cập nhật lần cuối: 25 tháng 1, 2026
            </p>
          </div>

          {/* Intro */}
          <section className="mb-6">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-black/5">
              <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                Food Rescue cam kết bảo vệ quyền riêng tư và thông tin cá nhân của
                bạn. Chính sách bảo mật này giải thích cách chúng tôi thu thập,
                sử dụng, lưu trữ và bảo vệ thông tin khi bạn sử dụng dịch vụ.
              </p>
            </div>
          </section>

          {/* Sections */}
          <div className="space-y-6">
            {[
              {
                icon: Database,
                title: "1. Thông tin chúng tôi thu thập",
                content: [
                  "Thông tin cá nhân: Tên, email, số điện thoại, địa chỉ.",
                  "Thông tin thanh toán: Được xử lý bởi bên thứ ba an toàn.",
                  "Thông tin sử dụng: Lịch sử giao dịch, đánh giá.",
                  "Thông tin thiết bị: IP, trình duyệt, hệ điều hành.",
                  "Cookies và công nghệ theo dõi.",
                ],
              },
              {
                icon: Eye,
                title: "2. Cách chúng tôi sử dụng thông tin",
                content: [
                  "Cung cấp và cải thiện dịch vụ.",
                  "Giao tiếp và hỗ trợ người dùng.",
                  "Phát hiện và ngăn chặn gian lận.",
                  "Phân tích và nghiên cứu hành vi.",
                  "Marketing (có thể từ chối).",
                ],
              },
              {
                icon: Lock,
                title: "3. Bảo mật thông tin",
                content: [
                  "Mã hóa SSL/TLS.",
                  "Máy chủ lưu trữ an toàn.",
                  "Truy cập nội bộ có kiểm soát.",
                  "Cập nhật biện pháp bảo mật.",
                  "Người dùng tự bảo mật mật khẩu.",
                ],
              },
              {
                icon: UserCheck,
                title: "4. Chia sẻ thông tin",
                content: [
                  "Chia sẻ với đối tác dịch vụ cần thiết.",
                  "Tuân thủ yêu cầu pháp lý.",
                  "Bảo vệ quyền và an toàn hệ thống.",
                  "Không bán dữ liệu cá nhân.",
                ],
              },
              {
                icon: Shield,
                title: "5. Quyền của bạn",
                content: [
                  "Quyền truy cập dữ liệu.",
                  "Quyền chỉnh sửa thông tin.",
                  "Quyền yêu cầu xóa dữ liệu.",
                  "Quyền từ chối marketing.",
                  "Quyền khiếu nại.",
                ],
              },
              {
                icon: AlertTriangle,
                title: "6. Cookies và theo dõi",
                content: [
                  "Sử dụng cookies để cải thiện trải nghiệm.",
                  "Có thể tắt cookies trong trình duyệt.",
                  "Sử dụng công cụ phân tích như Google Analytics.",
                ],
              },
              {
                icon: Database,
                title: "7. Lưu trữ dữ liệu",
                content: [
                  "Lưu trữ trong thời gian cần thiết.",
                  "Xóa hoặc ẩn danh khi hủy tài khoản.",
                  "Sao lưu định kỳ để đảm bảo an toàn.",
                ],
              },
              {
                icon: Shield,
                title: "8. Thay đổi chính sách",
                content: [
                  "Có thể cập nhật theo thời gian.",
                  "Thông báo khi có thay đổi quan trọng.",
                  "Tiếp tục sử dụng là đồng ý chính sách mới.",
                ],
              },
            ].map((section, i) => (
              <section
                key={i}
                className="bg-white rounded-2xl p-6 md:p-8 border border-black/5"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-mint-primary/10 rounded-xl flex items-center justify-center">
                    <section.icon className="w-5 h-5 md:w-6 md:h-6 text-mint-darker" />
                  </div>
                  <h2 className="text-lg md:text-2xl font-black text-[#2d3436]">
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="text-mint-darker font-black">•</span>
                      <span className="text-sm md:text-base text-foreground/70 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {/* Contact */}
          <section className="mt-10 bg-mint-primary/10 rounded-2xl p-6 md:p-8 border border-mint-primary/20">
            <h3 className="text-lg md:text-xl font-black mb-4 text-[#2d3436]">
              Liên hệ về quyền riêng tư
            </h3>
            <p className="text-sm md:text-base text-foreground/70 mb-4">
              Nếu bạn có câu hỏi hoặc khiếu nại liên quan đến dữ liệu cá nhân,
              vui lòng liên hệ:
            </p>
            <div className="space-y-2 text-sm md:text-base text-foreground/70">
              <p>
                <strong>Email:</strong> nguyenchidi.dev@gmail.com
              </p>
              <p>
                <strong>Điện thoại:</strong> 0352641606
              </p>
              <p>
                <strong>Địa chỉ:</strong> Tòa nhà Green Tech, Quận 1, TP.HCM
              </p>
            </div>
            <div className="mt-4 p-4 bg-white/60 rounded-xl">
              <p className="text-xs md:text-sm text-foreground/60">
                <strong>Lưu ý:</strong> Phản hồi trong vòng 30 ngày làm việc.
              </p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
