import React from 'react';
import { PlusIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { PAYMENTS } from '../../data/finance';
import { currency, shortDate } from '../../utils/format';

type Row = (typeof PAYMENTS)[number];

export function Payments() {
  return (
    <ListPage<Row>
      title="Payments"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Finance & Accounting' }, { label: 'Payments' }]}
      description="Customer receipts and supplier payments with bank allocation and reconciliation status."
      actions={
      <Button variant="primary" icon={PlusIcon}>
          New payment
        </Button>
      }
      rows={PAYMENTS}
      rowKey={(p) => p.id}
      searchText={(p) => `${p.id} ${p.party} ${p.reference} ${p.method} ${p.account}`}
      selectable
      statusTabs={[
      { id: 'all', label: 'All', match: () => true },
      { id: 'receipts', label: 'Receipts', match: (p) => p.kind === 'Receipt' },
      { id: 'payments', label: 'Payments', match: (p) => p.kind === 'Payment' },
      { id: 'pending', label: 'Pending approval', match: (p) => p.status === 'Pending Approval' }]
      }
      filters={[
      { id: 'kind', label: 'Direction', options: ['Receipt', 'Payment'] },
      { id: 'method', label: 'Method', options: [...new Set(PAYMENTS.map((p) => p.method))] },
      { id: 'account', label: 'Bank account', options: [...new Set(PAYMENTS.map((p) => p.account))] }]
      }
      filterValue={(p, id) => id === 'kind' ? p.kind : id === 'method' ? p.method : p.account}
      rowActions={() => [{ label: 'View payment' }, { label: 'Reconcile' }, { label: 'Void payment', danger: true }]}
      columns={[
      { key: 'id', header: 'Payment', render: (p) => <span className="font-mono text-xs text-brand-700">{p.id}</span>, sortValue: (p) => p.id },
      { key: 'date', header: 'Date', render: (p) => shortDate(p.date), sortValue: (p) => p.date },
      { key: 'party', header: 'Party', render: (p) => <span className="font-medium text-slate-900">{p.party}</span>, sortValue: (p) => p.party },
      { key: 'kind', header: 'Direction', render: (p) => <Badge tone={p.kind === 'Receipt' ? 'success' : 'warning'}>{p.kind}</Badge> },
      { key: 'method', header: 'Method', render: (p) => p.method },
      { key: 'reference', header: 'Against', render: (p) => <span className="font-mono text-xs text-slate-500">{p.reference}</span> },
      { key: 'account', header: 'Bank account', render: (p) => p.account, optional: true },
      {
        key: 'amount',
        header: 'Amount',
        align: 'right',
        sortValue: (p) => p.amount,
        render: (p) => <span className={p.kind === 'Receipt' ? 'font-medium text-emerald-700' : 'font-medium text-slate-900'}>{currency(p.amount)}</span>
      },
      { key: 'status', header: 'Status', render: (p) => <StatusBadge status={p.status} />, sortValue: (p) => p.status }]
      } />);


}