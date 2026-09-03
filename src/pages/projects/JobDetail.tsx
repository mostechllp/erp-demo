import React from 'react';
import { useParams } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis } from 'recharts';
import { FileTextIcon, PrinterIcon } from 'lucide-react';
import { PageHeader } from '../../components/patterns/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { DefinitionList } from '../../components/patterns/DefinitionList';
import { StatTile } from '../../components/patterns/StatTile';
import { RecordLink } from '../../components/patterns/RecordLink';
import { Timeline } from '../../components/patterns/Timeline';
import { NotFound } from '../errors/NotFound';
import { JOBS } from '../../data/projects';
import { AXIS_PROPS, CHART_COLORS, GRID_PROPS, TOOLTIP_STYLE } from '../../components/charts/chartTheme';
import { currency, shortDate } from '../../utils/format';

export function JobDetail() {
  const { id } = useParams();
  const job = JOBS.find((j) => j.id === id);

  if (!job) return <NotFound />;

  const breakdown = [
  { name: 'Material', value: job.costs.material },
  { name: 'Labour', value: job.costs.labour },
  { name: 'Equipment', value: job.costs.equipment },
  { name: 'Travel', value: job.costs.travel },
  { name: 'Other', value: job.costs.other }];

  const total = breakdown.reduce((s, b) => s + b.value, 0);
  const margin = (job.revenue - job.actual) / job.revenue * 100;

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title={`Job ${job.id}`}
        crumbs={[
        { label: 'Home', to: '/dashboard' },
        { label: 'Projects & Job Costing' },
        { label: 'Jobs', to: '/projects/jobs' },
        { label: job.id }]
        }
        meta={<StatusBadge status={job.status} />}
        description={`${job.project} · ${job.customer} · ${job.type}`}
        actions={
        <>
            <Button icon={PrinterIcon}>Print job sheet</Button>
            <Button variant="primary" icon={FileTextIcon}>
              Invoice job
            </Button>
          </>
        } />
      

      <div className="flex-1 space-y-4 p-6">
        <div className="grid gap-3 rounded border border-slate-200 bg-white p-4 shadow-card sm:grid-cols-2 lg:grid-cols-5">
          <StatTile label="Estimated cost" value={currency(job.estimate)} />
          <StatTile label="Actual cost" value={currency(job.actual)} tone={job.actual > job.estimate ? 'danger' : 'default'} />
          <StatTile label="Revenue" value={currency(job.revenue)} tone="info" />
          <StatTile label="Gross profit" value={currency(job.revenue - job.actual)} tone={margin > 10 ? 'success' : 'warning'} />
          <StatTile label="Profit margin" value={`${margin.toFixed(1)}%`} tone={margin > 10 ? 'success' : 'warning'} />
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          <Card title="Estimated vs actual cost" description="Cost control at job level">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={[
                { name: 'Estimate', value: job.estimate },
                { name: 'Actual', value: job.actual },
                { name: 'Revenue', value: job.revenue }]
                }
                margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
                
                <CartesianGrid {...GRID_PROPS} />
                <XAxis dataKey="name" {...AXIS_PROPS} />
                <YAxis {...AXIS_PROPS} tickFormatter={(v: number) => `${v / 1000}K`} />
                <RTooltip {...TOOLTIP_STYLE} formatter={(v: number) => currency(v)} />
                <Bar dataKey="value" name="Value" fill={CHART_COLORS.brand} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Cost breakdown" description="Actual cost by category">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={breakdown} layout="vertical" margin={{ top: 4, right: 12, left: 20, bottom: 0 }}>
                <CartesianGrid {...GRID_PROPS} horizontal={false} vertical />
                <XAxis type="number" {...AXIS_PROPS} tickFormatter={(v: number) => `${v / 1000}K`} />
                <YAxis type="category" dataKey="name" width={76} {...AXIS_PROPS} />
                <RTooltip {...TOOLTIP_STYLE} formatter={(v: number) => currency(v)} />
                <Bar dataKey="value" name="Cost" fill={CHART_COLORS.warning} radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Job costing summary">
            <dl className="space-y-2 text-[13px]">
              {breakdown.map((b) =>
              <div key={b.name} className="flex justify-between">
                  <dt className="text-slate-500">{b.name} cost</dt>
                  <dd className="tnum text-slate-800">{currency(b.value)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-slate-200 pt-2">
                <dt className="font-semibold text-slate-900">Total job cost</dt>
                <dd className="font-semibold tnum text-slate-900">{currency(total)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Revenue</dt>
                <dd className="tnum text-slate-800">{currency(job.revenue)}</dd>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2">
                <dt className="font-semibold text-slate-900">Gross profit</dt>
                <dd className="font-semibold tnum text-emerald-700">{currency(job.revenue - total)}</dd>
              </div>
            </dl>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card title="Job information" className="lg:col-span-2">
            <DefinitionList
              columns={3}
              items={[
              { label: 'Project', value: <RecordLink to={`/projects/${job.projectId}`} mono={false}>{job.project}</RecordLink> },
              { label: 'Customer', value: job.customer },
              { label: 'Job type', value: job.type },
              { label: 'Assigned team', value: job.team },
              { label: 'Start date', value: shortDate(job.start) },
              { label: 'Due date', value: shortDate(job.due) },
              { label: 'Cost centre', value: 'CC-500 Projects' },
              { label: 'Billing basis', value: 'Milestone billing' },
              { label: 'Status', value: <StatusBadge status={job.status} /> }]
              } />
            
          </Card>
          <Card title="Activity">
            <Timeline
              events={[
              { id: '1', title: 'Labour booked — 44 h', detail: 'Week 35 timesheets approved.', actor: 'Claire Dubois', at: '31 Aug 2026 · 09:14', tone: 'info' },
              { id: '2', title: 'Materials issued from WH-01', detail: currency(job.costs.material), actor: 'Nadia Rahman', at: '20 Aug 2026 · 13:22', tone: 'neutral' },
              { id: '3', title: 'Job assigned to team', detail: job.team, actor: 'Claire Dubois', at: `${shortDate(job.start)} · 08:00`, tone: 'brand' }]
              } />
            
          </Card>
        </div>
      </div>
    </div>);

}