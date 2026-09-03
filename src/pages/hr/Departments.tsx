import React from 'react';
import { PlusIcon } from 'lucide-react';
import { PageHeader } from '../../components/patterns/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { DataTable } from '../../components/ui/DataTable';
import { Progress } from '../../components/ui/Progress';
import { DEPARTMENTS, DESIGNATIONS } from '../../data/hr';
import { currency, number } from '../../utils/format';

export function Departments() {
  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title="Departments & Designations"
        crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'HR & Payroll' }, { label: 'Departments' }]}
        description="Organisational structure, cost centres and salary bands."
        actions={
        <Button variant="primary" icon={PlusIcon}>
            New department
          </Button>
        } />
      

      <div className="flex-1 space-y-4 p-6">
        <Card title="Departments" padded={false}>
          <DataTable
            rows={DEPARTMENTS}
            rowKey={(d) => d.id}
            columns={[
            { key: 'id', header: 'Code', render: (d) => <span className="font-mono text-xs text-brand-700">{d.id}</span> },
            { key: 'name', header: 'Department', render: (d) => <span className="font-medium text-slate-900">{d.name}</span>, sortValue: (d) => d.name },
            { key: 'head', header: 'Department head', render: (d) => d.head },
            { key: 'costCenter', header: 'Cost centre', render: (d) => <span className="font-mono text-xs text-slate-500">{d.costCenter}</span> },
            { key: 'headcount', header: 'Headcount', align: 'right', render: (d) => number(d.headcount), sortValue: (d) => d.headcount },
            { key: 'budget', header: 'Annual budget', align: 'right', render: (d) => currency(d.budget), sortValue: (d) => d.budget },
            { key: 'spend', header: 'Spend to date', align: 'right', render: (d) => currency(d.spend), sortValue: (d) => d.spend },
            {
              key: 'usage',
              header: 'Budget used',
              width: '170px',
              render: (d) =>
              <Progress
                value={d.spend / d.budget * 100}
                tone={d.spend / d.budget > 0.85 ? 'danger' : d.spend / d.budget > 0.7 ? 'warning' : 'success'}
                showValue
                label={`${d.name} budget used`} />


            }]
            }
            rowActions={() => [{ label: 'View employees' }, { label: 'Edit department' }, { label: 'Budget detail' }]}
            totalsRow={
            <>
                <td className="px-3 py-2 text-xs uppercase tracking-wide text-slate-500" colSpan={4}>
                  {DEPARTMENTS.length} departments
                </td>
                <td className="px-3 py-2 text-right tnum">{number(DEPARTMENTS.reduce((s, d) => s + d.headcount, 0))}</td>
                <td className="px-3 py-2 text-right tnum">{currency(DEPARTMENTS.reduce((s, d) => s + d.budget, 0))}</td>
                <td className="px-3 py-2 text-right tnum">{currency(DEPARTMENTS.reduce((s, d) => s + d.spend, 0))}</td>
                <td />
              </>
            } />
          
        </Card>

        <Card title="Designations & salary bands" padded={false}>
          <DataTable
            rows={DESIGNATIONS}
            rowKey={(d) => d.id}
            dense
            columns={[
            { key: 'title', header: 'Designation', render: (d) => <span className="font-medium text-slate-900">{d.title}</span>, sortValue: (d) => d.title },
            { key: 'grade', header: 'Grade', render: (d) => d.grade },
            { key: 'department', header: 'Department', render: (d) => d.department },
            { key: 'holders', header: 'Holders', align: 'right', render: (d) => d.holders, sortValue: (d) => d.holders },
            { key: 'bandMin', header: 'Band min', align: 'right', render: (d) => currency(d.bandMin) },
            { key: 'bandMax', header: 'Band max', align: 'right', render: (d) => currency(d.bandMax) }]
            }
            rowActions={() => [{ label: 'Edit band' }, { label: 'View holders' }]} />
          
        </Card>
      </div>
    </div>);

}