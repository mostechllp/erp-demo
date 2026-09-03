import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, PlusIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Badge } from '../../components/ui/Badge';
import { RecordLink } from '../../components/patterns/RecordLink';
import { JOB_CARDS } from '../../data/workshop';
import { currency, shortDate } from '../../utils/format';
import { toneFor } from '../../utils/status';
import type { JobCard } from '../../types/erp';

export function JobCards() {
  const navigate = useNavigate();

  return (
    <ListPage<JobCard>
      title="Job Cards"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Workshop' }, { label: 'Job Cards' }]}
      description="Received → Inspection → Waiting for parts → In progress → Quality check → Ready → Delivered → Closed."
      actions={
      <Button variant="primary" icon={PlusIcon}>
          New job card
        </Button>
      }
      rows={JOB_CARDS}
      rowKey={(j) => j.id}
      onRowClick={(j) => navigate(`/workshop/jobs/${j.id}`)}
      searchText={(j) => `${j.id} ${j.customer} ${j.asset} ${j.problem} ${j.technician}`}
      selectable
      statusTabs={[
      { id: 'all', label: 'All jobs', match: () => true },
      { id: 'open', label: 'Open', match: (j) => !['Delivered', 'Closed'].includes(j.status) },
      { id: 'parts', label: 'Waiting for parts', match: (j) => j.status === 'Waiting for Parts' },
      { id: 'qc', label: 'Quality check', match: (j) => j.status === 'Quality Check' },
      { id: 'ready', label: 'Ready', match: (j) => j.status === 'Ready' },
      { id: 'closed', label: 'Closed', match: (j) => ['Delivered', 'Closed'].includes(j.status) }]
      }
      filters={[
      { id: 'status', label: 'Status', options: [...new Set(JOB_CARDS.map((j) => j.status))] },
      { id: 'technician', label: 'Technician', options: [...new Set(JOB_CARDS.map((j) => j.technician))] },
      { id: 'priority', label: 'Priority', options: ['Low', 'Normal', 'High', 'Urgent'] },
      { id: 'customer', label: 'Customer', options: [...new Set(JOB_CARDS.map((j) => j.customer))] }]
      }
      filterValue={(j, id) =>
      id === 'status' ? j.status : id === 'technician' ? j.technician : id === 'priority' ? j.priority : j.customer
      }
      rowActions={(j) => [
      { label: 'Open job card', icon: EyeIcon, onSelect: () => navigate(`/workshop/jobs/${j.id}`) },
      { label: 'Issue parts' },
      { label: 'Log labour hours' },
      { label: 'Create workshop invoice' },
      { label: 'Cancel job', danger: true, separatorBefore: true }]
      }
      columns={[
      { key: 'id', header: 'Job', render: (j) => <RecordLink to={`/workshop/jobs/${j.id}`}>{j.id}</RecordLink>, sortValue: (j) => j.id },
      { key: 'customer', header: 'Customer', render: (j) => <span className="font-medium text-slate-900">{j.customer}</span>, sortValue: (j) => j.customer },
      {
        key: 'asset',
        header: 'Equipment / problem',
        render: (j) =>
        <div className="max-w-[280px]">
              <p className="truncate text-slate-800">{j.asset}</p>
              <p className="truncate text-xs text-slate-500">{j.problem}</p>
            </div>

      },
      { key: 'technician', header: 'Technician', render: (j) => j.technician, sortValue: (j) => j.technician },
      { key: 'priority', header: 'Priority', render: (j) => <Badge tone={toneFor(j.priority)}>{j.priority}</Badge> },
      { key: 'start', header: 'Received', render: (j) => shortDate(j.start), sortValue: (j) => j.start, optional: true },
      { key: 'due', header: 'Due', render: (j) => shortDate(j.due), sortValue: (j) => j.due },
      { key: 'parts', header: 'Parts', align: 'right', render: (j) => currency(j.parts), sortValue: (j) => j.parts },
      { key: 'labour', header: 'Labour', align: 'right', render: (j) => currency(j.labour), sortValue: (j) => j.labour },
      { key: 'revenue', header: 'Revenue', align: 'right', render: (j) => <span className="font-medium">{currency(j.revenue)}</span>, sortValue: (j) => j.revenue },
      { key: 'status', header: 'Status', render: (j) => <StatusBadge status={j.status} />, sortValue: (j) => j.status }]
      }
      totalsRow={(rows) =>
      <>
          <td className="px-3 py-2 text-xs uppercase tracking-wide text-slate-500" colSpan={7}>
            {rows.length} job cards
          </td>
          <td className="px-3 py-2 text-right tnum">{currency(rows.reduce((s, j) => s + j.parts, 0))}</td>
          <td className="px-3 py-2 text-right tnum">{currency(rows.reduce((s, j) => s + j.labour, 0))}</td>
          <td className="px-3 py-2 text-right tnum">{currency(rows.reduce((s, j) => s + j.revenue, 0))}</td>
          <td />
        </>
      } />);


}