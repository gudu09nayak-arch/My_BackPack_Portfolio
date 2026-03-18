'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, TrendingUp, Calendar, ArrowUpRight, Clock } from 'lucide-react';
import { Sidebar } from '@/components/admin/Sidebar';

interface Stats {
  totalLeads: number;
  newLeads: number;
  totalWaitlist: number;
  todayLeads: number;
}

interface RecentLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  tripType: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalLeads: 0,
    newLeads: 0,
    totalWaitlist: 0,
    todayLeads: 0,
  });
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('adminToken');

      try {
        const [leadsRes, waitlistRes] = await Promise.all([
          fetch('/api/leads', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('/api/waitlist', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const leadsData = await leadsRes.json();
        const waitlistData = await waitlistRes.json();

        // Calculate stats
        const today = new Date().toDateString();
        const todayLeads = leadsData.filter(
          (lead: RecentLead) => new Date(lead.createdAt).toDateString() === today
        );
        const newLeads = leadsData.filter((lead: { status: string }) => lead.status === 'new');

        setStats({
          totalLeads: leadsData.length,
          newLeads: newLeads.length,
          totalWaitlist: waitlistData.length,
          todayLeads: todayLeads.length,
        });

        // Get recent leads (last 5)
        setRecentLeads(leadsData.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    { label: 'Total Leads', value: stats.totalLeads, icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'New Leads', value: stats.newLeads, icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { label: 'Waitlist', value: stats.totalWaitlist, icon: Mail, color: 'from-purple-500 to-violet-500' },
    { label: 'Today', value: stats.todayLeads, icon: Calendar, color: 'from-amber-500 to-orange-500' },
  ];

  const tripTypeLabels: Record<string, string> = {
    spiritual: 'Spiritual',
    beach: 'Beach',
    adventure: 'Adventure',
    culture: 'Culture',
    surprise: 'Surprise Me!',
  };

  if (isLoading) {
    return (
      <Sidebar>
        <div className="flex h-96 items-center justify-center">
          <div className="text-stone-500">Loading dashboard...</div>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-stone-800">Dashboard</h1>
          <p className="text-stone-500">Welcome back! Here&apos;s what&apos;s happening with your travel business.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="overflow-hidden rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-500">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-stone-800">{stat.value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Leads */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-stone-800">Recent Leads</h2>
            <a href="/admin/leads" className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700">
              View All <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {recentLeads.length === 0 ? (
            <div className="py-12 text-center text-stone-500">
              <Users className="mx-auto h-12 w-12 opacity-50" />
              <p className="mt-4">No leads yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between rounded-xl bg-stone-50 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-sm font-bold text-white">
                      {lead.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-stone-800">{lead.name}</p>
                      <p className="text-sm text-stone-500">{lead.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                      {tripTypeLabels[lead.tripType] || lead.tripType}
                    </span>
                    <p className="mt-1 flex items-center gap-1 text-xs text-stone-400">
                      <Clock className="h-3 w-3" />
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Sidebar>
  );
}
