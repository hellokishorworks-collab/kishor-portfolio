'use client';

interface StatusBadgeProps {
  status: 'published' | 'draft' | 'sent' | 'pending' | 'failed' | string;
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const normalized = status.toLowerCase();

  if (normalized === 'published' || normalized === 'true' || normalized === 'sent') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
        {label || (normalized === 'published' ? 'Published' : 'Sent')}
      </span>
    );
  }

  if (normalized === 'draft' || normalized === 'false' || normalized === 'pending') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-400">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
        {label || (normalized === 'draft' ? 'Draft' : 'Pending')}
      </span>
    );
  }

  if (normalized === 'failed' || normalized === 'error') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-destructive/30 bg-destructive/10 px-2.5 py-0.5 text-[10px] font-semibold text-destructive">
        <span className="h-1.5 w-1.5 rounded-full bg-destructive"></span>
        {label || 'Failed'}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground"></span>
      {label || status}
    </span>
  );
}
