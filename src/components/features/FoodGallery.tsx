"use client";

import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import { Loader2, AlertCircle } from "lucide-react";

interface FoodPost {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  type: string;
  originalPrice: number;
  rescuePrice: number;
  quantity: number;
  expiryDate: string;
  donor: {
    name: string;
  };
}

export default function FoodGallery() {
  const [posts, setPosts] = useState<FoodPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Không thể tải danh sách thực phẩm");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Đã có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center gap-4 text-sage">
        <Loader2 className="w-10 h-10 animate-spin opacity-50" />
        <p className="font-medium animate-pulse">Đang tìm các bữa ăn cho bạn...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-32 flex flex-col items-center justify-center gap-4 text-red-400">
        <AlertCircle className="w-10 h-10" />
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  return (
    <section id="explore" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">
              Bữa ăn sẵn sàng <span className="text-mint-primary">Giải cứu</span>
            </h2>
            <p className="text-foreground/60 text-lg">
              Từ những tiệm bánh thủ công đến các nhà hàng cao cấp. Hãy hành động ngay trước khi chúng hết hạn!
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 rounded-xl bg-sage/5 border border-sage/10 text-sage font-semibold hover:bg-sage/10 transition-all">
              Tất cả
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-sage/5 border border-sage/10 text-sage font-semibold hover:bg-sage/10 transition-all">
              Mystery Boxes
            </button>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 bg-sage/5 rounded-3xl border-2 border-dashed border-sage/20 font-medium text-sage">
            Hiện chưa có bữa ăn nào cần giải cứu. Hãy quay lại sau nhé!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {posts.map((post) => (
              <FoodCard
                key={post.id}
                id={post.id}
                title={post.title}
                description={post.description}
                imageUrl={post.imageUrl}
                originalPrice={post.originalPrice}
                rescuePrice={post.rescuePrice}
                quantity={post.quantity}
                expiryDate={post.expiryDate}
                donorName={post.donor.name}
                type={post.type}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
