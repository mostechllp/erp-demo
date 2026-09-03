import React from 'react';
import { ShoppingCartIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { KpiCard } from '../../components/patterns/KpiCard';
import { STOCK } from '../../data/inventory';
import { currency, number } from '../../utils/format';
import type { StockRow } from '../../types/erp';

interface ReorderRow extends StockRow {
  suggested: number;
  cover: string;
  status: string;
}

const ROWS: ReorderRow[] = STOCK.filter((s) => s.reorderLevel > 0 && s.available <= s.reorderLevel).map((s) => {
  const suggested = Math.max(s.reorderLevel * 2 - s.available - s.incoming, 0);
  return {
    ...s,
    suggested,
    cover: s.available === 0 ? '0 days' : `${Math.round(s.available / Math.max(s.reorderLevel / 10, 1) * 1.4)} days`,
    status: s.available === 0 ? 'Out of Stock' : 'Low Stock'
  };
});

export function Reorder() {
  return (
    <ListPage<ReorderRow>
      title="Reorder Management"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Inventory & Store' }, { label: 'Reorder Management' }]}
      description="Items at or below reorder level with suggested replenishment quantities."
      actions={
      <Button variant="primary" icon={ShoppingCartIcon}>
          Raise purchase requests
        </Button>
      }
      summary={
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="Items below reorder" value={String(ROWS.length)} delta={18.4} invertDelta />
          <KpiCard label="Out of stock" value={String(ROWS.filter((r) => r.available === 0).length)} hint="Blocking 2 work orders" />
          <KpiCard label="Suggested order value" value={currency(ROWS.reduce((s, r) => s + r.suggested * 420, 0), { compact: true })} hint="At last purchase price" />
          <KpiCard label="Already on order" value={number(ROWS.reduce((s, r) => s + r.incoming, 0))} hint="Units inbound" />
        </div>
      }
      rows={ROWS}
      rowKey={(r) => `${r.sku}-${r.warehouse}`}
      searchText={(r) => `${r.sku} ${r.name} ${r.warehouse}`}
      selectable
      bulkActions={[{ label: 'Create purchase request', icon: ShoppingCartIcon }, { label: 'Snooze alert' }]}
      statusTabs={[
      { id: 'all', label: 'All', match: () => true },
      { id: 'out', label: 'Out of stock', match: (r) => r.available === 0 },
      { id: 'low', label: 'Low stock', match: (r) => r.available > 0 },
      { id: 'noorder', label: 'Nothing on order', match: (r) => r.incoming === 0 }]
      }
      filters={[{ id: 'warehouse', label: 'Warehouse', options: [...new Set(ROWS.map((r) => r.warehouse))] }]}
      filterValue={(r) => r.warehouse}
      rowActions={() => [{ label: 'Create purchase request', icon: ShoppingCartIcon }, { label: 'View item card' }, { label: 'Adjust reorder level' }]}
      columns={[
      { key: 'sku', header: 'SKU', render: (r) => <span className="font-mono text-xs text-brand-700">{r.sku}</span>, sortValue: (r) => r.sku },
      { key: 'name', header: 'Item', render: (r) => <span className="font-medium text-slate-900">{r.name}</span>, sortValue: (r) => r.name },
      { key: 'warehouse', header: 'Warehouse', render: (r) => r.warehouse },
      {
        key: 'available',
        header: 'Available',
        align: 'right',
        sortValue: (r) => r.available,
        render: (r) => <span className={r.available === 0 ? 'font-semibold text-red-600' : 'font-semibold text-amber-600'}>{number(r.available)}</span>
      },
      { key: 'reorderLevel', header: 'Reorder level', align: 'right', render: (r) => number(r.reorderLevel) },
      { key: 'incoming', header: 'On order', align: 'right', render: (r) => r.incoming ? number(r.incoming) : <span className="text-slate-400">—</span> },
      { key: 'suggested', header: 'Suggested qty', align: 'right', render: (r) => <span className="font-semibold text-brand-800">{number(r.suggested)}</span>, sortValue: (r) => r.suggested },
      { key: 'cover', header: 'Stock cover', render: (r) => r.cover },
      { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> }]
      } />);


}