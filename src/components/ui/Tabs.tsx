import React from 'react';
import { cx } from '../../utils/format';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: TabItem[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: 'underline' | 'pill';
}

export function Tabs({ tabs, active, onChange, className, variant = 'underline' }: TabsProps) {
  if (variant === 'pill') {
    return (
      <div className={cx('inline-flex items-center gap-1 rounded bg-slate-100 p-0.5', className)} role="tablist">
        {tabs.map((t) =>
        <button
          key={t.id}
          role="tab"
          aria-selected={active === t.id}
          onClick={() => onChange(t.id)}
          className={cx(
            'rounded px-2.5 py-1 text-xs font-medium transition-colors duration-150 ease-erp',
            active === t.id ? 'bg-white text-slate-900 shadow-card' : 'text-slate-600 hover:text-slate-900'
          )}>
          
            {t.label}
            {t.count !== undefined && <span className="ml-1.5 tnum text-slate-400">{t.count}</span>}
          </button>
        )}
      </div>);

  }

  return (
    <div className={cx('erp-scroll overflow-x-auto border-b border-slate-200', className)}>
      <nav className="flex min-w-max gap-1" role="tablist">
        {tabs.map((t) => {
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(t.id)}
              className={cx(
                'relative -mb-px whitespace-nowrap border-b-2 px-3 py-2 text-[13px] font-medium transition-colors duration-150 ease-erp',
                isActive ?
                'border-brand-700 text-brand-800' :
                'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800'
              )}>
              
              {t.label}
              {t.count !== undefined &&
              <span
                className={cx(
                  'ml-1.5 rounded px-1 py-0.5 text-2xs tnum font-semibold',
                  isActive ? 'bg-brand-50 text-brand-700' : 'bg-slate-100 text-slate-500'
                )}>
                
                  {t.count}
                </span>
              }
            </button>);

        })}
      </nav>
    </div>);

}