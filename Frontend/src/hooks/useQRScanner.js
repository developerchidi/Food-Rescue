import { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { toast } from 'react-toastify';

const useQRScanner = (qrCodeRegionId, onSuccess, onError) => {
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    html5QrCodeRef.current = new Html5Qrcode(qrCodeRegionId);

    const startScanner = async () => {
      try {
        await html5QrCodeRef.current.start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            toast.success('Xác nhận thành công');
            onSuccess(decodedText);
            stopScanner();
          },
          (errorMessage) => {
            console.warn('Scanning error:', errorMessage);
            onError(errorMessage);
          }
        );
      } catch (err) {
        toast.error('Thất bại');
        console.error('Failed to start scanner:', err);
      }
    };

    startScanner();

    return () => {
      stopScanner();
    };
  }, [qrCodeRegionId, onSuccess, onError]);

  const stopScanner = () => {
    if (html5QrCodeRef.current) {
      html5QrCodeRef.current.stop().then(() => {
        html5QrCodeRef.current.clear();
      });
    }
  };

  return { stopScanner };
};

export default useQRScanner;