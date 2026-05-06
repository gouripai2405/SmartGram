'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { receiptsAPI } from '@/lib/api';

export default function ReceiptDetails() {
  const { id } = useParams();
  const [receipt, setReceipt] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const data = await receiptsAPI.list();
      const found = data.find((r: any) => r._id === id);
      setReceipt(found);
    };
    load();
  }, [id]);

  if (!receipt) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">

      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl p-10 border">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700">
            SmartGram Portal
          </h1>
          <p className="text-slate-500">
            Digital Grampanchayat Receipt
          </p>
        </div>

        {/* RECEIPT TITLE */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Payment Receipt</h2>

          <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
            Completed
          </span>
        </div>

        {/* DETAILS */}
        <div className="space-y-4 text-lg">

          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">Receipt ID</span>
            <span className="font-medium">{receipt._id}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">Amount Paid</span>
            <span className="font-bold text-green-600">
              ₹{receipt.amount}
            </span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">Payment Date</span>
            <span>
              {new Date(receipt.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">Tax Reference</span>
            <span className="text-sm text-slate-600">
              {receipt.tax}
            </span>
          </div>

        </div>

        {/* FOOTER */}
        <div className="mt-10 text-center text-sm text-slate-500">
          This is a digitally generated receipt. No signature required.
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-center gap-4 mt-8">

          <button
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl"
          >
            Print
          </button>

          <button
            onClick={() => window.history.back()}
            className="bg-slate-200 hover:bg-slate-300 px-6 py-2 rounded-xl"
          >
            Back
          </button>

        </div>

      </div>
    </div>
  );
}