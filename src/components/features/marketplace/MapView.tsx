"use client";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import FoodCard from "../FoodCard";
import { Maximize2, X, MapPin, Clock, ShoppingCart, Info } from "lucide-react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Fix for default marker icons in Leaflet with Next.js
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapViewProps {
  posts: any[];
}

function ZoomHandler({ onZoomChange }: { onZoomChange: (zoom: number) => void }) {
  const map = useMapEvents({
    zoom() {
      onZoomChange(map.getZoom());
    },
    zoomend() {
      onZoomChange(map.getZoom());
    }
  });
  return null;
}

// Component to handle programmatic popup closing
function PopupSync({ selectedPost }: { selectedPost: any }) {
  const map = useMap();
  useEffect(() => {
    if (!selectedPost) {
      map.closePopup();
    }
  }, [selectedPost, map]);
  return null;
}

export default function MapView({ posts }: MapViewProps) {
  const router = useRouter();
  const [zoom, setZoom] = useState(13);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    // Prevent scrolling when map is expanded
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isExpanded]);

  // Default position (Hồ Chí Minh City)
  const position: [number, number] = [10.7769, 106.7009];

  // Calculate scale based on zoom. Base zoom 13 as 1.0
  const scale = Math.pow(2, zoom - 13);

  const MapContent = (
    <div className={`relative w-full h-full ${isExpanded ? "rounded-[1.5rem]" : "rounded-[1.5rem]"} overflow-hidden shadow-2xl bg-white flex`}>
      {/* Sidebar (Google Maps style) - Reverted to custom layout */}
      {isExpanded && selectedPost && (
        <div className="w-96 h-full bg-white border-r border-black/5 flex flex-col z-[1001] shadow-xl animate-in slide-in-from-left duration-300">
          <div className="relative h-64 w-full shrink-0">
            <Image
              src={selectedPost.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"}
              alt={selectedPost.title}
              fill
              className="object-cover"
            />
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg hover:bg-white transition-all text-foreground"
            >
              <X size={20} />
            </button>
            <div className="absolute top-4 right-4 px-3 py-1 bg-mint-primary/90 backdrop-blur-md rounded-full text-xs font-bold text-foreground">
              -{Math.round(((selectedPost.originalPrice - selectedPost.rescuePrice) / selectedPost.originalPrice) * 100)}%
            </div>
          </div>

          <div className="p-8 overflow-y-auto flex-grow custom-scrollbar">
            <div className="flex items-center gap-2 text-sm font-bold text-mint-darker mb-4">
              <MapPin size={16} />
              {selectedPost.donor.name}
            </div>

            <h2 className="text-3xl font-black text-[#2d3436] mb-4 leading-tight">
              {selectedPost.title}
            </h2>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm font-bold text-orange-primary bg-orange-50 px-3 py-1.5 rounded-xl">
                <Clock size={16} />
                {new Date(selectedPost.expiryDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="text-sm font-bold text-foreground/30 uppercase tracking-widest">
                {selectedPost.type === "MYSTERY_BOX" ? "Mystery Box" : "Món đơn lẻ"}
              </div>
            </div>

            <p className="text-foreground/60 leading-relaxed mb-8 italic">
              "{selectedPost.description || "Không có mô tả cho món ăn này."}"
            </p>

            <div className="bg-mint-primary/5 border border-mint-primary/10 rounded-[2rem] p-6 mb-8 text-center sm:text-left">
              <div className="flex justify-between items-start mb-2">
                <div className="text-xs text-foreground/40 line-through">
                  {selectedPost.originalPrice.toLocaleString()}đ
                </div>
                <div className="text-xs font-black text-mint-darker opacity-40 uppercase tracking-tighter">
                  Còn {selectedPost.quantity} suất
                </div>
              </div>
              <div className="text-4xl font-black text-mint-darker">
                {selectedPost.rescuePrice.toLocaleString()}đ
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => router.push(`/rescue/confirm/${selectedPost.id}`)}
                disabled={selectedPost.quantity === 0}
                className="w-full h-16 bg-mint-darker text-white font-black rounded-2xl shadow-xl shadow-mint-darker/20 hover:shadow-2xl hover:shadow-mint-darker/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
              >
                <ShoppingCart size={22} />
                {selectedPost.quantity === 0 ? "Đã hết" : "Giải cứu ngay"}
              </button>
              <button className="w-full h-16 bg-white border-2 border-black/5 text-[#2d3436] font-black rounded-2xl hover:bg-black/5 transition-all flex items-center justify-center gap-3">
                <Info size={22} />
                Xem chi tiết cửa hàng
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-grow relative h-full">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute top-4 right-4 z-[1000] bg-white p-3 rounded-xl shadow-lg border border-black/5 hover:bg-black/5 transition-all text-mint-darker flex items-center justify-center"
          title={isExpanded ? "Đóng" : "Phóng to"}
        >
          {isExpanded ? <X size={24} /> : <Maximize2 size={24} />}
        </button>

        <MapContainer
          key={isExpanded ? 'expanded' : 'normal'} // Force re-mount to recalculate size correctly
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <ZoomHandler onZoomChange={setZoom} />
          <PopupSync selectedPost={selectedPost} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {posts.map((post) => (
            post.donor.latitude && post.donor.longitude && (
              <Marker
                key={post.id}
                position={[post.donor.latitude, post.donor.longitude]}
                icon={DefaultIcon}
                eventHandlers={{
                  click: () => {
                    if (isExpanded) {
                      setSelectedPost(post);
                    }
                  },
                }}
              >
                <Popup
                  className="food-popup"
                  minWidth={320 * scale}
                  maxWidth={320 * scale}
                  eventHandlers={{
                    remove: () => {
                      if (isExpanded) setSelectedPost(null);
                    }
                  }}
                >
                  <div
                    style={{
                      transform: `scale(${scale})`,
                      transformOrigin: 'bottom center',
                      width: '320px',
                      borderRadius: '2rem',
                      overflow: 'hidden',
                      boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
                      background: 'white'
                    }}
                  >
                    <FoodCard
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
                  </div>
                </Popup>
              </Marker>
            )
          ))}
        </MapContainer>
      </div>
    </div>
  );

  return (
    <>
      <div className="h-[600px] w-full bg-white rounded-[1.5rem] border border-black/5 overflow-hidden shadow-sm relative z-0">
        {!isExpanded && MapContent}
      </div>

      {isExpanded && mounted && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-8">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-500"
            onClick={() => setIsExpanded(false)}
          />
          <div className="relative w-full h-full max-w-[95vw] mx-auto shadow-2xl animate-in zoom-in-95 fade-in duration-300">
            {MapContent}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
