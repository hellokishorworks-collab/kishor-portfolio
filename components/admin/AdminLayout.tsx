'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { Loader2 } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function AdminLayout({ children, onRefresh, isRefreshing }: AdminLayoutProps) {
  const router = useRouter();
  const [authChecking, setAuthChecking] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/admin/login');
      } else {
        setUserEmail(session.user.email || 'Admin User');
        setAuthChecking(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/admin/login');
      } else {
        setUserEmail(session.user.email || 'Admin User');
        setAuthChecking(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  if (authChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Verifying Admin Session...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Left Navigation Sidebar */}
      <AdminSidebar
        userEmail={userEmail}
        onLogout={handleLogout}
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <AdminHeader
          onOpenMobileNav={() => setMobileNavOpen(true)}
          onRefresh={onRefresh}
          isRefreshing={isRefreshing}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
