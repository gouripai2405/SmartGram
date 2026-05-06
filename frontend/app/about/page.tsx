'use client';

import Link from 'next/link';
import { Footer } from '@/components/footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* TITLE */}
      <div className="text-center py-10">
        <h2 className="text-3xl font-bold text-green-700">
          About Gram Panchayats
        </h2>
        <div className="w-20 h-1 bg-green-600 mx-auto mt-2 rounded"></div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">

        {/* LEFT BIG CARD */}
        <div className="md:col-span-1 bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-4">
            Local Self-Governance
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            A Gram Panchayat is the foundational unit of the Panchayati Raj system in India,
            serving as the local self-government at the village level.
            <br /><br />
            Established under the 73rd Constitutional Amendment Act, these institutions play
            a crucial role in rural development and administration.
            <br /><br />
            Each Gram Panchayat typically covers a population of 1,000 to 5,000 residents
            and is responsible for local planning, infrastructure development, and implementation
            of various government schemes at the grassroots level.
          </p>
        </div>

        {/* RIGHT CARDS */}
        <div className="md:col-span-2 grid grid-cols-2 gap-6">

          <Card title="Welfare Services" text="Implementation of social welfare schemes and poverty alleviation programs." />
          <Card title="Infrastructure" text="Development and maintenance of local roads, water supply, and public facilities." />
          <Card title="Local Justice" text="Resolution of minor disputes and maintenance of peace in the village." />
          <Card title="Rural Development" text="Promotion of agriculture, small industries, and employment." />

        </div>

      </div>
    </div>
  );
}

// reusable card
function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <h4 className="font-bold text-green-700 mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  );
}