/* eslint-disable */
"use client";

import { useState, useEffect } from "react";
import { Search, Map as MapIcon, List, Filter, SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight, Navigation } from "lucide-react";
import FoodCard from "../FoodCard";
import FoodCardSkeleton from "./FoodCardSkeleton";
import dynamic from "next/dynamic";
import { calculateDistance, getUserLocation, formatDistance } from "@/lib/geolocation";

interface MarketplaceClientProps {
  initialData: any[];
}

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full bg-white rounded-[1.5rem] border border-black/5 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-mint-primary border-t-transparent rounded-full animate-spin" />
        <p className="font-bold text-mint-darker">Đang tải bản đồ...</p>
      </div>
    </div>
  )
});

export default function MarketplaceClient({ initialData }: MarketplaceClientProps) {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [distanceFilter, setDistanceFilter] = useState<number | null>(null); // in km
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const ITEMS_PER_PAGE = 8;

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Simulate loading when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [searchQuery, activeCategory, distanceFilter]);

  const filteredPosts = initialData.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.donor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || post.type === activeCategory;

    // Distance filter
    let matchesDistance = true;
    if (distanceFilter && userLocation && post.donor.latitude && post.donor.longitude) {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        post.donor.latitude,
        post.donor.longitude
      );
      matchesDistance = distance <= distanceFilter;
    }

    return matchesSearch && matchesCategory && matchesDistance;
  });

  // Reset to page 1 when view mode changes or filters change significantly
  useEffect(() => {
    setCurrentPage(1);
  }, [viewMode, searchQuery, activeCategory, distanceFilter]);

  const handleGetLocation = async () => {
    setIsGettingLocation(true);
    try {
      const location = await getUserLocation();
      setUserLocation(location);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Không thể lấy vị trí');
    } finally {
      setIsGettingLocation(false);
    }
  };

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto px-6">
      {/* Search & Toggle Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div className="relative flex-grow max-w-2xl">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-foreground/30">
            <Search size={22} />
          </div>
          <input
            type="text"
            placeholder="Tìm món ăn, nhà hàng hoặc khu vực..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-16 pl-14 pr-6 bg-white border border-black/5 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-mint-primary/5 focus:border-mint-primary/30 transition-all font-medium text-lg shadow-sm"
          />
        </div>

        <div className="flex items-center gap-3 bg-white p-2 rounded-[2rem] border border-black/5 shadow-sm self-start md:self-auto">
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${viewMode === "list"
              ? "bg-mint-darker text-white shadow-lg"
              : "text-foreground/40 hover:text-foreground"
              }`}
          >
            <List size={20} />
            Danh sách
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${viewMode === "map"
              ? "bg-mint-darker text-white shadow-lg"
              : "text-foreground/40 hover:text-foreground"
              }`}
          >
            <MapIcon size={20} />
            Bản đồ
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-72 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-xl flex items-center gap-2">
                <Filter size={18} className="text-mint-darker" />
                Bộ lọc
              </h3>
              <button className="text-xs font-black text-mint-darker uppercase tracking-wider hover:underline" onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}>
                Xóa tất cả
              </button>
            </div>

            <div className="space-y-3">
              <div className="font-bold text-sm text-foreground/40 uppercase tracking-widest mb-4 px-1">Danh mục</div>
              <FilterChip
                label="Tất cả bữa ăn"
                active={activeCategory === "all"}
                onClick={() => setActiveCategory("all")}
              />
              <FilterChip
                label="Mystery Boxes"
                active={activeCategory === "MYSTERY_BOX"}
                onClick={() => setActiveCategory("MYSTERY_BOX")}
              />
              <FilterChip
                label="Món đơn lẻ"
                active={activeCategory === "INDIVIDUAL"}
                onClick={() => setActiveCategory("INDIVIDUAL")}
              />
            </div>

            {/* Distance Filter */}
            <div className="space-y-3 pt-6 border-t border-black/5">
              <div className="font-bold text-sm text-foreground/40 uppercase tracking-widest mb-4 px-1 flex items-center justify-between">
                Khoảng cách
                {!userLocation && (
                  <button
                    onClick={handleGetLocation}
                    disabled={isGettingLocation}
                    className="text-xs font-black text-mint-darker hover:text-mint-dark transition-colors flex items-center gap-1 normal-case tracking-normal"
                  >
                    <Navigation size={12} className={isGettingLocation ? 'geolocation-loading' : ''} />
                    {isGettingLocation ? 'Đang lấy...' : 'Vị trí của tôi'}
                  </button>
                )}
              </div>
              {userLocation ? (
                <>
                  <FilterChip
                    label="Tất cả"
                    active={distanceFilter === null}
                    onClick={() => setDistanceFilter(null)}
                  />
                  <FilterChip
                    label="Trong 1km"
                    active={distanceFilter === 1}
                    onClick={() => setDistanceFilter(1)}
                  />
                  <FilterChip
                    label="Trong 3km"
                    active={distanceFilter === 3}
                    onClick={() => setDistanceFilter(3)}
                  />
                  <FilterChip
                    label="Trong 5km"
                    active={distanceFilter === 5}
                    onClick={() => setDistanceFilter(5)}
                  />
                  <FilterChip
                    label="Trong 10km"
                    active={distanceFilter === 10}
                    onClick={() => setDistanceFilter(10)}
                  />
                </>
              ) : (
                <p className="text-xs text-foreground/40 italic px-1">
                  Cho phép truy cập vị trí để lọc theo khoảng cách
                </p>
              )}
            </div>
          </div>

          <div className="p-6 bg-mint-primary/5 rounded-[2rem] border border-mint-primary/10">
            <h4 className="font-black text-mint-darker mb-2">Bạn có biết?</h4>
            <p className="text-sm text-mint-darker/60 leading-relaxed">
              Mỗi bữa ăn bạn giải cứu giúp tiết kiệm trung bình 2.5kg khí thải CO2. Hành động nhỏ, tác động lớn!
            </p>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-grow">
          {viewMode === "list" ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black">
                  {filteredPosts.length} kết quả <span className="text-foreground/20 italic font-medium ml-2">đang hiển thị</span>
                </h2>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-black/5 rounded-xl font-bold text-sm hover:bg-black/[0.02] transition-colors">
                  <SlidersHorizontal size={16} />
                  Mới nhất
                  <ChevronDown size={16} className="opacity-30" />
                </button>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-black/5">
                  <div className="w-20 h-20 bg-mint-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search size={32} className="text-mint-darker opacity-30" />
                  </div>
                  <h3 className="text-xl font-black mb-2">Không tìm thấy món nào</h3>
                  <p className="text-foreground/40 max-w-sm mx-auto font-medium">
                    Hãy thử thay đổi từ khóa tìm kiếm hoặc điều chỉnh bộ lọc để thấy được nhiều lựa chọn hơn.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,320px))] justify-center gap-6">
                  {isLoading ? (
                    Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                      <FoodCardSkeleton key={i} />
                    ))
                  ) : (
                    paginatedPosts.map((post) => (
                      <FoodCard
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        description={post.description}
                        imageUrl={post.imageUrl}
                        originalPrice={post.originalPrice}
                        rescuePrice={post.rescuePrice}
                        quantity={post.quantity || 0}
                        expiryDate={post.expiryDate}
                        donorName={post.donor?.name || "Người quyên góp"}
                        type={post.type}
                      />
                    ))
                  )}
                </div>
              )}

              {/* Pagination UI */}
              {totalPages > 1 && (
                <div className="mt-16 flex items-center justify-center gap-4">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-12 h-12 rounded-2xl border border-black/5 bg-white flex items-center justify-center text-foreground hover:bg-mint-primary hover:border-mint-primary transition-all disabled:opacity-20 disabled:hover:bg-white"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-12 h-12 rounded-2xl font-black transition-all ${currentPage === page
                          ? "bg-mint-darker text-white shadow-lg shadow-mint-darker/20"
                          : "bg-white border border-black/5 text-foreground/40 hover:border-mint-primary"
                          }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-12 h-12 rounded-2xl border border-black/5 bg-white flex items-center justify-center text-foreground hover:bg-mint-primary hover:border-mint-primary transition-all disabled:opacity-20 disabled:hover:bg-white"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <MapView
              posts={filteredPosts}
              userLocation={userLocation}
              distanceFilter={distanceFilter}
              onLocationRequest={handleGetLocation}
              isGettingLocation={isGettingLocation}
            />
          )}
        </div>
      </div>

    </div >
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-2xl font-black transition-all border ${active
        ? "bg-mint-primary border-mint-primary text-mint-darker shadow-md"
        : "bg-white border-black/5 text-foreground/50 hover:border-mint-primary/30"
        }`}
    >
      {label}
    </button>
  );
}
