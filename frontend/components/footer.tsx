'use client';

import Link from 'next/link';
import {
  Landmark,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="bg-green-700 text-white mt-12">
      <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">

       {/* Column 1 */}
<div className="md:-ml-10">
  <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
    <Landmark className="w-5 h-5" />
    SmartGram
  </h2>

  <p className="text-base leading-8 text-green-100 mb-5 max-w-sm">
  A comprehensive digital platform connecting citizens with
  local governance institutions across Wakare district.
</p>
  <div className="flex gap-4">
    <Facebook className="w-5 h-5 hover:text-yellow-300 cursor-pointer transition" />
    <Twitter className="w-5 h-5 hover:text-yellow-300 cursor-pointer transition" />
    <Instagram className="w-5 h-5 hover:text-yellow-300 cursor-pointer transition" />
    <Linkedin className="w-5 h-5 hover:text-yellow-300 cursor-pointer transition" />
  </div>
</div>
        {/* Column 2 */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Quick Links</h3>

          <ul className="space-y-3 text-base">
            <li className="flex items-center gap-2">
              <span className="font-bold text-xl">•</span>
              <Link href="/">Home</Link>
            </li>

            <li className="flex items-center gap-2">
              <span className="font-bold text-xl">•</span>
              <Link href="/about">About</Link>
            </li>

            <li className="flex items-center gap-2">
              <span className="font-bold text-xl">•</span>
              <Link href="/services">Services</Link>
            </li>

            <li className="flex items-center gap-2">
              <span className="font-bold text-xl">•</span>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Services</h3>

          <ul className="space-y-3 text-base">
            <li className="flex items-center gap-2">
              <span className="font-bold text-xl">•</span>
              House / Water Tax
            </li>

            <li className="flex items-center gap-2">
              <span className="font-bold text-xl">•</span>
              Complaint Box
            </li>

            <li className="flex items-center gap-2">
              <span className="font-bold text-xl">•</span>
              Notice Board
            </li>

            <li className="flex items-center gap-2">
              <span className="font-bold text-xl">•</span>
              Citizen Services
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Contact Info</h3>

          <ul className="space-y-3 text-base">
            <li className="flex items-center gap-3">
              <span className="font-bold text-xl">•</span>
              <MapPin className="w-5 h-5" />
              Wakare, Maharashtra
            </li>

            <li className="flex items-center gap-3">
  <span className="font-bold text-xl">•</span>
  <Phone className="w-5 h-5" />
  +91 253 246 0099
</li>

            <li className="flex items-center gap-3">
              <span className="font-bold text-xl">•</span>
              <Mail className="w-5 h-5" />
              info@smartgram.in
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-green-500 text-center py-4 text-sm text-green-100">
        © 2026 SmartGram – Wakare Digital Grampanchayat Portal
      </div>
    </footer>
  );
}