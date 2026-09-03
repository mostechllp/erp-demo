import React from 'react';
import { cx } from '../../utils/format';
import { TONE_CLASSES } from '../../utils/status';
import type { Tone } from '../../types/erp';

interface BadgeProps {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ tone = 'neutral', children, className }: BadgeProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded px-1.5 py-0.5 text-2xs font-semibold uppercase tracking-wide ring-1 ring-inset',
        TONE_CLASSES[tone],
        className
      )}>
      
      {children}
    </span>);

}