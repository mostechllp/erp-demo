import React from 'react';
import { ArrowLeftRightIcon, ScaleIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { STOCK } from '../../data/inventory';
import { currency, number } from '../../utils/format';
import type { StockRow } from '../../types/erp';

function stockStatus(s: StockRow): string {
  if (s.available === 0) return 'Out of Stock';
  if (s.available <= s.reorderLevel) return 'Low Stock';
  return 'Active';
}

export function Stock() {
  return (
    <ListPage<StockRow>
      title="Stock"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Inventory & Store' }, { label: 'Stock' }]}
      description="On-hand, reserved and available quantity by item, location and bin."
      actions={
      <>
          <Button icon={ScaleIcon}>Start count</Button>
          <Button variant="primary" icon={ArrowLeftRightIcon}>
            New transfer
          </Button>
        </>
      }
      rows={STOCK}
      rowKey={(s) => `${s.sku}-${s.warehouse}`}
      searchText={(s) => `${s.sku} ${s.name} ${s.warehouse} ${s.bin}`}
      selectable
      dense
      statusTabs={[
      { id: 'all', label: 'All stock', match: () => true },
      { id: 'low', label: 'Low stock', match: (s) => s.available > 0 && s.available <= s.reorderLevel },
      { id: 'out', label: 'Out of stock', match: (s) => s.available === 0 },
      { id: 'reserved', label: 'With reservations', match: (s) => s.reserved > 0 },
      { id: 'incoming', label: 'Incoming', match: (s) => s.incoming > 0 }]
      }
      filters={[
      { id: 'warehouse', label: 'Warehouse', options: [...new Set(STOCK.map((s) => s.warehouse))] },
      { id: 'status', label: 'Status', options: ['Active', 'Low Stock', 'Out of Stock'] }]
      }
      filterValue={(s, id) => id === 'warehouse' ? s.warehouse : stockStatus(s)}
      rowActions={() => [
      { label: 'Movement history' },
      { label: 'Transfer stock', icon: ArrowLeftRightIcon },
      { label: 'Adjust quantity', icon: ScaleIcon },
      { label: 'Block bin', danger: true, separatorBefore: true }]
      }
      columns={[
      { key: 'sku', header: 'SKU', render: (s) => <span className="font-mono text-xs text-brand-700">{s.sku}</span>, sortValue: (s) => s.sku },
      { key: 'name', header: 'Item', render: (s) => <span className="font-medium text-slate-900">{s.name}</span>, sortValue: (s) => s.name },
      { key: 'warehouse', header: 'Warehouse', render: (s) => s.warehouse },
      { key: 'bin', header: 'Bin', render: (s) => <span className="font-mono text-xs text-slate-500">{s.bin}</span>, optional: true },
      { key: 'onHand', header: 'On hand', align: 'right', render: (s) => number(s.onHand), sortValue: (s) => s.onHand },
      { key: 'reserved', header: 'Reserved', align: 'right', render: (s) => number(s.reserved), sortValue: (s) => s.reserved },
      {
        key: 'available',
        header: 'Available',
        align: 'right',
        sortValue: (s) => s.available,
        render: (s) =>
        <span className={s.available === 0 ? 'font-semibold text-red-600' : s.available <= s.reorderLevel ? 'font-semibold text-amber-600' : 'font-medium'}>
              {number(s.available)}
            </span>

      },
      { key: 'incoming', header: 'Incoming', align: 'right', render: (s) => s.incoming ? number(s.incoming) : <span className="text-slate-400">—</span> },
      { key: 'value', header: 'Stock value', align: 'right', render: (s) => currency(s.value), sortValue: (s) => s.value },
      { key: 'status', header: 'Status', render: (s) => <StatusBadge status={stockStatus(s)} /> }]
      }
      totalsRow={(rows) =>
      <>
          <td className="px-3 py-2 text-xs uppercase tracking-wide text-slate-500" colSpan={4}>
            {rows.length} stock lines
          </td>
          <td className="px-3 py-2 text-right tnum">{number(rows.reduce((s, r) => s + r.onHand, 0))}</td>
          <td className="px-3 py-2 text-right tnum">{number(rows.reduce((s, r) => s + r.reserved, 0))}</td>
          <td className="px-3 py-2 text-right tnum">{number(rows.reduce((s, r) => s + r.available, 0))}</td>
          <td className="px-3 py-2 text-right tnum">{number(rows.reduce((s, r) => s + r.incoming, 0))}</td>
          <td className="px-3 py-2 text-right tnum">{currency(rows.reduce((s, r) => s + r.value, 0))}</td>
          <td />
        </>
      } />);


}