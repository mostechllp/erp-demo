import React from 'react';
import { CheckIcon, PlusIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { RecordLink } from '../../components/patterns/RecordLink';
import { KpiCard } from '../../components/patterns/KpiCard';
import { TIMESHEETS } from '../../data/projects';
import { currency, number } from '../../utils/format';

type Row = (typeof TIMESHEETS)[number];

export function Timesheets() {
  const hours = TIMESHEETS.reduce((s, t) => s + t.hours, 0);
  const billable = TIMESHEETS.reduce((s, t) => s + t.billable, 0);
  const cost = TIMESHEETS.reduce((s, t) => s + t.hours * t.rate, 0);

  return (
    <ListPage<Row>
      title="Timesheets"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Projects & Job Costing' }, { label: 'Timesheets' }]}
      description="Weekly labour bookings costed to projects and jobs, approved before posting to job cost."
      actions={
      <>
          <Button icon={CheckIcon}>Approve selected</Button>
          <Button variant="primary" icon={PlusIcon}>
            New timesheet
          </Button>
        </>
      }
      summary={
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="Hours booked" value={number(hours)} delta={4.2} />
          <KpiCard label="Billable hours" value={number(billable)} hint={`${(billable / hours * 100).toFixed(1)}% utilisation`} />
          <KpiCard label="Labour cost" value={currency(cost, { compact: true })} delta={3.8} invertDelta />
          <KpiCard label="Awaiting approval" value={String(TIMESHEETS.filter((t) => t.status === 'Pending Approval').length)} />
        </div>
      }
      rows={TIMESHEETS}
      rowKey={(t) => t.id}
      searchText={(t) => `${t.id} ${t.employee} ${t.project} ${t.job} ${t.week}`}
      selectable
      bulkActions={[{ label: 'Approve', icon: CheckIcon }, { label: 'Reject', danger: true }]}
      statusTabs={[
      { id: 'all', label: 'All timesheets', match: () => true },
      { id: 'pending', label: 'Pending approval', match: (t) => t.status === 'Pending Approval' },
      { id: 'approved', label: 'Approved', match: (t) => t.status === 'Approved' },
      { id: 'draft', label: 'Draft', match: (t) => t.status === 'Draft' },
      { id: 'rejected', label: 'Rejected', match: (t) => t.status === 'Rejected' }]
      }
      filters={[
      { id: 'employee', label: 'Employee', options: [...new Set(TIMESHEETS.map((t) => t.employee))] },
      { id: 'project', label: 'Project', options: [...new Set(TIMESHEETS.map((t) => t.project))] },
      { id: 'status', label: 'Status', options: [...new Set(TIMESHEETS.map((t) => t.status))] }]
      }
      filterValue={(t, id) => id === 'employee' ? t.employee : id === 'project' ? t.project : t.status}
      rowActions={(t) => [
      { label: 'View timesheet' },
      { label: 'Approve', icon: CheckIcon, disabled: t.status !== 'Pending Approval' },
      { label: 'Reject', danger: true, disabled: t.status !== 'Pending Approval' }]
      }
      columns={[
      { key: 'id', header: 'Timesheet', render: (t) => <span className="font-mono text-xs text-brand-700">{t.id}</span>, sortValue: (t) => t.id },
      { key: 'employee', header: 'Employee', render: (t) => <span className="font-medium text-slate-900">{t.employee}</span>, sortValue: (t) => t.employee },
      { key: 'project', header: 'Project', render: (t) => <RecordLink to={`/projects/${t.project}`}>{t.project}</RecordLink> },
      { key: 'job', header: 'Job', render: (t) => <RecordLink to={`/projects/jobs/${t.job}`}>{t.job}</RecordLink> },
      { key: 'week', header: 'Week', render: (t) => t.week, sortValue: (t) => t.week },
      { key: 'hours', header: 'Hours', align: 'right', render: (t) => t.hours, sortValue: (t) => t.hours },
      { key: 'billable', header: 'Billable', align: 'right', render: (t) => t.billable },
      { key: 'rate', header: 'Rate', align: 'right', render: (t) => currency(t.rate), optional: true },
      { key: 'cost', header: 'Labour cost', align: 'right', render: (t) => currency(t.hours * t.rate), sortValue: (t) => t.hours * t.rate },
      { key: 'status', header: 'Status', render: (t) => <StatusBadge status={t.status} />, sortValue: (t) => t.status }]
      } />);


}