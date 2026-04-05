import { QRCodeSVG } from "qrcode.react";

type QRCodeDisplayProps = {
  value: string;
  size?: number;
};

export default function QRCodeDisplay({ value, size = 200 }: QRCodeDisplayProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <QRCodeSVG value={String(value)} size={size} level="M" includeMargin={false} />
    </div>
  );
}
