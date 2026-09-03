import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArchiveIcon, CopyIcon, EyeIcon, PencilIcon, PlusIcon, PrinterIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { RecordLink } from '../../components/patterns/RecordLink';
import { Progress } from '../../components/ui/Progress';
import { CUSTOMERS } from '../../data/sales';
import { currency } from '../../utils/format';
import type { Customer } from '../../types/erp';

export function Customers() {
  const navigate = useNavigate();

  return (
    <ListPage<Customer>
      title="Customers"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Sales & CRM' }, { label: 'Customers' }]}
      description="Master customer records shared by sales, projects, workshop and finance."
      actions={
      <>
          <Button icon={PrinterIcon}>Print list</Button>
          <Button variant="primary" icon={PlusIcon}>
            New customer
          </Button>
        </>
      }
      rows={CUSTOMERS}
      rowKey={(c) => c.id}
      searchText={(c) => `${c.id} ${c.name} ${c.company} ${c.contact} ${c.email} ${c.segment} ${c.owner}`}
      selectable
      onRowClick={(c) => navigate(`/sales/customers/${c.id}`)}
      statusTabs={[
      { id: 'all', label: 'All customers', match: () => true },
      { id: 'active', label: 'Active', match: (c) => c.status === 'Active' },
      { id: 'hold', label: 'On hold', match: (c) => c.status === 'On Hold' },
      { id: 'owing', label: 'With balance', match: (c) => c.outstanding > 0 },
      { id: 'inactive', label: 'Inactive', match: (c) => c.status === 'Inactive' }]
      }
      filters={[
      { id: 'status', label: 'Status', options: ['Active', 'On Hold', 'Inactive'] },
      { id: 'segment', label: 'Segment', options: [...new Set(CUSTOMERS.map((c) => c.segment))] },
      { id: 'owner', label: 'Owner', options: [...new Set(CUSTOMERS.map((c) => c.owner))] }]
      }
      filterValue={(c, id) => id === 'status' ? c.status : id === 'segment' ? c.segment : c.owner}
      rowActions={(c) => [
      { label: 'View customer', icon: EyeIcon, onSelect: () => navigate(`/sales/customers/${c.id}`) },
      { label: 'Edit', icon: PencilIcon },
      { label: 'Duplicate', icon: CopyIcon },
      { label: 'Archive', icon: ArchiveIcon, danger: true, separatorBefore: true }]
      }
      columns={[
      {
        key: 'id',
        header: 'Customer ID',
        width: '120px',
        render: (c) => <RecordLink to={`/sales/customers/${c.id}`}>{c.id}</RecordLink>,
        sortValue: (c) => c.id
      },
      {
        key: 'name',
        header: 'Customer',
        render: (c) =>
        <div className="min-w-0">
              <p className="truncate font-medium text-slate-900">{c.name}</p>
              <p className="truncate text-xs text-slate-500">{c.company}</p>
            </div>,

        sortValue: (c) => c.name
      },
      { key: 'contact', header: 'Contact', render: (c) => c.contact, optional: true },
      {
        key: 'email',
        header: 'Email',
        optional: true,
        render: (c) => <span className="text-slate-600">{c.email}</span>
      },
      { key: 'phone', header: 'Phone', optional: true, render: (c) => <span className="tnum">{c.phone}</span> },
      { key: 'segment', header: 'Segment', render: (c) => c.segment, sortValue: (c) => c.segment },
      {
        key: 'outstanding',
        header: 'Outstanding',
        align: 'right',
        sortValue: (c) => c.outstanding,
        render: (c) =>
        <span className={c.outstanding > c.creditLimit * 0.75 ? 'font-semibold text-red-600' : 'text-slate-800'}>
              {currency(c.outstanding)}
            </span>

      },
      {
        key: 'credit',
        header: 'Credit usage',
        width: '150px',
        render: (c) =>
        <Progress
          value={c.outstanding / c.creditLimit * 100}
          tone={c.outstanding / c.creditLimit > 0.75 ? 'danger' : c.outstanding / c.creditLimit > 0.5 ? 'warning' : 'success'}
          showValue
          label={`${c.name} credit usage`} />


      },
      { key: 'status', header: 'Status', render: (c) => <StatusBadge status={c.status} />, sortValue: (c) => c.status }]
      } />);


}