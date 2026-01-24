"use client";

import { useState } from "react";
import { Search, Map as MapIcon, List, Filter, SlidersHorizontal, ChevronDown } from "lucide-react";
import FoodCard from "../FoodCard";
import dynamic from "next/dynamic";

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

  const filteredPosts = initialData.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.donor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || post.type === activeCategory;
    return matchesSearch && matchesCategory;
  });

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredPosts.map((post) => (
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
                  ))}
                </div>
              )}
            </>
          ) : (
            <MapView posts={filteredPosts} />
          )}
        </div>
      </div>

    </div>
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
