'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NoticesPage() {
  const notices = [
    {
      title: 'Annual Gram Sabha Meeting 2024',
      tag: 'Gram Sabha',
      desc: 'Annual general assembly meeting for all citizens to discuss village development and budget allocation.',
      date: '15 March 2024',
      time: '2:00 PM',
      icon: '📋',
      location: 'Village Community Hall',
    },
    {
      title: 'Property Tax Payment Deadline Extended',
      tag: 'Tax Notification',
      desc: 'Due to recent heavy rainfall, the property tax payment deadline has been extended by 15 days.',
      date: '31 March 2024',
      time: '',
      icon: '📌',
      location: '',
    },
    {
      title: 'Local Elections Notification',
      tag: 'Elections',
      desc: 'Schedule for upcoming gram panchayat elections has been announced.',
      date: '01 May 2024',
      time: '',
      icon: '🗳️',
      location: '',
    },
    {
      title: 'Road Repair Work Notice',
      tag: 'Maintenance',
      desc: 'Main road repair work will begin next week. Temporary traffic changes may apply.',
      date: '10 May 2024',
      time: '',
      icon: '🛠️',
      location: '',
    },
    {
      title: 'Government Water Scheme',
      tag: 'Government Circular',
      desc: 'New rural water supply scheme registration has started.',
      date: '12 May 2024',
      time: '',
      icon: '📢',
      location: '',
    },
    {
      title: 'Village Festival Announcement',
      tag: 'Announcement',
      desc: 'Annual village cultural festival will be held this month.',
      date: '20 May 2024',
      time: '',
      icon: '🎉',
      location: '',
    },
  ];

  const filters = [
    'All Notices',
    'Gram Sabha',
    'Tax Notification',
    'Elections',
    'Maintenance',
    'Government Circular',
    'Announcement',
  ];

  const [activeFilter, setActiveFilter] = useState('All Notices');

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
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Title */}
        <h2 className="text-4xl font-bold text-slate-900 mb-2">
          Public Notices & Announcements
        </h2>

        <p className="text-slate-500 mb-8">
          Stay updated with latest gram panchayat notices, elections, and events
        </p>

        {/* Clickable Filter Buttons */}
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
          {filteredNotices.map((notice, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-7"
            >
              <div className="flex justify-between gap-6">
                {/* Left */}
                <div className="flex gap-4">
                  <div className="text-3xl mt-1">{notice.icon}</div>

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

                {/* Right */}
                <div className="text-right min-w-[130px]">
                  <p className="font-semibold text-slate-800">
                    {notice.date}
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