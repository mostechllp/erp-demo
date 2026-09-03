import React from 'react';
import { FileCheckIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { KpiCard } from '../../components/patterns/KpiCard';
import { TAX_LINES } from '../../data/finance';
import { currency } from '../../utils/format';

type Row = (typeof TAX_LINES)[number];

export function Tax() {
  const output = TAX_LINES.filter((t) => t.type === 'Output').reduce((s, t) => s + t.tax, 0);
  const input = TAX_LINES.filter((t) => t.type === 'Input').reduce((s, t) => s + t.tax, 0);

  return (
    <ListPage<Row>
      title="Tax"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Finance & Accounting' }, { label: 'Tax' }]}
      description="VAT and GST positions by jurisdiction, period and filing status."
      actions={
      <Button variant="primary" icon={FileCheckIcon}>
          Prepare return
        </Button>
      }
      summary={
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="Output tax" value={currency(output, { compact: true })} hint="Collected on sales" />
          <KpiCard label="Input tax" value={currency(input, { compact: true })} hint="Recoverable on purchases" />
          <KpiCard label="Net payable" value={currency(output - input, { compact: true })} emphasis hint="Due 30 Sep 2026" />
          <KpiCard label="Returns filed" value="2 of 5" hint="Aug 2026 period" />
        </div>
      }
      rows={TAX_LINES}
      rowKey={(t) => t.id}
      searchText={(t) => `${t.id} ${t.name} ${t.type} ${t.period}`}
      statusTabs={[
      { id: 'all', label: 'All', match: () => true },
      { id: 'pending', label: 'Pending', match: (t) => t.status === 'Pending' },
      { id: 'filed', label: 'Filed', match: (t) => t.status === 'Filed' }]
      }
      filters={[
      { id: 'type', label: 'Type', options: ['Output', 'Input'] },
      { id: 'period', label: 'Period', options: [...new Set(TAX_LINES.map((t) => t.period))] }]
      }
      filterValue={(t, id) => id === 'type' ? t.type : t.period}
      rowActions={() => [{ label: 'View transactions' }, { label: 'Generate return' }, { label: 'Mark as filed' }]}
      columns={[
      { key: 'name', header: 'Tax code', render: (t) => <span className="font-medium text-slate-900">{t.name}</span>, sortValue: (t) => t.name },
      { key: 'rate', header: 'Rate', align: 'right', render: (t) => `${t.rate}%`, sortValue: (t) => t.rate },
      { key: 'type', header: 'Type', render: (t) => t.type },
      { key: 'period', header: 'Period', render: (t) => t.period },
      { key: 'taxable', header: 'Taxable base', align: 'right', render: (t) => currency(t.taxable), sortValue: (t) => t.taxable },
      { key: 'tax', header: 'Tax amount', align: 'right', render: (t) => currency(t.tax), sortValue: (t) => t.tax },
      { key: 'status', header: 'Status', render: (t) => <StatusBadge status={t.status} /> }]
      }
      totalsRow={(rows) =>
      <>
          <td className="px-3 py-2 text-xs uppercase tracking-wide text-slate-500" colSpan={4}>
            {rows.length} tax lines
          </td>
          <td className="px-3 py-2 text-right tnum">{currency(rows.reduce((s, t) => s + t.taxable, 0))}</td>
          <td className="px-3 py-2 text-right tnum">{currency(rows.reduce((s, t) => s + t.tax, 0))}</td>
          <td />
        </>
      } />);


}