import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, PlusIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Progress } from '../../components/ui/Progress';
import { RecordLink } from '../../components/patterns/RecordLink';
import { KpiCard } from '../../components/patterns/KpiCard';
import { PROJECTS } from '../../data/projects';
import { currency, number, shortDate } from '../../utils/format';
import type { Project } from '../../types/erp';

export function ProjectList() {
  const navigate = useNavigate();
  const revenue = PROJECTS.reduce((s, p) => s + p.revenue, 0);
  const actual = PROJECTS.reduce((s, p) => s + p.actual, 0);

  return (
    <ListPage<Project>
      title="Projects"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Projects & Job Costing' }, { label: 'Projects' }]}
      description="Project portfolio with budget, committed cost, revenue and profitability."
      actions={
      <Button variant="primary" icon={PlusIcon}>
          New project
        </Button>
      }
      summary={
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <KpiCard label="Active projects" value={String(PROJECTS.filter((p) => p.status === 'In Progress').length)} />
          <KpiCard label="Contract revenue" value={currency(revenue, { compact: true })} delta={8.4} emphasis />
          <KpiCard label="Actual cost" value={currency(actual, { compact: true })} delta={6.1} invertDelta />
          <KpiCard label="Gross margin" value={`${((revenue - actual) / revenue * 100).toFixed(1)}%`} delta={1.4} />
          <KpiCard label="Over budget" value={String(PROJECTS.filter((p) => p.actual > p.budget).length)} invertDelta hint="PRJ-9003" />
        </div>
      }
      rows={PROJECTS}
      rowKey={(p) => p.id}
      onRowClick={(p) => navigate(`/projects/${p.id}`)}
      searchText={(p) => `${p.id} ${p.name} ${p.client} ${p.manager} ${p.status}`}
      selectable
      statusTabs={[
      { id: 'all', label: 'All projects', match: () => true },
      { id: 'active', label: 'In progress', match: (p) => p.status === 'In Progress' },
      { id: 'planned', label: 'Planned', match: (p) => p.status === 'Planned' },
      { id: 'risk', label: 'At risk', match: (p) => p.actual > p.budget || p.status === 'On Hold' },
      { id: 'done', label: 'Completed', match: (p) => p.status === 'Completed' }]
      }
      filters={[
      { id: 'status', label: 'Status', options: [...new Set(PROJECTS.map((p) => p.status))] },
      { id: 'manager', label: 'Manager', options: [...new Set(PROJECTS.map((p) => p.manager))] },
      { id: 'client', label: 'Client', options: [...new Set(PROJECTS.map((p) => p.client))] }]
      }
      filterValue={(p, id) => id === 'status' ? p.status : id === 'manager' ? p.manager : p.client}
      rowActions={(p) => [
      { label: 'Open project', icon: EyeIcon, onSelect: () => navigate(`/projects/${p.id}`) },
      { label: 'Create job' },
      { label: 'Request budget change' },
      { label: 'Close project', danger: true, separatorBefore: true }]
      }
      columns={[
      { key: 'id', header: 'Project ID', render: (p) => <RecordLink to={`/projects/${p.id}`}>{p.id}</RecordLink>, sortValue: (p) => p.id },
      {
        key: 'name',
        header: 'Project',
        render: (p) =>
        <div className="max-w-[260px]">
              <p className="truncate font-medium text-slate-900">{p.name}</p>
              <p className="truncate text-xs text-slate-500">{p.client}</p>
            </div>,

        sortValue: (p) => p.name
      },
      { key: 'manager', header: 'Manager', render: (p) => p.manager, sortValue: (p) => p.manager },
      { key: 'start', header: 'Start', render: (p) => shortDate(p.start), optional: true },
      { key: 'end', header: 'End', render: (p) => shortDate(p.end), sortValue: (p) => p.end },
      { key: 'budget', header: 'Budget', align: 'right', render: (p) => currency(p.budget, { compact: true }), sortValue: (p) => p.budget },
      {
        key: 'actual',
        header: 'Actual cost',
        align: 'right',
        sortValue: (p) => p.actual,
        render: (p) => <span className={p.actual > p.budget ? 'font-semibold text-red-600' : ''}>{currency(p.actual, { compact: true })}</span>
      },
      { key: 'revenue', header: 'Revenue', align: 'right', render: (p) => currency(p.revenue, { compact: true }), sortValue: (p) => p.revenue },
      {
        key: 'profit',
        header: 'Profit',
        align: 'right',
        sortValue: (p) => p.revenue - p.actual,
        render: (p) => <span className="font-medium text-emerald-700">{currency(p.revenue - p.actual, { compact: true })}</span>
      },
      { key: 'hours', header: 'Hours', align: 'right', render: (p) => number(p.hours), optional: true },
      {
        key: 'progress',
        header: 'Progress',
        width: '150px',
        sortValue: (p) => p.progress,
        render: (p) => <Progress value={p.progress} tone={p.actual > p.budget ? 'danger' : 'brand'} showValue label={`${p.name} progress`} />
      },
      { key: 'status', header: 'Status', render: (p) => <StatusBadge status={p.status} />, sortValue: (p) => p.status }]
      } />);


}