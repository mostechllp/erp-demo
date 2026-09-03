import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, PlusIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { RecordLink } from '../../components/patterns/RecordLink';
import { JOBS } from '../../data/projects';
import { currency, shortDate } from '../../utils/format';
import type { Job } from '../../types/erp';

export function JobList() {
  const navigate = useNavigate();

  return (
    <ListPage<Job>
      title="Jobs"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Projects & Job Costing' }, { label: 'Jobs' }]}
      description="Draft → Assigned → In progress → On hold → Completed → Approved → Invoiced → Closed."
      actions={
      <Button variant="primary" icon={PlusIcon}>
          New job
        </Button>
      }
      rows={JOBS}
      rowKey={(j) => j.id}
      onRowClick={(j) => navigate(`/projects/jobs/${j.id}`)}
      searchText={(j) => `${j.id} ${j.project} ${j.customer} ${j.type} ${j.team}`}
      selectable
      statusTabs={[
      { id: 'all', label: 'All jobs', match: () => true },
      { id: 'active', label: 'In progress', match: (j) => j.status === 'In Progress' },
      { id: 'hold', label: 'On hold', match: (j) => j.status === 'On Hold' },
      { id: 'over', label: 'Over estimate', match: (j) => j.actual > j.estimate },
      { id: 'closed', label: 'Completed & invoiced', match: (j) => ['Completed', 'Invoiced'].includes(j.status) }]
      }
      filters={[
      { id: 'status', label: 'Status', options: [...new Set(JOBS.map((j) => j.status))] },
      { id: 'type', label: 'Job type', options: [...new Set(JOBS.map((j) => j.type))] },
      { id: 'team', label: 'Team', options: [...new Set(JOBS.map((j) => j.team))] },
      { id: 'customer', label: 'Customer', options: [...new Set(JOBS.map((j) => j.customer))] }]
      }
      filterValue={(j, id) => id === 'status' ? j.status : id === 'type' ? j.type : id === 'team' ? j.team : j.customer}
      rowActions={(j) => [
      { label: 'Open job', icon: EyeIcon, onSelect: () => navigate(`/projects/jobs/${j.id}`) },
      { label: 'Book labour' },
      { label: 'Issue materials' },
      { label: 'Invoice job', disabled: j.status !== 'Completed' },
      { label: 'Cancel job', danger: true, separatorBefore: true }]
      }
      columns={[
      { key: 'id', header: 'Job number', render: (j) => <RecordLink to={`/projects/jobs/${j.id}`}>{j.id}</RecordLink>, sortValue: (j) => j.id },
      {
        key: 'project',
        header: 'Project / customer',
        render: (j) =>
        <div className="max-w-[240px]">
              <p className="truncate font-medium text-slate-900">{j.project}</p>
              <p className="truncate text-xs text-slate-500">{j.customer}</p>
            </div>,

        sortValue: (j) => j.project
      },
      { key: 'type', header: 'Job type', render: (j) => j.type },
      { key: 'team', header: 'Assigned team', render: (j) => j.team, optional: true },
      { key: 'start', header: 'Start', render: (j) => shortDate(j.start), optional: true },
      { key: 'due', header: 'Due', render: (j) => shortDate(j.due), sortValue: (j) => j.due },
      { key: 'estimate', header: 'Estimated cost', align: 'right', render: (j) => currency(j.estimate, { compact: true }), sortValue: (j) => j.estimate },
      {
        key: 'actual',
        header: 'Actual cost',
        align: 'right',
        sortValue: (j) => j.actual,
        render: (j) => <span className={j.actual > j.estimate ? 'font-semibold text-red-600' : ''}>{currency(j.actual, { compact: true })}</span>
      },
      { key: 'revenue', header: 'Revenue', align: 'right', render: (j) => currency(j.revenue, { compact: true }), sortValue: (j) => j.revenue },
      {
        key: 'profit',
        header: 'Profit',
        align: 'right',
        sortValue: (j) => j.revenue - j.actual,
        render: (j) => <span className="font-medium text-emerald-700">{currency(j.revenue - j.actual, { compact: true })}</span>
      },
      { key: 'status', header: 'Status', render: (j) => <StatusBadge status={j.status} />, sortValue: (j) => j.status }]
      } />);


}