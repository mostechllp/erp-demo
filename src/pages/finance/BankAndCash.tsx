import React from 'react';
import { PlusIcon, RefreshCwIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { KpiCard } from '../../components/patterns/KpiCard';
import { BANK_ACCOUNTS } from '../../data/finance';
import { currency, shortDate } from '../../utils/format';

type Row = (typeof BANK_ACCOUNTS)[number];

export function BankAndCash() {
  const total = BANK_ACCOUNTS.reduce((s, a) => s + a.balance, 0);

  return (
    <ListPage<Row>
      title="Bank & Cash"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Finance & Accounting' }, { label: 'Bank & Cash' }]}
      description="Bank accounts, petty cash and reconciliation status by currency."
      actions={
      <>
          <Button icon={RefreshCwIcon}>Reconcile</Button>
          <Button variant="primary" icon={PlusIcon}>
            New account
          </Button>
        </>
      }
      summary={
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="Total cash position" value={currency(total, { compact: true })} delta={6.4} emphasis />
          <KpiCard label="Accounts" value={String(BANK_ACCOUNTS.length)} hint="Across 4 currencies" />
          <KpiCard label="Unreconciled items" value="12" invertDelta hint="Since 31 Aug" />
          <KpiCard label="Net movement (30d)" value={currency(570000, { compact: true })} delta={9.1} />
        </div>
      }
      rows={BANK_ACCOUNTS}
      rowKey={(a) => a.id}
      searchText={(a) => `${a.id} ${a.name} ${a.currency} ${a.iban}`}
      filters={[{ id: 'currency', label: 'Currency', options: [...new Set(BANK_ACCOUNTS.map((a) => a.currency))] }]}
      filterValue={(a) => a.currency}
      rowActions={() => [{ label: 'View transactions' }, { label: 'Reconcile account' }, { label: 'Download statement' }]}
      columns={[
      { key: 'id', header: 'Code', render: (a) => <span className="font-mono text-xs text-brand-700">{a.id}</span>, sortValue: (a) => a.id },
      { key: 'name', header: 'Account', render: (a) => <span className="font-medium text-slate-900">{a.name}</span>, sortValue: (a) => a.name },
      { key: 'currency', header: 'Currency', render: (a) => a.currency },
      { key: 'iban', header: 'IBAN', render: (a) => <span className="font-mono text-xs text-slate-500">{a.iban}</span>, optional: true },
      { key: 'balance', header: 'Balance', align: 'right', render: (a) => currency(a.balance), sortValue: (a) => a.balance },
      { key: 'lastRecon', header: 'Last reconciled', render: (a) => shortDate(a.lastRecon), sortValue: (a) => a.lastRecon },
      { key: 'status', header: 'Status', render: (a) => <StatusBadge status={a.status} /> }]
      }
      totalsRow={(rows) =>
      <>
          <td className="px-3 py-2 text-xs uppercase tracking-wide text-slate-500" colSpan={4}>
            {rows.length} accounts
          </td>
          <td className="px-3 py-2 text-right tnum">{currency(rows.reduce((s, a) => s + a.balance, 0))}</td>
          <td colSpan={2} />
        </>
      } />);


}