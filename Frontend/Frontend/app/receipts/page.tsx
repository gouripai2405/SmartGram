'use client';

import Link from 'next/link';

export default function ReceiptsPage() {
  const receipts = [
    {
      id: 'TXN20240101001',
      title: 'Property Tax Payment',
      amount: 2500,
      date: '19 April 2026',
      status: 'Completed',
    },
    {
      id: 'TXN20240101002',
      title: 'Water Tax Payment',
      amount: 500,
      date: '10 April 2026',
      status: 'Completed',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">
              SG
            </div>

            <h1 className="text-green-700 font-bold text-3xl">
              GramConnect
            </h1>
          </div>

          <Link
            href="/"
            className="text-sm font-semibold text-slate-700 hover:text-green-700"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        <h2 className="text-5xl font-bold text-slate-900 mb-3">
          Transaction Receipts
        </h2>

        <p className="text-slate-500 text-xl mb-10">
          View and download all your transaction receipts
        </p>

        {/* Cards */}
        <div className="space-y-6">
          {receipts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 flex justify-between items-center"
            >
              <div className="flex gap-5">

                <div className="text-4xl mt-1">
                  🧾
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 mb-2">
                    Amount: ₹{item.amount}
                  </p>

                  <p className="text-slate-600 mb-2">
                    Receipt ID: {item.id}
                  </p>

                  <p className="text-slate-600">
                    Date: {item.date}
                  </p>

                  <span className="inline-block mt-4 bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
                    {item.status}
                  </span>
                </div>
              </div>

              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold">
                Download
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}