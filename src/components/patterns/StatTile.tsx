import React from 'react';
import { cx } from '../../utils/format';

interface StatTileProps {
  label: string;
  value: string;
  sub?: string;
  tone?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  align?: 'left' | 'right';
}

const TONE: Record<string, string> = {
  default: 'text-slate-900',
  success: 'text-emerald-700',
  warning: 'text-amber-700',
  danger: 'text-red-700',
  info: 'text-sky-700'
};

export function StatTile({ label, value, sub, tone = 'default', align = 'left' }: StatTileProps) {
  return (
    <div className={cx(align === 'right' && 'text-right')}>
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className={cx('mt-1 text-[17px] font-semibold tnum', TONE[tone])}>{value}</p>
      {sub && <p className="mt-0.5 text-xs text-slate-500">{sub}</p>}
    </div>);

}