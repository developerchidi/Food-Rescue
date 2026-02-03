import { generateSecureQRToken } from "@/lib/qr";
import QRCodeDisplay from "@/components/features/qr/QRCodeDisplay";

export default async function TestQRPage() {
  // Generate a test token on every render
  const token = await generateSecureQRToken();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 gap-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">QR Engine Test</h1>
        <p className="text-gray-500">Refresh page to generate new secure token</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-center text-mint-darker">Generated QR Code</h2>
          <QRCodeDisplay value={token} size={250} showValue={true} />
        </div>

        <div className="max-w-md space-y-4">
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <h3 className="font-semibold text-blue-700 mb-1">Token Format</h3>
            <code className="text-sm break-all text-blue-900">{token}</code>
          </div>

          <div className="text-sm text-gray-600">
            <p><strong>Validation Logic:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Header: <code>FR-</code></li>
              <li>Timestamp: Base36 Encoded</li>
              <li>Entropy: 8 bytes random hex</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
