'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
              SG
            </div>

            <h1 className="text-4xl font-bold text-green-700">
              SmartGram Portal
            </h1>
          </div>

          <div className="flex gap-8 text-xl font-medium text-slate-800">
            <Link href="/">मुख्यपृष्ठ</Link>
            <Link href="/">आमच्याबद्दल</Link>
            <Link href="/">सेवा</Link>
            <Link href="/">संपर्क</Link>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-7xl mx-auto px-6 py-14">

        <h2 className="text-5xl font-bold text-slate-900 mb-10">
          SmartGram Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Property */}
          <Link href="/property">
            <div className="bg-white p-8 rounded-3xl shadow hover:shadow-xl cursor-pointer">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-3xl font-bold text-green-700 mb-4">
                Property Management
              </h3>
              <p className="text-xl text-slate-600">
                Manage village property records.
              </p>
            </div>
          </Link>

          {/* Tax */}
          <Link href="/taxes">
            <div className="bg-white p-8 rounded-3xl shadow hover:shadow-xl cursor-pointer">
              <div className="text-5xl mb-4">💳</div>
              <h3 className="text-3xl font-bold text-green-700 mb-4">
                Online Tax Payment
              </h3>
              <p className="text-xl text-slate-600">
                Pay taxes online instantly.
              </p>
            </div>
          </Link>

          {/* Complaint */}
          <Link href="/complaints">
            <div className="bg-white p-8 rounded-3xl shadow hover:shadow-xl cursor-pointer">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-3xl font-bold text-green-700 mb-4">
                Complaint Box
              </h3>
              <p className="text-xl text-slate-600">
                Register village complaints.
              </p>
            </div>
          </Link>

          {/* Notices */}
          <Link href="/notices">
            <div className="bg-white p-8 rounded-3xl shadow hover:shadow-xl cursor-pointer">
              <div className="text-5xl mb-4">📢</div>
              <h3 className="text-3xl font-bold text-green-700 mb-4">
                Public Notice Board
              </h3>
              <p className="text-xl text-slate-600">
                Latest Gram Panchayat notices.
              </p>
            </div>
          </Link>

          {/* Receipts */}
          <Link href="/receipts">
            <div className="bg-white p-8 rounded-3xl shadow hover:shadow-xl cursor-pointer">
              <div className="text-5xl mb-4">🧾</div>
              <h3 className="text-3xl font-bold text-green-700 mb-4">
                Digital Receipt
              </h3>
              <p className="text-xl text-slate-600">
                Download payment receipts.
              </p>
            </div>
          </Link>

          {/* CONTACT SUPPORT FIXED */}
          <Link href="/support">
            <div className="bg-white p-8 rounded-3xl shadow hover:shadow-xl cursor-pointer">
              <div className="text-5xl mb-4">☎️</div>
              <h3 className="text-3xl font-bold text-green-700 mb-4">
                Contact Support
              </h3>
              <p className="text-xl text-slate-600">
                Get help from Gram Panchayat staff.
              </p>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}