import React from 'react';
import { AlertTriangleIcon, CheckCircle2Icon, InfoIcon, XCircleIcon } from 'lucide-react';
import { cx } from '../../utils/format';
import type { Tone } from '../../types/erp';

interface AlertProps {
  tone?: Tone;
  title: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const STYLES: Record<Tone, {wrap: string;icon: React.ComponentType<{className?: string;}>;iconColor: string;}> = {
  success: { wrap: 'border-emerald-200 bg-emerald-50', icon: CheckCircle2Icon, iconColor: 'text-emerald-600' },
  warning: { wrap: 'border-amber-200 bg-amber-50', icon: AlertTriangleIcon, iconColor: 'text-amber-600' },
  danger: { wrap: 'border-red-200 bg-red-50', icon: XCircleIcon, iconColor: 'text-red-600' },
  info: { wrap: 'border-sky-200 bg-sky-50', icon: InfoIcon, iconColor: 'text-sky-600' },
  neutral: { wrap: 'border-slate-200 bg-slate-50', icon: InfoIcon, iconColor: 'text-slate-500' },
  brand: { wrap: 'border-brand-200 bg-brand-50', icon: InfoIcon, iconColor: 'text-brand-700' }
};

export function Alert({ tone = 'info', title, children, action, className }: AlertProps) {
  const s = STYLES[tone];
  const Icon = s.icon;
  return (
    <div role="status" className={cx('flex items-start gap-2.5 rounded border px-3 py-2.5', s.wrap, className)}>
      <Icon className={cx('mt-0.5 h-4 w-4 shrink-0', s.iconColor)} />
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-slate-800">{title}</p>
        {children && <div className="mt-0.5 text-xs leading-relaxed text-slate-600">{children}</div>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>);

}