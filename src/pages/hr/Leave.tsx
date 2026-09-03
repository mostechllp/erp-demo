import React from 'react';
import { CheckIcon, PlusIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Card } from '../../components/ui/Card';
import { WorkflowStepper } from '../../components/patterns/WorkflowStepper';
import { LEAVE_REQUESTS } from '../../data/hr';
import { shortDate } from '../../utils/format';

type Row = (typeof LEAVE_REQUESTS)[number];

export function Leave() {
  return (
    <ListPage<Row>
      title="Leave"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'HR & Payroll' }, { label: 'Leave' }]}
      description="Employee → leave request → manager approval → HR approval → approved or rejected."
      actions={
      <>
          <Button icon={CheckIcon}>Approve selected</Button>
          <Button variant="primary" icon={PlusIcon}>
            New leave request
          </Button>
        </>
      }
      summary={
      <Card title="Leave approval workflow">
          <WorkflowStepper
          steps={[
          { label: 'Leave request', state: 'done', meta: `${LEAVE_REQUESTS.length} raised` },
          { label: 'Manager approval', state: 'current', meta: '1 pending' },
          { label: 'HR approval', state: 'current', meta: '1 pending' },
          { label: 'Approved', state: 'todo', meta: '2 approved' },
          { label: 'Payroll impact', state: 'todo', to: '/hr/payroll' }]
          } />
        
        </Card>
      }
      rows={LEAVE_REQUESTS}
      rowKey={(l) => l.id}
      searchText={(l) => `${l.id} ${l.employee} ${l.type} ${l.department} ${l.approver}`}
      selectable
      bulkActions={[{ label: 'Approve', icon: CheckIcon }, { label: 'Reject', danger: true }]}
      statusTabs={[
      { id: 'all', label: 'All requests', match: () => true },
      { id: 'pending', label: 'Pending approval', match: (l) => l.status === 'Pending Approval' },
      { id: 'approved', label: 'Approved', match: (l) => l.status === 'Approved' },
      { id: 'rejected', label: 'Rejected', match: (l) => l.status === 'Rejected' },
      { id: 'draft', label: 'Draft', match: (l) => l.status === 'Draft' }]
      }
      filters={[
      { id: 'type', label: 'Leave type', options: [...new Set(LEAVE_REQUESTS.map((l) => l.type))] },
      { id: 'department', label: 'Department', options: [...new Set(LEAVE_REQUESTS.map((l) => l.department))] },
      { id: 'status', label: 'Status', options: [...new Set(LEAVE_REQUESTS.map((l) => l.status))] }]
      }
      filterValue={(l, id) => id === 'type' ? l.type : id === 'department' ? l.department : l.status}
      rowActions={(l) => [
      { label: 'View request' },
      { label: 'Approve', icon: CheckIcon, disabled: l.status !== 'Pending Approval' },
      { label: 'Reject', danger: true, disabled: l.status !== 'Pending Approval' }]
      }
      columns={[
      { key: 'id', header: 'Request', render: (l) => <span className="font-mono text-xs text-brand-700">{l.id}</span>, sortValue: (l) => l.id },
      { key: 'employee', header: 'Employee', render: (l) => <span className="font-medium text-slate-900">{l.employee}</span>, sortValue: (l) => l.employee },
      { key: 'department', header: 'Department', render: (l) => l.department, optional: true },
      { key: 'type', header: 'Leave type', render: (l) => l.type, sortValue: (l) => l.type },
      { key: 'from', header: 'From', render: (l) => shortDate(l.from), sortValue: (l) => l.from },
      { key: 'to', header: 'To', render: (l) => shortDate(l.to) },
      { key: 'days', header: 'Days', align: 'right', render: (l) => l.days, sortValue: (l) => l.days },
      { key: 'stage', header: 'Stage', render: (l) => <span className="text-slate-600">{l.stage}</span> },
      { key: 'approver', header: 'Approver', render: (l) => l.approver, optional: true },
      { key: 'status', header: 'Status', render: (l) => <StatusBadge status={l.status} />, sortValue: (l) => l.status }]
      } />);


}