'use client';

import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-card/40 p-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-accent border border-border/60 mb-4">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-poppins text-base font-bold text-foreground">{title}</h3>
      <p className="mt-1 max-w-sm text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="mt-6 bg-accent text-background hover:bg-accent/90 text-xs font-semibold"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
