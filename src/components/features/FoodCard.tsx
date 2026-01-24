import { MapPin, Clock, Tag, ShoppingCart } from "lucide-react";
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
}: FoodCardProps) {
  const router = useRouter();
  const discount = Math.round(((originalPrice - rescuePrice) / originalPrice) * 100);
  const timeLeft = new Date(expiryDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bento-card group overflow-hidden flex flex-col h-full hover:border-mint-dark transition-all duration-500">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden rounded-[var(--bento-inner-radius)]">
        <Image
          src={imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4 px-3 py-1 bg-mint-primary/90 backdrop-blur-md rounded-full text-xs font-bold text-foreground">
          -{discount}%
        </div>
        {type === "MYSTERY_BOX" && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-peach-accent/90 backdrop-blur-md rounded-full text-xs font-bold text-foreground">
            Mystery Box
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="pt-4 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs font-medium text-sage mb-2">
          <MapPin size={12} className="text-mint-dark/80" />
          <div className="text-mint-dark/80">{donorName}</div>
        </div>

        <h3 className="text-xl font-bold mb-2 group-hover:text-mint-dark transition-colors line-clamp-1">
          {title}
        </h3>

        <p className="text-sm text-foreground/60 mb-6 line-clamp-2 italic">
          "{description || "Không có mô tả cho món ăn này."}"
        </p>

        <div className="mt-auto">
          <div className="pl-2 flex items-end justify-between mb-4">
            <div>
              <span className="text-xs text-foreground/40 line-through block">
                {originalPrice.toLocaleString()}đ
              </span>
              <span className="text-2xl font-black text-mint-dark">
                {rescuePrice.toLocaleString()}đ
              </span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] font-black text-mint-dark/40 uppercase tracking-tighter">
                Còn {quantity} suất
              </span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-peach-deep bg-peach-deep/10 px-2 py-1 rounded-lg">
                <Clock size={12} />
                {timeLeft}
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push(`/rescue/confirm/${id}`)}
            disabled={quantity === 0}
            className="w-full h-11 bg-mint-dark border-2 border-mint-dark/20 text-white font-bold rounded-[var(--bento-inner-radius)] flex items-center justify-center gap-2 hover:bg-mint-dark/90 hover:shadow-lg hover:shadow-mint-dark/20 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:grayscale"
          >
            <ShoppingCart size={18} />
            {quantity === 0 ? "Đã hết" : "Giải cứu ngay"}
          </button>
        </div>
      </div>
    </div>
  );
}
