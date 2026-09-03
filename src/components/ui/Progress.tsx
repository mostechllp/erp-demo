import React from 'react';
import { cx } from '../../utils/format';

interface ProgressProps {
  value: number;
  tone?: 'brand' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'xs' | 'sm';
  showValue?: boolean;
  className?: string;
  label?: string;
}

const FILL = {
  brand: 'bg-brand-600',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
  info: 'bg-sky-500'
};

export function Progress({ value, tone = 'brand', size = 'sm', showValue, className, label }: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cx('flex items-center gap-2', className)}>
      <div
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}
        className={cx('w-full overflow-hidden rounded-full bg-slate-200', size === 'xs' ? 'h-1' : 'h-1.5')}>
        
        <div
          className={cx('h-full rounded-full transition-[width] duration-300 ease-erp', FILL[tone])}
          style={{ width: `${clamped}%` }} />
        
      </div>
      {showValue && <span className="w-9 shrink-0 text-right text-xs tnum text-slate-600">{Math.round(clamped)}%</span>}
    </div>);

}