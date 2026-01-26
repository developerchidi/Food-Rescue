import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, Lock, Eye, Database, UserCheck, AlertTriangle } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#fdfcf8]">
      <Navbar />
      
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-mint-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-mint-darker" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-[#2d3436]">
              Chính sách <span className="text-mint-darker">Bảo mật</span>
            </h1>
            <p className="text-lg text-foreground/70">
              Cập nhật lần cuối: 25 tháng 1, 2026
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-12">
            <div className="bg-white rounded-2xl p-8 border border-black/5">
              <p className="text-foreground/70 leading-relaxed">
                Food Rescue cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn. 
                Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ 
                thông tin của bạn khi sử dụng dịch vụ của chúng tôi.
              </p>
            </div>
          </section>

          {/* Privacy Sections */}
          <div className="space-y-8">
            {[
              {
                icon: Database,
                title: "1. Thông tin chúng tôi thu thập",
                content: [
                  "Thông tin cá nhân: Tên, email, số điện thoại, địa chỉ khi bạn đăng ký tài khoản.",
                  "Thông tin thanh toán: Thông tin thẻ tín dụng hoặc phương thức thanh toán khác (được xử lý bởi bên thứ ba an toàn).",
                  "Thông tin sử dụng: Lịch sử giao dịch, món ăn đã mua, đánh giá và phản hồi.",
                  "Thông tin thiết bị: Địa chỉ IP, loại trình duyệt, hệ điều hành, thông tin vị trí (nếu được phép).",
                  "Cookies và công nghệ theo dõi: Để cải thiện trải nghiệm người dùng và phân tích hành vi."
                ]
              },
              {
                icon: Eye,
                title: "2. Cách chúng tôi sử dụng thông tin",
                content: [
                  "Cung cấp và cải thiện dịch vụ: Xử lý đơn hàng, kết nối người mua và người bán.",
                  "Giao tiếp: Gửi thông báo về đơn hàng, cập nhật dịch vụ, và phản hồi yêu cầu hỗ trợ.",
                  "Bảo mật: Phát hiện và ngăn chặn gian lận, lạm dụng, và các hoạt động bất hợp pháp.",
                  "Phân tích và nghiên cứu: Phân tích xu hướng sử dụng để cải thiện dịch vụ.",
                  "Marketing: Gửi thông tin về ưu đãi và sự kiện (bạn có thể từ chối bất cứ lúc nào)."
                ]
              },
              {
                icon: Lock,
                title: "3. Bảo mật thông tin",
                content: [
                  "Mã hóa: Chúng tôi sử dụng mã hóa SSL/TLS để bảo vệ dữ liệu trong quá trình truyền tải.",
                  "Lưu trữ an toàn: Thông tin được lưu trữ trên các máy chủ được bảo vệ với các biện pháp bảo mật tiên tiến.",
                  "Truy cập hạn chế: Chỉ nhân viên được ủy quyền mới có quyền truy cập thông tin cá nhân của bạn.",
                  "Cập nhật bảo mật: Chúng tôi thường xuyên cập nhật các biện pháp bảo mật để đối phó với các mối đe dọa mới.",
                  "Mật khẩu: Bạn có trách nhiệm giữ bí mật mật khẩu của mình. Vui lòng không chia sẻ với người khác."
                ]
              },
              {
                icon: UserCheck,
                title: "4. Chia sẻ thông tin",
                content: [
                  "Đối tác dịch vụ: Chúng tôi có thể chia sẻ thông tin với các đối tác cung cấp dịch vụ (như thanh toán, vận chuyển) để thực hiện đơn hàng của bạn.",
                  "Yêu cầu pháp lý: Chúng tôi có thể tiết lộ thông tin nếu được yêu cầu bởi pháp luật hoặc cơ quan có thẩm quyền.",
                  "Bảo vệ quyền lợi: Chúng tôi có thể chia sẻ thông tin để bảo vệ quyền, tài sản hoặc an toàn của Food Rescue, người dùng hoặc công chúng.",
                  "Không bán thông tin: Chúng tôi không bán, cho thuê hoặc trao đổi thông tin cá nhân của bạn với bên thứ ba vì mục đích thương mại."
                ]
              },
              {
                icon: Shield,
                title: "5. Quyền của bạn",
                content: [
                  "Quyền truy cập: Bạn có quyền xem thông tin cá nhân mà chúng tôi lưu trữ về bạn.",
                  "Quyền chỉnh sửa: Bạn có thể cập nhật hoặc sửa đổi thông tin cá nhân trong tài khoản của mình.",
                  "Quyền xóa: Bạn có thể yêu cầu xóa tài khoản và dữ liệu cá nhân của mình (một số thông tin có thể được giữ lại theo yêu cầu pháp lý).",
                  "Quyền từ chối: Bạn có thể từ chối nhận email marketing hoặc quảng cáo bất cứ lúc nào.",
                  "Quyền khiếu nại: Bạn có quyền khiếu nại về cách chúng tôi xử lý thông tin cá nhân của bạn."
                ]
              },
              {
                icon: AlertTriangle,
                title: "6. Cookies và công nghệ theo dõi",
                content: [
                  "Chúng tôi sử dụng cookies và các công nghệ tương tự để cải thiện trải nghiệm, phân tích lưu lượng truy cập và cá nhân hóa nội dung.",
                  "Bạn có thể kiểm soát cookies thông qua cài đặt trình duyệt của mình, nhưng điều này có thể ảnh hưởng đến chức năng của trang web.",
                  "Chúng tôi sử dụng Google Analytics và các công cụ phân tích khác để hiểu cách người dùng tương tác với dịch vụ của chúng tôi."
                ]
              },
              {
                icon: Database,
                title: "7. Lưu trữ và bảo quản dữ liệu",
                content: [
                  "Thời gian lưu trữ: Chúng tôi lưu trữ thông tin cá nhân của bạn trong thời gian cần thiết để cung cấp dịch vụ hoặc theo yêu cầu pháp lý.",
                  "Xóa dữ liệu: Khi bạn xóa tài khoản, chúng tôi sẽ xóa hoặc ẩn danh hóa thông tin cá nhân của bạn, trừ khi pháp luật yêu cầu giữ lại.",
                  "Sao lưu: Dữ liệu được sao lưu định kỳ để đảm bảo an toàn và khôi phục khi cần thiết."
                ]
              },
              {
                icon: Shield,
                title: "8. Thay đổi chính sách",
                content: [
                  "Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian để phản ánh các thay đổi trong thực tiễn hoặc pháp luật.",
                  "Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi quan trọng nào qua email hoặc thông báo trên trang web.",
                  "Việc tiếp tục sử dụng dịch vụ sau khi thay đổi có hiệu lực được coi là bạn chấp nhận chính sách mới."
                ]
              }
            ].map((section, i) => (
              <section key={i} className="bg-white rounded-2xl p-8 border border-black/5">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-mint-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <section.icon className="w-6 h-6 text-mint-darker" />
                  </div>
                  <h2 className="text-2xl font-black text-[#2d3436]">{section.title}</h2>
                </div>
                <ul className="space-y-4 ml-16">
                  {section.content.map((item, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="text-mint-darker font-black mt-1">•</span>
                      <span className="text-foreground/70 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {/* Contact Section */}
          <section className="mt-12 bg-mint-primary/10 rounded-2xl p-8 border border-mint-primary/20">
            <h3 className="text-xl font-black mb-4 text-[#2d3436]">Liên hệ về quyền riêng tư</h3>
            <p className="text-foreground/70 leading-relaxed mb-4">
              Nếu bạn có câu hỏi, yêu cầu hoặc khiếu nại về chính sách bảo mật này hoặc cách chúng tôi xử lý thông tin cá nhân của bạn, vui lòng liên hệ:
            </p>
            <div className="space-y-2 text-foreground/70">
              <p><strong>Email:</strong> privacy@foodrescue.vn</p>
              <p><strong>Điện thoại:</strong> 1900 123 456</p>
              <p><strong>Địa chỉ:</strong> Tòa nhà Green Tech, Quận 1, TP. Hồ Chí Minh</p>
            </div>
            <div className="mt-6 p-4 bg-white/50 rounded-xl">
              <p className="text-sm text-foreground/60">
                <strong>Lưu ý:</strong> Chúng tôi cam kết phản hồi mọi yêu cầu của bạn trong vòng 30 ngày làm việc.
              </p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
