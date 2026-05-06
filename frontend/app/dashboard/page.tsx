'use client';

import { DashboardCard, StatCard } from '@/components/dashboard-components';
import {
  FileText,
  AlertCircle,
  DollarSign,
  HelpCircle,
  Receipt,
  User,
  Bell,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { complaintsAPI, taxesAPI, noticesAPI, receiptsAPI } from '@/lib/api';
import { Tax } from '@/lib/types';

export default function DashboardPage() {
  const { user, isLoading: authLoading, logout } = useAuth();
  const router = useRouter();

  const [stats, setStats] = useState({
    complaints: 0,
    pendingTaxes: 0,
    notices: 0,
    receipts: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  // 🔒 Protect route
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // 📊 Load stats
  useEffect(() => {
    if (!user) return;

    const loadStats = async () => {
      try {
        const [complaints, taxes, notices, receipts] = await Promise.all([
          complaintsAPI.list(),
          taxesAPI.list(),
          noticesAPI.list(),
          receiptsAPI.list(),
        ]);

        setStats({
          complaints: complaints?.length || 0,
          pendingTaxes:
            (taxes as Tax[])?.filter((t) => t.status === 'pending').length || 0,
          notices: notices?.length || 0,
          receipts: receipts?.length || 0,
        });
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, [user]);

  if (authLoading || !user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* HEADER + LOGOUT */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Welcome, {user?.name} 👋
          </h1>
          <p className="text-gray-600">Manage your services easily</p>
        </div>

        <button
          onClick={() => {
            logout();
            router.push('/login');
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      {isLoading ? (
        <p>Loading stats...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <StatCard label="Complaints" value={stats.complaints} icon={AlertCircle} />
          <StatCard label="Pending Taxes" value={stats.pendingTaxes} icon={DollarSign} />
          <StatCard label="Notices" value={stats.notices} icon={Bell} />
          <StatCard label="Receipts" value={stats.receipts} icon={Receipt} />
        </div>
      )}

      {/* Services */}
      <div className="grid md:grid-cols-3 gap-6">
        <DashboardCard icon={AlertCircle} title="Complaints" href="/complaints" />
        <DashboardCard icon={DollarSign} title="Taxes" href="/taxes" />
        <DashboardCard icon={FileText} title="Notices" href="/notices" />
        <DashboardCard icon={HelpCircle} title="Support" href="/support" />
        <DashboardCard icon={Receipt} title="Receipts" href="/receipts" />
        <DashboardCard icon={User} title="Profile" href="/profile" />
      </div>

      {/* Help */}
      <div className="mt-10 p-6 bg-green-50 rounded">
        <h3 className="font-semibold mb-2">Need help?</h3>
        <p className="mb-2">Contact support anytime.</p>
        <a href="/support" className="text-green-600">Go to Support</a>
      </div>

    </div>
  );
}