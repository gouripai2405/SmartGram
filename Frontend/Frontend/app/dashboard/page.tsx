'use client';

import { Layout } from '@/components/layout';
import { DashboardCard, StatCard } from '@/components/dashboard-components';
import {
  FileText,
  AlertCircle,
  DollarSign,
  HelpCircle,
  Receipt,
  User,
  Bell,
  Zap,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useEffect, useState } from 'react';
import { complaintsAPI, taxesAPI, noticesAPI, receiptsAPI } from '@/lib/api';
import { Complaint, Tax, Notice } from '@/lib/types';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    complaints: 0,
    pendingTaxes: 0,
    notices: 0,
    receipts: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [complaints, taxes, notices, receipts] = await Promise.all([
          complaintsAPI.list(),
          taxesAPI.list(),
          noticesAPI.list(),
          receiptsAPI.list(),
        ]);

        setStats({
          complaints: complaints.length,
          pendingTaxes: (taxes as Tax[]).filter((t) => t.status === 'pending').length,
          notices: notices.length,
          receipts: receipts.length,
        });
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome, {user?.name}!</h1>
          <p className="text-slate-600">Manage your village services and stay updated with announcements</p>
        </div>

        {/* Stats Section */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard label="Active Complaints" value={stats.complaints} icon={AlertCircle} color="text-red-600" />
            <StatCard label="Pending Taxes" value={stats.pendingTaxes} icon={DollarSign} color="text-orange-600" />
            <StatCard label="Notices" value={stats.notices} icon={Bell} color="text-blue-600" />
            <StatCard label="Receipts" value={stats.receipts} icon={Receipt} color="text-green-600" />
          </div>
        )}

        {/* Feature Cards Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              icon={AlertCircle}
              title="File Complaint"
              description="Register grievances about village issues and track their resolution"
              href="/complaints"
              badge="Popular"
              badgeColor="bg-red-100 text-red-800"
            />
            
            <DashboardCard
              icon={DollarSign}
              title="Pay Taxes"
              description="View and pay your property tax, water tax, and other dues"
              href="/taxes"
              badgeColor="bg-orange-100 text-orange-800"
            />
            
            <DashboardCard
              icon={FileText}
              title="Notices & News"
              description="Stay updated with official announcements and important notices"
              href="/notices"
              badgeColor="bg-blue-100 text-blue-800"
            />

            <DashboardCard
              icon={HelpCircle}
              title="Support & Help"
              description="Get assistance with any queries or issues related to services"
              href="/support"
              badgeColor="bg-purple-100 text-purple-800"
            />

            <DashboardCard
              icon={Receipt}
              title="Download Receipts"
              description="Access and download all your transaction receipts"
              href="/receipts"
              badgeColor="bg-green-100 text-green-800"
            />

            <DashboardCard
              icon={User}
              title="My Profile"
              description="Manage your personal information and account settings"
              href="/profile"
              badgeColor="bg-indigo-100 text-indigo-800"
            />
          </div>
        </div>

        {/* Quick Info Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Need Help?</h3>
              <p className="text-slate-600 mb-4">
                If you have any questions or need assistance with our services, our support team is ready to help. Visit the Support & Help section or contact us directly.
              </p>
              <a
                href="/support"
                className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
