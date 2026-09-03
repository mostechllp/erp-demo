import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon, EyeIcon, PackageCheckIcon, PlusIcon, SendIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { RecordLink } from '../../components/patterns/RecordLink';
import { KpiCard } from '../../components/patterns/KpiCard';
import { PURCHASE_ORDERS } from '../../data/procurement';
import { currency, shortDate } from '../../utils/format';
import type { PurchaseOrder } from '../../types/erp';

export function PurchaseOrders() {
  const navigate = useNavigate();
  const committed = PURCHASE_ORDERS.filter((o) => !['Completed', 'Draft'].includes(o.status)).reduce((s, o) => s + o.amount, 0);

  return (
    <ListPage<PurchaseOrder>
      title="Purchase Orders"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Procurement' }, { label: 'Purchase Orders' }]}
      description="Draft → Pending approval → Approved → Sent → Received → Completed."
      actions={
      <>
          <Button icon={SendIcon}>Send to supplier</Button>
          <Button variant="primary" icon={PlusIcon}>
            New purchase order
          </Button>
        </>
      }
      summary={
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="Committed spend" value={currency(committed, { compact: true })} delta={5.6} invertDelta />
          <KpiCard label="Awaiting approval" value={String(PURCHASE_ORDERS.filter((o) => o.status === 'Pending Approval').length)} hint="Blocking 2 work orders" />
          <KpiCard label="Overdue receipts" value="1" hint="PO-1024 partially received" />
          <KpiCard label="Unmatched invoices" value="2" hint="3-way match exceptions" />
        </div>
      }
      rows={PURCHASE_ORDERS}
      rowKey={(o) => o.id}
      onRowClick={(o) => navigate(`/procurement/orders/${o.id}`)}
      searchText={(o) => `${o.id} ${o.supplier} ${o.status} ${o.fromRequest ?? ''}`}
      selectable
      bulkActions={[{ label: 'Approve', icon: CheckIcon }, { label: 'Send to supplier', icon: SendIcon }, { label: 'Cancel', danger: true }]}
      statusTabs={[
      { id: 'all', label: 'All orders', match: () => true },
      { id: 'draft', label: 'Draft', match: (o) => o.status === 'Draft' },
      { id: 'approval', label: 'Pending approval', match: (o) => o.status === 'Pending Approval' },
      { id: 'open', label: 'Open with supplier', match: (o) => ['Approved', 'Sent to Supplier', 'Partially Received'].includes(o.status) },
      { id: 'received', label: 'Received', match: (o) => ['Fully Received', 'Completed'].includes(o.status) }]
      }
      filters={[
      { id: 'status', label: 'Status', options: [...new Set(PURCHASE_ORDERS.map((o) => o.status))] },
      { id: 'supplier', label: 'Supplier', options: [...new Set(PURCHASE_ORDERS.map((o) => o.supplier))] },
      { id: 'payment', label: 'Payment', options: [...new Set(PURCHASE_ORDERS.map((o) => o.paymentStatus))] },
      { id: 'receipt', label: 'Receipt', options: [...new Set(PURCHASE_ORDERS.map((o) => o.receiptStatus))] }]
      }
      filterValue={(o, id) =>
      id === 'status' ? o.status : id === 'supplier' ? o.supplier : id === 'payment' ? o.paymentStatus : o.receiptStatus
      }
      rowActions={(o) => [
      { label: 'View order', icon: EyeIcon, onSelect: () => navigate(`/procurement/orders/${o.id}`) },
      { label: 'Approve', icon: CheckIcon, disabled: o.status !== 'Pending Approval' },
      { label: 'Record goods receipt', icon: PackageCheckIcon },
      { label: 'Cancel order', danger: true, separatorBefore: true }]
      }
      columns={[
      { key: 'id', header: 'PO number', render: (o) => <RecordLink to={`/procurement/orders/${o.id}`}>{o.id}</RecordLink>, sortValue: (o) => o.id },
      { key: 'supplier', header: 'Supplier', render: (o) => <span className="font-medium text-slate-900">{o.supplier}</span>, sortValue: (o) => o.supplier },
      { key: 'fromRequest', header: 'From request', render: (o) => <span className="font-mono text-xs text-slate-500">{o.fromRequest ?? '—'}</span>, optional: true },
      { key: 'date', header: 'Order date', render: (o) => shortDate(o.date), sortValue: (o) => o.date },
      { key: 'expected', header: 'Expected', render: (o) => shortDate(o.expected), sortValue: (o) => o.expected },
      { key: 'amount', header: 'Value', align: 'right', render: (o) => currency(o.amount), sortValue: (o) => o.amount },
      { key: 'paymentStatus', header: 'Payment', render: (o) => <StatusBadge status={o.paymentStatus} /> },
      { key: 'receiptStatus', header: 'Receipt', render: (o) => <StatusBadge status={o.receiptStatus} /> },
      { key: 'status', header: 'Status', render: (o) => <StatusBadge status={o.status} />, sortValue: (o) => o.status }]
      }
      totalsRow={(rows) =>
      <>
          <td className="px-3 py-2 text-xs uppercase tracking-wide text-slate-500" colSpan={5}>
            {rows.length} purchase orders
          </td>
          <td className="px-3 py-2 text-right tnum">{currency(rows.reduce((s, o) => s + o.amount, 0))}</td>
          <td colSpan={4} />
        </>
      } />);


}