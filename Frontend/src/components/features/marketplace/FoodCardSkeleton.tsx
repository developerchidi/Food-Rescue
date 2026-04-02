import Skeleton from "@/components/ui/Skeleton";

interface FoodCardSkeletonProps {
  compact?: boolean;
}

export default function FoodCardSkeleton({ compact = false }: FoodCardSkeletonProps) {
  return (
    <div
      className="bento-card overflow-hidden flex flex-col border-black/5 mx-auto"
      style={{
        width: compact ? '240px' : '320px',
        height: compact ? '360px' : '460px',
        minWidth: compact ? '240px' : '320px',
        minHeight: compact ? '360px' : '460px',
        maxWidth: compact ? '240px' : '320px',
        maxHeight: compact ? '360px' : '460px'
      }}
    >
      {/* Image Section Skeleton */}
      <Skeleton className={`w-full rounded-bento-inner ${compact ? 'h-[100px]' : 'h-[170px]'}`} />

      {/* Content Section Skeleton */}
      <div className={`flex flex-col flex-grow ${compact ? 'pt-3' : 'pt-4'}`}>
        {/* Donor Name Skeleton */}
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="w-24 h-3" />
        </div>

        {/* Title Skeleton */}
        <Skeleton className={`w-3/4 mb-2 ${compact ? 'h-6' : 'h-7'}`} />

        {/* Description Skeleton */}
        <div className="space-y-2 mb-6">
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-5/6 h-3" />
        </div>

        {/* Price & Stock Skeleton */}
        <div className="mt-auto">
          <div className="flex items-end justify-between mb-4 px-2">
            <div className="space-y-1">
              <Skeleton className="w-12 h-3" />
              <Skeleton className="w-24 h-8" />
            </div>
            <div className="flex flex-col items-end gap-1">
              <Skeleton className="w-16 h-3" />
              <Skeleton className="w-14 h-5 rounded-lg" />
            </div>
          </div>

          {/* Button Skeleton */}
          <Skeleton className={`w-full rounded-bento-inner ${compact ? 'h-9' : 'h-11'}`} />
        </div>
      </div>
    </div>
  );
}
