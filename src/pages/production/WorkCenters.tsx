import React from 'react';
import { PlusIcon } from 'lucide-react';
import { PageHeader } from '../../components/patterns/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Progress } from '../../components/ui/Progress';
import { KpiCard } from '../../components/patterns/KpiCard';
import { MACHINES, WORK_CENTERS } from '../../data/production';
import { number, shortDate } from '../../utils/format';

export function WorkCenters() {
  const capacity = WORK_CENTERS.reduce((s, w) => s + w.capacityHrs, 0);
  const load = WORK_CENTERS.reduce((s, w) => s + w.loadHrs, 0);

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title="Work Centers & Machines"
        crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Production' }, { label: 'Work Centers & Machines' }]}
        description="Capacity, load and equipment condition across the plant."
        actions={
        <>
            <Button>Capacity planner</Button>
            <Button variant="primary" icon={PlusIcon}>
              New work centre
            </Button>
          </>
        } />
      

      <div className="flex-1 space-y-4 p-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="Total capacity" value={`${number(capacity)} h`} hint="Current planning week" />
          <KpiCard label="Committed load" value={`${number(load)} h`} delta={6.2} invertDelta />
          <KpiCard label="Utilisation" value={`${Math.round(load / capacity * 100)}%`} delta={-2.4} />
          <KpiCard label="Equipment in maintenance" value="1" hint="Coating booth B1" />
        </div>

        <Card title="Work centres" padded={false}>
          <DataTable
            rows={WORK_CENTERS}
            rowKey={(w) => w.id}
            columns={[
            { key: 'id', header: 'Code', render: (w) => <span className="font-mono text-xs text-brand-700">{w.id}</span> },
            { key: 'name', header: 'Work centre', render: (w) => <span className="font-medium text-slate-900">{w.name}</span>, sortValue: (w) => w.name },
            { key: 'plant', header: 'Plant', render: (w) => w.plant },
            { key: 'operators', header: 'Operators', align: 'right', render: (w) => w.operators },
            { key: 'capacityHrs', header: 'Capacity (h)', align: 'right', render: (w) => number(w.capacityHrs) },
            { key: 'loadHrs', header: 'Load (h)', align: 'right', render: (w) => number(w.loadHrs), sortValue: (w) => w.loadHrs },
            {
              key: 'utilisation',
              header: 'Utilisation',
              width: '170px',
              sortValue: (w) => w.utilisation,
              render: (w) =>
              <Progress value={w.utilisation} tone={w.utilisation > 88 ? 'danger' : w.utilisation > 70 ? 'warning' : 'success'} showValue label={`${w.name} utilisation`} />

            },
            { key: 'status', header: 'Status', render: (w) => <StatusBadge status={w.status === 'Maintenance' ? 'In Progress' : w.status} /> }]
            }
            rowActions={() => [{ label: 'View schedule' }, { label: 'Adjust capacity' }, { label: 'Assign operators' }]} />
          
        </Card>

        <Card title="Machines & equipment" padded={false}>
          <DataTable
            rows={MACHINES}
            rowKey={(m) => m.id}
            columns={[
            { key: 'id', header: 'Asset code', render: (m) => <span className="font-mono text-xs text-brand-700">{m.id}</span> },
            { key: 'name', header: 'Machine', render: (m) => <span className="font-medium text-slate-900">{m.name}</span>, sortValue: (m) => m.name },
            { key: 'workCenter', header: 'Work centre', render: (m) => m.workCenter },
            { key: 'hours', header: 'Run hours', align: 'right', render: (m) => number(m.hours), sortValue: (m) => m.hours },
            {
              key: 'utilisation',
              header: 'Utilisation',
              width: '170px',
              sortValue: (m) => m.utilisation,
              render: (m) => <Progress value={m.utilisation} tone={m.utilisation > 88 ? 'danger' : 'info'} showValue label={`${m.name} utilisation`} />
            },
            { key: 'lastService', header: 'Last service', render: (m) => shortDate(m.lastService) },
            { key: 'nextService', header: 'Next service', render: (m) => shortDate(m.nextService), sortValue: (m) => m.nextService },
            { key: 'status', header: 'Status', render: (m) => <StatusBadge status={m.status === 'Maintenance' ? 'In Progress' : m.status} /> }]
            }
            rowActions={() => [{ label: 'Maintenance history' }, { label: 'Schedule maintenance' }, { label: 'Take offline', danger: true }]} />
          
        </Card>
      </div>
    </div>);

}