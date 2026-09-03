import React from 'react';
import { Link } from 'react-router-dom';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis } from 'recharts';
import { PageHeader } from '../../components/patterns/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { KpiCard } from '../../components/patterns/KpiCard';
import { RecordLink } from '../../components/patterns/RecordLink';
import { AGING_BUCKETS, BANK_ACCOUNTS, PAYMENTS } from '../../data/finance';
import { AR_INVOICES } from '../../data/sales';
import { AP_INVOICES } from '../../data/procurement';
import { CASH_TREND, REVENUE_VS_EXPENSE } from '../../data/analytics';
import { AXIS_PROPS, CHART_COLORS, GRID_PROPS, TOOLTIP_STYLE } from '../../components/charts/chartTheme';
import { currency, shortDate } from '../../utils/format';

export function FinanceDashboard({ embedded }: {embedded?: boolean;}) {
  const receivable = AR_INVOICES.reduce((s, i) => s + i.balance, 0);
  const payable = AP_INVOICES.reduce((s, i) => s + i.balance, 0);
  const bank = BANK_ACCOUNTS.reduce((s, b) => s + b.balance, 0);

  return (
    <div className="flex min-h-full flex-col">
      {!embedded &&
      <PageHeader
        title="Finance Dashboard"
        crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Finance & Accounting' }, { label: 'Dashboard' }]}
        description="Revenue, cost, working capital and cash position for the current financial period."
        actions={
        <>
              <Link to="/finance/pnl">
                <Button>Profit & loss</Button>
              </Link>
              <Link to="/finance/payments">
                <Button variant="primary">Payment run</Button>
              </Link>
            </>
        } />

      }

      <div className="flex-1 space-y-4 p-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          <KpiCard label="Revenue (YTD)" value={currency(22506800, { compact: true })} delta={11.4} emphasis to="/finance/pnl" />
          <KpiCard label="Expenses (YTD)" value={currency(17521200, { compact: true })} delta={7.2} invertDelta />
          <KpiCard label="Net profit" value={currency(4985600, { compact: true })} delta={8.2} emphasis />
          <KpiCard label="Receivables" value={currency(receivable, { compact: true })} delta={4.1} invertDelta to="/finance/receivable" />
          <KpiCard label="Payables" value={currency(payable, { compact: true })} delta={-2.8} invertDelta to="/finance/payable" />
          <KpiCard label="Cash & bank" value={currency(bank, { compact: true })} delta={5.6} to="/finance/bank" />
          <KpiCard label="Net margin" value="22.2%" delta={0.9} />
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          <Card title="Revenue vs expenses" description="Rolling 6 months · $ thousands" className="xl:col-span-2">
            <ResponsiveContainer width="100%" height={230}>
              <AreaChart data={REVENUE_VS_EXPENSE} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="finRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={CHART_COLORS.brand} stopOpacity={0.18} />
                    <stop offset="100%" stopColor={CHART_COLORS.brand} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid {...GRID_PROPS} />
                <XAxis dataKey="month" {...AXIS_PROPS} />
                <YAxis {...AXIS_PROPS} />
                <RTooltip {...TOOLTIP_STYLE} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke={CHART_COLORS.brand} strokeWidth={2} fill="url(#finRev)" />
                <Area type="monotone" dataKey="expenses" name="Expenses" stroke={CHART_COLORS.neutral} strokeWidth={1.5} fill="transparent" />
                <Area type="monotone" dataKey="profit" name="Net profit" stroke={CHART_COLORS.success} strokeWidth={2} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Cash in vs out" description="$ thousands">
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={CASH_TREND} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid {...GRID_PROPS} />
                <XAxis dataKey="month" {...AXIS_PROPS} />
                <YAxis {...AXIS_PROPS} />
                <RTooltip {...TOOLTIP_STYLE} />
                <Bar dataKey="inflow" name="Inflow" fill={CHART_COLORS.success} radius={[2, 2, 0, 0]} />
                <Bar dataKey="outflow" name="Outflow" fill={CHART_COLORS.danger} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          <Card title="Receivables vs payables ageing" description="Balance by bucket" className="xl:col-span-2">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={AGING_BUCKETS} margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
                <CartesianGrid {...GRID_PROPS} />
                <XAxis dataKey="bucket" {...AXIS_PROPS} />
                <YAxis {...AXIS_PROPS} tickFormatter={(v: number) => `${v / 1000}K`} />
                <RTooltip {...TOOLTIP_STYLE} formatter={(v: number) => currency(v)} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="receivable" name="Receivable" fill={CHART_COLORS.brand} radius={[2, 2, 0, 0]} />
                <Bar dataKey="payable" name="Payable" fill={CHART_COLORS.warning} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Bank & cash balances" padded={false}>
            <ul className="divide-y divide-slate-100 text-[13px]">
              {BANK_ACCOUNTS.map((b) =>
              <li key={b.id} className="flex items-center justify-between px-4 py-2.5">
                  <div>
                    <p className="font-medium text-slate-800">{b.name}</p>
                    <p className="text-xs text-slate-500">
                      {b.currency} · reconciled {shortDate(b.lastRecon)}
                    </p>
                  </div>
                  <span className="tnum font-medium text-slate-900">{currency(b.balance, { compact: true })}</span>
                </li>
              )}
            </ul>
          </Card>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <Card title="Outstanding customer invoices" padded={false} actions={<Link to="/finance/receivable" className="text-xs font-medium text-brand-700 hover:underline">All</Link>}>
            <table className="w-full text-[13px]">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Invoice</th>
                  <th className="px-4 py-2 text-left font-semibold">Customer</th>
                  <th className="px-4 py-2 text-right font-semibold">Balance</th>
                  <th className="px-4 py-2 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {AR_INVOICES.filter((i) => i.balance > 0).slice(0, 6).map((i) =>
                <tr key={i.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2 font-mono text-xs text-brand-700">{i.id}</td>
                    <td className="max-w-[170px] truncate px-4 py-2">{i.party}</td>
                    <td className="px-4 py-2 text-right tnum">{currency(i.balance, { compact: true })}</td>
                    <td className="px-4 py-2"><StatusBadge status={i.status} /></td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>

          <Card title="Recent payments" padded={false} actions={<Link to="/finance/payments" className="text-xs font-medium text-brand-700 hover:underline">All</Link>}>
            <table className="w-full text-[13px]">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Payment</th>
                  <th className="px-4 py-2 text-left font-semibold">Party</th>
                  <th className="px-4 py-2 text-right font-semibold">Amount</th>
                  <th className="px-4 py-2 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PAYMENTS.map((p) =>
                <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2">
                      <RecordLink to="/finance/payments">{p.id}</RecordLink>
                    </td>
                    <td className="max-w-[170px] truncate px-4 py-2">{p.party}</td>
                    <td className={`px-4 py-2 text-right tnum ${p.kind === 'Receipt' ? 'text-emerald-700' : 'text-slate-800'}`}>
                      {currency(p.amount, { compact: true })}
                    </td>
                    <td className="px-4 py-2"><StatusBadge status={p.status} /></td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </div>);

}