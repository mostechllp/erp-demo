import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon, EyeIcon, XIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Badge } from '../../components/ui/Badge';
import { KpiCard } from '../../components/patterns/KpiCard';
import { RecordLink } from '../../components/patterns/RecordLink';
import { APPROVALS } from '../../data/governance';
import { currency, shortDate } from '../../utils/format';
import { toneFor } from '../../utils/status';
import type { ApprovalRequest } from '../../types/erp';

export function ApprovalCenter() {
  const navigate = useNavigate();
  const count = (s: string) => APPROVALS.filter((a) => a.status === s).length;

  return (
    <ListPage<ApprovalRequest>
      title="Workflow & Approvals"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Workflow & Approvals' }]}
      description="Every request routed to you across procurement, sales, finance, inventory, production, projects and HR."
      summary={
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="Pending my approval" value={String(count('Pending'))} emphasis hint="2 breaching SLA" />
          <KpiCard label="Approved (30 days)" value={String(count('Approved') + 22)} delta={6.4} />
          <KpiCard label="Rejected" value={String(count('Rejected'))} />
          <KpiCard label="Returned for information" value={String(count('Returned'))} invertDelta />
        </div>
      }
      rows={APPROVALS}
      rowKey={(a) => a.id}
      onRowClick={(a) => navigate(`/approvals/${a.id}`)}
      searchText={(a) => `${a.id} ${a.title} ${a.requester} ${a.department} ${a.type} ${a.record}`}
      selectable
      bulkActions={[{ label: 'Approve', icon: CheckIcon }, { label: 'Reject', icon: XIcon, danger: true }]}
      statusTabs={[
      { id: 'pending', label: 'Pending', match: (a) => a.status === 'Pending' },
      { id: 'approved', label: 'Approved', match: (a) => a.status === 'Approved' },
      { id: 'rejected', label: 'Rejected', match: (a) => a.status === 'Rejected' },
      { id: 'returned', label: 'Returned', match: (a) => a.status === 'Returned' },
      { id: 'all', label: 'All requests', match: () => true }]
      }
      filters={[
      { id: 'type', label: 'Request type', options: [...new Set(APPROVALS.map((a) => a.type))] },
      { id: 'module', label: 'Module', options: [...new Set(APPROVALS.map((a) => a.module))] },
      { id: 'department', label: 'Department', options: [...new Set(APPROVALS.map((a) => a.department))] },
      { id: 'priority', label: 'Priority', options: ['Low', 'Normal', 'High', 'Urgent'] }]
      }
      filterValue={(a, id) =>
      id === 'type' ? a.type : id === 'module' ? a.module : id === 'department' ? a.department : a.priority
      }
      rowActions={(a) => [
      { label: 'Open request', icon: EyeIcon, onSelect: () => navigate(`/approvals/${a.id}`) },
      { label: 'Approve', icon: CheckIcon, disabled: a.status !== 'Pending' },
      { label: 'Send back for information', disabled: a.status !== 'Pending' },
      { label: 'Reject', icon: XIcon, danger: true, separatorBefore: true, disabled: a.status !== 'Pending' }]
      }
      columns={[
      { key: 'id', header: 'Request', render: (a) => <RecordLink to={`/approvals/${a.id}`}>{a.id}</RecordLink>, sortValue: (a) => a.id },
      { key: 'type', header: 'Type', render: (a) => a.type, sortValue: (a) => a.type },
      {
        key: 'title',
        header: 'Subject',
        render: (a) =>
        <div className="max-w-[300px]">
              <p className="truncate font-medium text-slate-900">{a.title}</p>
              <p className="truncate text-xs text-slate-500">{a.summary}</p>
            </div>

      },
      { key: 'requester', header: 'Requester', render: (a) => a.requester, sortValue: (a) => a.requester },
      { key: 'department', header: 'Department', render: (a) => a.department, optional: true },
      {
        key: 'amount',
        header: 'Amount',
        align: 'right',
        sortValue: (a) => a.amount,
        render: (a) => a.amount === 0 ? <span className="text-slate-400">—</span> : currency(a.amount)
      },
      { key: 'date', header: 'Raised', render: (a) => shortDate(a.date), sortValue: (a) => a.date },
      { key: 'priority', header: 'Priority', render: (a) => <Badge tone={toneFor(a.priority)}>{a.priority}</Badge> },
      {
        key: 'level',
        header: 'Level',
        render: (a) =>
        <span className="text-xs tnum text-slate-600">
              {a.currentLevel} of {a.levels.length}
            </span>

      },
      { key: 'status', header: 'Status', render: (a) => <StatusBadge status={a.status} />, sortValue: (a) => a.status }]
      } />);


}