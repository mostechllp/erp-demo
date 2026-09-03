import React from 'react';
import { StarIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Progress } from '../../components/ui/Progress';
import { KpiCard } from '../../components/patterns/KpiCard';
import { PERFORMANCE } from '../../data/hr';

type Row = (typeof PERFORMANCE)[number];

export function Performance() {
  const rated = PERFORMANCE.filter((p) => p.rating > 0);

  return (
    <ListPage<Row>
      title="Performance"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'HR & Payroll' }, { label: 'Performance' }]}
      description="Review cycles, ratings and goal completion by employee."
      summary={
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="Reviews in cycle" value={String(PERFORMANCE.length)} hint="H1 2026 + probation" />
          <KpiCard label="Completed" value={String(PERFORMANCE.filter((p) => p.status === 'Completed').length)} />
          <KpiCard label="Average rating" value={(rated.reduce((s, p) => s + p.rating, 0) / rated.length).toFixed(2)} delta={2.1} />
          <KpiCard label="Goals achieved" value={`${PERFORMANCE.reduce((s, p) => s + p.goalsMet, 0)} / ${PERFORMANCE.reduce((s, p) => s + p.goalsTotal, 0)}`} />
        </div>
      }
      rows={PERFORMANCE}
      rowKey={(p) => p.id}
      searchText={(p) => `${p.id} ${p.employee} ${p.cycle} ${p.reviewer}`}
      statusTabs={[
      { id: 'all', label: 'All reviews', match: () => true },
      { id: 'completed', label: 'Completed', match: (p) => p.status === 'Completed' },
      { id: 'review', label: 'In review', match: (p) => p.status === 'In Review' },
      { id: 'pending', label: 'Pending', match: (p) => p.status === 'Pending' }]
      }
      filters={[
      { id: 'cycle', label: 'Cycle', options: [...new Set(PERFORMANCE.map((p) => p.cycle))] },
      { id: 'reviewer', label: 'Reviewer', options: [...new Set(PERFORMANCE.map((p) => p.reviewer))] }]
      }
      filterValue={(p, id) => id === 'cycle' ? p.cycle : p.reviewer}
      rowActions={() => [{ label: 'Open review' }, { label: 'Add feedback' }, { label: 'Set goals' }]}
      columns={[
      { key: 'employee', header: 'Employee', render: (p) => <span className="font-medium text-slate-900">{p.employee}</span>, sortValue: (p) => p.employee },
      { key: 'cycle', header: 'Cycle', render: (p) => p.cycle },
      { key: 'reviewer', header: 'Reviewer', render: (p) => p.reviewer },
      {
        key: 'rating',
        header: 'Rating',
        align: 'right',
        sortValue: (p) => p.rating,
        render: (p) =>
        p.rating > 0 ?
        <span className="inline-flex items-center gap-1 tnum">
                <StarIcon className="h-3 w-3 fill-amber-400 text-amber-400" />
                {p.rating.toFixed(1)}
              </span> :

        <span className="text-slate-400">—</span>

      },
      {
        key: 'goals',
        header: 'Goals achieved',
        width: '190px',
        sortValue: (p) => p.goalsMet / p.goalsTotal,
        render: (p) =>
        <div className="flex items-center gap-2">
              <Progress value={p.goalsMet / p.goalsTotal * 100} tone={p.goalsMet / p.goalsTotal > 0.8 ? 'success' : 'warning'} label={`${p.employee} goals`} />
              <span className="shrink-0 text-xs tnum text-slate-500">
                {p.goalsMet}/{p.goalsTotal}
              </span>
            </div>

      },
      { key: 'status', header: 'Status', render: (p) => <StatusBadge status={p.status} />, sortValue: (p) => p.status }]
      } />);


}