"use client";

import FoodCard from "@/components/features/FoodCard";
import { Package } from "lucide-react";

export type ShopPost = {
  id: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  originalPrice?: number | null;
  rescuePrice?: number | null;
  quantity: number;
  expiryDate: string;
  type: string;
  donor?: { name?: string | null };
};

export default function ShopGrid({ posts }: { posts: ShopPost[] }) {
  if (!posts?.length) {
    return (
      <div className="rounded-3xl border border-dashed border-emerald-200 bg-white/60 px-8 py-16 text-center">
        <Package className="mx-auto mb-4 h-12 w-12 text-emerald-300" aria-hidden />
        <p className="text-base font-black text-slate-700">Hiện chưa có món đang mở bán</p>
        <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-500">
          Các suất có thể đã được giải cứu hoặc đang chờ đối tác đăng bài mới. Ghé marketplace để xem món khác.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-8 lg:justify-start">
      {posts.map((p) => (
        <FoodCard
          key={p.id}
          id={p.id}
          title={p.title}
          description={p.description ?? undefined}
          imageUrl={p.imageUrl ?? undefined}
          originalPrice={Number(p.originalPrice ?? 0)}
          rescuePrice={Number(p.rescuePrice ?? 0)}
          quantity={p.quantity}
          expiryDate={typeof p.expiryDate === "string" ? p.expiryDate : new Date(p.expiryDate).toISOString()}
          donorName={p.donor?.name || "Đối tác"}
          type={p.type}
        />
      ))}
    </div>
  );
}
