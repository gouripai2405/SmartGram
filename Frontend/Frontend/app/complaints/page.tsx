'use client';

import Link from 'next/link';

export default function ComplaintsPage() {
  const complaints = [];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              SG
            </div>

            <h1 className="text-green-700 font-bold text-xl">
              GramConnect
            </h1>
          </div>

          <Link
            href="/"
            className="text-sm font-medium text-slate-700 hover:text-green-700"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-6xl mx-auto px-6 py-10 flex-1 w-full">
        {/* Top Title */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-2">
              Complaint Management System
            </h2>

            <p className="text-slate-500">
              Register, track, and resolve your complaints
            </p>
          </div>

          {/* CLICKABLE BUTTON */}
          <Link
            href="/register"
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-3 rounded-lg shadow inline-block"
          >
            + Register New Complaint
          </Link>
        </div>

        {/* Section Title */}
        <h3 className="text-2xl font-bold text-slate-900 mb-4">
          Your Complaints
        </h3>

        {/* Success Box */}
        <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-4 rounded-lg mb-5">
          Complaints loaded successfully
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-slate-50 text-sm font-semibold text-slate-600 border-b">
            <div>Complaint ID</div>
            <div>Category</div>
            <div>Description</div>
            <div>Date</div>
            <div>Status</div>
          </div>

          {complaints.length === 0 && (
            <div className="px-6 py-12 text-center text-slate-400 text-sm">
              No complaints found. Your registered complaints will appear here.
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-2xl p-6">
          <h4 className="text-xl font-bold text-slate-900 mb-4">
            Contact Support Team
          </h4>

          <p className="text-slate-600 mb-5">
            Need help regarding complaints or village services? Contact us directly:
          </p>

          <div className="space-y-3 text-slate-700">
            <p>
              📞 <span className="font-semibold">Phone:</span> +91 9876543210
            </p>

            <p>
              📧 <span className="font-semibold">Email:</span> support@smartgram.in
            </p>

            <p>
              📍 <span className="font-semibold">Address:</span> Gram Panchayat Wakare, Nashik
            </p>

            <p>
              ⏰ <span className="font-semibold">Office Time:</span> Mon-Sat, 10 AM - 6 PM
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 text-white text-center py-4 text-sm">
        © 2024 GramConnect - Digital Grampanchayat Management System
      </div>
    </div>
  );
}