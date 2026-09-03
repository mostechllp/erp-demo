import React from 'react';
import { Link } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis } from 'recharts';
import { PlusIcon } from 'lucide-react';
import { PageHeader } from '../../components/patterns/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Progress } from '../../components/ui/Progress';
import { KpiCard } from '../../components/patterns/KpiCard';
import { RecordLink } from '../../components/patterns/RecordLink';
import { WorkflowStepper } from '../../components/patterns/WorkflowStepper';
import { JOB_CARDS, TECHNICIANS } from '../../data/workshop';
import { WORKSHOP_REVENUE } from '../../data/analytics';
import { AXIS_PROPS, CHART_COLORS, GRID_PROPS, TOOLTIP_STYLE } from '../../components/charts/chartTheme';
import { currency } from '../../utils/format';

export function WorkshopDashboard({ embedded }: {embedded?: boolean;}) {
  const count = (s: string) => JOB_CARDS.filter((j) => j.status === s).length;
  const revenue = JOB_CARDS.reduce((s, j) => s + j.revenue, 0);
  const cost = JOB_CARDS.reduce((s, j) => s + j.parts + j.labour, 0);

  return (
    <div className="flex min-h-full flex-col">
      {!embedded &&
      <PageHeader
        title="Workshop Dashboard"
        crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Workshop' }, { label: 'Dashboard' }]}
        description="Service job pipeline, technician workload and workshop profitability."
        actions={
        <Link to="/workshop/jobs">
              <Button variant="primary" icon={PlusIcon}>
                New job card
              </Button>
            </Link>
        } />

      }

      <div className="flex-1 space-y-4 p-6">
        <Card title="Workshop lifecycle" description="Customer → job card → inspection → parts & labour → repair → QC → delivery → invoice">
          <WorkflowStepper
            steps={[
            { label: 'Received', state: 'done', meta: `${count('Received')} jobs`, to: '/workshop/jobs' },
            { label: 'Inspection', state: 'current', meta: `${count('Inspection')}`, to: '/workshop/jobs' },
            { label: 'Waiting parts', state: 'blocked', meta: `${count('Waiting for Parts')}`, to: '/inventory/reorder' },
            { label: 'In progress', state: 'current', meta: `${count('In Progress')}` },
            { label: 'Quality check', state: 'current', meta: `${count('Quality Check')}` },
            { label: 'Ready / delivered', state: 'todo', meta: `${count('Ready') + count('Delivered')}` },
            { label: 'Invoice', state: 'todo', to: '/sales/invoices' }]
            } />
          
        </Card>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          <KpiCard label="Open jobs" value={String(JOB_CARDS.filter((j) => !['Closed', 'Delivered'].includes(j.status)).length)} delta={8.4} />
          <KpiCard label="In progress" value={String(count('In Progress'))} />
          <KpiCard label="Waiting for parts" value={String(count('Waiting for Parts'))} invertDelta delta={12.0} />
          <KpiCard label="Ready for delivery" value={String(count('Ready'))} />
          <KpiCard label="Completed (MTD)" value={String(count('Delivered') + count('Closed'))} delta={6.2} />
          <KpiCard label="Workshop revenue" value={currency(revenue, { compact: true })} delta={9.7} emphasis />
          <KpiCard label="Gross margin" value={`${((revenue - cost) / revenue * 100).toFixed(1)}%`} delta={1.6} />
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          <Card title="Workshop revenue vs cost" description="$ thousands" className="xl:col-span-2">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={WORKSHOP_REVENUE} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid {...GRID_PROPS} />
                <XAxis dataKey="month" {...AXIS_PROPS} />
                <YAxis {...AXIS_PROPS} />
                <RTooltip {...TOOLTIP_STYLE} />
                <Bar dataKey="revenue" name="Revenue" fill={CHART_COLORS.brand} radius={[2, 2, 0, 0]} />
                <Bar dataKey="cost" name="Parts & labour" fill={CHART_COLORS.warning} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Technician workload">
            <ul className="space-y-3">
              {TECHNICIANS.map((t) =>
              <li key={t.id}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">{t.name}</span>
                    <span className="tnum text-slate-500">{t.openJobs} jobs · {t.hoursWeek} h</span>
                  </div>
                  <Progress className="mt-1" value={t.utilisation} tone={t.utilisation > 90 ? 'danger' : t.utilisation > 75 ? 'warning' : 'success'} label={`${t.name} utilisation`} />
                </li>
              )}
            </ul>
          </Card>
        </div>

        <Card title="Job board" padded={false} actions={<Link to="/workshop/jobs" className="text-xs font-medium text-brand-700 hover:underline">All job cards</Link>}>
          <table className="w-full text-[13px]">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Job</th>
                <th className="px-4 py-2 text-left font-semibold">Customer / asset</th>
                <th className="px-4 py-2 text-left font-semibold">Technician</th>
                <th className="px-4 py-2 text-right font-semibold">Parts</th>
                <th className="px-4 py-2 text-right font-semibold">Labour</th>
                <th className="px-4 py-2 text-right font-semibold">Revenue</th>
                <th className="px-4 py-2 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {JOB_CARDS.slice(0, 7).map((j) =>
              <tr key={j.id} className="hover:bg-slate-50">
                  <td className="px-4 py-2.5"><RecordLink to={`/workshop/jobs/${j.id}`}>{j.id}</RecordLink></td>
                  <td className="px-4 py-2.5">
                    <p className="font-medium text-slate-900">{j.customer}</p>
                    <p className="text-xs text-slate-500">{j.asset}</p>
                  </td>
                  <td className="px-4 py-2.5">{j.technician}</td>
                  <td className="px-4 py-2.5 text-right tnum">{currency(j.parts, { compact: true })}</td>
                  <td className="px-4 py-2.5 text-right tnum">{currency(j.labour, { compact: true })}</td>
                  <td className="px-4 py-2.5 text-right tnum font-medium">{currency(j.revenue, { compact: true })}</td>
                  <td className="px-4 py-2.5"><StatusBadge status={j.status} /></td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </div>);

}