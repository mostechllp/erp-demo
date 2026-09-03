import React, { useMemo, useState } from 'react';
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon, MoreHorizontalIcon } from 'lucide-react';
import { cx } from '../../utils/format';
import { Dropdown, type DropdownItem } from './Dropdown';
import { EmptyState } from './EmptyState';

export interface Column<T> {
  key: string;
  header: string;
  align?: 'left' | 'right' | 'center';
  width?: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
  sortValue?: (row: T) => string | number;
  optional?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  rowActions?: (row: T) => DropdownItem[];
  selectable?: boolean;
  selected?: string[];
  onSelected?: (ids: string[]) => void;
  loading?: boolean;
  empty?: React.ReactNode;
  dense?: boolean;
  totalsRow?: React.ReactNode;
  maxHeight?: string;
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  onRowClick,
  rowActions,
  selectable,
  selected = [],
  onSelected,
  loading,
  empty,
  dense,
  totalsRow,
  maxHeight
}: DataTableProps<T>) {
  const [sort, setSort] = useState<{key: string;dir: 'asc' | 'desc';} | null>(null);

  const sorted = useMemo(() => {
    if (!sort) return rows;
    const col = columns.find((c) => c.key === sort.key);
    if (!col?.sortValue) return rows;
    const copy = [...rows];
    copy.sort((a, b) => {
      const av = col.sortValue!(a);
      const bv = col.sortValue!(b);
      if (av === bv) return 0;
      const res = av > bv ? 1 : -1;
      return sort.dir === 'asc' ? res : -res;
    });
    return copy;
  }, [rows, sort, columns]);

  const allSelected = rows.length > 0 && selected.length === rows.length;
  const cellPad = dense ? 'px-3 py-1.5' : 'px-3 py-2.5';

  const toggleSort = (key: string) => {
    setSort((prev) =>
    prev?.key === key ? prev.dir === 'asc' ? { key, dir: 'desc' } : null : { key, dir: 'asc' }
    );
  };

  if (loading) {
    return (
      <div className="divide-y divide-slate-100">
        {Array.from({ length: 8 }).map((_, i) =>
        <div key={i} className="flex items-center gap-4 px-3 py-3">
            {columns.slice(0, 6).map((c) =>
          <div
            key={c.key}
            className="h-3 animate-pulse rounded bg-slate-100"
            style={{ width: `${8 + c.key.length * 7 % 18}%` }} />

          )}
          </div>
        )}
      </div>);

  }

  if (rows.length === 0) {
    return <>{empty ?? <EmptyState title="No records found" description="Adjust your filters or search terms to see results." />}</>;
  }

  return (
    <div className={cx('erp-scroll overflow-auto', maxHeight)} style={maxHeight ? undefined : undefined}>
      <table className="w-full min-w-max border-collapse text-[13px]">
        <thead className="sticky top-0 z-10 bg-slate-50">
          <tr className="border-b border-slate-200">
            {selectable &&
            <th scope="col" className="w-9 px-3 py-2">
                <input
                type="checkbox"
                aria-label="Select all rows"
                checked={allSelected}
                onChange={(e) => onSelected?.(e.target.checked ? rows.map(rowKey) : [])}
                className="h-3.5 w-3.5 rounded border-slate-300 text-brand-700 focus:ring-brand-600" />
              
              </th>
            }
            {columns.map((c) =>
            <th
              key={c.key}
              scope="col"
              style={c.width ? { width: c.width } : undefined}
              className={cx(
                'whitespace-nowrap px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500',
                c.align === 'right' ? 'text-right' : c.align === 'center' ? 'text-center' : 'text-left'
              )}>
              
                {c.sortValue ?
              <button
                type="button"
                onClick={() => toggleSort(c.key)}
                className={cx(
                  'inline-flex items-center gap-1 transition-colors duration-150 ease-erp hover:text-slate-800',
                  c.align === 'right' && 'flex-row-reverse'
                )}>
                
                    {c.header}
                    {sort?.key === c.key ?
                sort.dir === 'asc' ?
                <ArrowUpIcon className="h-3 w-3" /> :

                <ArrowDownIcon className="h-3 w-3" /> :


                <ArrowUpDownIcon className="h-3 w-3 opacity-40" />
                }
                  </button> :

              c.header
              }
              </th>
            )}
            {rowActions && <th scope="col" className="w-10 px-3 py-2" />}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {sorted.map((row) => {
            const id = rowKey(row);
            const isSelected = selected.includes(id);
            return (
              <tr
                key={id}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cx(
                  'bg-white transition-colors duration-100 ease-erp',
                  onRowClick && 'cursor-pointer',
                  isSelected ? 'bg-brand-50/60' : 'hover:bg-slate-50'
                )}>
                
                {selectable &&
                <td className="px-3 py-2" onClick={(e) => e.stopPropagation()}>
                    <input
                    type="checkbox"
                    aria-label={`Select ${id}`}
                    checked={isSelected}
                    onChange={(e) =>
                    onSelected?.(e.target.checked ? [...selected, id] : selected.filter((s) => s !== id))
                    }
                    className="h-3.5 w-3.5 rounded border-slate-300 text-brand-700 focus:ring-brand-600" />
                  
                  </td>
                }
                {columns.map((c) =>
                <td
                  key={c.key}
                  className={cx(
                    cellPad,
                    'text-slate-700',
                    c.align === 'right' ? 'text-right tnum' : c.align === 'center' ? 'text-center' : 'text-left',
                    c.className
                  )}>
                  
                    {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? '—')}
                  </td>
                )}
                {rowActions &&
                <td className="px-2 py-1 text-right" onClick={(e) => e.stopPropagation()}>
                    <Dropdown
                    items={rowActions(row)}
                    trigger={
                    <button
                      type="button"
                      aria-label="Row actions"
                      className="rounded p-1 text-slate-400 transition-colors duration-150 ease-erp hover:bg-slate-200 hover:text-slate-700">
                      
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </button>
                    } />
                  
                  </td>
                }
              </tr>);

          })}
        </tbody>
        {totalsRow &&
        <tfoot className="sticky bottom-0 bg-slate-50">
            <tr className="border-t-2 border-slate-200 font-semibold text-slate-800">{totalsRow}</tr>
          </tfoot>
        }
      </table>
    </div>);

}