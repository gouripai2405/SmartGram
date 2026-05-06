import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import { AuthProvider } from '@/lib/auth-context';
import { Toaster } from 'sonner';
import { ClientLayout } from '@/components/client-layout';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  title: 'SmartGram',
  description: 'Digital Grampanchayat Portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      
      <body className="font-sans antialiased bg-gradient-to-br from-slate-50 to-slate-100">

        {/* 🔥 Razorpay Script (CORRECT placement) */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />

        <AuthProvider>
          <ClientLayout>
            {children}
          </ClientLayout>

          <Toaster position="top-right" />
        </AuthProvider>

      </body>
    </html>
  );
}