'use client';

import Link from 'next/link';
import { Footer } from '@/components/footer';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* TITLE */}
      <div className="text-center mt-10 mb-8">
        <h2 className="text-3xl font-bold text-green-700">
          SmartGram Services
        </h2>

        <div className="w-16 h-1 bg-green-600 mx-auto mt-2 rounded"></div>

        <p className="text-gray-500 mt-3 text-sm">
          Digital services available for Wakare village citizens
        </p>
      </div>

      {/* CARDS GRID */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 pb-16">

        <ServiceCard
          link="/property"
          icon="🏠"
          title="Property Management"
          desc="Manage house records, ownership details and village property data."
        />

        <ServiceCard
          link="/taxes"
          icon="💳"
          title="Online Tax Payment"
          desc="Pay house tax, water tax and dues online instantly."
        />

        <ServiceCard
          link="/complaints"
          icon="📦"
          title="Complaint Box"
          desc="Register complaints for roads, water and sanitation issues."
        />

        <ServiceCard
          link="/notices"
          icon="📢"
          title="Public Notice Board"
          desc="View latest Gram Panchayat notices and announcements."
        />

        <ServiceCard
          link="/receipts"
          icon="📄"
          title="Digital Receipt"
          desc="Download payment receipts and documents anytime."
        />

        <ServiceCard
          link="/support"
          icon="📞"
          title="Contact Support"
          desc="Get help directly from Gram Panchayat staff."
        />

      </div>

      <Footer />
    </div>
  );
}

/* 🔹 CARD COMPONENT */
function ServiceCard({
  icon,
  title,
  desc,
  link,
}: {
  icon: string;
  title: string;
  desc: string;
  link: string;
}) {
  return (
    <Link href={link} className="block">
      <div className="
        bg-white 
        rounded-xl 
        p-6 
        shadow-md 
        border-l-4 border-green-600
        transition-all duration-300
        hover:shadow-xl 
        hover:scale-[1.02]
        cursor-pointer
      ">

        <div className="text-3xl mb-4">{icon}</div>

        <h3 className="text-lg font-bold text-green-700 mb-2">
          {title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed">
          {desc}
        </p>

      </div>
    </Link>
  );
}