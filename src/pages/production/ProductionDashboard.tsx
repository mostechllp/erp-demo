import React from 'react';
import { Link } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis } from 'recharts';
import { AlertTriangleIcon, PlusIcon } from 'lucide-react';
import { PageHeader } from '../../components/patterns/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Progress } from '../../components/ui/Progress';
import { KpiCard } from '../../components/patterns/KpiCard';
import { RecordLink } from '../../components/patterns/RecordLink';
import { WorkflowStepper } from '../../components/patterns/WorkflowStepper';
import { MACHINES, QUALITY_INSPECTIONS, WORK_CENTERS, WORK_ORDERS } from '../../data/production';
import { MACHINE_UTILISATION, PRODUCTION_OUTPUT_TREND } from '../../data/analytics';
import { AXIS_PROPS, CHART_COLORS, GRID_PROPS, TOOLTIP_STYLE } from '../../components/charts/chartTheme';

export function ProductionDashboard({ embedded }: {embedded?: boolean;}) {
  const planned = WORK_ORDERS.filter((w) => w.status === 'Planned').length;
  const active = WORK_ORDERS.filter((w) => w.status === 'In Progress').length;
  const completed = WORK_ORDERS.filter((w) => w.status === 'Completed').length;

  return (
    <div className="flex min-h-full flex-col">
      {!embedded &&
      <PageHeader
        title="Production Dashboard"
        crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Production' }, { label: 'Dashboard' }]}
        description="Shop-floor status across plans, work orders, materials, machines and quality."
        actions={
        <>
              <Link to="/production/planning">
                <Button>Production plan</Button>
              </Link>
              <Link to="/production/work-orders">
                <Button variant="primary" icon={PlusIcon}>
                  New work order
                </Button>
              </Link>
            </>
        } />

      }

      <div className="flex-1 space-y-4 p-6">
        <Alert
          tone="danger"
          title="Material shortage blocking WO-7702"
          action={
          <Link to="/inventory/reorder">
              <Button size="xs" variant="danger" icon={AlertTriangleIcon}>
                Open reorder desk
              </Button>
            </Link>
          }>
          
          24 × Spherical Roller Bearing 6320 are required for the CS-150 build but stock is zero at WH-02. 60 units are
          inbound on PO-1025 with ETA 08 Sep — two days after the planned assembly start.
        </Alert>

        <Card title="Manufacturing lifecycle" description="Plan → BOM → material issue → work order → QC → finished goods">
          <WorkflowStepper
            steps={[
            { label: 'Production Plan', state: 'done', meta: '5 plans', to: '/production/planning' },
            { label: 'Bill of Materials', state: 'done', meta: 'BOM-4401 v3.2', to: '/production/bom' },
            { label: 'Material Issue', state: 'blocked', meta: 'shortage', to: '/production/consumption' },
            { label: 'Work Order', state: 'current', meta: `${active} running`, to: '/production/work-orders' },
            { label: 'Quality Check', state: 'current', meta: '1 rejection', to: '/production/quality' },
            { label: 'Finished Goods', state: 'todo', to: '/production/output' },
            { label: 'Inventory', state: 'todo', to: '/inventory/stock' }]
            } />
          
        </Card>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
          <KpiCard label="Planned" value={String(planned)} hint="Not yet released" />
          <KpiCard label="In progress" value={String(active)} delta={14.3} />
          <KpiCard label="Completed (MTD)" value={String(completed + 6)} delta={7.1} />
          <KpiCard label="Delayed" value="1" delta={0} invertDelta hint="WO-7707 paused" />
          <KpiCard label="Material shortages" value="2" invertDelta hint="Blocking 1 order" />
          <KpiCard label="Production efficiency" value="92.1%" delta={1.8} />
          <KpiCard label="Machine utilisation" value="68.5%" delta={-2.4} />
          <KpiCard label="Quality issues" value="3" invertDelta hint="1 open NCR" />
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          <Card title="Output vs plan" description="Units per production week" className="xl:col-span-2">
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={PRODUCTION_OUTPUT_TREND} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid {...GRID_PROPS} />
                <XAxis dataKey="week" {...AXIS_PROPS} />
                <YAxis {...AXIS_PROPS} />
                <RTooltip {...TOOLTIP_STYLE} />
                <Bar dataKey="planned" name="Planned" fill={CHART_COLORS.brandLight} radius={[2, 2, 0, 0]} />
                <Bar dataKey="produced" name="Produced" fill={CHART_COLORS.brand} radius={[2, 2, 0, 0]} />
                <Bar dataKey="rejected" name="Rejected" fill={CHART_COLORS.danger} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Machine utilisation" description="Run hours against available capacity">
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={MACHINE_UTILISATION} layout="vertical" margin={{ top: 4, right: 12, left: 30, bottom: 0 }}>
                <CartesianGrid {...GRID_PROPS} horizontal={false} vertical />
                <XAxis type="number" domain={[0, 100]} {...AXIS_PROPS} />
                <YAxis type="category" dataKey="machine" width={90} {...AXIS_PROPS} />
                <RTooltip {...TOOLTIP_STYLE} formatter={(v: number) => `${v}%`} />
                <Bar dataKey="utilisation" name="Utilisation" fill={CHART_COLORS.info} radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          <Card
            title="Active work orders"
            padded={false}
            className="xl:col-span-2"
            actions={<Link to="/production/work-orders" className="text-xs font-medium text-brand-700 hover:underline">View all</Link>}>
            
            <table className="w-full text-[13px]">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Work order</th>
                  <th className="px-4 py-2 text-left font-semibold">Product</th>
                  <th className="px-4 py-2 text-left font-semibold">Work centre</th>
                  <th className="px-4 py-2 text-left font-semibold">Progress</th>
                  <th className="px-4 py-2 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {WORK_ORDERS.filter((w) => !['Cancelled', 'Completed'].includes(w.status)).map((w) =>
                <tr key={w.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2.5">
                      <RecordLink to="/production/work-orders">{w.id}</RecordLink>
                    </td>
                    <td className="px-4 py-2.5">
                      <p className="font-medium text-slate-900">{w.product}</p>
                      <p className="text-xs text-slate-500">{w.qty} units · {w.operator}</p>
                    </td>
                    <td className="px-4 py-2.5">{w.workCenter}</td>
                    <td className="w-44 px-4 py-2.5">
                      <Progress value={w.progress} tone={w.status === 'Paused' ? 'warning' : 'brand'} showValue label={`${w.id} progress`} />
                    </td>
                    <td className="px-4 py-2.5">
                      <StatusBadge status={w.status} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>

          <div className="space-y-4">
            <Card title="Work centre load">
              <ul className="space-y-2.5">
                {WORK_CENTERS.map((wc) =>
                <li key={wc.id}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-700">{wc.name}</span>
                      <span className="tnum text-slate-500">
                        {wc.loadHrs}/{wc.capacityHrs} h
                      </span>
                    </div>
                    <Progress
                    className="mt-1"
                    value={wc.utilisation}
                    tone={wc.utilisation > 88 ? 'danger' : wc.utilisation > 70 ? 'warning' : 'success'}
                    label={`${wc.name} load`} />
                  
                  </li>
                )}
              </ul>
            </Card>
            <Card title="Quality issues" actions={<Link to="/production/quality" className="text-xs font-medium text-brand-700 hover:underline">All</Link>}>
              <ul className="space-y-2.5 text-[13px]">
                {QUALITY_INSPECTIONS.filter((q) => q.rejected > 0).map((q) =>
                <li key={q.id} className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-800">{q.product}</p>
                      <p className="truncate text-xs text-slate-500">
                        {q.id} · {q.defect}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs font-semibold tnum text-red-600">{q.rejected} rej.</span>
                  </li>
                )}
              </ul>
            </Card>
            <Card title="Maintenance due">
              <ul className="space-y-2 text-[13px]">
                {MACHINES.filter((m) => m.status === 'Maintenance' || m.nextService < '2026-09-10').map((m) =>
                <li key={m.id} className="flex items-center justify-between">
                    <span className="truncate text-slate-700">{m.name}</span>
                    <StatusBadge status={m.status === 'Maintenance' ? 'In Progress' : 'Scheduled'} />
                  </li>
                )}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>);

}