'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  icon: any;
  title: string;
  href: string;
  description?: string;
  badge?: string;
  badgeColor?: string;
}

export function DashboardCard({
  icon: Icon,
  title,
  description,
  href,
  badge,
  badgeColor = 'bg-blue-100 text-blue-800',
}: DashboardCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full border border-slate-200 hover:border-green-300">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-green-600" />
          </div>
          {badge && <span className={`text-xs font-medium px-3 py-1 rounded-full ${badgeColor}`}>{badge}</span>}
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm">{description}</p>
      </div>
    </Link>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
}

export function StatCard({ label, value, icon: Icon, color = 'text-green-600' }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-600 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
        </div>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
    </div>
  );
}

interface ActionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  className?: string;
}

export function ActionButton({
  children,
  onClick,
  href,
  variant = 'primary',
  disabled = false,
  className = '',
}: ActionButtonProps) {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition duration-200 inline-flex items-center gap-2';
  
  const variantClasses = {
    primary: 'bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white',
    secondary: 'bg-slate-200 hover:bg-slate-300 disabled:bg-slate-100 text-slate-900',
    danger: 'bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={disabled ? 'pointer-events-none opacity-50' : ''}>
        <button disabled={disabled} className={classes}>
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
