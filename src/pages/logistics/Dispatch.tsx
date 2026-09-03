import React from 'react';
import { PlusIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { KpiCard } from '../../components/patterns/KpiCard';
import { RecordLink } from '../../components/patterns/RecordLink';
import { DISPATCH_BOARD } from '../../data/logistics';

type Row = (typeof DISPATCH_BOARD)[number];

export function Dispatch() {
  return (
    <ListPage<Row>
      title="Dispatch & Delivery"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Logistics' }, { label: 'Dispatch' }]}
      description="Loading dock schedule, vehicle and driver assignment for outbound deliveries."
      actions={
      <Button variant="primary" icon={PlusIcon}>
          Schedule dispatch
        </Button>
      }
      summary={
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="Scheduled today" value="3" hint="Docks 1–3" />
          <KpiCard label="Unassigned loads" value={String(DISPATCH_BOARD.filter((d) => d.status === 'Unassigned').length)} invertDelta hint="Vehicle needed" />
          <KpiCard label="Out for delivery" value={String(DISPATCH_BOARD.filter((d) => d.status === 'Out for Delivery').length)} />
          <KpiCard label="Dock utilisation" value="72%" delta={4.8} />
        </div>
      }
      rows={DISPATCH_BOARD}
      rowKey={(d) => d.id}
      searchText={(d) => `${d.id} ${d.shipment} ${d.vehicle} ${d.driver} ${d.dock}`}
      selectable
      statusTabs={[
      { id: 'all', label: 'All loads', match: () => true },
      { id: 'unassigned', label: 'Unassigned', match: (d) => d.status === 'Unassigned' },
      { id: 'scheduled', label: 'Scheduled', match: (d) => d.status === 'Scheduled' },
      { id: 'out', label: 'On the road', match: (d) => ['Dispatched', 'Out for Delivery'].includes(d.status) }]
      }
      filters={[
      { id: 'dock', label: 'Dock', options: [...new Set(DISPATCH_BOARD.map((d) => d.dock))] },
      { id: 'status', label: 'Status', options: [...new Set(DISPATCH_BOARD.map((d) => d.status))] }]
      }
      filterValue={(d, id) => id === 'dock' ? d.dock : d.status}
      rowActions={(d) => [
      { label: 'Assign vehicle', disabled: d.status !== 'Unassigned' },
      { label: 'Print loading list' },
      { label: 'Confirm dispatch' },
      { label: 'Cancel load', danger: true, separatorBefore: true }]
      }
      columns={[
      { key: 'id', header: 'Load', render: (d) => <span className="font-mono text-xs text-brand-700">{d.id}</span>, sortValue: (d) => d.id },
      { key: 'shipment', header: 'Shipment', render: (d) => <RecordLink to="/logistics/shipments">{d.shipment}</RecordLink> },
      {
        key: 'vehicle',
        header: 'Vehicle / driver',
        render: (d) =>
        <div>
              <p className={d.vehicle === 'Unassigned' ? 'text-amber-600' : 'font-medium text-slate-900'}>{d.vehicle}</p>
              <p className="text-xs text-slate-500">{d.driver}</p>
            </div>,

        sortValue: (d) => d.vehicle
      },
      { key: 'dock', header: 'Dock', render: (d) => d.dock },
      { key: 'window', header: 'Loading window', render: (d) => <span className="text-slate-600">{d.window}</span> },
      { key: 'items', header: 'Items', align: 'right', render: (d) => d.items, sortValue: (d) => d.items },
      { key: 'weight', header: 'Weight', align: 'right', render: (d) => d.weight },
      { key: 'status', header: 'Status', render: (d) => <StatusBadge status={d.status === 'Unassigned' ? 'Draft' : d.status} />, sortValue: (d) => d.status }]
      } />);


}