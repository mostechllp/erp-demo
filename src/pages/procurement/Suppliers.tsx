import React from 'react';
import { PlusIcon, StarIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Progress } from '../../components/ui/Progress';
import { SUPPLIERS } from '../../data/procurement';
import { currency } from '../../utils/format';
import type { Supplier } from '../../types/erp';

export function Suppliers() {
  return (
    <ListPage<Supplier>
      title="Suppliers"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Procurement' }, { label: 'Suppliers' }]}
      description="Approved vendor master shared by procurement, inventory and finance."
      actions={
      <Button variant="primary" icon={PlusIcon}>
          New supplier
        </Button>
      }
      rows={SUPPLIERS}
      rowKey={(s) => s.id}
      searchText={(s) => `${s.id} ${s.name} ${s.category} ${s.contact} ${s.email}`}
      selectable
      statusTabs={[
      { id: 'all', label: 'All suppliers', match: () => true },
      { id: 'active', label: 'Active', match: (s) => s.status === 'Active' },
      { id: 'hold', label: 'On hold', match: (s) => s.status === 'On Hold' },
      { id: 'risk', label: 'Delivery risk', match: (s) => s.onTimePct < 90 }]
      }
      filters={[
      { id: 'status', label: 'Status', options: ['Active', 'On Hold', 'Inactive'] },
      { id: 'category', label: 'Category', options: [...new Set(SUPPLIERS.map((s) => s.category))] },
      { id: 'terms', label: 'Terms', options: [...new Set(SUPPLIERS.map((s) => s.terms))] }]
      }
      filterValue={(s, id) => id === 'status' ? s.status : id === 'category' ? s.category : s.terms}
      rowActions={() => [
      { label: 'View supplier' },
      { label: 'New purchase order' },
      { label: 'Performance report' },
      { label: 'Place on hold', danger: true, separatorBefore: true }]
      }
      columns={[
      { key: 'id', header: 'Supplier ID', render: (s) => <span className="font-mono text-xs text-brand-700">{s.id}</span>, sortValue: (s) => s.id },
      {
        key: 'name',
        header: 'Supplier',
        render: (s) =>
        <div>
              <p className="font-medium text-slate-900">{s.name}</p>
              <p className="text-xs text-slate-500">{s.category}</p>
            </div>,

        sortValue: (s) => s.name
      },
      { key: 'contact', header: 'Contact', render: (s) => s.contact, optional: true },
      { key: 'email', header: 'Email', render: (s) => <span className="text-slate-600">{s.email}</span>, optional: true },
      { key: 'terms', header: 'Payment terms', render: (s) => s.terms },
      {
        key: 'rating',
        header: 'Rating',
        align: 'right',
        sortValue: (s) => s.rating,
        render: (s) =>
        <span className="inline-flex items-center gap-1 tnum">
              <StarIcon className="h-3 w-3 fill-amber-400 text-amber-400" />
              {s.rating.toFixed(1)}
            </span>

      },
      {
        key: 'onTime',
        header: 'On-time delivery',
        width: '150px',
        sortValue: (s) => s.onTimePct,
        render: (s) =>
        <Progress
          value={s.onTimePct}
          tone={s.onTimePct >= 95 ? 'success' : s.onTimePct >= 88 ? 'warning' : 'danger'}
          showValue
          label={`${s.name} on-time delivery`} />


      },
      { key: 'payable', header: 'Payable', align: 'right', render: (s) => currency(s.payable), sortValue: (s) => s.payable },
      { key: 'status', header: 'Status', render: (s) => <StatusBadge status={s.status} />, sortValue: (s) => s.status }]
      }
      totalsRow={(rows) =>
      <>
          <td className="px-3 py-2 text-xs uppercase tracking-wide text-slate-500" colSpan={7}>
            {rows.length} suppliers
          </td>
          <td className="px-3 py-2 text-right tnum">{currency(rows.reduce((s, x) => s + x.payable, 0))}</td>
          <td />
        </>
      } />);


}