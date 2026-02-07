"use client";

import MerchantTopbar from "@/components/layout/merchant/MerchantTopbar";
import { getMerchantDonations, updateDonationStatus } from "@/actions/merchant-actions";
import { useState, useEffect } from "react";
import { ShoppingCart, Check, X, Loader, AlertCircle } from "lucide-react";
import Image from "next/image";

type Donation = Awaited<ReturnType<typeof getMerchantDonations>>["donations"][0];

export default function MerchantDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"ALL" | "REQUESTED" | "APPROVED" | "COMPLETED" | "CANCELLED">("ALL");

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = async () => {
    setLoading(true);
    const result = await getMerchantDonations();
    if (result.success && result.donations) {
      setDonations(result.donations);
    } else {
      setError(result.error || "Không thể tải lời yêu cầu");
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (donationId: string, status: "APPROVED" | "COMPLETED" | "CANCELLED") => {
    setUpdatingId(donationId);
    const result = await updateDonationStatus(donationId, status);
    
    if (result.success && result.donation) {
      setDonations(
        donations.map((d) =>
          d.id === donationId ? { ...d, status } : d
        )
      );
    } else {
      setError(result.error || "Không thể cập nhật lời yêu cầu");
    }
    
    setUpdatingId(null);
  };

  const filteredDonations = donations.filter((d) => {
    if (filter === "ALL") return true;
    return d.status === filter;
  });

  const stats = {
    requested: donations.filter((d) => d.status === "REQUESTED").length,
    approved: donations.filter((d) => d.status === "APPROVED").length,
    completed: donations.filter((d) => d.status === "COMPLETED").length,
    cancelled: donations.filter((d) => d.status === "CANCELLED").length,
  };

  const getStatusColor = (
    status: string
  ): { bg: string; text: string; label: string } => {
    const statusMap: Record<
      string,
      { bg: string; text: string; label: string }
    > = {
      REQUESTED: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Chờ xử lý" },
      APPROVED: { bg: "bg-blue-100", text: "text-blue-700", label: "Đã duyệt" },
      COMPLETED: { bg: "bg-green-100", text: "text-green-700", label: "Hoàn thành" },
      CANCELLED: { bg: "bg-red-100", text: "text-red-700", label: "Hủy" },
    };
    return statusMap[status] || { bg: "bg-gray-100", text: "text-gray-700", label: status };
  };

  return (
    <div className="px-6 md:px-8">
      <MerchantTopbar
        title="Lời yêu cầu"
        subtitle="Quản lý các lượt giải cứu từ người dùng"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          { label: "Chờ xử lý", value: stats.requested, color: "bg-yellow-100" },
          { label: "Đã duyệt", value: stats.approved, color: "bg-blue-100" },
          { label: "Hoàn thành", value: stats.completed, color: "bg-green-100" },
          { label: "Hủy", value: stats.cancelled, color: "bg-red-100" },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`${stat.color} rounded-lg p-4 text-center`}
          >
            <p className="text-sm font-medium text-slate-700">{stat.label}</p>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
        {[
          { value: "ALL" as const, label: "Tất cả" },
          { value: "REQUESTED" as const, label: "Chờ xử lý" },
          { value: "APPROVED" as const, label: "Đã duyệt" },
          { value: "COMPLETED" as const, label: "Hoàn thành" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${
              filter === tab.value
                ? "bg-mint-primary text-slate-900"
                : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-red-900">Lỗi</h3>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Donations List */}
      <div className="mt-8">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 bg-slate-200 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : filteredDonations.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
            <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-black text-slate-900 mb-2">
              Không có lời yêu cầu nào
            </h3>
            <p className="text-slate-600 text-sm">
              Chưa có yêu cầu giải cứu với bộ lọc này
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDonations.map((donation) => {
              const { bg, text, label } = getStatusColor(donation.status);

              return (
                <div
                  key={donation.id}
                  className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-6">
                    {/* Left: Product & Receiver Info */}
                    <div className="flex gap-4 flex-1">
                      {/* Product Image */}
                      <div className="w-24 h-24 rounded-xl bg-slate-200 overflow-hidden flex-shrink-0">
                        {donation.post.imageUrl ? (
                          <Image
                            src={donation.post.imageUrl}
                            alt={donation.post.title}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingCart className="w-8 h-8 text-slate-400" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 text-lg">
                          {donation.post.title}
                        </h3>
                        <p className="text-sm text-slate-600 mt-1">
                          {donation.quantity} suất • {donation.fulfillmentMethod === "DELIVERY" ? "Giao hàng" : "Lấy tại chỗ"}
                        </p>
                        <div className="mt-3 space-y-1">
                          <p className="text-sm font-bold text-slate-900">
                            👤 {donation.receiver.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {donation.receiver.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Status & Actions */}
                    <div className="flex flex-col items-end gap-4 flex-shrink-0">
                      {/* Status Badge */}
                      <span
                        className={`${bg} ${text} text-[10px] font-black uppercase px-3 py-1 rounded-full`}
                      >
                        {label}
                      </span>

                      {/* Actions */}
                      {donation.status === "REQUESTED" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleStatusUpdate(donation.id, "APPROVED")
                            }
                            disabled={updatingId === donation.id}
                            className="flex items-center gap-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-bold text-xs hover:bg-green-200 transition-colors disabled:opacity-50"
                          >
                            {updatingId === donation.id ? (
                              <Loader className="w-4 h-4 animate-spin" />
                            ) : (
                              <Check className="w-4 h-4" />
                            )}
                            Duyệt
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(donation.id, "CANCELLED")
                            }
                            disabled={updatingId === donation.id}
                            className="flex items-center gap-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold text-xs hover:bg-red-200 transition-colors disabled:opacity-50"
                          >
                            <X className="w-4 h-4" />
                            Từ chối
                          </button>
                        </div>
                      )}

                      {donation.status === "APPROVED" && (
                        <button
                          onClick={() =>
                            handleStatusUpdate(donation.id, "COMPLETED")
                          }
                          disabled={updatingId === donation.id}
                          className="flex items-center gap-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-bold text-xs hover:bg-blue-200 transition-colors disabled:opacity-50"
                        >
                          {updatingId === donation.id ? (
                            <Loader className="w-4 h-4 animate-spin" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                          Hoàn thành
                        </button>
                      )}

                      {/* Date */}
                      <p className="text-xs text-slate-500">
                        {new Date(donation.createdAt).toLocaleDateString(
                          "vi-VN"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
