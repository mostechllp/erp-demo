import React, { useState } from 'react';
import {
  CalendarIcon,
  ColumnsIcon,
  DownloadIcon,
  FileTextIcon,
  PrinterIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  XIcon } from
'lucide-react';
import { Button } from '../ui/Button';
import { Dropdown } from '../ui/Dropdown';
import { cx } from '../../utils/format';
import { useToast } from '../../contexts/ToastContext';

export interface FilterDef {
  id: string;
  label: string;
  options: string[];
}

interface ListToolbarProps {
  search: string;
  onSearch: (v: string) => void;
  placeholder?: string;
  filters?: FilterDef[];
  values?: Record<string, string>;
  onFilter?: (id: string, value: string) => void;
  columns?: {key: string;header: string;optional?: boolean;}[];
  hidden?: string[];
  onToggleColumn?: (key: string) => void;
  dateLabel?: string;
  right?: React.ReactNode;
  selectedCount?: number;
  bulkActions?: {label: string;icon?: React.ComponentType<{className?: string;}>;danger?: boolean;}[];
  onClearSelection?: () => void;
}

export function ListToolbar({
  search,
  onSearch,
  placeholder = 'Search records…',
  filters = [],
  values = {},
  onFilter,
  columns = [],
  hidden = [],
  onToggleColumn,
  dateLabel = 'FY 2026 · Q3',
  right,
  selectedCount = 0,
  bulkActions = [],
  onClearSelection
}: ListToolbarProps) {
  const [advanced, setAdvanced] = useState(false);
  const toast = useToast();

  const activeFilters = Object.entries(values).filter(([, v]) => v && v !== 'All');

  if (selectedCount > 0) {
    return (
      <div className="flex flex-wrap items-center gap-2 border-b border-brand-200 bg-brand-50 px-4 py-2">
        <span className="text-[13px] font-semibold text-brand-900 tnum">{selectedCount} selected</span>
        <div className="h-4 w-px bg-brand-200" />
        {bulkActions.map((a) =>
        <Button
          key={a.label}
          size="xs"
          variant={a.danger ? 'danger' : 'secondary'}
          icon={a.icon}
          onClick={() => toast.push({ tone: a.danger ? 'warning' : 'success', title: `${a.label} applied`, body: `${selectedCount} records updated.` })}>
          
            {a.label}
          </Button>
        )}
        <button
          type="button"
          onClick={onClearSelection}
          className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-brand-800 hover:underline">
          
          <XIcon className="h-3 w-3" /> Clear selection
        </button>
      </div>);

  }

  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="flex flex-wrap items-center gap-2 px-4 py-2.5">
        <div className="relative min-w-[220px] flex-1 md:max-w-xs">
          <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
            className="h-8 w-full rounded border border-slate-300 bg-white pl-8 pr-2.5 text-[13px] placeholder:text-slate-400 transition-colors duration-150 ease-erp hover:border-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          
        </div>

        {filters.slice(0, 3).map((f) =>
        <select
          key={f.id}
          value={values[f.id] ?? 'All'}
          onChange={(e) => onFilter?.(f.id, e.target.value)}
          aria-label={f.label}
          className={cx(
            'h-8 rounded border bg-white pl-2 pr-7 text-xs transition-colors duration-150 ease-erp focus:outline-none focus:ring-2 focus:ring-brand-100',
            values[f.id] && values[f.id] !== 'All' ?
            'border-brand-400 text-brand-800' :
            'border-slate-300 text-slate-600 hover:border-slate-400'
          )}>
          
            <option value="All">{f.label}: All</option>
            {f.options.map((o) =>
          <option key={o} value={o}>
                {f.label}: {o}
              </option>
          )}
          </select>
        )}

        <Button size="sm" icon={CalendarIcon}>
          {dateLabel}
        </Button>

        {filters.length > 3 &&
        <Button size="sm" icon={SlidersHorizontalIcon} onClick={() => setAdvanced((v) => !v)}>
            Filters
            {activeFilters.length > 0 &&
          <span className="ml-1 rounded bg-brand-700 px-1 text-2xs font-semibold text-white tnum">
                {activeFilters.length}
              </span>
          }
          </Button>
        }

        <div className="ml-auto flex items-center gap-2">
          {right}
          {columns.length > 0 &&
          <Dropdown
            align="right"
            width="w-56"
            header={
            <div className="border-b border-slate-100 px-3 py-1.5 text-2xs font-semibold uppercase tracking-wide text-slate-400">
                  Visible columns
                </div>
            }
            items={columns.
            filter((c) => c.optional).
            map((c) => ({
              label: `${hidden.includes(c.key) ? '☐' : '☑'}  ${c.header}`,
              onSelect: () => onToggleColumn?.(c.key)
            }))}
            trigger={
            <Button size="sm" icon={ColumnsIcon}>
                  Columns
                </Button>
            } />

          }
          <Dropdown
            align="right"
            items={[
            { label: 'Export CSV', icon: DownloadIcon, onSelect: () => toast.push({ tone: 'success', title: 'CSV export queued', body: 'You will be notified when the file is ready.' }) },
            { label: 'Export PDF', icon: FileTextIcon, onSelect: () => toast.push({ tone: 'success', title: 'PDF export queued', body: 'Generating document…' }) },
            { label: 'Print', icon: PrinterIcon, separatorBefore: true, onSelect: () => toast.push({ tone: 'info', title: 'Sent to print preview' }) }]
            }
            trigger={
            <Button size="sm" icon={DownloadIcon}>
                Export
              </Button>
            } />
          
        </div>
      </div>

      {advanced && filters.length > 3 &&
      <div className="grid gap-3 border-t border-slate-200 bg-slate-50 px-4 py-3 sm:grid-cols-2 lg:grid-cols-4">
          {filters.slice(3).map((f) =>
        <label key={f.id} className="block">
              <span className="mb-1 block text-xs font-medium text-slate-600">{f.label}</span>
              <select
            value={values[f.id] ?? 'All'}
            onChange={(e) => onFilter?.(f.id, e.target.value)}
            className="h-8 w-full rounded border border-slate-300 bg-white pl-2 pr-7 text-xs text-slate-700">
            
                <option value="All">All</option>
                {f.options.map((o) =>
            <option key={o} value={o}>
                    {o}
                  </option>
            )}
              </select>
            </label>
        )}
        </div>
      }
    </div>);

}