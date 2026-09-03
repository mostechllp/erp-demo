import React from 'react';
import { WalletIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { KpiCard } from '../../components/patterns/KpiCard';
import { RecordLink } from '../../components/patterns/RecordLink';
import { AP_INVOICES } from '../../data/procurement';
import { currency, shortDate } from '../../utils/format';
import type { Invoice } from '../../types/erp';

export function AccountsPayable() {
  const open = AP_INVOICES.filter((i) => i.balance > 0);

  return (
    <ListPage<Invoice>
      title="Accounts Payable"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Finance & Accounting' }, { label: 'Accounts Payable' }]}
      description="Approved supplier invoices scheduled into the payment run."
      actions={
      <Button variant="primary" icon={WalletIcon}>
          Create payment run
        </Button>
      }
      summary={
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="Total payable" value={currency(open.reduce((s, i) => s + i.balance, 0), { compact: true })} delta={-2.8} invertDelta emphasis />
          <KpiCard label="Due this week" value={currency(34000)} hint="2 invoices" />
          <KpiCard label="Overdue" value={currency(12400)} invertDelta hint="Polymer Seals Iberia" />
          <KpiCard label="DPO" value="46 days" delta={2.1} hint="Terms average Net 40" />
        </div>
      }
      rows={open}
      rowKey={(i) => i.id}
      searchText={(i) => `${i.id} ${i.party} ${i.reference}`}
      selectable
      bulkActions={[{ label: 'Schedule payment', icon: WalletIcon }, { label: 'Hold payment', danger: true }]}
      statusTabs={[
      { id: 'all', label: 'All open', match: () => true },
      { id: 'pending', label: 'Pending approval', match: (i) => i.status === 'Pending Approval' },
      { id: 'approved', label: 'Approved to pay', match: (i) => i.status === 'Approved' },
      { id: 'overdue', label: 'Overdue', match: (i) => i.status === 'Overdue' }]
      }
      filters={[
      { id: 'party', label: 'Supplier', options: [...new Set(open.map((i) => i.party))] },
      { id: 'status', label: 'Status', options: [...new Set(open.map((i) => i.status))] }]
      }
      filterValue={(i, id) => id === 'party' ? i.party : i.status}
      rowActions={() => [{ label: 'View invoice' }, { label: 'Schedule payment', icon: WalletIcon }, { label: 'Hold', danger: true }]}
      columns={[
      { key: 'id', header: 'Invoice', render: (i) => <span className="font-mono text-xs text-brand-700">{i.id}</span>, sortValue: (i) => i.id },
      { key: 'party', header: 'Supplier', render: (i) => <span className="font-medium text-slate-900">{i.party}</span>, sortValue: (i) => i.party },
      { key: 'reference', header: 'Against PO', render: (i) => <RecordLink to={`/procurement/orders/${i.reference}`}>{i.reference}</RecordLink> },
      { key: 'issued', header: 'Invoice date', render: (i) => shortDate(i.issued), optional: true },
      { key: 'due', header: 'Due', render: (i) => shortDate(i.due), sortValue: (i) => i.due },
      { key: 'amount', header: 'Invoice value', align: 'right', render: (i) => currency(i.amount), sortValue: (i) => i.amount },
      { key: 'balance', header: 'Balance', align: 'right', render: (i) => <span className="font-semibold text-slate-900">{currency(i.balance)}</span>, sortValue: (i) => i.balance },
      { key: 'status', header: 'Status', render: (i) => <StatusBadge status={i.status} /> }]
      }
      totalsRow={(rows) =>
      <>
          <td className="px-3 py-2 text-xs uppercase tracking-wide text-slate-500" colSpan={5}>
            {rows.length} open invoices
          </td>
          <td className="px-3 py-2 text-right tnum">{currency(rows.reduce((s, i) => s + i.amount, 0))}</td>
          <td className="px-3 py-2 text-right tnum">{currency(rows.reduce((s, i) => s + i.balance, 0))}</td>
          <td />
        </>
      } />);


}