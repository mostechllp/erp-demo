import React from 'react';
import { cx } from '../../utils/format';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  icon?: React.ComponentType<{className?: string;}>;
  suffix?: React.ReactNode;
}

export function Input({
  label,
  hint,
  error,
  required,
  icon: Icon,
  suffix,
  className,
  id,
  ...rest
}: InputProps) {
  const inputId = id || rest.name || label?.replace(/\s+/g, '-').toLowerCase();
  return (
    <div className={cx('w-full', className)}>
      {label &&
      <label htmlFor={inputId} className="mb-1 block text-xs font-medium text-slate-700">
          {label}
          {required && <span className="ml-0.5 text-red-600">*</span>}
        </label>
      }
      <div className="relative">
        {Icon && <Icon className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />}
        <input
          id={inputId}
          aria-invalid={!!error}
          className={cx(
            'h-9 w-full rounded border bg-white px-2.5 text-[13px] text-slate-900 placeholder:text-slate-400',
            'transition-colors duration-150 ease-erp focus:outline-none focus:ring-2',
            Icon && 'pl-8',
            suffix && 'pr-16',
            error ?
            'border-red-400 focus:border-red-500 focus:ring-red-100' :
            'border-slate-300 hover:border-slate-400 focus:border-brand-600 focus:ring-brand-100',
            rest.disabled && 'cursor-not-allowed bg-slate-50 text-slate-400'
          )}
          {...rest} />
        
        {suffix &&
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-500">{suffix}</span>
        }
      </div>
      {error ?
      <p className="mt-1 text-xs text-red-600">{error}</p> :
      hint ?
      <p className="mt-1 text-xs text-slate-500">{hint}</p> :
      null}
    </div>);

}