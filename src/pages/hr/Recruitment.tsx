import React from 'react';
import { PlusIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { KpiCard } from '../../components/patterns/KpiCard';
import { RECRUITMENT } from '../../data/hr';
import { number, shortDate } from '../../utils/format';
import type { Tone } from '../../types/erp';

type Row = (typeof RECRUITMENT)[number];

const STAGE_TONE: Record<string, Tone> = {
  Screening: 'info',
  Interview: 'brand',
  Offer: 'success',
  Closed: 'neutral'
};

export function Recruitment() {
  return (
    <ListPage<Row>
      title="Recruitment"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'HR & Payroll' }, { label: 'Recruitment' }]}
      description="Open requisitions, applicant volume and hiring stage by department."
      actions={
      <Button variant="primary" icon={PlusIcon}>
          New requisition
        </Button>
      }
      summary={
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="Open requisitions" value={String(RECRUITMENT.filter((r) => r.status === 'Open').length)} />
          <KpiCard label="Total applicants" value={number(RECRUITMENT.reduce((s, r) => s + r.applicants, 0))} delta={18.2} />
          <KpiCard label="At offer stage" value={String(RECRUITMENT.filter((r) => r.stage === 'Offer').length)} />
          <KpiCard label="Avg time to hire" value="42 days" delta={-6.4} invertDelta />
        </div>
      }
      rows={RECRUITMENT}
      rowKey={(r) => r.id}
      searchText={(r) => `${r.id} ${r.role} ${r.department} ${r.location} ${r.owner}`}
      selectable
      statusTabs={[
      { id: 'all', label: 'All requisitions', match: () => true },
      { id: 'open', label: 'Open', match: (r) => r.status === 'Open' },
      { id: 'offer', label: 'At offer', match: (r) => r.stage === 'Offer' },
      { id: 'closed', label: 'Closed', match: (r) => r.status === 'Closed' }]
      }
      filters={[
      { id: 'department', label: 'Department', options: [...new Set(RECRUITMENT.map((r) => r.department))] },
      { id: 'location', label: 'Location', options: [...new Set(RECRUITMENT.map((r) => r.location))] },
      { id: 'stage', label: 'Stage', options: [...new Set(RECRUITMENT.map((r) => r.stage))] }]
      }
      filterValue={(r, id) => id === 'department' ? r.department : id === 'location' ? r.location : r.stage}
      rowActions={() => [{ label: 'View applicants' }, { label: 'Schedule interview' }, { label: 'Extend offer' }, { label: 'Close requisition', danger: true }]}
      columns={[
      { key: 'id', header: 'Requisition', render: (r) => <span className="font-mono text-xs text-brand-700">{r.id}</span>, sortValue: (r) => r.id },
      { key: 'role', header: 'Role', render: (r) => <span className="font-medium text-slate-900">{r.role}</span>, sortValue: (r) => r.role },
      { key: 'department', header: 'Department', render: (r) => r.department },
      { key: 'location', header: 'Location', render: (r) => r.location },
      { key: 'applicants', header: 'Applicants', align: 'right', render: (r) => number(r.applicants), sortValue: (r) => r.applicants },
      { key: 'stage', header: 'Stage', render: (r) => <Badge tone={STAGE_TONE[r.stage] ?? 'neutral'}>{r.stage}</Badge>, sortValue: (r) => r.stage },
      { key: 'opened', header: 'Opened', render: (r) => shortDate(r.opened), sortValue: (r) => r.opened },
      { key: 'owner', header: 'Hiring owner', render: (r) => r.owner, optional: true },
      { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status === 'Open' ? 'Active' : 'Closed'} /> }]
      } />);


}