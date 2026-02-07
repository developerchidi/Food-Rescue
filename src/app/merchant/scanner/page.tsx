"use client";

import MerchantTopbar from "@/components/layout/merchant/MerchantTopbar";
import QRScanner from "@/components/features/merchant/QRScanner";
import { verifyQRCode, updateDonationStatus } from "@/actions/merchant-actions";
import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader } from "lucide-react";

export default function MerchantScannerPage() {
  const [showScanner, setShowScanner] = useState(true);
  const [scannedResult, setScannedResult] = useState<{
    qrCode: string;
    donation?: any;
    verified: boolean;
  } | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [completing, setCompleting] = useState(false);

  const handleScan = async (result: string) => {
    setShowScanner(false);
    setVerifying(true);
    setError(null);

    const verifyResult = await verifyQRCode(result);
    if (verifyResult.success && verifyResult.donation) {
      setScannedResult({
        qrCode: result,
        donation: verifyResult.donation,
        verified: true,
      });
    } else {
      setError(verifyResult.error || "Không thể xác thực mã QR");
      setScannedResult({
        qrCode: result,
        verified: false,
      });
    }
    setVerifying(false);
  };

  const handleComplete = async () => {
    if (!scannedResult?.donation) return;

    setCompleting(true);
    const result = await updateDonationStatus(
      scannedResult.donation.id,
      "COMPLETED"
    );

    if (result.success) {
      setSuccess("✓ Giao dịch hoàn thành!");
      setScannedResult(null);
      setTimeout(() => {
        setSuccess(null);
        setShowScanner(true);
      }, 3000);
    } else {
      setError(result.error || "Không thể hoàn thành giao dịch");
    }
    setCompleting(false);
  };

  const resetScanner = () => {
    setShowScanner(true);
    setScannedResult(null);
    setError(null);
  };

  return (
    <div className="px-6 md:px-8">
      <MerchantTopbar
        title="Quét mã QR"
        subtitle="Xác nhận các lượt giải cứu từ khách hàng"
      />

      {/* Scanner or Result View */}
      {showScanner ? (
        <QRScanner onScan={handleScan} onClose={() => {}} />
      ) : (
        <div className="mt-8 max-w-lg mx-auto">
          {/* Verifying */}
          {verifying && (
            <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center space-y-4">
              <Loader className="w-12 h-12 text-mint-primary animate-spin mx-auto" />
              <h2 className="text-lg font-bold text-slate-900">Đang xác thực mã QR...</h2>
            </div>
          )}

          {/* Result */}
          {!verifying && scannedResult && (
            <div className="space-y-6">
              {scannedResult.verified && scannedResult.donation ? (
                <>
                  {/* Success Card */}
                  <div className="bg-white rounded-2xl border-2 border-green-200 p-8 text-center space-y-6">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                    <div>
                      <h2 className="text-2xl font-black text-slate-900">
                        Mã QR hợp lệ!
                      </h2>
                      <p className="text-slate-600 mt-2">
                        Giao dịch sẵn sàng hoàn thành
                      </p>
                    </div>

                    {/* Product Info */}
                    <div className="bg-slate-50 rounded-xl p-4 text-left space-y-3">
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Sản phẩm</p>
                        <p className="font-bold text-slate-900">
                          {scannedResult.donation.post.title}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Khách hàng</p>
                        <p className="font-bold text-slate-900">
                          {scannedResult.donation.receiver.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {scannedResult.donation.receiver.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Số lượng</p>
                        <p className="font-bold text-slate-900">
                          {scannedResult.donation.quantity} suất
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Phương thức</p>
                        <p className="font-bold text-slate-900">
                          {scannedResult.donation.fulfillmentMethod === "DELIVERY"
                            ? "Giao hàng"
                            : "Lấy tại chỗ"}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={resetScanner}
                        className="flex-1 px-4 py-3 bg-slate-100 text-slate-900 rounded-lg font-bold hover:bg-slate-200 transition-colors"
                      >
                        Quét mã khác
                      </button>
                      <button
                        onClick={handleComplete}
                        disabled={completing}
                        className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-colors disabled:opacity-50"
                      >
                        {completing ? "Đang xử lý..." : "✓ Hoàn thành"}
                      </button>
                    </div>
                  </div>

                  {/* Success Message */}
                  {success && (
                    <div className="bg-green-100 border border-green-300 rounded-lg p-4 text-green-700 font-bold text-center animate-in slide-in-from-top">
                      {success}
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Error Card */}
                  <div className="bg-white rounded-2xl border-2 border-red-200 p-8 text-center space-y-6">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
                    <div>
                      <h2 className="text-2xl font-black text-slate-900">
                        Mã QR không hợp lệ
                      </h2>
                      <p className="text-red-600 mt-2 font-medium">
                        {error || "Không thể xác thực mã QR này"}
                      </p>
                    </div>

                    {/* Scanned Code Display */}
                    <div className="bg-slate-50 rounded-lg p-4 break-all font-mono text-xs text-slate-600 max-h-24 overflow-y-auto">
                      {scannedResult.qrCode}
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={resetScanner}
                      className="w-full px-4 py-3 bg-mint-primary text-slate-900 rounded-lg font-bold hover:bg-mint-darker transition-colors"
                    >
                      Quét lại
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Info Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {[
          {
            num: "1",
            title: "Yêu cầu khách quét mã QR",
            desc: "Yêu cầu khách hàng xuất trình mã QR của họ",
          },
          {
            num: "2",
            title: "Đặt camera trên mã",
            desc: "Hãy chắc chắn mã QR nằm trong khung quét",
          },
          {
            num: "3",
            title: "Xác nhận giao dịch",
            desc: "Kiểm tra thông tin và nhấn hoàn thành",
          },
        ].map((step) => (
          <div
            key={step.num}
            className="bg-white rounded-xl border border-slate-100 p-6 text-center"
          >
            <div className="w-10 h-10 rounded-full bg-mint-primary text-slate-900 font-black text-lg flex items-center justify-center mx-auto mb-3">
              {step.num}
            </div>
            <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
            <p className="text-sm text-slate-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
