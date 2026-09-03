import React, { useMemo, useState } from 'react';
import { PageHeader } from './PageHeader';
import { ListToolbar, type FilterDef } from './ListToolbar';
import { DataTable, type Column } from '../ui/DataTable';
import { Pagination } from '../ui/Pagination';
import { Tabs, type TabItem } from '../ui/Tabs';
import type { Crumb } from '../ui/Breadcrumbs';
import type { DropdownItem } from '../ui/Dropdown';

interface ListPageProps<T> {
  title: string;
  crumbs: Crumb[];
  description?: string;
  actions?: React.ReactNode;
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  searchText: (row: T) => string;
  filters?: FilterDef[];
  filterValue?: (row: T, filterId: string) => string;
  statusTabs?: {id: string;label: string;match: (row: T) => boolean;}[];
  rowActions?: (row: T) => DropdownItem[];
  onRowClick?: (row: T) => void;
  selectable?: boolean;
  bulkActions?: {label: string;icon?: React.ComponentType<{className?: string;}>;danger?: boolean;}[];
  summary?: React.ReactNode;
  toolbarRight?: React.ReactNode;
  dense?: boolean;
  totalsRow?: (rows: T[]) => React.ReactNode;
}

export function ListPage<T>({
  title,
  crumbs,
  description,
  actions,
  columns,
  rows,
  rowKey,
  searchText,
  filters = [],
  filterValue,
  statusTabs,
  rowActions,
  onRowClick,
  selectable,
  bulkActions = [
  { label: 'Export selection' },
  { label: 'Assign owner' },
  { label: 'Archive', danger: true }],

  summary,
  toolbarRight,
  dense,
  totalsRow
}: ListPageProps<T>) {
  const [search, setSearch] = useState('');
  const [values, setValues] = useState<Record<string, string>>({});
  const [hidden, setHidden] = useState<string[]>([]);
  const [tab, setTab] = useState(statusTabs?.[0]?.id ?? 'all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [selected, setSelected] = useState<string[]>([]);

  const tabbed = useMemo(() => {
    const t = statusTabs?.find((s) => s.id === tab);
    return t ? rows.filter(t.match) : rows;
  }, [rows, statusTabs, tab]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tabbed.filter((row) => {
      if (q && !searchText(row).toLowerCase().includes(q)) return false;
      for (const [id, val] of Object.entries(values)) {
        if (!val || val === 'All') continue;
        if (filterValue && filterValue(row, id) !== val) return false;
      }
      return true;
    });
  }, [tabbed, search, values, filterValue, searchText]);

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const visibleColumns = columns.filter((c) => !hidden.includes(c.key));

  const tabItems: TabItem[] | undefined = statusTabs?.map((s) => ({
    id: s.id,
    label: s.label,
    count: rows.filter(s.match).length
  }));

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title={title}
        crumbs={crumbs}
        description={description}
        actions={actions}
        tabs={
        tabItems &&
        <Tabs
          tabs={tabItems}
          active={tab}
          onChange={(id) => {
            setTab(id);
            setPage(1);
            setSelected([]);
          }} />


        } />
      

      <div className="flex-1 p-6">
        {summary && <div className="mb-4">{summary}</div>}
        <div className="overflow-hidden rounded border border-slate-200 bg-white shadow-card">
          <ListToolbar
            search={search}
            onSearch={(v) => {
              setSearch(v);
              setPage(1);
            }}
            placeholder={`Search ${title.toLowerCase()}…`}
            filters={filters}
            values={values}
            onFilter={(id, v) => {
              setValues((prev) => ({ ...prev, [id]: v }));
              setPage(1);
            }}
            columns={columns}
            hidden={hidden}
            onToggleColumn={(key) =>
            setHidden((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key])
            }
            right={toolbarRight}
            selectedCount={selected.length}
            bulkActions={bulkActions}
            onClearSelection={() => setSelected([])} />
          
          <DataTable
            columns={visibleColumns}
            rows={paged}
            rowKey={rowKey}
            rowActions={rowActions}
            onRowClick={onRowClick}
            selectable={selectable}
            selected={selected}
            onSelected={setSelected}
            dense={dense}
            totalsRow={totalsRow?.(filtered)} />
          
          <Pagination
            page={page}
            pageSize={pageSize}
            total={filtered.length}
            onPage={setPage}
            onPageSize={(n) => {
              setPageSize(n);
              setPage(1);
            }} />
          
        </div>
      </div>
    </div>);

}