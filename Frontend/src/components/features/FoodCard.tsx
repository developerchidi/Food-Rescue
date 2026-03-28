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
  compact?: boolean; // For smaller display in map popups
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
  const discount = Math.round(((originalPrice - rescuePrice) / originalPrice) * 100);
  const timeLeft = new Date(expiryDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      className="bento-card group overflow-hidden flex flex-col hover:border-mint-dark transition-all duration-500 mx-auto"
      style={{
        width: compact ? '240px' : '320px',
        height: compact ? '360px' : '460px',
        minWidth: compact ? '240px' : '320px',
        minHeight: compact ? '360px' : '460px',
        maxWidth: compact ? '240px' : '320px',
        maxHeight: compact ? '360px' : '460px'
      }}
    >
      {/* Image Section */}
      <div className={`relative w-full overflow-hidden rounded-bento-inner ${compact ? 'h-[100px]' : 'h-[170px]'}`}>
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
      <div className={`flex flex-col flex-grow ${compact ? 'pt-3' : 'pt-4'}`}>
        <div className={`flex items-center gap-2 font-medium text-sage ${compact ? 'mb-1 text-[10px]' : 'mb-2 text-xs'}`}>
          <MapPin size={compact ? 10 : 12} className="text-mint-dark/80" />
          <div className="text-mint-dark/80">{donorName}</div>
        </div>

        <h3 className={`font-bold group-hover:text-mint-dark transition-colors line-clamp-1 ${compact ? 'text-base mb-1' : 'text-xl mb-2'}`}>
          {title}
        </h3>

        <p className={`text-foreground/60 line-clamp-2 italic ${compact ? 'text-[11px] mb-4' : 'text-sm mb-6'}`}>
          "{description || "Không có mô tả cho món ăn này."}"
        </p>

        <div className="mt-auto">
          <div className={`flex items-end justify-between mb-4 ${compact ? 'pl-0' : 'pl-2'}`}>
            <div>
              <span className={`text-foreground/40 line-through block ${compact ? 'text-[10px]' : 'text-xs'}`}>
                {originalPrice.toLocaleString()}đ
              </span>
              <span className={`font-black text-mint-dark ${compact ? 'text-xl' : 'text-2xl'}`}>
                {rescuePrice.toLocaleString()}đ
              </span>
            </div>
            <div className={`flex flex-col items-end ${compact ? 'gap-0.5' : 'gap-1'}`}>
              <span className="text-[10px] font-black text-mint-dark/40 uppercase tracking-tighter">
                Còn {quantity} suất
              </span>
              <div className={`flex items-center gap-1.5 font-bold text-peach-deep bg-peach-deep/10 rounded-lg ${compact ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-xs'}`}>
                <Clock size={compact ? 10 : 12} />
                {timeLeft}
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push(`/rescue/confirm/${id}`)}
            disabled={quantity === 0}
            className={`w-full bg-mint-dark border-2 border-mint-dark/20 text-white font-bold rounded-bento-inner flex items-center justify-center gap-2 hover:bg-mint-dark/90 hover:shadow-lg hover:shadow-mint-dark/20 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:grayscale ${compact ? 'h-9 text-xs' : 'h-11'}`}
          >
            <ShoppingCart size={compact ? 16 : 18} />
            {quantity === 0 ? "Đã hết" : "Giải cứu ngay"}
          </button>
        </div>
      </div>
    </div>
  );
}
