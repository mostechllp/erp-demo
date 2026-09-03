import React from 'react';
import { Link } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis } from 'recharts';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Progress } from '../../components/ui/Progress';
import { KpiCard } from '../../components/patterns/KpiCard';
import { RecordLink } from '../../components/patterns/RecordLink';
import { JOBS, PROJECTS, PROJECT_TASKS, TIMESHEETS } from '../../data/projects';
import { PROJECT_PROFITABILITY } from '../../data/analytics';
import { AXIS_PROPS, CHART_COLORS, GRID_PROPS, TOOLTIP_STYLE } from '../../components/charts/chartTheme';
import { currency, number, shortDate } from '../../utils/format';

export function ProjectDashboard() {
  const active = PROJECTS.filter((p) => p.status === 'In Progress');
  const budget = PROJECTS.reduce((s, p) => s + p.budget, 0);
  const actual = PROJECTS.reduce((s, p) => s + p.actual, 0);
  const revenue = PROJECTS.reduce((s, p) => s + p.revenue, 0);
  const overdue = JOBS.filter((j) => j.due < '2026-09-02' && !['Completed', 'Invoiced'].includes(j.status));

  return (
    <div className="space-y-4 p-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        <KpiCard label="Active projects" value={String(active.length)} to="/projects" />
        <KpiCard label="Total budget" value={currency(budget, { compact: true })} />
        <KpiCard label="Actual cost" value={currency(actual, { compact: true })} delta={6.1} invertDelta />
        <KpiCard label="Revenue" value={currency(revenue, { compact: true })} delta={8.4} emphasis />
        <KpiCard label="Profitability" value={`${((revenue - actual) / revenue * 100).toFixed(1)}%`} delta={1.4} emphasis />
        <KpiCard label="Open tasks" value={String(PROJECT_TASKS.filter((t) => t.status !== 'Completed').length)} to="/projects/tasks" />
        <KpiCard label="Overdue jobs" value={String(overdue.length)} invertDelta to="/projects/jobs" />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card title="Budget vs actual vs revenue" description="$ thousands" className="xl:col-span-2">
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

        <Card title="Timesheets awaiting approval" actions={<Link to="/projects/timesheets" className="text-xs font-medium text-brand-700 hover:underline">All</Link>}>
          <ul className="divide-y divide-slate-100 text-[13px]">
            {TIMESHEETS.filter((t) => t.status === 'Pending Approval').map((t) =>
            <li key={t.id} className="flex items-center justify-between py-2.5">
                <div>
                  <p className="font-medium text-slate-800">{t.employee}</p>
                  <p className="text-xs text-slate-500">
                    {t.week} · {t.hours} h · {t.job}
                  </p>
                </div>
                <span className="tnum text-slate-600">{currency(t.hours * t.rate)}</span>
              </li>
            )}
          </ul>
        </Card>
      </div>

      <Card title="Portfolio" padded={false} actions={<Link to="/projects" className="text-xs font-medium text-brand-700 hover:underline">Open project list</Link>}>
        <table className="w-full text-[13px]">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">Project</th>
              <th className="px-4 py-2 text-left font-semibold">Client</th>
              <th className="px-4 py-2 text-left font-semibold">End date</th>
              <th className="px-4 py-2 text-right font-semibold">Budget</th>
              <th className="px-4 py-2 text-right font-semibold">Actual</th>
              <th className="px-4 py-2 text-right font-semibold">Hours</th>
              <th className="px-4 py-2 text-left font-semibold">Progress</th>
              <th className="px-4 py-2 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {PROJECTS.map((p) =>
            <tr key={p.id} className="hover:bg-slate-50">
                <td className="px-4 py-2.5">
                  <RecordLink to={`/projects/${p.id}`} mono={false}>
                    {p.name}
                  </RecordLink>
                </td>
                <td className="px-4 py-2.5 text-slate-600">{p.client}</td>
                <td className="px-4 py-2.5">{shortDate(p.end)}</td>
                <td className="px-4 py-2.5 text-right tnum">{currency(p.budget, { compact: true })}</td>
                <td className={`px-4 py-2.5 text-right tnum ${p.actual > p.budget ? 'font-semibold text-red-600' : ''}`}>
                  {currency(p.actual, { compact: true })}
                </td>
                <td className="px-4 py-2.5 text-right tnum">{number(p.hours)}</td>
                <td className="w-40 px-4 py-2.5">
                  <Progress value={p.progress} tone={p.actual > p.budget ? 'danger' : 'brand'} showValue label={`${p.name} progress`} />
                </td>
                <td className="px-4 py-2.5">
                  <StatusBadge status={p.status} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>);

}