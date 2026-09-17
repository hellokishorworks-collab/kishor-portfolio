'use client';

import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
  accentColor?: string;
}

export function StatCard({ title, value, subtitle, icon: Icon }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5 transition-all hover:border-border/80 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground">{title}</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent border border-accent/20">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-4">
        <div className="font-poppins text-2xl font-bold tracking-tight text-foreground">
          {value}
        </div>
        {subtitle && (
          <p className="mt-1 text-[11px] text-muted-foreground/80 font-medium">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
