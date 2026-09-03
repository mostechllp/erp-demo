import React, { useEffect, useRef, useState } from 'react';
import { cx } from '../../utils/format';

export interface DropdownItem {
  label: string;
  icon?: React.ComponentType<{className?: string;}>;
  onSelect?: () => void;
  danger?: boolean;
  separatorBefore?: boolean;
  disabled?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  width?: string;
  header?: React.ReactNode;
}

export function Dropdown({ trigger, items, align = 'right', width = 'w-56', header }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen((v) => !v)}>{trigger}</div>
      {open &&
      <div
        role="menu"
        className={cx(
          'absolute z-50 mt-1 overflow-hidden rounded border border-slate-200 bg-white py-1 shadow-overlay',
          width,
          align === 'right' ? 'right-0' : 'left-0'
        )}>
        
          {header}
          {items.map((item, i) =>
        <React.Fragment key={item.label + i}>
              {item.separatorBefore && <div className="my-1 h-px bg-slate-200" />}
              <button
            type="button"
            role="menuitem"
            disabled={item.disabled}
            onClick={() => {
              item.onSelect?.();
              setOpen(false);
            }}
            className={cx(
              'flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] transition-colors duration-100 ease-erp',
              item.disabled ?
              'cursor-not-allowed text-slate-300' :
              item.danger ?
              'text-red-600 hover:bg-red-50' :
              'text-slate-700 hover:bg-slate-100'
            )}>
            
                {item.icon && <item.icon className="h-3.5 w-3.5 shrink-0 opacity-70" />}
                {item.label}
              </button>
            </React.Fragment>
        )}
        </div>
      }
    </div>);

}