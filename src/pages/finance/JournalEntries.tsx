import React from 'react';
import { CheckIcon, PlusIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { JOURNAL_ENTRIES } from '../../data/finance';
import { currency, shortDate } from '../../utils/format';

type Row = (typeof JOURNAL_ENTRIES)[number];

export function JournalEntries() {
  return (
    <ListPage<Row>
      title="Journal Entries"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Finance & Accounting' }, { label: 'Journal Entries' }]}
      description="System-generated and manual journals, with approval before posting."
      actions={
      <>
          <Button icon={CheckIcon}>Post selected</Button>
          <Button variant="primary" icon={PlusIcon}>
            New journal
          </Button>
        </>
      }
      rows={JOURNAL_ENTRIES}
      rowKey={(j) => j.id}
      searchText={(j) => `${j.id} ${j.type} ${j.reference} ${j.description} ${j.createdBy}`}
      selectable
      statusTabs={[
      { id: 'all', label: 'All journals', match: () => true },
      { id: 'draft', label: 'Draft', match: (j) => j.status === 'Draft' },
      { id: 'pending', label: 'Pending approval', match: (j) => j.status === 'Pending Approval' },
      { id: 'posted', label: 'Posted', match: (j) => j.status === 'Posted' }]
      }
      filters={[
      { id: 'type', label: 'Type', options: [...new Set(JOURNAL_ENTRIES.map((j) => j.type))] },
      { id: 'status', label: 'Status', options: [...new Set(JOURNAL_ENTRIES.map((j) => j.status))] },
      { id: 'createdBy', label: 'Created by', options: [...new Set(JOURNAL_ENTRIES.map((j) => j.createdBy))] }]
      }
      filterValue={(j, id) => id === 'type' ? j.type : id === 'status' ? j.status : j.createdBy}
      rowActions={(j) => [
      { label: 'View journal' },
      { label: 'Post to ledger', icon: CheckIcon, disabled: j.status === 'Posted' },
      { label: 'Reverse journal', danger: true, separatorBefore: true, disabled: j.status !== 'Posted' }]
      }
      columns={[
      { key: 'id', header: 'Journal', render: (j) => <span className="font-mono text-xs text-brand-700">{j.id}</span>, sortValue: (j) => j.id },
      { key: 'date', header: 'Date', render: (j) => shortDate(j.date), sortValue: (j) => j.date },
      { key: 'type', header: 'Type', render: (j) => j.type, sortValue: (j) => j.type },
      { key: 'reference', header: 'Reference', render: (j) => <span className="font-mono text-xs text-slate-500">{j.reference}</span> },
      { key: 'description', header: 'Description', render: (j) => <span className="font-medium text-slate-900">{j.description}</span> },
      { key: 'debit', header: 'Debit', align: 'right', render: (j) => currency(j.debit), sortValue: (j) => j.debit },
      { key: 'credit', header: 'Credit', align: 'right', render: (j) => currency(j.credit) },
      { key: 'createdBy', header: 'Created by', render: (j) => j.createdBy, optional: true },
      { key: 'status', header: 'Status', render: (j) => <StatusBadge status={j.status} />, sortValue: (j) => j.status }]
      } />);


}