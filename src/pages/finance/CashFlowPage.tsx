import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis } from 'recharts';
import { DownloadIcon } from 'lucide-react';
import { PageHeader } from '../../components/patterns/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { KpiCard } from '../../components/patterns/KpiCard';
import { CASH_FLOW } from '../../data/finance';
import { CASH_TREND } from '../../data/analytics';
import { AXIS_PROPS, CHART_COLORS, GRID_PROPS, TOOLTIP_STYLE } from '../../components/charts/chartTheme';
import { currency } from '../../utils/format';

const GROUPS = ['Operating', 'Investing', 'Financing'];

export function CashFlowPage() {
  const sum = (group: string) => CASH_FLOW.filter((r) => r.group === group).reduce((s, r) => s + r.value, 0);
  const net = GROUPS.reduce((s, g) => s + sum(g), 0);

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title="Cash Flow"
        crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Finance & Accounting' }, { label: 'Cash Flow' }]}
        description="Operating, investing and financing cash movements for FY 2026 year to date."
        actions={
        <Button variant="primary" icon={DownloadIcon}>
            Export
          </Button>
        } />
      

      <div className="flex-1 space-y-4 p-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="Operating cash flow" value={currency(sum('Operating'), { compact: true })} delta={7.4} emphasis />
          <KpiCard label="Investing" value={currency(sum('Investing'), { compact: true })} delta={-4.2} />
          <KpiCard label="Financing" value={currency(sum('Financing'), { compact: true })} delta={-1.8} />
          <KpiCard label="Net cash movement" value={currency(net, { compact: true })} delta={5.6} emphasis />
        </div>

        <Card title="Cash inflow vs outflow" description="Rolling 6 months · $ thousands">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={CASH_TREND} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid {...GRID_PROPS} />
              <XAxis dataKey="month" {...AXIS_PROPS} />
              <YAxis {...AXIS_PROPS} />
              <RTooltip {...TOOLTIP_STYLE} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="inflow" name="Inflow" fill={CHART_COLORS.success} radius={[2, 2, 0, 0]} />
              <Bar dataKey="outflow" name="Outflow" fill={CHART_COLORS.warning} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Statement of cash flows" padded={false}>
          <table className="w-full text-[13px]">
            <tbody className="divide-y divide-slate-100">
              {GROUPS.map((group) =>
              <React.Fragment key={group}>
                  <tr className="bg-slate-50/70">
                    <td className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500" colSpan={2}>
                      Cash flows from {group.toLowerCase()} activities
                    </td>
                  </tr>
                  {CASH_FLOW.filter((r) => r.group === group).map((r) =>
                <tr key={r.label} className="hover:bg-slate-50">
                      <td className="px-4 py-2 text-slate-700">{r.label}</td>
                      <td className={`px-4 py-2 text-right tnum ${r.value < 0 ? 'text-red-600' : 'text-slate-900'}`}>
                        {currency(r.value)}
                      </td>
                    </tr>
                )}
                  <tr className="font-semibold text-slate-900">
                    <td className="px-4 py-2">Net cash from {group.toLowerCase()} activities</td>
                    <td className="px-4 py-2 text-right tnum">{currency(sum(group))}</td>
                  </tr>
                </React.Fragment>
              )}
            </tbody>
            <tfoot className="bg-slate-50">
              <tr className="border-t-2 border-slate-200 text-[14px] font-semibold text-slate-900">
                <td className="px-4 py-2.5">Net increase in cash and cash equivalents</td>
                <td className="px-4 py-2.5 text-right tnum">{currency(net)}</td>
              </tr>
            </tfoot>
          </table>
        </Card>
      </div>
    </div>);

}