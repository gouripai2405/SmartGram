'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ReceiptContent() {
  const searchParams = useSearchParams();
  const taxId = searchParams.get('tax');

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <h1 className="text-4xl font-bold mb-6">
        Receipts
      </h1>

      {taxId ? (
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">
            Payment Successful
          </h2>

          <p className="mb-2">
            Tax ID: {taxId}
          </p>

          <p className="mb-4">
            Amount Paid: ₹2500
          </p>

          <button
            onClick={() => window.print()}
            className="bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            Print Receipt
          </button>
        </div>
      ) : (
        <p>No receipt found</p>
      )}
    </div>
  );
}

export default function ReceiptsPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ReceiptContent />
    </Suspense>
  );
}