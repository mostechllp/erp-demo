import React from 'react';
import { PlusIcon, UploadIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Badge } from '../../components/ui/Badge';
import { PRODUCTS } from '../../data/inventory';
import { currency, number } from '../../utils/format';
import type { Product } from '../../types/erp';

export function Products() {
  return (
    <ListPage<Product>
      title="Products"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Inventory & Store' }, { label: 'Products' }]}
      description="Item master reused by sales, procurement, production, workshop and finance."
      actions={
      <>
          <Button icon={UploadIcon}>Import</Button>
          <Button variant="primary" icon={PlusIcon}>
            New product
          </Button>
        </>
      }
      rows={PRODUCTS}
      rowKey={(p) => p.id}
      searchText={(p) => `${p.sku} ${p.name} ${p.category} ${p.type} ${p.warehouse}`}
      selectable
      dense
      statusTabs={[
      { id: 'all', label: 'All items', match: () => true },
      { id: 'fg', label: 'Finished goods', match: (p) => p.type === 'Finished Good' },
      { id: 'rm', label: 'Raw materials', match: (p) => p.type === 'Raw Material' },
      { id: 'cp', label: 'Components', match: (p) => p.type === 'Component' },
      { id: 'spares', label: 'Spares & consumables', match: (p) => ['Spare Part', 'Consumable'].includes(p.type) },
      { id: 'below', label: 'Below reorder', match: (p) => p.available <= p.reorderLevel && p.reorderLevel > 0 }]
      }
      filters={[
      { id: 'category', label: 'Category', options: [...new Set(PRODUCTS.map((p) => p.category))] },
      { id: 'warehouse', label: 'Warehouse', options: [...new Set(PRODUCTS.map((p) => p.warehouse))] },
      { id: 'status', label: 'Status', options: ['Active', 'Inactive'] },
      { id: 'type', label: 'Item type', options: [...new Set(PRODUCTS.map((p) => p.type))] },
      { id: 'unit', label: 'Unit', options: [...new Set(PRODUCTS.map((p) => p.unit))] }]
      }
      filterValue={(p, id) =>
      id === 'category' ? p.category : id === 'warehouse' ? p.warehouse : id === 'status' ? p.status : id === 'type' ? p.type : p.unit
      }
      rowActions={() => [
      { label: 'View item card' },
      { label: 'Edit' },
      { label: 'Adjust stock' },
      { label: 'Create purchase request' },
      { label: 'Deactivate', danger: true, separatorBefore: true }]
      }
      columns={[
      { key: 'sku', header: 'SKU', render: (p) => <span className="font-mono text-xs text-brand-700">{p.sku}</span>, sortValue: (p) => p.sku },
      {
        key: 'name',
        header: 'Product',
        render: (p) =>
        <div>
              <p className="font-medium text-slate-900">{p.name}</p>
              <p className="text-xs text-slate-500">{p.category}</p>
            </div>,

        sortValue: (p) => p.name
      },
      { key: 'type', header: 'Type', render: (p) => <Badge tone={p.type === 'Finished Good' ? 'brand' : 'neutral'}>{p.type}</Badge>, optional: true },
      { key: 'unit', header: 'Unit', render: (p) => p.unit, optional: true },
      { key: 'warehouse', header: 'Warehouse', render: (p) => p.warehouse },
      {
        key: 'available',
        header: 'Available',
        align: 'right',
        sortValue: (p) => p.available,
        render: (p) =>
        <span className={p.available === 0 ? 'font-semibold text-red-600' : p.available <= p.reorderLevel ? 'font-semibold text-amber-600' : ''}>
              {number(p.available)}
            </span>

      },
      { key: 'reserved', header: 'Reserved', align: 'right', render: (p) => number(p.reserved), sortValue: (p) => p.reserved },
      { key: 'reorderLevel', header: 'Reorder level', align: 'right', render: (p) => number(p.reorderLevel), optional: true },
      { key: 'avgCost', header: 'Avg cost', align: 'right', render: (p) => currency(p.avgCost), sortValue: (p) => p.avgCost },
      { key: 'price', header: 'Selling price', align: 'right', render: (p) => p.price ? currency(p.price) : <span className="text-slate-400">—</span>, sortValue: (p) => p.price },
      { key: 'status', header: 'Status', render: (p) => <StatusBadge status={p.status} />, sortValue: (p) => p.status }]
      }
      totalsRow={(rows) =>
      <>
          <td className="px-3 py-2 text-xs uppercase tracking-wide text-slate-500" colSpan={5}>
            {rows.length} items
          </td>
          <td className="px-3 py-2 text-right tnum">{number(rows.reduce((s, p) => s + p.available, 0))}</td>
          <td className="px-3 py-2 text-right tnum">{number(rows.reduce((s, p) => s + p.reserved, 0))}</td>
          <td colSpan={4} />
        </>
      } />);


}