import React from 'react';
import { PlusIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { CHART_OF_ACCOUNTS } from '../../data/finance';
import { currency } from '../../utils/format';
import type { Tone } from '../../types/erp';

type Row = (typeof CHART_OF_ACCOUNTS)[number];

const TYPE_TONE: Record<string, Tone> = {
  Asset: 'brand',
  Liability: 'warning',
  Equity: 'info',
  Revenue: 'success',
  Expense: 'danger'
};

export function ChartOfAccounts() {
  return (
    <ListPage<Row>
      title="Chart of Accounts"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Finance & Accounting' }, { label: 'Chart of Accounts' }]}
      description="Ledger structure used by every module posting into finance."
      actions={
      <Button variant="primary" icon={PlusIcon}>
          New account
        </Button>
      }
      rows={CHART_OF_ACCOUNTS}
      rowKey={(a) => a.code}
      searchText={(a) => `${a.code} ${a.name} ${a.type} ${a.group}`}
      dense
      statusTabs={[
      { id: 'all', label: 'All accounts', match: () => true },
      { id: 'asset', label: 'Assets', match: (a) => a.type === 'Asset' },
      { id: 'liability', label: 'Liabilities', match: (a) => a.type === 'Liability' },
      { id: 'equity', label: 'Equity', match: (a) => a.type === 'Equity' },
      { id: 'revenue', label: 'Revenue', match: (a) => a.type === 'Revenue' },
      { id: 'expense', label: 'Expenses', match: (a) => a.type === 'Expense' }]
      }
      filters={[
      { id: 'type', label: 'Type', options: [...new Set(CHART_OF_ACCOUNTS.map((a) => a.type))] },
      { id: 'group', label: 'Group', options: [...new Set(CHART_OF_ACCOUNTS.map((a) => a.group))] }]
      }
      filterValue={(a, id) => id === 'type' ? a.type : a.group}
      rowActions={() => [{ label: 'View ledger' }, { label: 'Edit account' }, { label: 'Deactivate', danger: true }]}
      columns={[
      { key: 'code', header: 'Code', render: (a) => <span className="font-mono text-xs text-brand-700">{a.code}</span>, sortValue: (a) => a.code },
      { key: 'name', header: 'Account name', render: (a) => <span className="font-medium text-slate-900">{a.name}</span>, sortValue: (a) => a.name },
      { key: 'type', header: 'Type', render: (a) => <Badge tone={TYPE_TONE[a.type] ?? 'neutral'}>{a.type}</Badge>, sortValue: (a) => a.type },
      { key: 'group', header: 'Group', render: (a) => a.group },
      { key: 'balance', header: 'Balance', align: 'right', render: (a) => currency(a.balance), sortValue: (a) => a.balance },
      { key: 'status', header: 'Status', render: (a) => <StatusBadge status={a.status} /> }]
      } />);


}