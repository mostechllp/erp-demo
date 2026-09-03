import React from 'react';
import { PlusIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { RecordLink } from '../../components/patterns/RecordLink';
import { PURCHASE_RETURNS } from '../../data/procurement';
import { currency, shortDate } from '../../utils/format';

type Row = (typeof PURCHASE_RETURNS)[number];

export function PurchaseReturns() {
  return (
    <ListPage<Row>
      title="Purchase Returns"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Procurement' }, { label: 'Purchase Returns' }]}
      description="Rejected or surplus goods returned to suppliers with debit note settlement."
      actions={
      <Button variant="primary" icon={PlusIcon}>
          New return
        </Button>
      }
      rows={PURCHASE_RETURNS}
      rowKey={(r) => r.id}
      searchText={(r) => `${r.id} ${r.po} ${r.supplier} ${r.reason}`}
      selectable
      statusTabs={[
      { id: 'all', label: 'All returns', match: () => true },
      { id: 'pending', label: 'Pending approval', match: (r) => r.status === 'Pending Approval' },
      { id: 'approved', label: 'Approved', match: (r) => r.status === 'Approved' }]
      }
      filters={[
      { id: 'status', label: 'Status', options: [...new Set(PURCHASE_RETURNS.map((r) => r.status))] },
      { id: 'supplier', label: 'Supplier', options: [...new Set(PURCHASE_RETURNS.map((r) => r.supplier))] }]
      }
      filterValue={(r, id) => id === 'status' ? r.status : r.supplier}
      rowActions={() => [{ label: 'View return' }, { label: 'Issue debit note' }, { label: 'Cancel', danger: true }]}
      columns={[
      { key: 'id', header: 'Return', render: (r) => <span className="font-mono text-xs text-brand-700">{r.id}</span>, sortValue: (r) => r.id },
      { key: 'po', header: 'PO number', render: (r) => <RecordLink to={`/procurement/orders/${r.po}`}>{r.po}</RecordLink> },
      { key: 'supplier', header: 'Supplier', render: (r) => <span className="font-medium text-slate-900">{r.supplier}</span>, sortValue: (r) => r.supplier },
      { key: 'date', header: 'Date', render: (r) => shortDate(r.date), sortValue: (r) => r.date },
      { key: 'reason', header: 'Reason', render: (r) => <span className="text-slate-600">{r.reason}</span> },
      { key: 'qty', header: 'Qty', align: 'right', render: (r) => r.qty },
      { key: 'amount', header: 'Debit value', align: 'right', render: (r) => currency(r.amount), sortValue: (r) => r.amount },
      { key: 'debitNote', header: 'Debit note', render: (r) => <span className="font-mono text-xs text-slate-500">{r.debitNote}</span> },
      { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} />, sortValue: (r) => r.status }]
      } />);


}