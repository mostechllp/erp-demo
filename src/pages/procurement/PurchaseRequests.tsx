import React from 'react';
import { CheckIcon, PlusIcon, XIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Badge } from '../../components/ui/Badge';
import { WorkflowStepper } from '../../components/patterns/WorkflowStepper';
import { PURCHASE_REQUESTS } from '../../data/procurement';
import { currency, shortDate } from '../../utils/format';
import { toneFor } from '../../utils/status';
import type { PurchaseRequest } from '../../types/erp';

export function PurchaseRequests() {
  return (
    <ListPage<PurchaseRequest>
      title="Purchase Requests"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Procurement' }, { label: 'Purchase Requests' }]}
      description="Internal demand raised by departments, approved before a purchase order is issued."
      actions={
      <Button variant="primary" icon={PlusIcon}>
          New request
        </Button>
      }
      summary={
      <Card title="Procure-to-pay lifecycle" description="Where requests sit in the wider procurement flow">
          <WorkflowStepper
          steps={[
          { label: 'Purchase Request', state: 'current', meta: '3 pending', to: '/procurement/requests' },
          { label: 'Approval', state: 'current', meta: 'level 1–3', to: '/approvals' },
          { label: 'Purchase Order', state: 'todo', to: '/procurement/orders' },
          { label: 'Goods Receipt', state: 'todo', to: '/procurement/receipts' },
          { label: 'Inventory', state: 'todo', to: '/inventory/stock' },
          { label: 'Supplier Invoice', state: 'todo', to: '/procurement/invoices' },
          { label: 'Payment', state: 'todo', to: '/finance/payments' }]
          } />
        
        </Card>
      }
      rows={PURCHASE_REQUESTS}
      rowKey={(r) => r.id}
      searchText={(r) => `${r.id} ${r.requester} ${r.department} ${r.status} ${r.approver}`}
      selectable
      bulkActions={[{ label: 'Approve', icon: CheckIcon }, { label: 'Reject', icon: XIcon, danger: true }]}
      statusTabs={[
      { id: 'all', label: 'All requests', match: () => true },
      { id: 'pending', label: 'Pending approval', match: (r) => r.status === 'Pending Approval' },
      { id: 'approved', label: 'Approved', match: (r) => r.status === 'Approved' },
      { id: 'rejected', label: 'Rejected', match: (r) => r.status === 'Rejected' },
      { id: 'draft', label: 'Draft', match: (r) => r.status === 'Draft' }]
      }
      filters={[
      { id: 'status', label: 'Status', options: [...new Set(PURCHASE_REQUESTS.map((r) => r.status))] },
      { id: 'department', label: 'Department', options: [...new Set(PURCHASE_REQUESTS.map((r) => r.department))] },
      { id: 'priority', label: 'Priority', options: ['Low', 'Normal', 'High', 'Urgent'] },
      { id: 'requester', label: 'Requester', options: [...new Set(PURCHASE_REQUESTS.map((r) => r.requester))] }]
      }
      filterValue={(r, id) =>
      id === 'status' ? r.status : id === 'department' ? r.department : id === 'priority' ? r.priority : r.requester
      }
      rowActions={(r) => [
      { label: 'View request' },
      { label: 'Approve', icon: CheckIcon, disabled: r.status !== 'Pending Approval' },
      { label: 'Reject', icon: XIcon, danger: true, disabled: r.status !== 'Pending Approval' },
      { label: 'Convert to purchase order', separatorBefore: true, disabled: r.status !== 'Approved' }]
      }
      columns={[
      { key: 'id', header: 'Request', render: (r) => <span className="font-mono text-xs text-brand-700">{r.id}</span>, sortValue: (r) => r.id },
      { key: 'requester', header: 'Requester', render: (r) => <span className="font-medium text-slate-900">{r.requester}</span>, sortValue: (r) => r.requester },
      { key: 'department', header: 'Department', render: (r) => r.department, sortValue: (r) => r.department },
      { key: 'date', header: 'Raised', render: (r) => shortDate(r.date), sortValue: (r) => r.date },
      { key: 'priority', header: 'Priority', render: (r) => <Badge tone={toneFor(r.priority)}>{r.priority}</Badge>, sortValue: (r) => r.priority },
      { key: 'linked', header: 'Linked to', render: (r) => <span className="font-mono text-xs text-slate-500">{r.linkedTo ?? '—'}</span>, optional: true },
      { key: 'amount', header: 'Est. value', align: 'right', render: (r) => currency(r.amount), sortValue: (r) => r.amount },
      { key: 'approver', header: 'Approver', render: (r) => r.approver },
      { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} />, sortValue: (r) => r.status }]
      } />);


}