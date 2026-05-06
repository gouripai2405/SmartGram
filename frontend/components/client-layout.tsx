'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useState } from 'react';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('EN');

  return (
    <>
      <Header language={language} setLanguage={setLanguage} />
      {children}
      <Footer />
    </>
  );
}