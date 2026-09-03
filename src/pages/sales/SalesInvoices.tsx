import React from 'react';
import { DownloadIcon, PlusIcon, SendIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { KpiCard } from '../../components/patterns/KpiCard';
import { AR_INVOICES } from '../../data/sales';
import { currency, shortDate } from '../../utils/format';
import type { Invoice } from '../../types/erp';

export function SalesInvoices() {
  const total = AR_INVOICES.reduce((s, i) => s + i.amount, 0);
  const openBalance = AR_INVOICES.reduce((s, i) => s + i.balance, 0);
  const overdue = AR_INVOICES.filter((i) => i.status === 'Overdue').reduce((s, i) => s + i.balance, 0);

  return (
    <ListPage<Invoice>
      title="Customer Invoices"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Sales & CRM' }, { label: 'Invoices' }]}
      description="Sales invoices posted to accounts receivable and the general ledger."
      actions={
      <>
          <Button icon={SendIcon}>Send reminders</Button>
          <Button variant="primary" icon={PlusIcon}>
            New invoice
          </Button>
        </>
      }
      summary={
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="Invoiced this period" value={currency(total, { compact: true })} delta={7.8} />
          <KpiCard label="Open balance" value={currency(openBalance, { compact: true })} delta={4.1} invertDelta />
          <KpiCard label="Overdue" value={currency(overdue, { compact: true })} delta={12.4} invertDelta hint="3 invoices past due" />
          <KpiCard label="Average days to pay" value="38 days" delta={-3.2} invertDelta hint="Target 30 days" />
        </div>
      }
      rows={AR_INVOICES}
      rowKey={(i) => i.id}
      searchText={(i) => `${i.id} ${i.party} ${i.reference} ${i.status}`}
      selectable
      bulkActions={[{ label: 'Send by email', icon: SendIcon }, { label: 'Download PDF', icon: DownloadIcon }, { label: 'Void invoices', danger: true }]}
      statusTabs={[
      { id: 'all', label: 'All', match: () => true },
      { id: 'open', label: 'Open', match: (i) => i.balance > 0 },
      { id: 'overdue', label: 'Overdue', match: (i) => i.status === 'Overdue' },
      { id: 'paid', label: 'Paid', match: (i) => i.status === 'Paid' }]
      }
      filters={[
      { id: 'status', label: 'Status', options: [...new Set(AR_INVOICES.map((i) => i.status))] },
      { id: 'party', label: 'Customer', options: [...new Set(AR_INVOICES.map((i) => i.party))] }]
      }
      filterValue={(i, id) => id === 'status' ? i.status : i.party}
      rowActions={() => [
      { label: 'View invoice' },
      { label: 'Record payment' },
      { label: 'Send reminder', icon: SendIcon },
      { label: 'Download PDF', icon: DownloadIcon },
      { label: 'Create credit note', danger: true, separatorBefore: true }]
      }
      columns={[
      { key: 'id', header: 'Invoice', render: (i) => <span className="font-mono text-xs text-brand-700">{i.id}</span>, sortValue: (i) => i.id },
      { key: 'party', header: 'Customer', render: (i) => <span className="font-medium text-slate-900">{i.party}</span>, sortValue: (i) => i.party },
      { key: 'reference', header: 'Source order', render: (i) => <span className="font-mono text-xs text-slate-500">{i.reference}</span> },
      { key: 'issued', header: 'Issued', render: (i) => shortDate(i.issued), sortValue: (i) => i.issued },
      { key: 'due', header: 'Due', render: (i) => shortDate(i.due), sortValue: (i) => i.due },
      { key: 'amount', header: 'Amount', align: 'right', render: (i) => currency(i.amount), sortValue: (i) => i.amount },
      {
        key: 'balance',
        header: 'Balance',
        align: 'right',
        render: (i) => <span className={i.balance > 0 ? 'font-semibold text-red-600' : 'text-emerald-700'}>{currency(i.balance)}</span>,
        sortValue: (i) => i.balance
      },
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