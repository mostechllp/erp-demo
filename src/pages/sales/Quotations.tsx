import React from 'react';
import { ArrowRightIcon, PlusIcon, SendIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { RecordLink } from '../../components/patterns/RecordLink';
import { QUOTATIONS } from '../../data/sales';
import { currency, shortDate } from '../../utils/format';
import type { Quotation } from '../../types/erp';

export function Quotations() {
  return (
    <ListPage<Quotation>
      title="Quotations"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Sales & CRM' }, { label: 'Quotations' }]}
      description="Draft → Sent → Accepted / Rejected → converted into a sales order."
      actions={
      <>
          <Button icon={SendIcon}>Send selected</Button>
          <Button variant="primary" icon={PlusIcon}>
            New quotation
          </Button>
        </>
      }
      rows={QUOTATIONS}
      rowKey={(q) => q.id}
      searchText={(q) => `${q.id} ${q.customer} ${q.owner} ${q.status}`}
      selectable
      statusTabs={[
      { id: 'all', label: 'All', match: () => true },
      { id: 'draft', label: 'Draft', match: (q) => q.status === 'Draft' },
      { id: 'sent', label: 'Sent', match: (q) => q.status === 'Sent' },
      { id: 'accepted', label: 'Accepted', match: (q) => q.status === 'Accepted' },
      { id: 'rejected', label: 'Rejected', match: (q) => q.status === 'Rejected' }]
      }
      filters={[
      { id: 'status', label: 'Status', options: ['Draft', 'Sent', 'Accepted', 'Rejected'] },
      { id: 'owner', label: 'Owner', options: [...new Set(QUOTATIONS.map((q) => q.owner))] },
      { id: 'customer', label: 'Customer', options: [...new Set(QUOTATIONS.map((q) => q.customer))] }]
      }
      filterValue={(q, id) => id === 'status' ? q.status : id === 'owner' ? q.owner : q.customer}
      rowActions={(q) => [
      { label: 'Send to customer', icon: SendIcon, disabled: q.status !== 'Draft' },
      { label: 'Convert to sales order', icon: ArrowRightIcon, disabled: q.status !== 'Accepted' },
      { label: 'Duplicate' },
      { label: 'Cancel quotation', danger: true, separatorBefore: true }]
      }
      columns={[
      { key: 'id', header: 'Quotation', render: (q) => <span className="font-mono text-xs text-brand-700">{q.id}</span>, sortValue: (q) => q.id },
      { key: 'customer', header: 'Customer', render: (q) => <span className="font-medium text-slate-900">{q.customer}</span>, sortValue: (q) => q.customer },
      { key: 'date', header: 'Date', render: (q) => shortDate(q.date), sortValue: (q) => q.date },
      { key: 'valid', header: 'Valid until', render: (q) => shortDate(q.validUntil), sortValue: (q) => q.validUntil, optional: true },
      { key: 'owner', header: 'Owner', render: (q) => q.owner, optional: true },
      { key: 'amount', header: 'Amount', align: 'right', render: (q) => currency(q.amount), sortValue: (q) => q.amount },
      { key: 'status', header: 'Status', render: (q) => <StatusBadge status={q.status} />, sortValue: (q) => q.status },
      {
        key: 'converted',
        header: 'Converted to',
        render: (q) =>
        q.convertedTo ? <RecordLink to={`/sales/orders/${q.convertedTo}`}>{q.convertedTo}</RecordLink> : <span className="text-slate-400">—</span>
      }]
      } />);


}