'use client';

import { useState, useEffect } from 'react';
import { noticesAPI } from '@/lib/api';

export default function NoticesPage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState('All Notices');

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    const loadNotices = async () => {
      try {
        const data = await noticesAPI.list();
        console.log("NOTICES:", data);
        setNotices(data);
      } catch (err) {
        console.error('Failed to fetch notices', err);
      }
    };

    loadNotices();
  }, []);

  // 🔥 FILTER LIST (dynamic from DB)
  const filters = [
    'All Notices',
    ...Array.from(new Set(notices.map((n) => n.tag))).filter(Boolean),
  ];

  const filteredNotices =
    activeFilter === 'All Notices'
      ? notices
      : notices.filter((notice) => notice.tag === activeFilter);

  const getCount = (filter: string) => {
    if (filter === 'All Notices') return notices.length;
    return notices.filter((notice) => notice.tag === filter).length;
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Title */}
        <h2 className="text-4xl font-bold text-slate-900 mb-2">
          Public Notices & Announcements
        </h2>

        <p className="text-slate-500 mb-8">
          Stay updated with latest gram panchayat notices, elections, and events
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {filters.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(item)}
              className={`px-4 py-2 rounded-lg text-sm border transition-all duration-300 ${
                activeFilter === item
                  ? 'bg-green-50 border-green-500 text-green-700'
                  : 'bg-white border-slate-300 text-slate-700 hover:border-green-500 hover:text-green-700'
              }`}
            >
              {item} ({getCount(item)})
            </button>
          ))}
        </div>

        {/* Notices */}
        <div className="space-y-6">
          {filteredNotices.map((notice) => (
            <div
              key={notice._id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-7"
            >
              <div className="flex justify-between gap-6">

                {/* LEFT */}
                <div className="flex gap-4">
                  <div className="text-3xl mt-1">
                    {notice.icon || '📢'}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {notice.title}
                    </h3>

                    <span className="inline-block text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full mb-3">
                      {notice.tag}
                    </span>

                    <p className="text-slate-600 mb-3 max-w-3xl">
                      {notice.desc}
                    </p>

                    {notice.location && (
                      <p className="text-sm text-pink-600 mb-4">
                        📍 Location: {notice.location}
                      </p>
                    )}

                    <button className="text-green-600 font-semibold hover:underline">
                      Read More →
                    </button>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="text-right min-w-[130px]">
                  <p className="font-semibold text-slate-800">
                    {new Date(notice.date).toLocaleDateString()}
                  </p>

                  {notice.time && (
                    <p className="text-sm text-slate-500 mt-1">
                      {notice.time}
                    </p>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}