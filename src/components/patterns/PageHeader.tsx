import React from 'react';
import { Breadcrumbs, type Crumb } from '../ui/Breadcrumbs';

interface PageHeaderProps {
  title: string;
  crumbs?: Crumb[];
  description?: string;
  meta?: React.ReactNode;
  actions?: React.ReactNode;
  tabs?: React.ReactNode;
}

export function PageHeader({ title, crumbs, description, meta, actions, tabs }: PageHeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white px-6 pt-4">
      {crumbs && <Breadcrumbs items={crumbs} />}
      <div className="mt-2 flex flex-wrap items-start justify-between gap-4 pb-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h1>
            {meta}
          </div>
          {description && <p className="mt-1 max-w-3xl text-[13px] text-slate-500">{description}</p>}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
      </div>
      {tabs}
    </header>);

}