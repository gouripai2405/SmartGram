'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, LogOut } from 'lucide-react';
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
          <a href="#about">{text.about}</a>
          <a href="#services">{text.services}</a>
    
          <a href="#contact">{text.contact}</a>

          <button
            onClick={() => setLanguage(language === 'EN' ? 'MR' : 'EN')}
            className="px-5 py-2 border border-green-600 rounded-xl"
          >
            {language === 'EN' ? 'मराठी' : 'English'}
          </button>
        </nav>

        {/* Mobile */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}