"use client";

import { QRCodeSVG } from "qrcode.react";

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  className?: string;
  showValue?: boolean;
}

export default function QRCodeDisplay({
  value,
  size = 200,
  className = "",
  showValue = false
}: QRCodeDisplayProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 ${className}`}>
      <div className="relative">
        <QRCodeSVG
          value={value}
          size={size}
          level={"H"} // High error correction
          includeMargin={true}
          className="rounded-lg"
        />
        {/* Optional: Add Logo in center (requires image source) */}
        {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-full">
           <Logo size={size/5} /> 
        </div> */}
      </div>

      {showValue && (
        <div className="mt-3 text-xs text-gray-500 font-mono break-all text-center max-w-[200px]">
          {value}
        </div>
      )}
    </div>
  );
}
