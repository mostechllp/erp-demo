import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cx } from '../../utils/format';

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPage: (p: number) => void;
  onPageSize?: (n: number) => void;
}

export function Pagination({ page, pageSize, total, onPage, onPageSize }: PaginationProps) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const window = [page - 1, page, page + 1].filter((p) => p >= 1 && p <= pages);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-2.5">
      <div className="flex items-center gap-3 text-xs text-slate-500">
        <span className="tnum">
          Showing <strong className="font-semibold text-slate-700">{from}</strong>–
          <strong className="font-semibold text-slate-700">{to}</strong> of{' '}
          <strong className="font-semibold text-slate-700">{total.toLocaleString()}</strong>
        </span>
        {onPageSize &&
        <label className="flex items-center gap-1.5">
            <span className="hidden sm:inline">Rows</span>
            <select
            value={pageSize}
            onChange={(e) => onPageSize(Number(e.target.value))}
            className="h-7 rounded border border-slate-300 bg-white pl-1.5 pr-6 text-xs text-slate-700">
            
              {[10, 25, 50, 100].map((n) =>
            <option key={n} value={n}>
                  {n}
                </option>
            )}
            </select>
          </label>
        }
      </div>
      <div className="flex items-center gap-1">
        <PageBtn disabled={page === 1} onClick={() => onPage(page - 1)} label="Previous page">
          <ChevronLeftIcon className="h-3.5 w-3.5" />
        </PageBtn>
        {window[0] > 1 &&
        <>
            <PageBtn onClick={() => onPage(1)}>1</PageBtn>
            {window[0] > 2 && <span className="px-1 text-xs text-slate-400">…</span>}
          </>
        }
        {window.map((p) =>
        <PageBtn key={p} active={p === page} onClick={() => onPage(p)}>
            {p}
          </PageBtn>
        )}
        {window[window.length - 1] < pages &&
        <>
            {window[window.length - 1] < pages - 1 && <span className="px-1 text-xs text-slate-400">…</span>}
            <PageBtn onClick={() => onPage(pages)}>{pages}</PageBtn>
          </>
        }
        <PageBtn disabled={page === pages} onClick={() => onPage(page + 1)} label="Next page">
          <ChevronRightIcon className="h-3.5 w-3.5" />
        </PageBtn>
      </div>
    </div>);

}

function PageBtn({
  children,
  active,
  disabled,
  onClick,
  label






}: {children: React.ReactNode;active?: boolean;disabled?: boolean;onClick?: () => void;label?: string;}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      disabled={disabled}
      onClick={onClick}
      className={cx(
        'inline-flex h-7 min-w-[28px] items-center justify-center rounded border px-1.5 text-xs font-medium tnum',
        'transition-colors duration-150 ease-erp',
        active ?
        'border-brand-700 bg-brand-700 text-white' :
        'border-slate-300 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white'
      )}>
      
      {children}
    </button>);

}