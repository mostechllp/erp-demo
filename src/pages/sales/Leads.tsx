import React from 'react';
import { ArrowRightIcon, PlusIcon, UserCheckIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { WorkflowStepper } from '../../components/patterns/WorkflowStepper';
import { Card } from '../../components/ui/Card';
import { LEADS } from '../../data/sales';
import { currency } from '../../utils/format';
import type { Lead } from '../../types/erp';

export function Leads() {
  return (
    <ListPage<Lead>
      title="Leads"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Sales & CRM' }, { label: 'Leads' }]}
      description="Qualified opportunities feeding the quotation pipeline."
      actions={
      <>
          <Button icon={UserCheckIcon}>Assign owner</Button>
          <Button variant="primary" icon={PlusIcon}>
            New lead
          </Button>
        </>
      }
      summary={
      <Card title="Sales lifecycle" description="Leads convert into quotations, then orders, delivery and cash">
          <WorkflowStepper
          steps={[
          { label: 'Lead', state: 'current', to: '/sales/leads' },
          { label: 'Quotation', state: 'todo', to: '/sales/quotations' },
          { label: 'Sales Order', state: 'todo', to: '/sales/orders' },
          { label: 'Inventory', state: 'todo', to: '/inventory/stock' },
          { label: 'Delivery', state: 'todo', to: '/logistics/shipments' },
          { label: 'Invoice', state: 'todo', to: '/sales/invoices' },
          { label: 'Payment', state: 'todo', to: '/finance/receivable' }]
          } />
        
        </Card>
      }
      rows={LEADS}
      rowKey={(l) => l.id}
      searchText={(l) => `${l.id} ${l.name} ${l.company} ${l.owner} ${l.source}`}
      selectable
      statusTabs={[
      { id: 'all', label: 'All leads', match: () => true },
      { id: 'new', label: 'New', match: (l) => l.stage === 'New' },
      { id: 'qualified', label: 'Qualified', match: (l) => l.stage === 'Qualified' },
      { id: 'review', label: 'In review', match: (l) => l.stage === 'In Review' }]
      }
      filters={[
      { id: 'stage', label: 'Stage', options: ['New', 'Qualified', 'In Review'] },
      { id: 'owner', label: 'Owner', options: [...new Set(LEADS.map((l) => l.owner))] },
      { id: 'source', label: 'Source', options: [...new Set(LEADS.map((l) => l.source))] }]
      }
      filterValue={(l, id) => id === 'stage' ? l.stage : id === 'owner' ? l.owner : l.source}
      rowActions={() => [
      { label: 'Convert to quotation', icon: ArrowRightIcon },
      { label: 'Reassign owner', icon: UserCheckIcon },
      { label: 'Mark as lost', danger: true, separatorBefore: true }]
      }
      columns={[
      { key: 'id', header: 'Lead ID', render: (l) => <span className="font-mono text-xs text-brand-700">{l.id}</span>, sortValue: (l) => l.id },
      {
        key: 'name',
        header: 'Opportunity',
        render: (l) =>
        <div>
              <p className="font-medium text-slate-900">{l.name}</p>
              <p className="text-xs text-slate-500">{l.company}</p>
            </div>,

        sortValue: (l) => l.name
      },
      { key: 'source', header: 'Source', render: (l) => l.source, optional: true },
      { key: 'owner', header: 'Owner', render: (l) => l.owner, sortValue: (l) => l.owner },
      { key: 'value', header: 'Estimated value', align: 'right', render: (l) => currency(l.value), sortValue: (l) => l.value },
      { key: 'stage', header: 'Stage', render: (l) => <StatusBadge status={l.stage} />, sortValue: (l) => l.stage },
      { key: 'next', header: 'Next action', render: (l) => <span className="text-slate-600">{l.nextAction}</span> }]
      }
      totalsRow={(rows) =>
      <>
          <td className="px-3 py-2 text-xs uppercase tracking-wide text-slate-500" colSpan={4}>
            Weighted pipeline ({rows.length} leads)
          </td>
          <td className="px-3 py-2 text-right tnum">{currency(rows.reduce((s, l) => s + l.value, 0))}</td>
          <td colSpan={3} />
        </>
      } />);


}