import React from 'react';
import { PlusIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { CATEGORIES } from '../../data/inventory';
import { currency, number } from '../../utils/format';

type Row = (typeof CATEGORIES)[number];

export function Categories() {
  return (
    <ListPage<Row>
      title="Categories"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Inventory & Store' }, { label: 'Categories' }]}
      description="Product hierarchy used for reporting, margin analysis and default accounts."
      actions={
      <Button variant="primary" icon={PlusIcon}>
          New category
        </Button>
      }
      rows={CATEGORIES}
      rowKey={(c) => c.id}
      searchText={(c) => `${c.id} ${c.name} ${c.parent}`}
      filters={[{ id: 'parent', label: 'Parent', options: [...new Set(CATEGORIES.map((c) => c.parent))] }]}
      filterValue={(c) => c.parent}
      rowActions={() => [{ label: 'Edit category' }, { label: 'View products' }, { label: 'Archive', danger: true }]}
      columns={[
      { key: 'id', header: 'Code', render: (c) => <span className="font-mono text-xs text-brand-700">{c.id}</span>, sortValue: (c) => c.id },
      { key: 'name', header: 'Category', render: (c) => <span className="font-medium text-slate-900">{c.name}</span>, sortValue: (c) => c.name },
      { key: 'parent', header: 'Parent category', render: (c) => <span className="text-slate-600">{c.parent}</span> },
      { key: 'products', header: 'Products', align: 'right', render: (c) => number(c.products), sortValue: (c) => c.products },
      { key: 'value', header: 'Stock value', align: 'right', render: (c) => currency(c.value), sortValue: (c) => c.value },
      { key: 'margin', header: 'Avg margin', align: 'right', render: (c) => `${c.margin.toFixed(1)}%`, sortValue: (c) => c.margin }]
      } />);


}