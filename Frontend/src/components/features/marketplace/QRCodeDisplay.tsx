"use client";

import { QRCodeSVG } from "qrcode.react";

export default function QRCodeDisplay({ value }: { value: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 flex items-center justify-center">
      <QRCodeSVG
        value={value}
        size={220}
        level="H"
        includeMargin={false}
        className="rounded-lg"
      />
    </div>
  );
}
