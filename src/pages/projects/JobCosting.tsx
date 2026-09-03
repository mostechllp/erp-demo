import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis } from 'recharts';
import { DownloadIcon } from 'lucide-react';
import { PageHeader } from '../../components/patterns/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { KpiCard } from '../../components/patterns/KpiCard';
import { RecordLink } from '../../components/patterns/RecordLink';
import { JOBS } from '../../data/projects';
import { PROJECT_PROFITABILITY } from '../../data/analytics';
import { AXIS_PROPS, CHART_COLORS, GRID_PROPS, TOOLTIP_STYLE } from '../../components/charts/chartTheme';
import { currency } from '../../utils/format';
import type { Job } from '../../types/erp';

export function JobCosting() {
  const revenue = JOBS.reduce((s, j) => s + j.revenue, 0);
  const actual = JOBS.reduce((s, j) => s + j.actual, 0);
  const estimate = JOBS.reduce((s, j) => s + j.estimate, 0);
  const material = JOBS.reduce((s, j) => s + j.costs.material, 0);
  const labour = JOBS.reduce((s, j) => s + j.costs.labour, 0);

  const categoryData = [
  { name: 'Material', value: material },
  { name: 'Labour', value: labour },
  { name: 'Equipment', value: JOBS.reduce((s, j) => s + j.costs.equipment, 0) },
  { name: 'Travel', value: JOBS.reduce((s, j) => s + j.costs.travel, 0) },
  { name: 'Other', value: JOBS.reduce((s, j) => s + j.costs.other, 0) }];


  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title="Job Costing"
        crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Projects & Job Costing' }, { label: 'Job Costing' }]}
        description="Material + labour + equipment + expenses = total job cost. Revenue − cost = gross profit."
        actions={
        <Button variant="primary" icon={DownloadIcon}>
            Export costing pack
          </Button>
        } />
      

      <div className="flex-1 space-y-4 p-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <KpiCard label="Estimated cost" value={currency(estimate, { compact: true })} />
          <KpiCard label="Actual cost" value={currency(actual, { compact: true })} delta={4.8} invertDelta />
          <KpiCard label="Cost variance" value={currency(estimate - actual, { compact: true })} hint={estimate - actual >= 0 ? 'Under estimate' : 'Over estimate'} />
          <KpiCard label="Revenue" value={currency(revenue, { compact: true })} delta={8.4} emphasis />
          <KpiCard label="Gross profit" value={currency(revenue - actual, { compact: true })} delta={9.1} emphasis />
          <KpiCard label="Profit margin" value={`${((revenue - actual) / revenue * 100).toFixed(1)}%`} delta={1.2} />
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          <Card title="Budget vs actual by project" description="$ thousands" className="xl:col-span-2">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={PROJECT_PROFITABILITY} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
                <CartesianGrid {...GRID_PROPS} />
                <XAxis dataKey="project" {...AXIS_PROPS} />
                <YAxis {...AXIS_PROPS} />
                <RTooltip {...TOOLTIP_STYLE} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="budget" name="Budget" fill={CHART_COLORS.brandLight} radius={[2, 2, 0, 0]} />
                <Bar dataKey="actual" name="Actual" fill={CHART_COLORS.warning} radius={[2, 2, 0, 0]} />
                <Bar dataKey="revenue" name="Revenue" fill={CHART_COLORS.success} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Cost by category" description="Labour vs material vs other">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={categoryData} layout="vertical" margin={{ top: 4, right: 12, left: 20, bottom: 0 }}>
                <CartesianGrid {...GRID_PROPS} horizontal={false} vertical />
                <XAxis type="number" {...AXIS_PROPS} tickFormatter={(v: number) => `${v / 1000}K`} />
                <YAxis type="category" dataKey="name" width={76} {...AXIS_PROPS} />
                <RTooltip {...TOOLTIP_STYLE} formatter={(v: number) => currency(v)} />
                <Bar dataKey="value" name="Cost" fill={CHART_COLORS.brand} radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card title="Job costing detail" description="Cost build-up, revenue and margin per job" padded={false}>
          <DataTable<Job>
            rows={JOBS}
            rowKey={(j) => j.id}
            dense
            columns={[
            { key: 'id', header: 'Job', render: (j) => <RecordLink to={`/projects/jobs/${j.id}`}>{j.id}</RecordLink> },
            { key: 'project', header: 'Project', render: (j) => <span className="font-medium text-slate-900">{j.project}</span>, sortValue: (j) => j.project },
            { key: 'material', header: 'Material', align: 'right', render: (j) => currency(j.costs.material, { compact: true }) },
            { key: 'labour', header: 'Labour', align: 'right', render: (j) => currency(j.costs.labour, { compact: true }) },
            { key: 'equipment', header: 'Equipment', align: 'right', render: (j) => currency(j.costs.equipment, { compact: true }) },
            { key: 'travel', header: 'Travel', align: 'right', render: (j) => currency(j.costs.travel, { compact: true }) },
            { key: 'other', header: 'Other', align: 'right', render: (j) => currency(j.costs.other, { compact: true }) },
            { key: 'estimate', header: 'Estimate', align: 'right', render: (j) => currency(j.estimate, { compact: true }), sortValue: (j) => j.estimate },
            {
              key: 'actual',
              header: 'Total cost',
              align: 'right',
              sortValue: (j) => j.actual,
              render: (j) => <span className={j.actual > j.estimate ? 'font-semibold text-red-600' : 'font-medium'}>{currency(j.actual, { compact: true })}</span>
            },
            {
              key: 'variance',
              header: 'Variance',
              align: 'right',
              sortValue: (j) => j.estimate - j.actual,
              render: (j) =>
              <span className={j.estimate - j.actual < 0 ? 'text-red-600' : 'text-emerald-700'}>
                    {currency(j.estimate - j.actual, { compact: true })}
                  </span>

            },
            { key: 'revenue', header: 'Revenue', align: 'right', render: (j) => currency(j.revenue, { compact: true }), sortValue: (j) => j.revenue },
            {
              key: 'margin',
              header: 'Margin',
              align: 'right',
              sortValue: (j) => (j.revenue - j.actual) / j.revenue,
              render: (j) => `${((j.revenue - j.actual) / j.revenue * 100).toFixed(1)}%`
            },
            { key: 'status', header: 'Status', render: (j) => <StatusBadge status={j.status} /> }]
            }
            totalsRow={
            <>
                <td className="px-3 py-2 text-xs uppercase tracking-wide text-slate-500" colSpan={2}>
                  Portfolio total
                </td>
                <td className="px-3 py-2 text-right tnum">{currency(material, { compact: true })}</td>
                <td className="px-3 py-2 text-right tnum">{currency(labour, { compact: true })}</td>
                <td colSpan={3} />
                <td className="px-3 py-2 text-right tnum">{currency(estimate, { compact: true })}</td>
                <td className="px-3 py-2 text-right tnum">{currency(actual, { compact: true })}</td>
                <td className="px-3 py-2 text-right tnum">{currency(estimate - actual, { compact: true })}</td>
                <td className="px-3 py-2 text-right tnum">{currency(revenue, { compact: true })}</td>
                <td className="px-3 py-2 text-right tnum">{((revenue - actual) / revenue * 100).toFixed(1)}%</td>
                <td />
              </>
            } />
          
        </Card>
      </div>
    </div>);

}