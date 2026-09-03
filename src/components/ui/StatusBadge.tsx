import React from 'react';
import { cx } from '../../utils/format';
import { TONE_CLASSES, TONE_DOT, toneFor } from '../../utils/status';

interface StatusBadgeProps {
  status: string;
  className?: string;
  dot?: boolean;
}

export function StatusBadge({ status, className, dot = true }: StatusBadgeProps) {
  const tone = toneFor(status);
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded px-1.5 py-0.5 text-[11px] font-medium ring-1 ring-inset',
        TONE_CLASSES[tone],
        className
      )}>
      
      {dot && <span className={cx('h-1.5 w-1.5 rounded-full', TONE_DOT[tone])} />}
      {status}
    </span>);

}