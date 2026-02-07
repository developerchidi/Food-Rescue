"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  X,
  Loader,
  AlertCircle,
  CheckCircle2,
  Camera,
  RefreshCw,
} from "lucide-react";

interface QRScannerProps {
  onScan: (result: string) => void;
  onClose: () => void;
}

export default function QRScanner({ onScan, onClose }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastScanned, setLastScanned] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const scannerRef = useRef<any>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize camera and QR scanner library
  useEffect(() => {
    const initializeScanner = async () => {
      try {
        // Dynamically import jsQR
        const jsQR = (await import("jsqr")).default;

        // Request camera access
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment", // Use back camera on mobile
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            setIsLoading(false);
            startScanning(jsQR);
          };
        }
      } catch (err: any) {
        console.error("Camera access error:", err);
        setError(
          err.name === "NotAllowedError"
            ? "Camera access denied. Please allow camera access in settings."
            : err.message || "Failed to access camera"
        );
        setIsLoading(false);
      }
    };

    initializeScanner();

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const startScanning = (jsQR: any) => {
    const scan = () => {
      if (!isScanning || !videoRef.current || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const video = videoRef.current;

      if (
        video.readyState === video.HAVE_ENOUGH_DATA &&
        context &&
        video.videoWidth
      ) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });

        if (code) {
          const scannedValue = code.data;
          if (scannedValue !== lastScanned) {
            setLastScanned(scannedValue);
            onScan(scannedValue);
            setIsScanning(false); // Stop scanning after successful scan
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(scan);
    };

    scan();
  };

  const handleRetry = () => {
    setLastScanned(null);
    setIsScanning(true);
    setError(null);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="bg-slate-900 text-white px-4 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">Quét mã QR</h2>
          <p className="text-xs text-slate-400">Đặt camera trên mã QR của khách</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Camera Area */}
      <div className="flex-1 bg-black relative overflow-hidden flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader className="w-12 h-12 text-mint-primary animate-spin" />
            <p className="text-white font-medium">Khởi động camera...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center gap-4 p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500" />
            <h3 className="text-white font-bold text-lg">Lỗi camera</h3>
            <p className="text-slate-300 text-sm max-w-xs">{error}</p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 bg-mint-primary text-slate-900 rounded-lg font-bold hover:bg-mint-darker transition-colors"
            >
              Đóng
            </button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
            />
            <canvas
              ref={canvasRef}
              className="hidden"
            />

            {/* Scanning Frame Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 border-4 border-mint-primary rounded-2xl shadow-[0_0_0_2000px_rgba(0,0,0,0.5)]">
                {/* Animated corners */}
                <div className="absolute inset-0 rounded-2xl">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-mint-primary"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-mint-primary"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-mint-primary"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-mint-primary"></div>
                </div>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="absolute top-32 left-0 right-0 text-center">
              <div
                className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                  isScanning
                    ? "bg-mint-primary/20 text-mint-primary"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {isScanning ? "Đang quét..." : "✓ Quét thành công"}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Success/Retry Panel */}
      {lastScanned && !error && (
        <div className="bg-slate-900 border-t border-slate-800 p-6 text-white space-y-4 animate-in slide-in-from-bottom">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold">Mã QR đã quét</h3>
              <p className="text-xs text-slate-400 font-mono break-all mt-1">
                {lastScanned}
              </p>
            </div>
          </div>

          <button
            onClick={handleRetry}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-mint-primary text-slate-900 rounded-lg font-bold hover:bg-mint-darker transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Quét mã khác
          </button>
        </div>
      )}
    </div>
  );
}
