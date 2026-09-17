'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Image as ImageIcon,
  User,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminSidebarProps {
  userEmail: string | null;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { label: 'Blog', href: '/admin/blog', icon: FileText },
  { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { label: 'About Page', href: '/admin/about', icon: User },
  { label: 'Inquiries', href: '/admin/inquiries', icon: Mail },
  { label: 'Site Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar({ userEmail, onLogout, isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const isNavActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col border-r border-border/60 bg-card transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header / Brand */}
        <div className="flex h-16 items-center justify-between border-b border-border/50 px-6">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent border border-accent/30 font-bold text-sm">
              KH
            </div>
            <div>
              <span className="font-poppins text-sm font-bold tracking-tight text-foreground block leading-tight">
                Kishor. <span className="text-accent">CMS</span>
              </span>
              <span className="text-[10px] tracking-wider text-muted-foreground uppercase font-semibold block">
                Personal Web Platform
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
            Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isNavActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all ${
                  active
                    ? 'bg-accent/15 text-accent border border-accent/30 shadow-sm'
                    : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? 'text-accent' : 'text-muted-foreground'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Bottom Sidebar: User Profile & Actions */}
        <div className="border-t border-border/50 p-4 space-y-3 bg-secondary/20">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-lg border border-border/60 bg-card px-3 py-2 text-xs font-medium text-muted-foreground hover:border-accent/40 hover:text-foreground transition-all"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5 text-accent" />
              View Public Website
            </span>
            <span className="text-[10px] text-muted-foreground">Live</span>
          </a>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-accent font-semibold text-xs border border-border/60">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="overflow-hidden text-left">
                <p className="truncate text-xs font-bold text-foreground">Admin Account</p>
                <p className="truncate text-[10px] text-muted-foreground">{userEmail || 'admin'}</p>
              </div>
            </div>

            <Button
              onClick={onLogout}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive shrink-0"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
