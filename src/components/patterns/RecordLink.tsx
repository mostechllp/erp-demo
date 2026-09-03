import React from 'react';
import { Link } from 'react-router-dom';
import { cx } from '../../utils/format';

export function RecordLink({
  to,
  children,
  mono = true,
  className





}: {to: string;children: React.ReactNode;mono?: boolean;className?: string;}) {
  return (
    <Link
      to={to}
      onClick={(e) => e.stopPropagation()}
      className={cx(
        'font-medium text-brand-700 transition-colors duration-150 ease-erp hover:text-brand-900 hover:underline',
        mono && 'font-mono text-xs',
        className
      )}>
      
      {children}
    </Link>);

}