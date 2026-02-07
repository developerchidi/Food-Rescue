import MerchantTopbar from "@/components/layout/merchant/MerchantTopbar";
import { getMerchantStats, getMerchantPosts, getMerchantDonations } from "@/actions/merchant-actions";
import { BarChart3, Package, ShoppingCart, TrendingUp } from "lucide-react";

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg transition-shadow">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
        {Icon}
      </div>
      <p className="text-sm font-medium text-slate-600">{label}</p>
      <h3 className="text-3xl font-black text-slate-900 mt-2">{value}</h3>
    </div>
  );
}

export default async function MerchantDashboard() {
  const statsResult = await getMerchantStats();
  const postsResult = await getMerchantPosts();
  const donationsResult = await getMerchantDonations();

  const stats = statsResult.success ? statsResult.stats : null;
  const posts = postsResult.success ? postsResult.posts : [];
  const donations = donationsResult.success ? donationsResult.donations : [];

  // Get recent donations
  const recentDonations = donations.slice(0, 5);
  const activeRequests = donations.filter((d: typeof donations[0]) => d.status === "REQUESTED").length;

  return (
    <div className="px-6 md:px-8">
      <MerchantTopbar
        title="Dashboard"
        subtitle="Tổng quan hoạt động và yêu cầu giải cứu"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <StatCard
          icon={<Package className="w-6 h-6 text-slate-900" />}
          label="Bài đăng"
          value={stats?.totalPosts || 0}
          color="bg-blue-100"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-slate-900" />}
          label="Bài đăng hoạt động"
          value={stats?.activePosts || 0}
          color="bg-green-100"
        />
        <StatCard
          icon={<ShoppingCart className="w-6 h-6 text-slate-900" />}
          label="Tổng lời yêu cầu"
          value={stats?.totalDonations || 0}
          color="bg-mint-primary/20"
        />
        <StatCard
          icon={<BarChart3 className="w-6 h-6 text-slate-900" />}
          label="Đã hoàn thành"
          value={stats?.completedDonations || 0}
          color="bg-orange-100"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Recent Donations */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-slate-900">Lời yêu cầu gần đây</h2>
            {activeRequests > 0 && (
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-bold">
                {activeRequests} chờ xử lý
              </span>
            )}
          </div>

          {recentDonations.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">Chưa có lời yêu cầu nào</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentDonations.map((donation: typeof recentDonations[0]) => (
                <div
                  key={donation.id}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 border border-slate-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-slate-900">
                        {donation.receiver.name}
                      </h3>
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${
                          donation.status === "REQUESTED"
                            ? "bg-yellow-100 text-yellow-700"
                            : donation.status === "APPROVED"
                              ? "bg-blue-100 text-blue-700"
                              : donation.status === "COMPLETED"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                      >
                        {donation.status === "REQUESTED"
                          ? "Chờ xử lý"
                          : donation.status === "APPROVED"
                            ? "Đã duyệt"
                            : donation.status === "COMPLETED"
                              ? "Hoàn thành"
                              : "Hủy"}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">
                      {donation.post.title} • {donation.quantity} suất
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">
                      {new Date(donation.createdAt).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h3 className="text-lg font-black text-slate-900 mb-4">Hành động nhanh</h3>
            <div className="space-y-3">
              <a
                href="/merchant/posts"
                className="block w-full px-4 py-3 bg-mint-primary text-slate-900 font-bold rounded-lg hover:bg-mint-darker transition-colors text-center text-sm"
              >
                Đăng thực phẩm mới
              </a>
              <a
                href="/merchant/scanner"
                className="block w-full px-4 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors text-center text-sm"
              >
                Quét mã QR
              </a>
              <a
                href="/merchant/donations"
                className="block w-full px-4 py-3 bg-slate-100 text-slate-900 font-bold rounded-lg hover:bg-slate-200 transition-colors text-center text-sm"
              >
                Xem tất cả yêu cầu
              </a>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-mint-primary/10 to-mint-darker/10 rounded-2xl border border-mint-primary/20 p-6">
            <h3 className="text-sm font-black text-mint-darker mb-3">💡 Mẹo</h3>
            <ul className="text-xs text-slate-600 space-y-2">
              <li>• Cập nhật thời gian hết hạn thực tế</li>
              <li>• Phê duyệt nhanh các yêu cầu hợp lệ</li>
              <li>• Sử dụng QR scanner khi giao hàng</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
