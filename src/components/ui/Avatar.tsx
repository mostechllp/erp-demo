import React from 'react';
import { cx, initials } from '../../utils/format';

interface AvatarProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZES = {
  xs: 'h-5 w-5 text-[9px]',
  sm: 'h-7 w-7 text-[10px]',
  md: 'h-9 w-9 text-xs',
  lg: 'h-14 w-14 text-base'
};

const PALETTE = [
'bg-brand-100 text-brand-800',
'bg-emerald-100 text-emerald-800',
'bg-amber-100 text-amber-800',
'bg-sky-100 text-sky-800',
'bg-rose-100 text-rose-800',
'bg-slate-200 text-slate-700'];


export function Avatar({ name, size = 'sm', className }: AvatarProps) {
  const idx = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % PALETTE.length;
  return (
    <span
      aria-hidden="true"
      className={cx(
        'inline-flex shrink-0 items-center justify-center rounded font-semibold uppercase',
        SIZES[size],
        PALETTE[idx],
        className
      )}>
      
      {initials(name)}
    </span>);

}