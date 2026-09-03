import React from 'react';
import { CheckIcon, PlusIcon, WalletIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { RecordLink } from '../../components/patterns/RecordLink';
import { KpiCard } from '../../components/patterns/KpiCard';
import { AP_INVOICES } from '../../data/procurement';
import { currency, shortDate } from '../../utils/format';
import type { Invoice } from '../../types/erp';

export function SupplierInvoices() {
  const open = AP_INVOICES.reduce((s, i) => s + i.balance, 0);

  return (
    <ListPage<Invoice>
      title="Supplier Invoices"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Procurement' }, { label: 'Supplier Invoices' }]}
      description="Vendor invoices matched to purchase orders and goods receipts before payment."
      actions={
      <>
          <Button icon={CheckIcon}>Approve selected</Button>
          <Button variant="primary" icon={PlusIcon}>
            Register invoice
          </Button>
        </>
      }
      summary={
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="Open payables" value={currency(open, { compact: true })} delta={-2.8} invertDelta />
          <KpiCard label="Awaiting approval" value={String(AP_INVOICES.filter((i) => i.status === 'Pending Approval').length)} hint="Blocking payment run" />
          <KpiCard label="Overdue to suppliers" value={currency(12400)} delta={0} invertDelta hint="1 invoice" />
          <KpiCard label="Match exceptions" value="2" hint="Quantity and price variance" />
        </div>
      }
      rows={AP_INVOICES}
      rowKey={(i) => i.id}
      searchText={(i) => `${i.id} ${i.party} ${i.reference} ${i.status}`}
      selectable
      bulkActions={[{ label: 'Approve', icon: CheckIcon }, { label: 'Schedule payment', icon: WalletIcon }, { label: 'Dispute', danger: true }]}
      statusTabs={[
      { id: 'all', label: 'All', match: () => true },
      { id: 'pending', label: 'Pending approval', match: (i) => i.status === 'Pending Approval' },
      { id: 'approved', label: 'Approved to pay', match: (i) => i.status === 'Approved' },
      { id: 'overdue', label: 'Overdue', match: (i) => i.status === 'Overdue' },
      { id: 'paid', label: 'Paid', match: (i) => i.status === 'Paid' }]
      }
      filters={[
      { id: 'status', label: 'Status', options: [...new Set(AP_INVOICES.map((i) => i.status))] },
      { id: 'party', label: 'Supplier', options: [...new Set(AP_INVOICES.map((i) => i.party))] }]
      }
      filterValue={(i, id) => id === 'status' ? i.status : i.party}
      rowActions={(i) => [
      { label: 'View invoice' },
      { label: 'Approve', icon: CheckIcon, disabled: i.status !== 'Pending Approval' },
      { label: 'Schedule payment', icon: WalletIcon },
      { label: 'Raise dispute', danger: true, separatorBefore: true }]
      }
      columns={[
      { key: 'id', header: 'Invoice', render: (i) => <span className="font-mono text-xs text-brand-700">{i.id}</span>, sortValue: (i) => i.id },
      { key: 'party', header: 'Supplier', render: (i) => <span className="font-medium text-slate-900">{i.party}</span>, sortValue: (i) => i.party },
      { key: 'reference', header: 'Against PO', render: (i) => <RecordLink to={`/procurement/orders/${i.reference}`}>{i.reference}</RecordLink> },
      { key: 'issued', header: 'Invoice date', render: (i) => shortDate(i.issued), sortValue: (i) => i.issued },
      { key: 'due', header: 'Due', render: (i) => shortDate(i.due), sortValue: (i) => i.due },
      { key: 'amount', header: 'Amount', align: 'right', render: (i) => currency(i.amount), sortValue: (i) => i.amount },
      { key: 'balance', header: 'Balance', align: 'right', render: (i) => <span className={i.balance > 0 ? 'font-semibold text-slate-900' : 'text-emerald-700'}>{currency(i.balance)}</span>, sortValue: (i) => i.balance },
      { key: 'status', header: 'Status', render: (i) => <StatusBadge status={i.status} />, sortValue: (i) => i.status }]
      }
      totalsRow={(rows) =>
      <>
          <td className="px-3 py-2 text-xs uppercase tracking-wide text-slate-500" colSpan={5}>
            {rows.length} invoices
          </td>
          <td className="px-3 py-2 text-right tnum">{currency(rows.reduce((s, i) => s + i.amount, 0))}</td>
          <td className="px-3 py-2 text-right tnum">{currency(rows.reduce((s, i) => s + i.balance, 0))}</td>
          <td />
        </>
      } />);


}