import React from 'react';
import { cx } from '../../utils/format';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'link';
type Size = 'xs' | 'sm' | 'md';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: React.ComponentType<{className?: string;}>;
  iconRight?: React.ComponentType<{className?: string;}>;
  loading?: boolean;
}

const VARIANTS: Record<Variant, string> = {
  primary:
  'bg-brand-700 text-white border border-brand-700 hover:bg-brand-800 hover:border-brand-800 disabled:bg-brand-300 disabled:border-brand-300',
  secondary:
  'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-slate-400 disabled:text-slate-400',
  ghost: 'bg-transparent text-slate-600 border border-transparent hover:bg-slate-100 hover:text-slate-900',
  danger: 'bg-red-600 text-white border border-red-600 hover:bg-red-700 hover:border-red-700',
  success: 'bg-emerald-600 text-white border border-emerald-600 hover:bg-emerald-700 hover:border-emerald-700',
  link: 'bg-transparent border border-transparent text-brand-700 hover:text-brand-900 hover:underline px-0'
};

const SIZES: Record<Size, string> = {
  xs: 'h-7 px-2 text-xs gap-1.5',
  sm: 'h-8 px-2.5 text-[13px] gap-1.5',
  md: 'h-9 px-3.5 text-[13px] gap-2'
};

export function Button({
  variant = 'secondary',
  size = 'sm',
  icon: Icon,
  iconRight: IconRight,
  loading,
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={cx(
        'inline-flex items-center justify-center rounded font-medium whitespace-nowrap',
        'transition-colors duration-150 ease-erp disabled:cursor-not-allowed disabled:opacity-70',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...rest}>
      
      {loading ?
      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" /> :

      Icon && <Icon className="h-3.5 w-3.5 shrink-0" />
      }
      {children}
      {IconRight && <IconRight className="h-3.5 w-3.5 shrink-0" />}
    </button>);

}