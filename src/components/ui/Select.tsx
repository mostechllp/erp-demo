import React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { cx } from '../../utils/format';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  options: {value: string;label: string;}[];
  size?: 'sm' | 'md';
}

export function Select({
  label,
  hint,
  error,
  required,
  options,
  className,
  size = 'md',
  id,
  ...rest
}: SelectProps) {
  const selectId = id || rest.name || label?.replace(/\s+/g, '-').toLowerCase();
  return (
    <div className={cx('w-full', className)}>
      {label &&
      <label htmlFor={selectId} className="mb-1 block text-xs font-medium text-slate-700">
          {label}
          {required && <span className="ml-0.5 text-red-600">*</span>}
        </label>
      }
      <div className="relative">
        <select
          id={selectId}
          className={cx(
            'w-full appearance-none rounded border bg-white pl-2.5 pr-7 text-[13px] text-slate-900',
            'transition-colors duration-150 ease-erp focus:outline-none focus:ring-2',
            size === 'sm' ? 'h-8' : 'h-9',
            error ?
            'border-red-400 focus:border-red-500 focus:ring-red-100' :
            'border-slate-300 hover:border-slate-400 focus:border-brand-600 focus:ring-brand-100'
          )}
          {...rest}>
          
          {options.map((o) =>
          <option key={o.value} value={o.value}>
              {o.label}
            </option>
          )}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
      </div>
      {error ?
      <p className="mt-1 text-xs text-red-600">{error}</p> :
      hint ?
      <p className="mt-1 text-xs text-slate-500">{hint}</p> :
      null}
    </div>);

}