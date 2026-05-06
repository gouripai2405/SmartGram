'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { complaintsAPI } from '@/lib/api';

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Load complaints from backend
  useEffect(() => {
  const loadComplaints = async () => {
    try {
      console.log("Fetching complaints...");

      const data = await complaintsAPI.list();

      console.log("API RESPONSE:", data);

      setComplaints(data);

    } catch (err) {
      console.error("FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  loadComplaints();
}, []);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">

      {/* Main */}
      <div className="max-w-6xl mx-auto px-6 py-10 flex-1 w-full">

        {/* Title */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-2">
              Complaint Management System
            </h2>
            <p className="text-slate-500">
              Register, track, and resolve your complaints
            </p>
          </div>

          {/* You can later connect this to form page */}
          <Link
            href="/complaints/new"
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-3 rounded-lg shadow"
          >
            + Register New Complaint
          </Link>
        </div>

        {/* Section Title */}
        <h3 className="text-2xl font-bold text-slate-900 mb-4">
          Your Complaints
        </h3>

        {/* Loading */}
        {loading && (
          <div className="text-center py-6 text-slate-500">
            Loading complaints...
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          
          {/* Header */}
          <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-slate-50 text-sm font-semibold text-slate-600 border-b">
            <div>ID</div>
            <div>Category</div>
            <div>Description</div>
            <div>Date</div>
            <div>Status</div>
          </div>

          {/* Data */}
          {complaints.length === 0 && !loading && (
            <div className="px-6 py-12 text-center text-slate-400 text-sm">
              No complaints found.
            </div>
          )}

          {complaints.map((c: any) => (
            <div
              key={c._id}
              className="grid grid-cols-5 gap-4 px-6 py-4 border-b text-sm"
            >
              <div>{c._id.slice(-5)}</div>
              <div>{c.category}</div>
              <div>{c.description}</div>
              <div>{new Date(c.createdAt).toLocaleDateString()}</div>
              <div className="capitalize">{c.status}</div>
            </div>
          ))}
        </div>

        {/* Support */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-2xl p-6">
          <h4 className="text-xl font-bold mb-4">Contact Support</h4>
          <p className="text-slate-600 mb-3">
            Need help? Contact us.
          </p>
          <p>📞 +91 9876543210</p>
          <p>📧 support@smartgram.in</p>
        </div>
      </div>
    </div>
  );
}