'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Footer } from '@/components/footer';

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white flex flex-col">


      {/* HERO */}
      <section className="relative bg-green-700 text-white flex items-center justify-center text-center px-6 overflow-hidden min-h-[90vh]">

        {/* curved background layer */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-green-800 rounded-t-[100%]"></div>

        <div className="relative z-10 max-w-4xl">

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            SmartGram – Wakare Digital Grampanchayat Portal
          </h1>

          <p className="text-lg md:text-xl text-green-100 mb-10">
            Empowering Wakare village through digital governance, public services, and sustainable development.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">

  <Link
    href="/dashboard"
    className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100 transition"
  >
    Dashboard
  </Link>

  {!user && (
    <>
      <Link
        href="/login"
        className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-700 transition"
      >
        Login
      </Link>

      <Link
        href="/register"
        className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-700 transition"
      >
        Register
      </Link>
    </>
  )}

</div>

        </div>
      </section>
    </div>
  );
}