'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';

export function Header({
  language,
  setLanguage,
}: {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const text =
    language === 'EN'
      ? {
          home: 'Home',
          about: 'About',
          services: 'Services',
          contact: 'Contact',
        }
      : {
          home: 'मुख्यपृष्ठ',
          about: 'आमच्याबद्दल',
          services: 'सेवा',
          contact: 'संपर्क',
        };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // 🔥 UNIVERSAL CONTACT SCROLL FIX
  const handleContactClick = () => {
    setMobileMenuOpen(false);

    if (pathname === '/') {
      // Already on homepage → scroll directly
      document.getElementById('contact')?.scrollIntoView({
        behavior: 'smooth',
      });
    } else {
      // Navigate then scroll
      router.push('/');
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({
          behavior: 'smooth',
        });
      }, 200);
    }
  };

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            SG
          </div>
          <span className="text-3xl font-bold text-green-700">
            SmartGram Portal
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 text-lg font-medium">

          <Link href="/">{text.home}</Link>
          <Link href="/about">{text.about}</Link>
          <Link href="/services">{text.services}</Link>
          {user && user.role === 'admin' && (
          <Link
            href="/admin"
            className="text-green-700 font-semibold"
          >
            Admin
          </Link>
        )}

          {/* ✅ CONTACT (SCROLL FIXED) */}
          <button onClick={handleContactClick}>
            {text.contact}
          </button>

          {/* Dashboard */}
          {user && (
            <Link href="/dashboard" className="text-green-700 font-semibold">
              Dashboard
            </Link>
          )}

          {/* Language */}
          <button
            onClick={() => setLanguage(language === 'EN' ? 'MR' : 'EN')}
            className="px-5 py-2 border border-green-600 rounded-xl"
          >
            {language === 'EN' ? 'मराठी' : 'English'}
          </button>

          {/* Logout */}
          {user && (
            <button onClick={handleLogout} className="text-red-500 font-medium">
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 text-base font-medium bg-white border-t">

          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            {text.home}
          </Link>

          <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
            {text.about}
          </Link>

          <Link href="/services" onClick={() => setMobileMenuOpen(false)}>
            {text.services}
          </Link>

          {/* ✅ CONTACT (SCROLL FIXED) */}
          <button onClick={handleContactClick} className="text-left">
            {text.contact}
          </button>

          <button
            onClick={() => setLanguage(language === 'EN' ? 'MR' : 'EN')}
            className="border border-green-600 rounded-lg px-4 py-2 w-fit"
          >
            {language === 'EN' ? 'मराठी' : 'English'}
          </button>

          {user && (
            <>
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </Link>

              <button onClick={handleLogout} className="text-red-500 text-left">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}