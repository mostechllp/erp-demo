import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis } from 'recharts';
import { PlayIcon } from 'lucide-react';
import { PageHeader } from '../../components/patterns/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Alert } from '../../components/ui/Alert';
import { KpiCard } from '../../components/patterns/KpiCard';
import { EMPLOYEES, PAYROLL_RUNS } from '../../data/hr';
import { AXIS_PROPS, CHART_COLORS, GRID_PROPS, TOOLTIP_STYLE } from '../../components/charts/chartTheme';
import { currency, number, shortDate } from '../../utils/format';

export function Payroll() {
  const pending = PAYROLL_RUNS.find((p) => p.status === 'Pending Approval');
  const processed = PAYROLL_RUNS.filter((p) => p.status === 'Processed');

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title="Payroll"
        crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'HR & Payroll' }, { label: 'Payroll' }]}
        description="Monthly payroll runs with gross, deductions, tax and net pay posted to finance."
        actions={
        <>
            <Button>Payslip register</Button>
            <Button variant="primary" icon={PlayIcon}>
              Process payroll
            </Button>
          </>
        } />
      

      <div className="flex-1 space-y-4 p-6">
        {pending &&
        <Alert tone="warning" title={`${pending.period} payroll awaiting approval`}>
            Net pay of {currency(pending.net)} across {number(pending.employees)} employees is held pending finance
            sign-off. Approve before 25 Sep to meet the payment file cut-off.
          </Alert>
        }

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <KpiCard label="Total payroll (gross)" value={currency(pending?.gross ?? 0, { compact: true })} delta={0.6} emphasis />
          <KpiCard label="Deductions" value={currency(pending?.deductions ?? 0, { compact: true })} />
          <KpiCard label="Tax withheld" value={currency(pending?.tax ?? 0, { compact: true })} />
          <KpiCard label="Net salary" value={currency(pending?.net ?? 0, { compact: true })} emphasis />
          <KpiCard label="Employees paid" value={number(pending?.employees ?? 0)} hint="1 new joiner this period" />
        </div>

        <Card title="Payroll cost trend" description="Gross, tax and net by period · $ thousands">
          <ResponsiveContainer width="100%" height={230}>
            <BarChart
              data={[...PAYROLL_RUNS].reverse().map((p) => ({
                period: p.period.split(' ')[0],
                gross: Math.round(p.gross / 1000),
                tax: Math.round(p.tax / 1000),
                net: Math.round(p.net / 1000)
              }))}
              margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              
              <CartesianGrid {...GRID_PROPS} />
              <XAxis dataKey="period" {...AXIS_PROPS} />
              <YAxis {...AXIS_PROPS} />
              <RTooltip {...TOOLTIP_STYLE} />
              <Bar dataKey="gross" name="Gross" fill={CHART_COLORS.brandLight} radius={[2, 2, 0, 0]} />
              <Bar dataKey="tax" name="Tax" fill={CHART_COLORS.warning} radius={[2, 2, 0, 0]} />
              <Bar dataKey="net" name="Net" fill={CHART_COLORS.brand} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Payroll runs" padded={false}>
          <DataTable
            rows={PAYROLL_RUNS}
            rowKey={(p) => p.id}
            columns={[
            { key: 'id', header: 'Run', render: (p) => <span className="font-mono text-xs text-brand-700">{p.id}</span> },
            { key: 'period', header: 'Period', render: (p) => <span className="font-medium text-slate-900">{p.period}</span>, sortValue: (p) => p.period },
            { key: 'employees', header: 'Employees', align: 'right', render: (p) => number(p.employees) },
            { key: 'gross', header: 'Gross', align: 'right', render: (p) => currency(p.gross), sortValue: (p) => p.gross },
            { key: 'deductions', header: 'Deductions', align: 'right', render: (p) => currency(p.deductions) },
            { key: 'tax', header: 'Tax', align: 'right', render: (p) => currency(p.tax) },
            { key: 'net', header: 'Net pay', align: 'right', render: (p) => <span className="font-semibold">{currency(p.net)}</span>, sortValue: (p) => p.net },
            { key: 'paidOn', header: 'Paid on', render: (p) => p.paidOn === '—' ? '—' : shortDate(p.paidOn) },
            { key: 'status', header: 'Status', render: (p) => <StatusBadge status={p.status} /> }]
            }
            rowActions={(p) => [
            { label: 'View register' },
            { label: 'Approve run', disabled: p.status !== 'Pending Approval' },
            { label: 'Download bank file' },
            { label: 'Reverse run', danger: true, separatorBefore: true, disabled: p.status !== 'Processed' }]
            } />
          
        </Card>

        <Card title={`Payslip register — ${pending?.period ?? processed[0].period}`} padded={false}>
          <DataTable
            rows={EMPLOYEES.slice(0, 10)}
            rowKey={(e) => e.id}
            dense
            columns={[
            { key: 'id', header: 'Employee ID', render: (e) => <span className="font-mono text-xs text-slate-600">{e.id}</span> },
            { key: 'name', header: 'Employee', render: (e) => <span className="font-medium text-slate-900">{e.name}</span>, sortValue: (e) => e.name },
            { key: 'department', header: 'Department', render: (e) => e.department },
            { key: 'gross', header: 'Gross', align: 'right', render: (e) => currency(e.salary), sortValue: (e) => e.salary },
            { key: 'deductions', header: 'Deductions', align: 'right', render: (e) => currency(Math.round(e.salary * 0.09)) },
            { key: 'tax', header: 'Tax', align: 'right', render: (e) => currency(Math.round(e.salary * 0.18)) },
            {
              key: 'net',
              header: 'Net pay',
              align: 'right',
              render: (e) => <span className="font-semibold">{currency(e.salary - Math.round(e.salary * 0.27))}</span>
            },
            { key: 'status', header: 'Status', render: () => <StatusBadge status="Pending Approval" /> }]
            }
            rowActions={() => [{ label: 'View payslip' }, { label: 'Email payslip' }, { label: 'Adjust pay element' }]} />
          
        </Card>
      </div>
    </div>);

}