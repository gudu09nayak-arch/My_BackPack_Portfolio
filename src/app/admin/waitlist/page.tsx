'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Calendar, Users } from 'lucide-react';
import { Sidebar } from '@/components/admin/Sidebar';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface WaitlistEntry {
  id: string;
  email: string;
  source: string;
  createdAt: string;
}

export default function WaitlistPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWaitlist();
  }, []);

  const fetchWaitlist = async () => {
    const token = localStorage.getItem('adminToken');
    setIsLoading(true);

    try {
      const response = await fetch('/api/waitlist', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error('Failed to fetch waitlist:', error);
      toast.error('Failed to load waitlist');
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Email', 'Source', 'Date Joined'];
    const rows = entries.map((entry) => [
      entry.email,
      entry.source,
      new Date(entry.createdAt).toLocaleDateString(),
    ]);

    const csv = [headers.join(','), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(','))].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyEmails = () => {
    const emails = entries.map((e) => e.email).join(', ');
    navigator.clipboard.writeText(emails);
    toast.success('Emails copied to clipboard!');
  };

  if (isLoading) {
    return (
      <Sidebar>
        <div className="flex h-96 items-center justify-center">
          <div className="text-stone-500">Loading waitlist...</div>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-stone-800">Waitlist</h1>
            <p className="text-stone-500">
              People who signed up for early access to the upcoming app.
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={copyEmails} variant="outline" className="gap-2">
              <Mail className="h-4 w-4" />
              Copy Emails
            </Button>
            <Button onClick={exportToCSV} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-violet-500">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-stone-500">Total Signups</p>
                <p className="text-2xl font-bold text-stone-800">{entries.length}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-stone-500">Today</p>
                <p className="text-2xl font-bold text-stone-800">
                  {
                    entries.filter(
                      (e) =>
                        new Date(e.createdAt).toDateString() === new Date().toDateString()
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-stone-500">This Week</p>
                <p className="text-2xl font-bold text-stone-800">
                  {
                    entries.filter((e) => {
                      const entryDate = new Date(e.createdAt);
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return entryDate >= weekAgo;
                    }).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Waitlist Table */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-stone-500">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-stone-500">Source</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-stone-500">Date Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {entries.map((entry, index) => (
                  <motion.tr
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="transition-colors hover:bg-stone-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-violet-500 text-sm font-bold text-white">
                          <Mail className="h-4 w-4" />
                        </div>
                        <span className="font-medium text-stone-800">{entry.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-600 capitalize">{entry.source}</td>
                    <td className="px-6 py-4 text-sm text-stone-500">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {entries.length === 0 && (
            <div className="py-12 text-center text-stone-500">
              <Mail className="mx-auto h-12 w-12 opacity-50" />
              <p className="mt-4">No waitlist entries yet</p>
            </div>
          )}
        </div>
      </div>
    </Sidebar>
  );
}
