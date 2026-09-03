import React from 'react';
import { Link } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis } from 'recharts';
import { UserPlusIcon } from 'lucide-react';
import { PageHeader } from '../../components/patterns/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { KpiCard } from '../../components/patterns/KpiCard';
import { WorkflowStepper } from '../../components/patterns/WorkflowStepper';
import { DEPARTMENTS, EMPLOYEES, LEAVE_REQUESTS, PAYROLL_RUNS, RECRUITMENT } from '../../data/hr';
import { HEADCOUNT_TREND } from '../../data/analytics';
import { AXIS_PROPS, CHART_COLORS, GRID_PROPS, TOOLTIP_STYLE } from '../../components/charts/chartTheme';
import { currency, number, shortDate } from '../../utils/format';

export function HrDashboard({ embedded }: {embedded?: boolean;}) {
  const current = PAYROLL_RUNS.find((p) => p.status === 'Pending Approval') ?? PAYROLL_RUNS[0];

  return (
    <div className="flex min-h-full flex-col">
      {!embedded &&
      <PageHeader
        title="HR Dashboard"
        crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'HR & Payroll' }, { label: 'Dashboard' }]}
        description="Headcount, attendance, leave, payroll and recruitment at a glance."
        actions={
        <>
              <Link to="/hr/payroll">
                <Button>Run payroll</Button>
              </Link>
              <Link to="/hr/employees">
                <Button variant="primary" icon={UserPlusIcon}>
                  Add employee
                </Button>
              </Link>
            </>
        } />

      }

      <div className="flex-1 space-y-4 p-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <KpiCard label="Total employees" value="146" delta={1.4} emphasis to="/hr/employees" />
          <KpiCard label="Present today" value="132" hint="90.4% attendance" to="/hr/attendance" />
          <KpiCard label="On leave" value="6" hint="2 pending approval" to="/hr/leave" />
          <KpiCard label="Open requisitions" value={String(RECRUITMENT.filter((r) => r.status === 'Open').length)} to="/hr/recruitment" />
          <KpiCard label="Payroll (net)" value={currency(current.net, { compact: true })} hint={current.period} to="/hr/payroll" />
          <KpiCard label="Attrition (12m)" value="4.1%" delta={-0.6} invertDelta />
        </div>

        <Card title="Leave approval workflow" description="Employee → manager approval → HR approval → approved / rejected">
          <WorkflowStepper
            steps={[
            { label: 'Leave request', state: 'done', meta: '6 raised' },
            { label: 'Manager approval', state: 'current', meta: '1 pending', to: '/approvals' },
            { label: 'HR approval', state: 'current', meta: '1 pending', to: '/hr/leave' },
            { label: 'Approved', state: 'todo', meta: '2 approved' },
            { label: 'Payroll impact', state: 'todo', to: '/hr/payroll' }]
            } />
          
        </Card>

        <div className="grid gap-4 xl:grid-cols-3">
          <Card title="Headcount trend" description="Rolling 6 months" className="xl:col-span-2">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={HEADCOUNT_TREND} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid {...GRID_PROPS} />
                <XAxis dataKey="month" {...AXIS_PROPS} />
                <YAxis {...AXIS_PROPS} domain={[130, 150]} />
                <RTooltip {...TOOLTIP_STYLE} />
                <Line type="monotone" dataKey="headcount" name="Headcount" stroke={CHART_COLORS.brand} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="attrition" name="Leavers" stroke={CHART_COLORS.danger} strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Headcount by department">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={DEPARTMENTS} layout="vertical" margin={{ top: 4, right: 12, left: 24, bottom: 0 }}>
                <CartesianGrid {...GRID_PROPS} horizontal={false} vertical />
                <XAxis type="number" {...AXIS_PROPS} />
                <YAxis type="category" dataKey="name" width={78} {...AXIS_PROPS} />
                <RTooltip {...TOOLTIP_STYLE} />
                <Bar dataKey="headcount" name="Headcount" fill={CHART_COLORS.info} radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <Card title="Leave requests" padded={false} actions={<Link to="/hr/leave" className="text-xs font-medium text-brand-700 hover:underline">View all</Link>}>
            <table className="w-full text-[13px]">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Employee</th>
                  <th className="px-4 py-2 text-left font-semibold">Type</th>
                  <th className="px-4 py-2 text-left font-semibold">Period</th>
                  <th className="px-4 py-2 text-right font-semibold">Days</th>
                  <th className="px-4 py-2 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {LEAVE_REQUESTS.slice(0, 6).map((l) =>
                <tr key={l.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2.5 font-medium text-slate-900">{l.employee}</td>
                    <td className="px-4 py-2.5">{l.type}</td>
                    <td className="px-4 py-2.5 text-slate-600">
                      {shortDate(l.from)} – {shortDate(l.to)}
                    </td>
                    <td className="px-4 py-2.5 text-right tnum">{l.days}</td>
                    <td className="px-4 py-2.5">
                      <StatusBadge status={l.status} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>

          <Card title="Recruitment pipeline" padded={false} actions={<Link to="/hr/recruitment" className="text-xs font-medium text-brand-700 hover:underline">View all</Link>}>
            <table className="w-full text-[13px]">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Requisition</th>
                  <th className="px-4 py-2 text-left font-semibold">Department</th>
                  <th className="px-4 py-2 text-right font-semibold">Applicants</th>
                  <th className="px-4 py-2 text-left font-semibold">Stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {RECRUITMENT.map((r) =>
                <tr key={r.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2.5">
                      <p className="font-medium text-slate-900">{r.role}</p>
                      <p className="font-mono text-xs text-slate-500">{r.id}</p>
                    </td>
                    <td className="px-4 py-2.5">{r.department}</td>
                    <td className="px-4 py-2.5 text-right tnum">{number(r.applicants)}</td>
                    <td className="px-4 py-2.5">
                      <StatusBadge status={r.stage === 'Closed' ? 'Closed' : r.stage === 'Offer' ? 'Approved' : 'In Progress'} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>
        </div>

        <Card title="Departments and budget" padded={false}>
          <table className="w-full text-[13px]">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Department</th>
                <th className="px-4 py-2 text-left font-semibold">Head</th>
                <th className="px-4 py-2 text-right font-semibold">Headcount</th>
                <th className="px-4 py-2 text-right font-semibold">Budget</th>
                <th className="px-4 py-2 text-right font-semibold">Spend</th>
                <th className="px-4 py-2 text-right font-semibold">Variance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DEPARTMENTS.map((d) =>
              <tr key={d.id} className="hover:bg-slate-50">
                  <td className="px-4 py-2.5 font-medium text-slate-900">{d.name}</td>
                  <td className="px-4 py-2.5">{d.head}</td>
                  <td className="px-4 py-2.5 text-right tnum">{d.headcount}</td>
                  <td className="px-4 py-2.5 text-right tnum">{currency(d.budget, { compact: true })}</td>
                  <td className="px-4 py-2.5 text-right tnum">{currency(d.spend, { compact: true })}</td>
                  <td className="px-4 py-2.5 text-right tnum text-emerald-700">
                    {currency(d.budget - d.spend, { compact: true })}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>

        <p className="text-xs text-slate-400">
          {EMPLOYEES.length} employee master records loaded for this branch selection.
        </p>
      </div>
    </div>);

}