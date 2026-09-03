import React, { useMemo, useState } from 'react';
import { DownloadIcon, FileTextIcon, PlayIcon, PrinterIcon, SearchIcon } from 'lucide-react';
import { PageHeader } from '../components/patterns/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { DataTable } from '../components/ui/DataTable';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { useToast } from '../contexts/ToastContext';
import { REPORTS, REPORT_CATEGORIES } from '../data/reports';
import { BRANCHES } from '../data/org';
import { DEPARTMENTS } from '../data/hr';
import { cx } from '../utils/format';
import type { ReportDef } from '../data/reports';

export function Reports() {
  const { push } = useToast();
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');

  const rows = useMemo(
    () =>
    REPORTS.filter(
      (r) =>
      (category === 'All' || r.category === category) && (
      query.trim() === '' ||
      `${r.name} ${r.description} ${r.owner} ${r.category}`.toLowerCase().includes(query.toLowerCase()))
    ),
    [category, query]
  );

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title="Reports & Analytics"
        crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Reports & Analytics' }]}
        description="Standard operational and financial reports across all modules, with filters, export and print."
        actions={
        <>
            <Button icon={PrinterIcon}>Print</Button>
            <Button icon={DownloadIcon}>Export CSV</Button>
            <Button variant="primary" icon={FileTextIcon}>
              Export PDF
            </Button>
          </>
        } />
      

      <div className="flex-1 space-y-4 p-6">
        <Card title="Report parameters" description="Applied to the report you run next">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <Select
              label="Date range"
              options={[
              { value: 'mtd', label: 'Month to date' },
              { value: 'qtd', label: 'Quarter to date' },
              { value: 'ytd', label: 'Year to date' },
              { value: 'custom', label: 'Custom range' }]
              } />
            
            <Select label="Branch" options={[{ value: 'all', label: 'All branches' }, ...BRANCHES.map((b) => ({ value: b.id, label: b.name }))]} />
            <Select label="Department" options={[{ value: 'all', label: 'All departments' }, ...DEPARTMENTS.map((d) => ({ value: d.id, label: d.name }))]} />
            <Select label="Category" options={[{ value: 'all', label: 'All categories' }, ...REPORT_CATEGORIES.map((c) => ({ value: c, label: c }))]} />
            <Select
              label="Status"
              options={[
              { value: 'all', label: 'All statuses' },
              { value: 'open', label: 'Open only' },
              { value: 'closed', label: 'Closed only' }]
              } />
            
            <Select label="User" options={[{ value: 'all', label: 'All users' }, { value: 'me', label: 'My records only' }]} />
          </div>
        </Card>

        <div className="flex flex-wrap items-center gap-2">
          {['All', ...REPORT_CATEGORIES].map((c) =>
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cx(
              'rounded border px-2.5 py-1 text-xs font-medium transition-colors duration-150 ease-erp',
              category === c ?
              'border-brand-600 bg-brand-600 text-white' :
              'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
            )}>
            
              {c}
              {c !== 'All' &&
            <span className="ml-1.5 text-[10px] tnum opacity-70">
                  {REPORTS.filter((r) => r.category === c).length}
                </span>
            }
            </button>
          )}
        </div>

        <Card
          title={`${category === 'All' ? 'All reports' : `${category} reports`}`}
          description={`${rows.length} report${rows.length === 1 ? '' : 's'} available`}
          padded={false}
          actions={
          <div className="w-64">
              <Input
              aria-label="Search reports"
              placeholder="Search reports…"
              icon={SearchIcon}
              value={query}
              onChange={(e) => setQuery(e.target.value)} />
            
            </div>
          }>
          
          {rows.length === 0 ?
          <EmptyState
            title="No reports match your search"
            description="Try a different keyword or clear the category filter."
            actionLabel="Clear filters"
            onAction={() => {
              setQuery('');
              setCategory('All');
            }} /> :


          <DataTable<ReportDef>
            rows={rows}
            rowKey={(r) => r.id}
            dense
            columns={[
            { key: 'id', header: 'Code', render: (r) => <span className="font-mono text-xs text-brand-700">{r.id}</span> },
            {
              key: 'name',
              header: 'Report',
              render: (r) =>
              <div className="max-w-[420px]">
                      <p className="font-medium text-slate-900">{r.name}</p>
                      <p className="truncate text-xs text-slate-500">{r.description}</p>
                    </div>,

              sortValue: (r) => r.name
            },
            { key: 'category', header: 'Category', render: (r) => <Badge tone="neutral">{r.category}</Badge>, sortValue: (r) => r.category },
            { key: 'frequency', header: 'Frequency', render: (r) => r.frequency },
            { key: 'owner', header: 'Owner', render: (r) => r.owner, sortValue: (r) => r.owner },
            { key: 'lastRun', header: 'Last run', render: (r) => <span className="tnum text-slate-500">{r.lastRun}</span>, sortValue: (r) => r.lastRun }]
            }
            rowActions={(r) => [
            {
              label: 'Run report',
              icon: PlayIcon,
              onSelect: () => push({ tone: 'success', title: `${r.name} queued`, description: 'You will be notified when it is ready.' })
            },
            { label: 'Export CSV', icon: DownloadIcon },
            { label: 'Export PDF', icon: FileTextIcon },
            { label: 'Print', icon: PrinterIcon },
            { label: 'Schedule delivery', separatorBefore: true }]
            } />

          }
        </Card>
      </div>
    </div>);

}