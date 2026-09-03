import React from 'react';
import { DownloadIcon, PrinterIcon } from 'lucide-react';
import { PageHeader } from '../../components/patterns/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { StatTile } from '../../components/patterns/StatTile';
import { BALANCE_SHEET } from '../../data/finance';
import { COMPANY } from '../../data/org';
import { currency } from '../../utils/format';

function Section({ title, rows }: {title: string;rows: {label: string;value: number;}[];}) {
  const total = rows.reduce((s, r) => s + r.value, 0);
  return (
    <Card title={title} padded={false}>
      <table className="w-full text-[13px]">
        <tbody className="divide-y divide-slate-100">
          {rows.map((r) =>
          <tr key={r.label} className="hover:bg-slate-50">
              <td className="px-4 py-2 text-slate-700">{r.label}</td>
              <td className="px-4 py-2 text-right tnum text-slate-900">{currency(r.value)}</td>
            </tr>
          )}
        </tbody>
        <tfoot className="bg-slate-50">
          <tr className="border-t-2 border-slate-200 font-semibold text-slate-900">
            <td className="px-4 py-2.5">Total {title.toLowerCase()}</td>
            <td className="px-4 py-2.5 text-right tnum">{currency(total)}</td>
          </tr>
        </tfoot>
      </table>
    </Card>);

}

export function BalanceSheetPage() {
  const assets = BALANCE_SHEET.assets.reduce((s, r) => s + r.value, 0);
  const liabilities = BALANCE_SHEET.liabilities.reduce((s, r) => s + r.value, 0);
  const equity = BALANCE_SHEET.equity.reduce((s, r) => s + r.value, 0);
  const balanced = Math.abs(assets - (liabilities + equity)) < 1;

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title="Balance Sheet"
        crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Finance & Accounting' }, { label: 'Balance Sheet' }]}
        description={`${COMPANY.name} · statement of financial position as at 31 August 2026`}
        actions={
        <>
            <Button icon={PrinterIcon}>Print</Button>
            <Button variant="primary" icon={DownloadIcon}>
              Export
            </Button>
          </>
        } />
      

      <div className="flex-1 space-y-4 p-6">
        <div className="grid gap-3 rounded border border-slate-200 bg-white p-4 shadow-card sm:grid-cols-3">
          <StatTile label="Total assets" value={currency(assets)} />
          <StatTile label="Total liabilities" value={currency(liabilities)} tone="warning" />
          <StatTile label="Total equity" value={currency(equity)} tone="success" />
        </div>

        <Alert
          tone={balanced ? 'success' : 'danger'}
          title={balanced ? 'Balance sheet is in balance' : `Out of balance by ${currency(assets - liabilities - equity)}`}>
          
          {balanced ?
          'Assets equal liabilities plus equity for the reporting period. Trial balance reconciled on 01 Sep 2026.' :
          'Review unposted journals and suspense accounts before publishing this statement.'}
        </Alert>

        <div className="grid gap-4 lg:grid-cols-3">
          <Section title="Assets" rows={BALANCE_SHEET.assets} />
          <Section title="Liabilities" rows={BALANCE_SHEET.liabilities} />
          <Section title="Equity" rows={BALANCE_SHEET.equity} />
        </div>
      </div>
    </div>);

}