import React from 'react';
import { DownloadIcon, PrinterIcon } from 'lucide-react';
import { PageHeader } from '../../components/patterns/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { KpiCard } from '../../components/patterns/KpiCard';
import { PNL_ROWS } from '../../data/finance';
import { COMPANY } from '../../data/org';
import { currency, percent } from '../../utils/format';

const GROUPS = ['Revenue', 'Direct Costs', 'Operating Expenses'];

export function ProfitAndLoss() {
  const sum = (group: string, key: 'current' | 'prior') =>
  PNL_ROWS.filter((r) => r.group === group).reduce((s, r) => s + r[key], 0);

  const revenue = sum('Revenue', 'current');
  const gross = revenue + sum('Direct Costs', 'current');
  const net = gross + sum('Operating Expenses', 'current');
  const priorNet = sum('Revenue', 'prior') + sum('Direct Costs', 'prior') + sum('Operating Expenses', 'prior');

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title="Profit & Loss"
        crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Finance & Accounting' }, { label: 'Profit & Loss' }]}
        description={`${COMPANY.name} · ${COMPANY.fiscalYear} year to date, compared with the prior year`}
        actions={
        <>
            <Button icon={PrinterIcon}>Print</Button>
            <Button variant="primary" icon={DownloadIcon}>
              Export
            </Button>
          </>
        } />
      

      <div className="flex-1 space-y-4 p-6">
        <div className="grid gap-3 rounded border border-slate-200 bg-white p-4 shadow-card sm:grid-cols-2 lg:grid-cols-4">
          <Select label="Period" options={[{ value: 'ytd', label: 'FY 2026 year to date' }, { value: 'q3', label: 'Q3 2026' }]} />
          <Select label="Branch" options={[{ value: 'all', label: 'All branches (consolidated)' }, { value: 'hq', label: 'Head Office — Rotterdam' }]} />
          <Select label="Cost centre" options={[{ value: 'all', label: 'All cost centres' }, { value: 'cc300', label: 'CC-300 Production' }]} />
          <Select label="Comparison" options={[{ value: 'py', label: 'Prior year' }, { value: 'budget', label: 'Budget' }]} />
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="Total revenue" value={currency(revenue, { compact: true })} delta={11.4} emphasis />
          <KpiCard label="Gross profit" value={currency(gross, { compact: true })} delta={9.2} hint={`${(gross / revenue * 100).toFixed(1)}% margin`} />
          <KpiCard label="Net profit" value={currency(net, { compact: true })} delta={8.2} emphasis />
          <KpiCard label="Net margin" value={`${(net / revenue * 100).toFixed(1)}%`} delta={-0.6} />
        </div>

        <Card title="Income statement" padded={false}>
          <div className="erp-scroll overflow-x-auto">
            <table className="w-full min-w-max text-[13px]">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Account</th>
                  <th className="px-4 py-2 text-right font-semibold">Current period</th>
                  <th className="px-4 py-2 text-right font-semibold">Prior period</th>
                  <th className="px-4 py-2 text-right font-semibold">Variance</th>
                  <th className="px-4 py-2 text-right font-semibold">Var %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {GROUPS.map((group) =>
                <React.Fragment key={group}>
                    <tr className="bg-slate-50/70">
                      <td className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500" colSpan={5}>
                        {group}
                      </td>
                    </tr>
                    {PNL_ROWS.filter((r) => r.group === group).map((r) => {
                    const variance = r.current - r.prior;
                    return (
                      <tr key={r.label} className="hover:bg-slate-50">
                          <td className="px-4 py-2 text-slate-700">{r.label}</td>
                          <td className="px-4 py-2 text-right tnum text-slate-900">{currency(r.current)}</td>
                          <td className="px-4 py-2 text-right tnum text-slate-500">{currency(r.prior)}</td>
                          <td className={`px-4 py-2 text-right tnum ${variance >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                            {currency(variance)}
                          </td>
                          <td className={`px-4 py-2 text-right tnum ${variance >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                            {percent(variance / Math.abs(r.prior) * 100)}
                          </td>
                        </tr>);

                  })}
                    <tr className="bg-white font-semibold text-slate-900">
                      <td className="px-4 py-2">Total {group.toLowerCase()}</td>
                      <td className="px-4 py-2 text-right tnum">{currency(sum(group, 'current'))}</td>
                      <td className="px-4 py-2 text-right tnum">{currency(sum(group, 'prior'))}</td>
                      <td className="px-4 py-2 text-right tnum">{currency(sum(group, 'current') - sum(group, 'prior'))}</td>
                      <td />
                    </tr>
                  </React.Fragment>
                )}
              </tbody>
              <tfoot className="bg-slate-50">
                <tr className="border-t-2 border-slate-200 text-[14px] font-semibold text-slate-900">
                  <td className="px-4 py-2.5">Net profit for the period</td>
                  <td className="px-4 py-2.5 text-right tnum">{currency(net)}</td>
                  <td className="px-4 py-2.5 text-right tnum text-slate-500">{currency(priorNet)}</td>
                  <td className="px-4 py-2.5 text-right tnum text-emerald-700">{currency(net - priorNet)}</td>
                  <td className="px-4 py-2.5 text-right tnum text-emerald-700">{percent((net - priorNet) / priorNet * 100)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>
      </div>
    </div>);

}