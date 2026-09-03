import React from 'react';
import { cx } from '../../utils/format';

export interface Definition {
  label: string;
  value: React.ReactNode;
  full?: boolean;
}

export function DefinitionList({
  items,
  columns = 2,
  className




}: {items: Definition[];columns?: 1 | 2 | 3;className?: string;}) {
  return (
    <dl
      className={cx(
        'grid gap-x-6 gap-y-3.5',
        columns === 1 ? 'grid-cols-1' : columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3',
        className
      )}>
      
      {items.map((item) =>
      <div key={item.label} className={item.full ? 'sm:col-span-full' : undefined}>
          <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{item.label}</dt>
          <dd className="mt-0.5 text-[13px] text-slate-800">{item.value}</dd>
        </div>
      )}
    </dl>);

}