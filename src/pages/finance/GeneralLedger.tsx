import React from 'react';
import { ListPage } from '../../components/patterns/ListPage';
import { RecordLink } from '../../components/patterns/RecordLink';
import { GENERAL_LEDGER } from '../../data/finance';
import { currency, shortDate } from '../../utils/format';

type Row = (typeof GENERAL_LEDGER)[number];

export function GeneralLedger() {
  return (
    <ListPage<Row>
      title="General Ledger"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Finance & Accounting' }, { label: 'General Ledger' }]}
      description="Every posting from sales, procurement, inventory, production, projects and payroll."
      rows={GENERAL_LEDGER}
      rowKey={(g) => g.id}
      searchText={(g) => `${g.id} ${g.account} ${g.journal} ${g.reference} ${g.description}`}
      dense
      statusTabs={[
      { id: 'all', label: 'All postings', match: () => true },
      { id: 'debit', label: 'Debits', match: (g) => g.debit > 0 },
      { id: 'credit', label: 'Credits', match: (g) => g.credit > 0 }]
      }
      filters={[
      { id: 'account', label: 'Account', options: [...new Set(GENERAL_LEDGER.map((g) => g.account))] },
      { id: 'journal', label: 'Journal', options: [...new Set(GENERAL_LEDGER.map((g) => g.journal))] }]
      }
      filterValue={(g, id) => id === 'account' ? g.account : g.journal}
      columns={[
      { key: 'date', header: 'Date', render: (g) => shortDate(g.date), sortValue: (g) => g.date },
      { key: 'account', header: 'Account', render: (g) => <span className="font-medium text-slate-900">{g.account}</span>, sortValue: (g) => g.account },
      { key: 'journal', header: 'Journal', render: (g) => <RecordLink to="/finance/journals">{g.journal}</RecordLink> },
      { key: 'reference', header: 'Source document', render: (g) => <span className="font-mono text-xs text-slate-500">{g.reference}</span> },
      { key: 'description', header: 'Description', render: (g) => <span className="text-slate-600">{g.description}</span> },
      { key: 'debit', header: 'Debit', align: 'right', render: (g) => g.debit ? currency(g.debit) : <span className="text-slate-300">—</span>, sortValue: (g) => g.debit },
      { key: 'credit', header: 'Credit', align: 'right', render: (g) => g.credit ? currency(g.credit) : <span className="text-slate-300">—</span>, sortValue: (g) => g.credit }]
      }
      totalsRow={(rows) =>
      <>
          <td className="px-3 py-2 text-xs uppercase tracking-wide text-slate-500" colSpan={5}>
            {rows.length} postings
          </td>
          <td className="px-3 py-2 text-right tnum">{currency(rows.reduce((s, g) => s + g.debit, 0))}</td>
          <td className="px-3 py-2 text-right tnum">{currency(rows.reduce((s, g) => s + g.credit, 0))}</td>
        </>
      } />);


}