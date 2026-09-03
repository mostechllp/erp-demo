import React from 'react';
import { PackageMinusIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { RecordLink } from '../../components/patterns/RecordLink';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { MATERIAL_CONSUMPTION } from '../../data/production';
import { currency, number } from '../../utils/format';

type Row = (typeof MATERIAL_CONSUMPTION)[number];

export function MaterialConsumption() {
  return (
    <ListPage<Row>
      title="Material Consumption"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Production' }, { label: 'Material Consumption' }]}
      description="Materials issued to work orders against BOM requirement, with backflush variance."
      actions={
      <Button variant="primary" icon={PackageMinusIcon}>
          Issue materials
        </Button>
      }
      rows={MATERIAL_CONSUMPTION}
      rowKey={(r) => `${r.wo}-${r.sku}`}
      searchText={(r) => `${r.wo} ${r.sku} ${r.material}`}
      selectable
      dense
      statusTabs={[
      { id: 'all', label: 'All lines', match: () => true },
      { id: 'short', label: 'Not fully issued', match: (r) => r.issued < r.required },
      { id: 'open', label: 'Remaining to consume', match: (r) => r.remaining > 0 }]
      }
      filters={[
      { id: 'wo', label: 'Work order', options: [...new Set(MATERIAL_CONSUMPTION.map((r) => r.wo))] },
      { id: 'sku', label: 'SKU', options: [...new Set(MATERIAL_CONSUMPTION.map((r) => r.sku))] }]
      }
      filterValue={(r, id) => id === 'wo' ? r.wo : r.sku}
      rowActions={() => [{ label: 'Issue material' }, { label: 'Return to store' }, { label: 'View stock' }]}
      columns={[
      { key: 'wo', header: 'Work order', render: (r) => <RecordLink to="/production/work-orders">{r.wo}</RecordLink> },
      { key: 'sku', header: 'SKU', render: (r) => <span className="font-mono text-xs text-slate-600">{r.sku}</span> },
      { key: 'material', header: 'Material', render: (r) => <span className="font-medium text-slate-900">{r.material}</span>, sortValue: (r) => r.material },
      { key: 'required', header: 'Required', align: 'right', render: (r) => number(r.required) },
      {
        key: 'issued',
        header: 'Issued',
        align: 'right',
        sortValue: (r) => r.issued,
        render: (r) => <span className={r.issued < r.required ? 'font-semibold text-amber-600' : ''}>{number(r.issued)}</span>
      },
      { key: 'consumed', header: 'Consumed', align: 'right', render: (r) => number(r.consumed) },
      { key: 'remaining', header: 'Remaining', align: 'right', render: (r) => number(r.remaining), sortValue: (r) => r.remaining },
      { key: 'unit', header: 'Unit', render: (r) => r.unit, optional: true },
      { key: 'cost', header: 'Issued cost', align: 'right', render: (r) => currency(r.cost), sortValue: (r) => r.cost },
      {
        key: 'status',
        header: 'Coverage',
        render: (r) => <StatusBadge status={r.issued === 0 ? 'Material Shortage' : r.issued < r.required ? 'Partially Received' : 'Completed'} />
      }]
      }
      totalsRow={(rows) =>
      <>
          <td className="px-3 py-2 text-xs uppercase tracking-wide text-slate-500" colSpan={8}>
            {rows.length} material lines
          </td>
          <td className="px-3 py-2 text-right tnum">{currency(rows.reduce((s, r) => s + r.cost, 0))}</td>
          <td />
        </>
      } />);


}