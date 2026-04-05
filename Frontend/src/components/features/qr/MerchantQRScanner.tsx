import React from 'react';
import useQRScanner from '../../../hooks/useQRScanner';

const MerchantQRScanner = () => {
  const qrCodeRegionId = 'qr-code-region';

  useQRScanner(
    qrCodeRegionId,
    (decodedText: string) => console.log('Scanned result:', decodedText),
    (errorMessage: string) => console.warn('Scanning error:', errorMessage)
  );

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center">
      <div id={qrCodeRegionId} className="w-full h-full max-w-md max-h-md relative">
        <div className="absolute inset-0 border-4 border-blue-500 rounded-lg pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-50 animate-scan-line"></div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-70 pointer-events-none"></div>
      <style jsx>{`
        @keyframes scan-line {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        .animate-scan-line {
          animation: scan-line 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default MerchantQRScanner;