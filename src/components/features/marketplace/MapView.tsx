/* eslint-disable */
"use client";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap, Circle, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { useEffect, useState, useMemo } from "react";
import FoodCard from "../FoodCard";
import { Maximize2, X, MapPin, Clock, ShoppingCart, Info, Navigation, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getMarkerIcon, userLocationIcon } from "@/lib/mapIcons";
import { calculateDistance, formatDistance } from "@/lib/geolocation";

// Fix for default marker icons in Leaflet with Next.js
// @ts-ignore
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapViewProps {
  posts: any[];
  userLocation: { lat: number; lng: number } | null;
  distanceFilter: number | null;
  onLocationRequest: () => void;
  isGettingLocation: boolean;
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
function PopupSync({ selectedGroup }: { selectedGroup: any[] | null }) {
  const map = useMap();
  useEffect(() => {
    if (!selectedGroup) {
      map.closePopup();
    }
  }, [selectedGroup, map]);
  return null;
}

// Component to auto-center map on user location (only once)
function MapCenterController({ center }: { center: [number, number] | null }) {
  const map = useMap();
  const hasCenteredRef = useState({ current: false })[0];

  useEffect(() => {
    if (center && !hasCenteredRef.current) {
      map.flyTo(center, 14, { duration: 1.5 });
      hasCenteredRef.current = true;
    }
  }, [center, map, hasCenteredRef]);
  return null;
}

// Component to handle map resizing when sidebar opens/closes
function ResizeHandler({ sidebarOpen }: { sidebarOpen: boolean }) {
  const map = useMap();
  useEffect(() => {
    // Invalidate size after transition
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 400);
    return () => clearTimeout(timer);
  }, [sidebarOpen, map]);
  return null;
}

