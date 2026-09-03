import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis } from 'recharts';
import { MailIcon, PhoneIcon } from 'lucide-react';
import { PageHeader } from '../../components/patterns/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Progress } from '../../components/ui/Progress';
import { KpiCard } from '../../components/patterns/KpiCard';
import { RecordLink } from '../../components/patterns/RecordLink';
import { CUSTOMERS, AR_INVOICES } from '../../data/sales';
import { AGING_BUCKETS } from '../../data/finance';
import { AXIS_PROPS, CHART_COLORS, GRID_PROPS, TOOLTIP_STYLE } from '../../components/charts/chartTheme';
import { currency, shortDate } from '../../utils/format';
import type { Customer } from '../../types/erp';

export function Receivables() {
  const owing = CUSTOMERS.filter((c) => c.outstanding > 0).sort((a, b) => b.outstanding - a.outstanding);
  const total = owing.reduce((s, c) => s + c.outstanding, 0);

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title="Customer Receivables"
        crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Sales & CRM' }, { label: 'Customer Receivables' }]}
        description="Collections view of outstanding customer balances by account and age."
        actions={
        <>
            <Button icon={PhoneIcon}>Log call</Button>
            <Button variant="primary" icon={MailIcon}>
              Send dunning run
            </Button>
          </>
        } />
      

      <div className="flex-1 space-y-4 p-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="Total receivables" value={currency(total, { compact: true })} delta={4.1} invertDelta emphasis />
          <KpiCard label="Overdue balance" value={currency(643750, { compact: true })} delta={12.4} invertDelta hint="50% of total" />
          <KpiCard label="Accounts over limit" value="1" hint="Helvetia Precision on hold" />
          <KpiCard label="DSO" value="38 days" delta={-3.2} invertDelta hint="Target 30 days" />
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          <Card title="Receivables ageing" description="Balance by ageing bucket" className="xl:col-span-1">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={AGING_BUCKETS} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid {...GRID_PROPS} />
                <XAxis dataKey="bucket" {...AXIS_PROPS} />
                <YAxis {...AXIS_PROPS} />
                <RTooltip {...TOOLTIP_STYLE} formatter={(v: number) => currency(v)} />
                <Bar dataKey="receivable" name="Receivable" fill={CHART_COLORS.brand} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Balances by customer" padded={false} className="xl:col-span-2">
            <DataTable<Customer>
              rows={owing}
              rowKey={(c) => c.id}
              dense
              columns={[
              { key: 'name', header: 'Customer', render: (c) => <RecordLink to={`/sales/customers/${c.id}`} mono={false}>{c.name}</RecordLink> },
              { key: 'owner', header: 'Owner', render: (c) => c.owner },
              { key: 'outstanding', header: 'Outstanding', align: 'right', render: (c) => currency(c.outstanding), sortValue: (c) => c.outstanding },
              { key: 'limit', header: 'Credit limit', align: 'right', render: (c) => currency(c.creditLimit) },
              {
                key: 'usage',
                header: 'Utilisation',
                width: '140px',
                render: (c) =>
                <Progress
                  value={c.outstanding / c.creditLimit * 100}
                  tone={c.outstanding / c.creditLimit > 0.75 ? 'danger' : 'warning'}
                  showValue
                  label={`${c.name} credit utilisation`} />


              },
              { key: 'status', header: 'Status', render: (c) => <StatusBadge status={c.status} /> }]
              } />
            
          </Card>
        </div>

        <Card title="Open invoices requiring collection" padded={false}>
          <DataTable
            rows={AR_INVOICES.filter((i) => i.balance > 0)}
            rowKey={(i) => i.id}
            columns={[
            { key: 'id', header: 'Invoice', render: (i) => <span className="font-mono text-xs text-brand-700">{i.id}</span> },
            { key: 'party', header: 'Customer', render: (i) => i.party },
            { key: 'due', header: 'Due date', render: (i) => shortDate(i.due), sortValue: (i) => i.due },
            { key: 'amount', header: 'Invoice value', align: 'right', render: (i) => currency(i.amount) },
            { key: 'balance', header: 'Balance', align: 'right', render: (i) => <span className="font-semibold text-red-600">{currency(i.balance)}</span>, sortValue: (i) => i.balance },
            { key: 'status', header: 'Status', render: (i) => <StatusBadge status={i.status} /> }]
            }
            rowActions={() => [{ label: 'Send reminder' }, { label: 'Log promise to pay' }, { label: 'Escalate to legal', danger: true }]} />
          
        </Card>
      </div>
    </div>);

}