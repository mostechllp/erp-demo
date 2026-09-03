import React from 'react';
import { CheckIcon, PlusIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { KpiCard } from '../../components/patterns/KpiCard';
import { EXPENSES } from '../../data/finance';
import { currency, shortDate } from '../../utils/format';

type Row = (typeof EXPENSES)[number];

export function Expenses() {
  return (
    <ListPage<Row>
      title="Expenses"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Finance & Accounting' }, { label: 'Expenses' }]}
      description="Employee and departmental expense claims. Anything above $500 requires approval."
      actions={
      <>
          <Button icon={CheckIcon}>Approve selected</Button>
          <Button variant="primary" icon={PlusIcon}>
            New expense
          </Button>
        </>
      }
      summary={
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="Claimed this period" value={currency(EXPENSES.reduce((s, e) => s + e.amount, 0), { compact: true })} delta={5.4} invertDelta />
          <KpiCard label="Pending approval" value={String(EXPENSES.filter((e) => e.status === 'Pending Approval').length)} />
          <KpiCard label="Approved" value={currency(EXPENSES.filter((e) => e.status === 'Approved').reduce((s, e) => s + e.amount, 0), { compact: true })} />
          <KpiCard label="Rejected" value={String(EXPENSES.filter((e) => e.status === 'Rejected').length)} />
        </div>
      }
      rows={EXPENSES}
      rowKey={(e) => e.id}
      searchText={(e) => `${e.id} ${e.category} ${e.description} ${e.employee} ${e.costCenter}`}
      selectable
      bulkActions={[{ label: 'Approve', icon: CheckIcon }, { label: 'Reject', danger: true }]}
      statusTabs={[
      { id: 'all', label: 'All expenses', match: () => true },
      { id: 'draft', label: 'Draft', match: (e) => e.status === 'Draft' },
      { id: 'pending', label: 'Pending approval', match: (e) => e.status === 'Pending Approval' },
      { id: 'approved', label: 'Approved', match: (e) => e.status === 'Approved' },
      { id: 'rejected', label: 'Rejected', match: (e) => e.status === 'Rejected' }]
      }
      filters={[
      { id: 'category', label: 'Category', options: [...new Set(EXPENSES.map((e) => e.category))] },
      { id: 'costCenter', label: 'Cost centre', options: [...new Set(EXPENSES.map((e) => e.costCenter))] },
      { id: 'employee', label: 'Submitted by', options: [...new Set(EXPENSES.map((e) => e.employee))] }]
      }
      filterValue={(e, id) => id === 'category' ? e.category : id === 'costCenter' ? e.costCenter : e.employee}
      rowActions={(e) => [
      { label: 'View expense' },
      { label: 'Approve', icon: CheckIcon, disabled: e.status !== 'Pending Approval' },
      { label: 'Reject', danger: true, disabled: e.status !== 'Pending Approval' }]
      }
      columns={[
      { key: 'id', header: 'Expense', render: (e) => <span className="font-mono text-xs text-brand-700">{e.id}</span>, sortValue: (e) => e.id },
      { key: 'date', header: 'Date', render: (e) => shortDate(e.date), sortValue: (e) => e.date },
      { key: 'category', header: 'Category', render: (e) => e.category, sortValue: (e) => e.category },
      { key: 'description', header: 'Description', render: (e) => <span className="font-medium text-slate-900">{e.description}</span> },
      { key: 'employee', header: 'Submitted by', render: (e) => e.employee },
      { key: 'costCenter', header: 'Cost centre', render: (e) => e.costCenter, optional: true },
      { key: 'amount', header: 'Amount', align: 'right', render: (e) => currency(e.amount), sortValue: (e) => e.amount },
      { key: 'status', header: 'Status', render: (e) => <StatusBadge status={e.status} />, sortValue: (e) => e.status }]
      }
      totalsRow={(rows) =>
      <>
          <td className="px-3 py-2 text-xs uppercase tracking-wide text-slate-500" colSpan={6}>
            {rows.length} claims
          </td>
          <td className="px-3 py-2 text-right tnum">{currency(rows.reduce((s, e) => s + e.amount, 0))}</td>
          <td />
        </>
      } />);


}