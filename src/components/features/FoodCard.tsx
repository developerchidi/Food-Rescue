import { MapPin, Clock, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface FoodCardProps {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  originalPrice: number;
  rescuePrice: number;
  quantity: number;
  expiryDate: string;
  donorName: string;
  type: string;
  compact?: boolean;
}

export default function FoodCard({
  id,
  title,
  description,
  imageUrl,
  originalPrice,
  rescuePrice,
  quantity,
  expiryDate,
  donorName,
  type,
  compact = false,
}: FoodCardProps) {
  const router = useRouter();
  const discount = Math.round(
    ((originalPrice - rescuePrice) / originalPrice) * 100
  );
  const timeLeft = new Date(expiryDate).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`
        bento-card group flex flex-col overflow-hidden
        transition-all duration-300
        w-full
        ${compact ? "max-w-[240px]" : ""}
      `}
    >
      {/* IMAGE */}
      <div
        className={`
          relative w-full overflow-hidden
          ${compact ? "aspect-[4/3]" : "aspect-[4/3]"}
        `}
      >
        <Image
          src={
            imageUrl ||
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"
          }
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* DISCOUNT */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-mint-primary/90 backdrop-blur-md rounded-full text-xs font-bold text-foreground">
          -{discount}%
        </div>

        {/* TYPE */}
        {type === "MYSTERY_BOX" && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-peach-accent/90 backdrop-blur-md rounded-full text-xs font-bold text-foreground">
            Mystery Box
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-grow p-4">
        {/* DONOR */}
        <div className="flex items-center gap-2 text-xs font-medium text-sage mb-2">
          <MapPin size={12} className="text-mint-dark/80" />
          <span className="text-mint-dark/80 line-clamp-1">
            {donorName}
          </span>
        </div>

        {/* TITLE */}
        <h3 className="font-bold text-lg mb-1 line-clamp-1 group-hover:text-mint-dark transition-colors">
          {title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-sm text-foreground/60 italic line-clamp-2 mb-4">
          “{description || "Không có mô tả cho món ăn này."}”
        </p>

        {/* PRICE + META */}
        <div className="mt-auto">
          <div className="flex items-end justify-between mb-4">
            <div>
              <span className="text-xs text-foreground/40 line-through block">
                {originalPrice.toLocaleString()}đ
              </span>
              <span className="text-2xl font-black text-mint-dark">
                {rescuePrice.toLocaleString()}đ
              </span>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] font-bold text-mint-dark/40 uppercase">
                Còn {quantity} suất
              </span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-peach-deep bg-peach-deep/10 rounded-lg px-2 py-1">
                <Clock size={12} />
                {timeLeft}
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => router.push(`/rescue/confirm/${id}`)}
            disabled={quantity === 0}
            className="
              w-full h-11
              bg-mint-dark text-white font-bold
              rounded-bento-inner
              flex items-center justify-center gap-2
              hover:bg-mint-dark/90
              hover:shadow-lg hover:shadow-mint-dark/20
              transition-all duration-300
              active:scale-95
              disabled:opacity-50 disabled:grayscale
            "
          >
            <ShoppingCart size={18} />
            {quantity === 0 ? "Đã hết" : "Giải cứu ngay"}
          </button>
        </div>
      </div>
    </div>
  );
}
