import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon, EyeIcon, PlusIcon, PrinterIcon, TruckIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { RecordLink } from '../../components/patterns/RecordLink';
import { KpiCard } from '../../components/patterns/KpiCard';
import { SALES_ORDERS } from '../../data/sales';
import { currency, shortDate } from '../../utils/format';
import type { SalesOrder } from '../../types/erp';

export function SalesOrders() {
  const navigate = useNavigate();
  const open = SALES_ORDERS.filter((o) => !['Delivered', 'Cancelled'].includes(o.status));

  return (
    <ListPage<SalesOrder>
      title="Sales Orders"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Sales & CRM' }, { label: 'Sales Orders' }]}
      description="Confirmed demand driving inventory reservation, production and procurement."
      actions={
      <>
          <Button icon={PrinterIcon}>Print</Button>
          <Button variant="primary" icon={PlusIcon}>
            New sales order
          </Button>
        </>
      }
      summary={
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="Open order value" value={currency(open.reduce((s, o) => s + o.amount, 0), { compact: true })} delta={9.9} />
          <KpiCard label="Awaiting approval" value={String(SALES_ORDERS.filter((o) => o.status === 'Pending Approval').length)} hint="Credit or discount holds" />
          <KpiCard label="In production" value="3" hint="Linked to work orders" />
          <KpiCard label="Ready to invoice" value="2" hint="Delivered, not yet billed" />
        </div>
      }
      rows={SALES_ORDERS}
      rowKey={(o) => o.id}
      onRowClick={(o) => navigate(`/sales/orders/${o.id}`)}
      searchText={(o) => `${o.id} ${o.customer} ${o.salesperson} ${o.warehouse} ${o.status}`}
      selectable
      bulkActions={[{ label: 'Approve', icon: CheckIcon }, { label: 'Create delivery', icon: TruckIcon }, { label: 'Cancel orders', danger: true }]}
      statusTabs={[
      { id: 'all', label: 'All orders', match: () => true },
      { id: 'draft', label: 'Draft', match: (o) => o.status === 'Draft' },
      { id: 'approval', label: 'Pending approval', match: (o) => o.status === 'Pending Approval' },
      { id: 'active', label: 'Confirmed & processing', match: (o) => ['Confirmed', 'Processing', 'Partially Delivered'].includes(o.status) },
      { id: 'delivered', label: 'Delivered', match: (o) => o.status === 'Delivered' },
      { id: 'cancelled', label: 'Cancelled', match: (o) => o.status === 'Cancelled' }]
      }
      filters={[
      { id: 'status', label: 'Status', options: [...new Set(SALES_ORDERS.map((o) => o.status))] },
      { id: 'salesperson', label: 'Salesperson', options: [...new Set(SALES_ORDERS.map((o) => o.salesperson))] },
      { id: 'warehouse', label: 'Warehouse', options: [...new Set(SALES_ORDERS.map((o) => o.warehouse))] },
      { id: 'currency', label: 'Currency', options: [...new Set(SALES_ORDERS.map((o) => o.currency))] }]
      }
      filterValue={(o, id) =>
      id === 'status' ? o.status : id === 'salesperson' ? o.salesperson : id === 'warehouse' ? o.warehouse : o.currency
      }
      rowActions={(o) => [
      { label: 'View order', icon: EyeIcon, onSelect: () => navigate(`/sales/orders/${o.id}`) },
      { label: 'Approve', icon: CheckIcon, disabled: o.status !== 'Pending Approval' },
      { label: 'Create delivery', icon: TruckIcon, disabled: !['Confirmed', 'Processing'].includes(o.status) },
      { label: 'Print order confirmation', icon: PrinterIcon },
      { label: 'Cancel order', danger: true, separatorBefore: true }]
      }
      columns={[
      { key: 'id', header: 'Order', render: (o) => <RecordLink to={`/sales/orders/${o.id}`}>{o.id}</RecordLink>, sortValue: (o) => o.id },
      { key: 'customer', header: 'Customer', render: (o) => <span className="font-medium text-slate-900">{o.customer}</span>, sortValue: (o) => o.customer },
      { key: 'orderDate', header: 'Order date', render: (o) => shortDate(o.orderDate), sortValue: (o) => o.orderDate },
      { key: 'deliveryDate', header: 'Delivery', render: (o) => shortDate(o.deliveryDate), sortValue: (o) => o.deliveryDate },
      { key: 'warehouse', header: 'Warehouse', render: (o) => o.warehouse, optional: true },
      { key: 'salesperson', header: 'Salesperson', render: (o) => o.salesperson, optional: true },
      { key: 'currency', header: 'Curr.', render: (o) => o.currency, optional: true },
      { key: 'amount', header: 'Order value', align: 'right', render: (o) => currency(o.amount), sortValue: (o) => o.amount },
      {
        key: 'paid',
        header: 'Received',
        align: 'right',
        render: (o) => <span className={o.paid === 0 ? 'text-slate-400' : 'text-emerald-700'}>{currency(o.paid)}</span>,
        sortValue: (o) => o.paid
      },
      { key: 'status', header: 'Status', render: (o) => <StatusBadge status={o.status} />, sortValue: (o) => o.status }]
      }
      totalsRow={(rows) =>
      <>
          <td className="px-3 py-2 text-xs uppercase tracking-wide text-slate-500" colSpan={7}>
            {rows.length} orders
          </td>
          <td className="px-3 py-2 text-right tnum">{currency(rows.reduce((s, o) => s + o.amount, 0))}</td>
          <td className="px-3 py-2 text-right tnum">{currency(rows.reduce((s, o) => s + o.paid, 0))}</td>
          <td />
        </>
      } />);


}