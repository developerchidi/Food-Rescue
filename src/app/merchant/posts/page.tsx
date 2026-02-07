"use client";

import MerchantTopbar from "@/components/layout/merchant/MerchantTopbar";
import { getMerchantPosts, deleteFoodPost } from "@/actions/merchant-actions";
import { useState, useEffect } from "react";
import { Package, Plus, Edit2, Trash2, Clock, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type FoodPost = Awaited<ReturnType<typeof getMerchantPosts>>["posts"][0];

export default function MerchantPostsPage() {
  const [posts, setPosts] = useState<FoodPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    const result = await getMerchantPosts();
    if (result.success && result.posts) {
      setPosts(result.posts);
    } else {
      setError(result.error || "Không thể tải bài đăng");
    }
    setLoading(false);
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("Bạn chắc chắn muốn xóa bài đăng này?")) {
      return;
    }

    setDeleting(postId);
    const result = await deleteFoodPost(postId);
    if (result.success) {
      setPosts(posts.filter((p) => p.id !== postId));
    } else {
      setError(result.error || "Không thể xóa bài đăng");
    }
    setDeleting(null);
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string; label: string }> = {
      AVAILABLE: { bg: "bg-green-100", text: "text-green-700", label: "Có sẵn" },
      PENDING: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Chờ" },
      TAKEN: { bg: "bg-blue-100", text: "text-blue-700", label: "Đã lấy hết" },
      EXPIRED: { bg: "bg-red-100", text: "text-red-700", label: "Hết hạn" },
    };
    const { bg, text, label } = statusMap[status] || { bg: "bg-gray-100", text: "text-gray-700", label: status };
    return (
      <span className={`${bg} ${text} text-[10px] font-black uppercase px-2 py-1 rounded-full`}>
        {label}
      </span>
    );
  };

  return (
    <div className="px-6 md:px-8">
      <MerchantTopbar
        title="Bài đăng của tôi"
        subtitle="Quản lý thực phẩm và lượt giải cứu"
      />

      {/* Header with Create Button */}
      <div className="mt-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Tất cả bài đăng</h2>
          <p className="text-sm text-slate-500">{posts.length} bài đăng</p>
        </div>
        <Link
          href="/merchant/posts/create"
          className="flex items-center gap-2 px-6 py-3 bg-mint-primary text-slate-900 font-bold rounded-lg hover:bg-mint-darker transition-colors"
        >
          <Plus className="w-5 h-5" />
          Đăng thực phẩm mới
        </Link>
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

      {/* Posts Grid */}
      <div className="mt-8">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-40 bg-slate-200 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
            <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-black text-slate-900 mb-2">
              Chưa có bài đăng nào
            </h3>
            <p className="text-slate-600 mb-6 text-sm">
              Bắt đầu đăng thực phẩm để chia sẻ với cộng đồng
            </p>
            <Link
              href="/merchant/posts/create"
              className="inline-block px-6 py-3 bg-mint-primary text-slate-900 font-bold rounded-lg hover:bg-mint-darker transition-colors"
            >
              Tạo bài đăng đầu tiên
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow group"
              >
                {/* Image */}
                <div className="relative h-40 bg-slate-200 overflow-hidden">
                  {post.imageUrl ? (
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
                      <Package className="w-12 h-12 text-slate-400" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    {getStatusBadge(post.status)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {post.description}
                    </p>
                  </div>

                  {/* Price and Quantity */}
                  <div className="flex items-center gap-4 text-sm">
                    {post.rescuePrice && (
                      <div>
                        <p className="text-slate-500 text-xs font-medium">Giá</p>
                        <p className="font-black text-slate-900">
                          {post.rescuePrice.toLocaleString()}đ
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-slate-500 text-xs font-medium">Số lượng</p>
                      <p className="font-black text-slate-900">{post.quantity} suất</p>
                    </div>
                  </div>

                  {/* Expiry Date */}
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-4 h-4" />
                    <span>Hết hạn: {new Date(post.expiryDate).toLocaleDateString("vi-VN")}</span>
                  </div>

                  {/* Donations Count */}
                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-xs text-slate-500">
                      {post.donations.length} lời yêu cầu
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <Link
                      href={`/merchant/posts/${post.id}/edit`}
                      className="flex-1 px-3 py-2 bg-slate-100 text-slate-900 rounded-lg font-bold text-xs hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Chỉnh sửa
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      disabled={deleting === post.id}
                      className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg font-bold text-xs hover:bg-red-200 transition-colors disabled:opacity-50"
                    >
                      {deleting === post.id ? "..." : <Trash2 className="w-4 h-4 mx-auto" />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
