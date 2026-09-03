import React, { useState } from 'react';
import { cx } from '../../utils/format';

interface TooltipProps {
  label: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'right';
  className?: string;
}

export function Tooltip({ label, children, side = 'top', className }: TooltipProps) {
  const [show, setShow] = useState(false);
  return (
    <span
      className={cx('relative inline-flex', className)}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}>
      
      {children}
      {show &&
      <span
        role="tooltip"
        className={cx(
          'pointer-events-none absolute z-[80] whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-[11px] font-medium text-white shadow-raised',
          side === 'top' && 'bottom-full left-1/2 mb-1.5 -translate-x-1/2',
          side === 'bottom' && 'top-full left-1/2 mt-1.5 -translate-x-1/2',
          side === 'right' && 'left-full top-1/2 ml-1.5 -translate-y-1/2'
        )}>
        
          {label}
        </span>
      }
    </span>);

}