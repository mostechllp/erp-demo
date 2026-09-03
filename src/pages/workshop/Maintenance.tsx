import React from 'react';
import { PlusIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Badge } from '../../components/ui/Badge';
import { MAINTENANCE } from '../../data/workshop';
import { currency, shortDate } from '../../utils/format';

type Row = (typeof MAINTENANCE)[number];

export function Maintenance() {
  return (
    <ListPage<Row>
      title="Maintenance"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Workshop' }, { label: 'Maintenance' }]}
      description="Preventive, corrective and predictive maintenance for plant equipment and assets."
      actions={
      <Button variant="primary" icon={PlusIcon}>
          Schedule maintenance
        </Button>
      }
      rows={MAINTENANCE}
      rowKey={(m) => m.id}
      searchText={(m) => `${m.id} ${m.equipment} ${m.type} ${m.technician}`}
      selectable
      statusTabs={[
      { id: 'all', label: 'All', match: () => true },
      { id: 'scheduled', label: 'Scheduled', match: (m) => m.status === 'Scheduled' },
      { id: 'progress', label: 'In progress', match: (m) => m.status === 'In Progress' },
      { id: 'done', label: 'Completed', match: (m) => m.status === 'Completed' }]
      }
      filters={[
      { id: 'type', label: 'Type', options: [...new Set(MAINTENANCE.map((m) => m.type))] },
      { id: 'technician', label: 'Technician', options: [...new Set(MAINTENANCE.map((m) => m.technician))] },
      { id: 'status', label: 'Status', options: [...new Set(MAINTENANCE.map((m) => m.status))] }]
      }
      filterValue={(m, id) => id === 'type' ? m.type : id === 'technician' ? m.technician : m.status}
      rowActions={() => [{ label: 'Open work order' }, { label: 'Reschedule' }, { label: 'Mark complete' }, { label: 'Cancel', danger: true }]}
      columns={[
      { key: 'id', header: 'Reference', render: (m) => <span className="font-mono text-xs text-brand-700">{m.id}</span>, sortValue: (m) => m.id },
      { key: 'equipment', header: 'Equipment', render: (m) => <span className="font-medium text-slate-900">{m.equipment}</span>, sortValue: (m) => m.equipment },
      { key: 'type', header: 'Type', render: (m) => <Badge tone={m.type === 'Corrective' ? 'warning' : 'brand'}>{m.type}</Badge> },
      { key: 'scheduled', header: 'Scheduled', render: (m) => shortDate(m.scheduled), sortValue: (m) => m.scheduled },
      { key: 'technician', header: 'Technician', render: (m) => m.technician },
      { key: 'cost', header: 'Cost', align: 'right', render: (m) => currency(m.cost), sortValue: (m) => m.cost },
      { key: 'next', header: 'Next due', render: (m) => shortDate(m.next), sortValue: (m) => m.next },
      { key: 'status', header: 'Status', render: (m) => <StatusBadge status={m.status} />, sortValue: (m) => m.status }]
      } />);


}