import React from 'react';
import { MailIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { KpiCard } from '../../components/patterns/KpiCard';
import { AR_INVOICES } from '../../data/sales';
import { currency, shortDate } from '../../utils/format';
import type { Invoice } from '../../types/erp';

function bucket(due: string): string {
  const days = Math.floor((new Date('2026-09-02').getTime() - new Date(due).getTime()) / 86400000);
  if (days <= 0) return 'Current';
  if (days <= 30) return '1–30 days';
  if (days <= 60) return '31–60 days';
  if (days <= 90) return '61–90 days';
  return '90+ days';
}

export function AccountsReceivable() {
  const open = AR_INVOICES.filter((i) => i.balance > 0);

  return (
    <ListPage<Invoice>
      title="Accounts Receivable"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Finance & Accounting' }, { label: 'Accounts Receivable' }]}
      description="Open customer balances with ageing bucket and collection status."
      actions={
      <Button variant="primary" icon={MailIcon}>
          Send statements
        </Button>
      }
      summary={
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="Total receivable" value={currency(open.reduce((s, i) => s + i.balance, 0), { compact: true })} delta={4.1} invertDelta emphasis />
          <KpiCard label="Overdue" value={currency(open.filter((i) => i.status === 'Overdue').reduce((s, i) => s + i.balance, 0), { compact: true })} delta={12.4} invertDelta />
          <KpiCard label="Open invoices" value={String(open.length)} />
          <KpiCard label="DSO" value="38 days" delta={-3.2} invertDelta hint="Target 30 days" />
        </div>
      }
      rows={open}
      rowKey={(i) => i.id}
      searchText={(i) => `${i.id} ${i.party} ${i.reference}`}
      selectable
      bulkActions={[{ label: 'Send reminder', icon: MailIcon }, { label: 'Write off', danger: true }]}
      statusTabs={[
      { id: 'all', label: 'All open', match: () => true },
      { id: 'current', label: 'Current', match: (i) => bucket(i.due) === 'Current' },
      { id: 'overdue', label: 'Overdue', match: (i) => i.status === 'Overdue' },
      { id: 'old', label: '60+ days', match: (i) => ['61–90 days', '90+ days'].includes(bucket(i.due)) }]
      }
      filters={[
      { id: 'party', label: 'Customer', options: [...new Set(open.map((i) => i.party))] },
      { id: 'bucket', label: 'Ageing', options: ['Current', '1–30 days', '31–60 days', '61–90 days', '90+ days'] }]
      }
      filterValue={(i, id) => id === 'party' ? i.party : bucket(i.due)}
      rowActions={() => [{ label: 'View invoice' }, { label: 'Record receipt' }, { label: 'Send reminder', icon: MailIcon }, { label: 'Write off balance', danger: true }]}
      columns={[
      { key: 'id', header: 'Invoice', render: (i) => <span className="font-mono text-xs text-brand-700">{i.id}</span>, sortValue: (i) => i.id },
      { key: 'party', header: 'Customer', render: (i) => <span className="font-medium text-slate-900">{i.party}</span>, sortValue: (i) => i.party },
      { key: 'reference', header: 'Source', render: (i) => <span className="font-mono text-xs text-slate-500">{i.reference}</span> },
      { key: 'issued', header: 'Issued', render: (i) => shortDate(i.issued), optional: true },
      { key: 'due', header: 'Due', render: (i) => shortDate(i.due), sortValue: (i) => i.due },
      { key: 'bucket', header: 'Ageing', render: (i) => bucket(i.due) },
      { key: 'amount', header: 'Invoice value', align: 'right', render: (i) => currency(i.amount), sortValue: (i) => i.amount },
      { key: 'balance', header: 'Balance', align: 'right', render: (i) => <span className="font-semibold text-slate-900">{currency(i.balance)}</span>, sortValue: (i) => i.balance },
      { key: 'status', header: 'Status', render: (i) => <StatusBadge status={i.status} /> }]
      }
      totalsRow={(rows) =>
      <>
          <td className="px-3 py-2 text-xs uppercase tracking-wide text-slate-500" colSpan={6}>
            {rows.length} open invoices
          </td>
          <td className="px-3 py-2 text-right tnum">{currency(rows.reduce((s, i) => s + i.amount, 0))}</td>
          <td className="px-3 py-2 text-right tnum">{currency(rows.reduce((s, i) => s + i.balance, 0))}</td>
          <td />
        </>
      } />);


}