import React from 'react';
import { PlusIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Progress } from '../../components/ui/Progress';
import { WAREHOUSES } from '../../data/inventory';
import { currency, number } from '../../utils/format';

type Row = (typeof WAREHOUSES)[number];

export function Warehouses() {
  return (
    <ListPage<Row>
      title="Warehouses & Stores"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Inventory & Store' }, { label: 'Warehouses & Stores' }]}
      description="Physical stock locations, including plant stores and quarantine areas."
      actions={
      <Button variant="primary" icon={PlusIcon}>
          New location
        </Button>
      }
      rows={WAREHOUSES}
      rowKey={(w) => w.id}
      searchText={(w) => `${w.id} ${w.name} ${w.branch} ${w.manager} ${w.type}`}
      filters={[
      { id: 'type', label: 'Type', options: [...new Set(WAREHOUSES.map((w) => w.type))] },
      { id: 'branch', label: 'Branch', options: [...new Set(WAREHOUSES.map((w) => w.branch))] }]
      }
      filterValue={(w, id) => id === 'type' ? w.type : w.branch}
      rowActions={() => [{ label: 'View stock' }, { label: 'Edit location' }, { label: 'Bin layout' }, { label: 'Deactivate', danger: true }]}
      columns={[
      { key: 'id', header: 'Code', render: (w) => <span className="font-mono text-xs text-brand-700">{w.id}</span>, sortValue: (w) => w.id },
      { key: 'name', header: 'Location', render: (w) => <span className="font-medium text-slate-900">{w.name}</span>, sortValue: (w) => w.name },
      { key: 'type', header: 'Type', render: (w) => w.type },
      { key: 'branch', header: 'Branch', render: (w) => w.branch },
      { key: 'manager', header: 'Manager', render: (w) => w.manager },
      { key: 'bins', header: 'Bins', align: 'right', render: (w) => number(w.bins), sortValue: (w) => w.bins },
      { key: 'valuation', header: 'Stock value', align: 'right', render: (w) => currency(w.valuation), sortValue: (w) => w.valuation },
      {
        key: 'utilisation',
        header: 'Utilisation',
        width: '160px',
        sortValue: (w) => w.utilisation,
        render: (w) => <Progress value={w.utilisation} tone={w.utilisation > 80 ? 'warning' : 'brand'} showValue label={`${w.name} utilisation`} />
      },
      { key: 'status', header: 'Status', render: (w) => <StatusBadge status={w.status} /> }]
      } />);


}