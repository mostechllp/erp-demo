import React from 'react';
import { InboxIcon } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<{className?: string;}>;
  action?: React.ReactNode;
  compact?: boolean;
}

export function EmptyState({ title, description, icon: Icon = InboxIcon, action, compact }: EmptyStateProps) {
  return (
    <div className={compact ? 'px-4 py-8 text-center' : 'px-6 py-16 text-center'}>
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded border border-slate-200 bg-slate-50">
        <Icon className="h-4.5 w-4.5 text-slate-400" />
      </div>
      <h3 className="mt-3 text-[13px] font-semibold text-slate-800">{title}</h3>
      {description && <p className="mx-auto mt-1 max-w-md text-xs text-slate-500">{description}</p>}
      {action && <div className="mt-4 flex justify-center gap-2">{action}</div>}
    </div>);

}