export default function MapView({ posts, userLocation, distanceFilter, onLocationRequest, isGettingLocation }: MapViewProps) {
  const router = useRouter();
  const [zoom, setZoom] = useState(13);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<any[] | null>(null);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][] | null>(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);

  const groupedPosts = useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    posts.forEach(post => {
      if (post.donor?.latitude && post.donor?.longitude) {
        const key = `${post.donor.name}-${post.donor.latitude}-${post.donor.longitude}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(post);
      }
    });
    return Object.values(groups);
  }, [posts]);

  // Sync selectedPost for compatibility or internal use
  const selectedPost = selectedGroup ? selectedGroup[currentGroupIndex] : null;

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

  // Calculate scale based on zoom
  const scale = Math.min(1.2, Math.pow(2, zoom - 13));

  const content = (
    <div className={`relative w-full h-full overflow-hidden bg-white flex ${isExpanded ? "rounded-[1.5rem]" : "rounded-[1.5rem]"}`}>
      {/* Sidebar (Google Maps style) - Restored rich layout with multi-item support */}
      {isExpanded && selectedGroup && selectedPost && (
        <div className="w-96 h-full bg-white border-r border-black/5 flex flex-col z-[1001] shadow-xl animate-in slide-in-from-left duration-300">
          {/* Main Dish Detail */}
          <div className="relative h-64 w-full shrink-0">
            {selectedPost.imageUrl && (
              <Image
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                fill
                className="object-cover"
              />
            )}
            <button
              onClick={() => setSelectedGroup(null)}
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
              {selectedPost.donor?.name || "Người quyên góp"}
            </div>

            <h2 className="text-3xl font-black text-[#2d3436] mb-4 leading-tight">
              {selectedPost.title}
            </h2>

            <div className="flex items-center gap-4 mb-8 flex-wrap">
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

            <div className="flex flex-col gap-4 mb-8">
              <button
                onClick={() => router.push(`/rescue/confirm/${selectedPost.id}`)}
                disabled={selectedPost.quantity === 0}
                className="w-full h-16 bg-mint-darker text-white font-black rounded-2xl shadow-xl shadow-mint-darker/20 hover:shadow-2xl hover:shadow-mint-darker/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
              >
                <ShoppingCart size={22} />
                {selectedPost.quantity === 0 ? "Đã hết" : "Giải cứu ngay"}
              </button>

              <button
                onClick={async () => {
                  // Nếu đã có route, xóa đi
                  if (routeCoordinates) {
                    setRouteCoordinates(null);
                    return;
                  }

                  if (!userLocation || !selectedPost.donor?.latitude || !selectedPost.donor?.longitude) {
                    alert('Không thể tìm đường. Vui lòng bật vị trí của bạn.');
                    return;
                  }

                  setIsLoadingRoute(true);
                  try {
                    const response = await fetch(
                      `https://router.project-osrm.org/route/v1/driving/${userLocation.lng},${userLocation.lat};${selectedPost.donor.longitude},${selectedPost.donor.latitude}?overview=full&geometries=geojson`
                    );
                    const data = await response.json();

                    if (data.routes && data.routes[0]) {
                      const coords = data.routes[0].geometry.coordinates.map(
                        (coord: [number, number]) => [coord[1], coord[0]] as [number, number]
                      );
                      setRouteCoordinates(coords);
                    }
                  } catch (error) {
                    console.error('Lỗi khi tìm đường:', error);
                    alert('Không thể tìm đường. Vui lòng thử lại.');
                  } finally {
                    setIsLoadingRoute(false);
                  }
                }}
                disabled={isLoadingRoute || !userLocation}
                className="w-full h-14 bg-white border-2 border-mint-primary/30 text-mint-darker font-bold rounded-2xl hover:bg-mint-primary/5 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Navigation size={20} className={isLoadingRoute ? 'animate-spin' : 'text-blue-500'} />
                {isLoadingRoute ? 'Đang tìm đường...' : (routeCoordinates ? 'Xóa chỉ đường' : 'Chỉ đường trên bản đồ')}
              </button>
            </div>

            {/* Other items from the same shop */}
            {selectedGroup.length > 1 && (
              <div className="pt-8 border-t border-black/5">
                <h3 className="font-black text-lg text-sage mb-4 px-1">Các món khác của Shop</h3>
                <div className="space-y-3">
                  {selectedGroup.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setCurrentGroupIndex(idx)}
                      className={`w-full p-3 rounded-2xl flex items-center gap-4 text-left transition-all ${idx === currentGroupIndex ? 'bg-mint-primary/20 border-2 border-mint-primary/40' : 'bg-[#fdfcf8] border border-black/5 hover:border-mint-primary/30'}`}
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-black/5">
                        <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm truncate">{item.title}</h4>
                        <div className="text-mint-dark font-black">{item.rescuePrice.toLocaleString()}đ</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex-grow relative h-full">
        <button
          onClick={onLocationRequest}
          disabled={isGettingLocation}
          className="absolute bottom-4 left-4 z-[1000] bg-white p-3 rounded-xl shadow-lg border border-black/5 hover:bg-blue-50 transition-all text-blue-600 flex items-center justify-center disabled:opacity-50"
        >
          <Navigation size={24} className={isGettingLocation ? 'geolocation-loading' : ''} />
        </button>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute top-4 right-4 z-[1000] bg-white p-3 rounded-xl shadow-lg border border-black/5 hover:bg-black/5 transition-all text-mint-darker flex items-center justify-center"
        >
          {isExpanded ? <X size={24} /> : <Maximize2 size={24} />}
        </button>

        <MapContainer
          // @ts-ignore
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          className="h-full w-full"
          style={{ height: '100%', width: '100%' }}
        >
          <ZoomHandler onZoomChange={setZoom} />
          <PopupSync selectedGroup={selectedGroup} />
          <ResizeHandler sidebarOpen={!!selectedGroup} />
          <MapCenterController center={userLocation ? [userLocation.lat, userLocation.lng] : null} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {userLocation && (
            // @ts-ignore
            <Marker position={[userLocation.lat, userLocation.lng]} icon={userLocationIcon} />
          )}

          {userLocation && distanceFilter && (
            <Circle
              // ts-expect-error - React Leaflet v5 type mismatch
              center={[userLocation.lat, userLocation.lng]}
              radius={distanceFilter * 1000}
              pathOptions={{
                fillColor: '#52b788',
                fillOpacity: 0.15,
                color: '#52b788',
                weight: 2,
                opacity: 0.6,
                dashArray: '5, 10'
              }}
            />
          )}

          {routeCoordinates && (
            <Polyline
              positions={routeCoordinates}
              pathOptions={{
                color: '#2563eb',
                weight: 4,
                opacity: 0.8,
                dashArray: '10, 5'
              }}
            />
          )}

          {groupedPosts.map((group, groupIdx) => {
            const firstPost = group[0];
            const hasMultiple = group.length > 1;
            const markerIcon = getMarkerIcon(firstPost);

            return (
              firstPost.donor?.latitude && firstPost.donor?.longitude && (
                <Marker
                  key={`group-${groupIdx}`}
                  position={[firstPost.donor.latitude, firstPost.donor.longitude]}
                  // @ts-ignore
                  icon={L.divIcon({
                    html: `
                      <div class="relative w-10 h-10">
                        ${markerIcon.options.html}
                        ${hasMultiple ? `
                          <div class="absolute -top-1 -right-1 bg-peach-deep text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-[1001]" style="transform: none;">
                            ${group.length}
                          </div>
                        ` : ''}
                      </div>
                    `,
                    className: 'custom-marker-wrapper',
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                    popupAnchor: [0, -40]
                  })}
                  eventHandlers={{
                    click: () => {
                      setSelectedGroup(group);
                      setCurrentGroupIndex(0);
                    },
                  }}
                >
                  <Popup
                    // @ts-ignore
                    className="food-popup"
                    minWidth={240 * scale}
                    maxWidth={240 * scale}
                  >
                    <div style={{ transform: `scale(${scale})`, transformOrigin: 'bottom center', width: '240px' }} className="relative group overflow-hidden">
                      <FoodCard
                        id={group[currentGroupIndex].id}
                        title={group[currentGroupIndex].title}
                        description={group[currentGroupIndex].description}
                        imageUrl={group[currentGroupIndex].imageUrl}
                        originalPrice={group[currentGroupIndex].originalPrice}
                        rescuePrice={group[currentGroupIndex].rescuePrice}
                        quantity={group[currentGroupIndex].quantity}
                        expiryDate={group[currentGroupIndex].expiryDate}
                        donorName={group[currentGroupIndex].donor.name}
                        type={group[currentGroupIndex].type}
                        compact={true}
                      />

                      {hasMultiple && (
                        <>
                          {/* Carousel Navigation Overlay */}
                          <div className="absolute top-1/2 left-0 right-0 -translate-y-12 flex justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentGroupIndex(prev => (prev === 0 ? group.length - 1 : prev - 1));
                              }}
                              className="w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg text-mint-darker hover:bg-white active:scale-90 transition-all pointer-events-auto"
                            >
                              <ChevronLeft size={20} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentGroupIndex(prev => (prev === group.length - 1 ? 0 : prev + 1));
                              }}
                              className="w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg text-mint-darker hover:bg-white active:scale-90 transition-all pointer-events-auto"
                            >
                              <ChevronRight size={20} />
                            </button>
                          </div>

                          {/* Dots indicator */}
                          <div className="absolute top-[140px] left-0 right-0 flex justify-center gap-1.5 z-10">
                            {group.map((_, idx) => (
                              <div
                                key={idx}
                                className={`h-1.5 rounded-full transition-all ${idx === currentGroupIndex ? 'w-4 bg-mint-dark' : 'w-1.5 bg-white/60 shadow-sm'}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </Popup>
                </Marker>
              )
            );
          })}
        </MapContainer>
      </div>
    </div>
  );

  return (
    <>
      <div className="h-[600px] w-full bg-white rounded-[1.5rem] border border-black/5 overflow-hidden shadow-sm relative z-0">
        {!isExpanded && content}
      </div>

      {isExpanded && mounted && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setIsExpanded(false)} />
          <div className="relative w-full h-full max-w-[95vw] mx-auto shadow-2xl animate-in zoom-in-95 fade-in duration-300">
            {content}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
