'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  FileText,
  Users,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
  Backpack,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  children: React.ReactNode;
}

const menuItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Content', href: '/admin/content', icon: FileText },
  { label: 'Leads', href: '/admin/leads', icon: Users },
  { label: 'Waitlist', href: '/admin/waitlist', icon: Mail },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Verify authentication
  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin');
        return;
      }

      try {
        const response = await fetch('/api/admin/verify', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          localStorage.removeItem('adminToken');
          router.push('/admin');
        }
      } catch {
        localStorage.removeItem('adminToken');
        router.push('/admin');
      }
    };

    verifyAuth();
  }, [router]);

  const handleLogout = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('adminToken');

    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // Ignore logout errors
    }

    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

  return (
    <div className="flex min-h-screen bg-stone-100">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-stone-800 p-2 text-white lg:hidden"
      >
        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-stone-900 transition-transform duration-300 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 border-b border-stone-700 px-6 py-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
              <Backpack className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white">My Backpack</h1>
              <p className="text-xs text-stone-400">Admin Panel</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400'
                      : 'text-stone-400 hover:bg-stone-800 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="border-t border-stone-700 p-4">
            <Button
              onClick={handleLogout}
              disabled={isLoading}
              variant="ghost"
              className="w-full justify-start gap-3 text-stone-400 hover:bg-stone-800 hover:text-white"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        <div className="p-4 pt-20 lg:p-8 lg:pt-8">{children}</div>
      </main>
    </div>
  );
}
