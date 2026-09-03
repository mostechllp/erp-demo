import React, { useState } from 'react';
import { PlusIcon, TruckIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Drawer } from '../../components/ui/Drawer';
import { KpiCard } from '../../components/patterns/KpiCard';
import { RecordLink } from '../../components/patterns/RecordLink';
import { DefinitionList } from '../../components/patterns/DefinitionList';
import { Timeline } from '../../components/patterns/Timeline';
import { SHIPMENTS, TRACKING_STAGES } from '../../data/logistics';
import { shortDate } from '../../utils/format';
import type { Shipment } from '../../types/erp';

export function Shipments() {
  const [selected, setSelected] = useState<Shipment | null>(null);
  const stageIndex = selected ? TRACKING_STAGES.indexOf(selected.status) : -1;

  return (
    <>
      <ListPage<Shipment>
        title="Shipments"
        crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Logistics' }, { label: 'Shipments' }]}
        description="Outbound shipments from confirmation through to delivery, linked to sales orders."
        actions={
        <>
            <Button icon={TruckIcon}>Track all</Button>
            <Button variant="primary" icon={PlusIcon}>
              New shipment
            </Button>
          </>
        }
        summary={
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard label="Open shipments" value={String(SHIPMENTS.filter((s) => s.status !== 'Delivered').length)} />
            <KpiCard label="In transit" value={String(SHIPMENTS.filter((s) => ['In Transit', 'Out for Delivery'].includes(s.status)).length)} />
            <KpiCard label="Delivered (MTD)" value="18" delta={7.2} />
            <KpiCard label="On-time delivery" value="94.2%" delta={1.1} />
          </div>
        }
        rows={SHIPMENTS}
        rowKey={(s) => s.id}
        onRowClick={(s) => setSelected(s)}
        searchText={(s) => `${s.id} ${s.order} ${s.customer} ${s.carrier} ${s.tracking}`}
        selectable
        statusTabs={[
        { id: 'all', label: 'All shipments', match: () => true },
        { id: 'prep', label: 'Preparing', match: (s) => ['Order Confirmed', 'Processing', 'Packed'].includes(s.status) },
        { id: 'transit', label: 'In transit', match: (s) => ['Dispatched', 'In Transit', 'Out for Delivery'].includes(s.status) },
        { id: 'delivered', label: 'Delivered', match: (s) => s.status === 'Delivered' }]
        }
        filters={[
        { id: 'carrier', label: 'Carrier', options: [...new Set(SHIPMENTS.map((s) => s.carrier))] },
        { id: 'warehouse', label: 'Warehouse', options: [...new Set(SHIPMENTS.map((s) => s.warehouse))] },
        { id: 'status', label: 'Status', options: [...new Set(SHIPMENTS.map((s) => s.status))] }]
        }
        filterValue={(s, id) => id === 'carrier' ? s.carrier : id === 'warehouse' ? s.warehouse : s.status}
        rowActions={(s) => [
        { label: 'Track shipment', onSelect: () => setSelected(s) },
        { label: 'Print delivery note' },
        { label: 'Mark delivered' },
        { label: 'Cancel shipment', danger: true, separatorBefore: true }]
        }
        columns={[
        { key: 'id', header: 'Shipment', render: (s) => <span className="font-mono text-xs text-brand-700">{s.id}</span>, sortValue: (s) => s.id },
        { key: 'order', header: 'Sales order', render: (s) => <RecordLink to={`/sales/orders/${s.order}`}>{s.order}</RecordLink> },
        { key: 'customer', header: 'Customer', render: (s) => <span className="font-medium text-slate-900">{s.customer}</span>, sortValue: (s) => s.customer },
        { key: 'warehouse', header: 'Warehouse', render: (s) => s.warehouse, optional: true },
        { key: 'carrier', header: 'Carrier', render: (s) => s.carrier },
        { key: 'shipped', header: 'Shipped', render: (s) => s.shipped === '—' ? '—' : shortDate(s.shipped), sortValue: (s) => s.shipped },
        { key: 'eta', header: 'Expected delivery', render: (s) => shortDate(s.eta), sortValue: (s) => s.eta },
        { key: 'tracking', header: 'Tracking', render: (s) => <span className="font-mono text-xs text-slate-500">{s.tracking}</span>, optional: true },
        { key: 'status', header: 'Status', render: (s) => <StatusBadge status={s.status} />, sortValue: (s) => s.status }]
        } />
      

      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `Shipment ${selected.id}` : ''}
        subtitle={selected ? `${selected.customer} · ${selected.carrier}` : undefined}
        width="w-[560px]">
        
        {selected &&
        <div className="space-y-6">
            <DefinitionList
            items={[
            { label: 'Sales order', value: selected.order },
            { label: 'Customer', value: selected.customer },
            { label: 'Warehouse', value: selected.warehouse },
            { label: 'Carrier', value: selected.carrier },
            { label: 'Shipped', value: selected.shipped === '—' ? 'Not dispatched' : shortDate(selected.shipped) },
            { label: 'Expected delivery', value: shortDate(selected.eta) },
            { label: 'Tracking number', value: selected.tracking, full: true }]
            } />
          

            <div>
              <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Tracking timeline</h3>
              <Timeline
              events={TRACKING_STAGES.map((stage, i) => ({
                id: stage,
                title: stage,
                detail:
                i < stageIndex ?
                'Completed' :
                i === stageIndex ?
                'Current stage' :
                'Pending',
                at: i <= stageIndex ? shortDate(selected.shipped === '—' ? selected.eta : selected.shipped) : '—',
                tone: i < stageIndex ? 'success' : i === stageIndex ? 'brand' : 'neutral'
              }))} />
            
            </div>
          </div>
        }
      </Drawer>
    </>);

}