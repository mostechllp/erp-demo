import React from 'react';
import { ArrowRightIcon, PlusIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { WorkflowStepper } from '../../components/patterns/WorkflowStepper';
import { STOCK_TRANSFERS } from '../../data/inventory';
import { shortDate } from '../../utils/format';

type Row = (typeof STOCK_TRANSFERS)[number];

export function StockTransfers() {
  return (
    <ListPage<Row>
      title="Stock Transfers"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Inventory & Store' }, { label: 'Stock Transfers' }]}
      description="Inter-warehouse and inter-branch movements with approval and receipt confirmation."
      actions={
      <Button variant="primary" icon={PlusIcon}>
          New transfer
        </Button>
      }
      summary={
      <Card title="Transfer workflow">
          <WorkflowStepper
          steps={[
          { label: 'Source location', state: 'done' },
          { label: 'Destination', state: 'done' },
          { label: 'Item & quantity', state: 'done' },
          { label: 'Approval', state: 'current', to: '/approvals' },
          { label: 'Transfer out', state: 'todo' },
          { label: 'Receive at destination', state: 'todo' }]
          } />
        
        </Card>
      }
      rows={STOCK_TRANSFERS}
      rowKey={(t) => t.id}
      searchText={(t) => `${t.id} ${t.from} ${t.to} ${t.product}`}
      selectable
      statusTabs={[
      { id: 'all', label: 'All transfers', match: () => true },
      { id: 'pending', label: 'Pending approval', match: (t) => t.status === 'Pending Approval' },
      { id: 'transit', label: 'In transit', match: (t) => t.status === 'In Transit' },
      { id: 'received', label: 'Received', match: (t) => t.status === 'Received' }]
      }
      filters={[
      { id: 'status', label: 'Status', options: [...new Set(STOCK_TRANSFERS.map((t) => t.status))] },
      { id: 'from', label: 'From', options: [...new Set(STOCK_TRANSFERS.map((t) => t.from))] },
      { id: 'to', label: 'To', options: [...new Set(STOCK_TRANSFERS.map((t) => t.to))] }]
      }
      filterValue={(t, id) => id === 'status' ? t.status : id === 'from' ? t.from : t.to}
      rowActions={(t) => [
      { label: 'View transfer' },
      { label: 'Approve', disabled: t.status !== 'Pending Approval' },
      { label: 'Confirm receipt', disabled: t.status !== 'In Transit' },
      { label: 'Cancel transfer', danger: true, separatorBefore: true }]
      }
      columns={[
      { key: 'id', header: 'Transfer', render: (t) => <span className="font-mono text-xs text-brand-700">{t.id}</span>, sortValue: (t) => t.id },
      {
        key: 'route',
        header: 'Route',
        render: (t) =>
        <span className="inline-flex items-center gap-1.5 text-slate-700">
              {t.from} <ArrowRightIcon className="h-3 w-3 text-slate-400" /> {t.to}
            </span>

      },
      { key: 'product', header: 'Item', render: (t) => <span className="font-medium text-slate-900">{t.product}</span>, sortValue: (t) => t.product },
      { key: 'qty', header: 'Qty', align: 'right', render: (t) => t.qty, sortValue: (t) => t.qty },
      { key: 'requested', header: 'Requested', render: (t) => shortDate(t.requested), sortValue: (t) => t.requested },
      { key: 'approver', header: 'Approver', render: (t) => t.approver },
      { key: 'status', header: 'Status', render: (t) => <StatusBadge status={t.status} />, sortValue: (t) => t.status }]
      } />);


}