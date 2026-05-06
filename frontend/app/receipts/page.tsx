'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { receiptsAPI } from '@/lib/api';

export default function ReceiptsPage() {
  const [receipts, setReceipts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const taxId = searchParams.get('tax'); // 🔥 GET TAX ID

  useEffect(() => {
    const load = async () => {
      try {
        const data = await receiptsAPI.list();
        setReceipts(data);
      } catch (err) {
        console.error('Failed to load receipts', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // 🔥 FILTER / SORT (bring matching receipt on top)
  const sortedReceipts = [...receipts].sort((a, b) => {
    if (a.tax === taxId) return -1;
    if (b.tax === taxId) return 1;
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <h2 className="text-4xl font-bold mb-6">
        Receipts
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : sortedReceipts.length === 0 ? (
        <p>No receipts found</p>
      ) : (

        <div className="space-y-6">

          {sortedReceipts.map((r) => {
            const isMatch = r.tax === taxId;

            return (
              <div
                key={r._id}
                className={`
                  p-6 rounded-2xl shadow border flex justify-between items-center
                  ${isMatch ? 'bg-green-50 border-green-500' : 'bg-white'}
                `}
              >

                <div>
                  <h3 className="text-lg font-bold">
                    Receipt
                  </h3>

                  <p>Amount: ₹{r.amount}</p>

                  <p className="text-sm text-gray-600">
                    Date: {new Date(r.createdAt).toLocaleDateString()}
                  </p>

                  {isMatch && (
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded mt-2 inline-block">
                      SELECTED
                    </span>
                  )}
                </div>

                <button
                  onClick={() => window.print()}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Print
                </button>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}