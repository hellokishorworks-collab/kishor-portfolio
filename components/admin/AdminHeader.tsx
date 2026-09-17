'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ExternalLink, RefreshCw, Database, CheckCircle2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminHeaderProps {
  onOpenMobileNav: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function AdminHeader({ onOpenMobileNav, onRefresh, isRefreshing }: AdminHeaderProps) {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === '/admin') return 'Dashboard Overview';
    if (pathname.startsWith('/admin/projects/new')) return 'New Project';
    if (pathname.includes('/projects/') && pathname.endsWith('/edit')) return 'Edit Project';
    if (pathname.startsWith('/admin/projects')) return 'Projects CMS';
    if (pathname.startsWith('/admin/blog/new')) return 'New Blog Post';
    if (pathname.includes('/blog/') && pathname.endsWith('/edit')) return 'Edit Blog Post';
    if (pathname.startsWith('/admin/blog')) return 'Blog CMS';
    if (pathname.startsWith('/admin/media')) return 'Media Library';
    if (pathname.startsWith('/admin/about')) return 'About Page Management';
    if (pathname.startsWith('/admin/inquiries')) return 'Contact Inquiries';
    if (pathname.startsWith('/admin/settings')) return 'Site Settings';
    return 'CMS Management';
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/60 bg-background/80 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileNav}
          className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent">CMS Platform</span>
            <span className="text-muted-foreground/40">/</span>
            <span className="text-xs text-muted-foreground font-medium">{getPageTitle()}</span>
          </div>
          <h1 className="font-poppins text-lg font-bold text-foreground leading-tight">
            {getPageTitle()}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Status indicator */}
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[11px] font-medium text-accent">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span>System Online</span>
        </div>

        {onRefresh && (
          <Button
            onClick={onRefresh}
            variant="outline"
            size="sm"
            disabled={isRefreshing}
            className="h-8 border-border/60 text-xs gap-1.5"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Sync</span>
          </Button>
        )}

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-8 items-center gap-1.5 rounded-md bg-accent text-background px-3 text-xs font-semibold hover:bg-accent/90 transition-colors"
        >
          <span>View Site</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  );
}
