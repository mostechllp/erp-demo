import React from 'react';
import { cx } from '../../utils/format';

interface CardProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  padded?: boolean;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}

export function Card({
  title,
  description,
  actions,
  footer,
  padded = true,
  className,
  bodyClassName,
  children
}: CardProps) {
  return (
    <section className={cx('flex flex-col rounded border border-slate-200 bg-white shadow-card', className)}>
      {(title || actions) &&
      <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-4 py-3">
          <div className="min-w-0">
            {title && <h3 className="truncate text-[13px] font-semibold text-slate-900">{title}</h3>}
            {description && <p className="mt-0.5 text-xs text-slate-500">{description}</p>}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </header>
      }
      <div className={cx('flex-1', padded && 'p-4', bodyClassName)}>{children}</div>
      {footer && <footer className="border-t border-slate-200 px-4 py-2.5 text-xs text-slate-500">{footer}</footer>}
    </section>);

}