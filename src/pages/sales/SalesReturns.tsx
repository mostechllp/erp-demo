import React from 'react';
import { PlusIcon, RotateCcwIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { RecordLink } from '../../components/patterns/RecordLink';
import { SALES_RETURNS } from '../../data/sales';
import { currency, shortDate } from '../../utils/format';

type Row = (typeof SALES_RETURNS)[number];

export function SalesReturns() {
  return (
    <ListPage<Row>
      title="Sales Returns"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Sales & CRM' }, { label: 'Sales Returns' }]}
      description="Customer returns, inspection outcome and credit note settlement."
      actions={
      <Button variant="primary" icon={PlusIcon}>
          New return
        </Button>
      }
      rows={SALES_RETURNS}
      rowKey={(r) => r.id}
      searchText={(r) => `${r.id} ${r.order} ${r.customer} ${r.reason}`}
      selectable
      statusTabs={[
      { id: 'all', label: 'All returns', match: () => true },
      { id: 'pending', label: 'Pending approval', match: (r) => r.status === 'Pending Approval' },
      { id: 'received', label: 'Received', match: (r) => r.status === 'Received' },
      { id: 'approved', label: 'Approved', match: (r) => r.status === 'Approved' }]
      }
      filters={[
      { id: 'status', label: 'Status', options: [...new Set(SALES_RETURNS.map((r) => r.status))] },
      { id: 'customer', label: 'Customer', options: [...new Set(SALES_RETURNS.map((r) => r.customer))] }]
      }
      filterValue={(r, id) => id === 'status' ? r.status : r.customer}
      rowActions={() => [
      { label: 'Inspect return', icon: RotateCcwIcon },
      { label: 'Issue credit note' },
      { label: 'Reject return', danger: true, separatorBefore: true }]
      }
      columns={[
      { key: 'id', header: 'Return', render: (r) => <span className="font-mono text-xs text-brand-700">{r.id}</span>, sortValue: (r) => r.id },
      { key: 'order', header: 'Sales order', render: (r) => <RecordLink to={`/sales/orders/${r.order}`}>{r.order}</RecordLink> },
      { key: 'customer', header: 'Customer', render: (r) => <span className="font-medium text-slate-900">{r.customer}</span>, sortValue: (r) => r.customer },
      { key: 'date', header: 'Date', render: (r) => shortDate(r.date), sortValue: (r) => r.date },
      { key: 'reason', header: 'Reason', render: (r) => <span className="text-slate-600">{r.reason}</span> },
      { key: 'qty', header: 'Qty', align: 'right', render: (r) => r.qty, sortValue: (r) => r.qty },
      { key: 'amount', header: 'Credit value', align: 'right', render: (r) => currency(r.amount), sortValue: (r) => r.amount },
      { key: 'creditNote', header: 'Credit note', render: (r) => <span className="font-mono text-xs text-slate-500">{r.creditNote}</span> },
      { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} />, sortValue: (r) => r.status }]
      } />);


}