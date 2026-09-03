import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRightIcon, ArrowUpRightIcon, MinusIcon } from 'lucide-react';
import { cx } from '../../utils/format';

interface KpiCardProps {
  label: string;
  value: string;
  delta?: number;
  comparison?: string;
  hint?: string;
  tone?: 'default' | 'positive' | 'negative' | 'warning';
  to?: string;
  invertDelta?: boolean;
  emphasis?: boolean;
}

export function KpiCard({
  label,
  value,
  delta,
  comparison = 'vs. prior period',
  hint,
  to,
  invertDelta,
  emphasis
}: KpiCardProps) {
  const good = delta === undefined ? null : invertDelta ? delta <= 0 : delta >= 0;
  const Icon = delta === undefined ? MinusIcon : delta >= 0 ? ArrowUpRightIcon : ArrowDownRightIcon;

  const body =
  <>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p
      className={cx(
        'mt-1.5 font-semibold tracking-tight tnum text-slate-900',
        emphasis ? 'text-[26px] leading-8' : 'text-xl'
      )}>
      
        {value}
      </p>
      <div className="mt-1.5 flex items-center gap-1.5 text-xs">
        {delta !== undefined &&
      <span
        className={cx(
          'inline-flex items-center gap-0.5 font-semibold tnum',
          good ? 'text-emerald-600' : 'text-red-600'
        )}>
        
            <Icon className="h-3 w-3" />
            {Math.abs(delta).toFixed(1)}%
          </span>
      }
        <span className="truncate text-slate-400">{hint ?? comparison}</span>
      </div>
    </>;


  const className = cx(
    'block rounded border bg-white p-3.5 shadow-card transition-colors duration-150 ease-erp',
    emphasis ? 'border-brand-200' : 'border-slate-200',
    to && 'hover:border-slate-300'
  );

  return to ?
  <Link to={to} className={className}>
      {body}
    </Link> :

  <div className={className}>{body}</div>;

}