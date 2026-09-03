import React from 'react';
import { Badge } from '../../components/ui/Badge';
import { ListPage } from '../../components/patterns/ListPage';
import { STOCK_MOVEMENTS } from '../../data/inventory';
import { number } from '../../utils/format';
import type { StockMovement } from '../../types/erp';
import type { Tone } from '../../types/erp';

const TYPE_TONE: Record<string, Tone> = {
  'Purchase Receipt': 'success',
  'Sales Issue': 'info',
  Transfer: 'brand',
  Adjustment: 'warning',
  'Production Consumption': 'neutral',
  'Production Output': 'success',
  Return: 'danger'
};

export function StockMovements() {
  return (
    <ListPage<StockMovement>
      title="Stock Movements"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Inventory & Store' }, { label: 'Stock Movements' }]}
      description="Complete audit trail of every inbound, outbound and internal stock posting."
      rows={STOCK_MOVEMENTS}
      rowKey={(m) => m.id}
      searchText={(m) => `${m.id} ${m.sku} ${m.name} ${m.reference} ${m.from} ${m.to} ${m.user}`}
      dense
      statusTabs={[
      { id: 'all', label: 'All movements', match: () => true },
      { id: 'in', label: 'Inbound', match: (m) => m.qty > 0 },
      { id: 'out', label: 'Outbound', match: (m) => m.qty < 0 },
      { id: 'prod', label: 'Production', match: (m) => m.type.startsWith('Production') }]
      }
      filters={[
      { id: 'type', label: 'Type', options: [...new Set(STOCK_MOVEMENTS.map((m) => m.type))] },
      { id: 'user', label: 'User', options: [...new Set(STOCK_MOVEMENTS.map((m) => m.user))] },
      { id: 'sku', label: 'SKU', options: [...new Set(STOCK_MOVEMENTS.map((m) => m.sku))] }]
      }
      filterValue={(m, id) => id === 'type' ? m.type : id === 'user' ? m.user : m.sku}
      columns={[
      { key: 'date', header: 'Date & time', render: (m) => <span className="tnum text-slate-600">{m.date}</span>, sortValue: (m) => m.date },
      { key: 'type', header: 'Movement type', render: (m) => <Badge tone={TYPE_TONE[m.type] ?? 'neutral'}>{m.type}</Badge>, sortValue: (m) => m.type },
      { key: 'sku', header: 'SKU', render: (m) => <span className="font-mono text-xs text-brand-700">{m.sku}</span> },
      { key: 'name', header: 'Item', render: (m) => <span className="text-slate-800">{m.name}</span> },
      {
        key: 'qty',
        header: 'Qty',
        align: 'right',
        sortValue: (m) => m.qty,
        render: (m) => <span className={m.qty > 0 ? 'font-semibold text-emerald-700' : 'font-semibold text-red-600'}>{m.qty > 0 ? '+' : ''}{number(m.qty)}</span>
      },
      { key: 'from', header: 'From', render: (m) => m.from },
      { key: 'to', header: 'To', render: (m) => m.to },
      { key: 'reference', header: 'Reference', render: (m) => <span className="font-mono text-xs text-slate-500">{m.reference}</span> },
      { key: 'user', header: 'Posted by', render: (m) => m.user, optional: true }]
      } />);


}