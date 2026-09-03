import React from 'react';
import { PlusIcon, ScaleIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { STOCK_ADJUSTMENTS } from '../../data/inventory';
import { currency, number, shortDate } from '../../utils/format';

type Row = (typeof STOCK_ADJUSTMENTS)[number];

export function StockAdjustments() {
  return (
    <ListPage<Row>
      title="Stock Adjustments"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Inventory & Store' }, { label: 'Stock Adjustments' }]}
      description="Cycle-count variances and write-offs. Adjustments above $1,000 require finance approval."
      actions={
      <>
          <Button icon={ScaleIcon}>Start cycle count</Button>
          <Button variant="primary" icon={PlusIcon}>
            New adjustment
          </Button>
        </>
      }
      rows={STOCK_ADJUSTMENTS}
      rowKey={(a) => a.id}
      searchText={(a) => `${a.id} ${a.warehouse} ${a.product} ${a.reason}`}
      selectable
      statusTabs={[
      { id: 'all', label: 'All adjustments', match: () => true },
      { id: 'pending', label: 'Pending approval', match: (a) => a.status === 'Pending Approval' },
      { id: 'approved', label: 'Approved', match: (a) => a.status === 'Approved' },
      { id: 'negative', label: 'Write-offs', match: (a) => a.variance < 0 }]
      }
      filters={[
      { id: 'status', label: 'Status', options: [...new Set(STOCK_ADJUSTMENTS.map((a) => a.status))] },
      { id: 'warehouse', label: 'Warehouse', options: [...new Set(STOCK_ADJUSTMENTS.map((a) => a.warehouse))] },
      { id: 'reason', label: 'Reason', options: [...new Set(STOCK_ADJUSTMENTS.map((a) => a.reason))] }]
      }
      filterValue={(a, id) => id === 'status' ? a.status : id === 'warehouse' ? a.warehouse : a.reason}
      rowActions={(a) => [
      { label: 'View adjustment' },
      { label: 'Approve', disabled: a.status !== 'Pending Approval' },
      { label: 'Reject', danger: true, disabled: a.status !== 'Pending Approval' }]
      }
      columns={[
      { key: 'id', header: 'Adjustment', render: (a) => <span className="font-mono text-xs text-brand-700">{a.id}</span>, sortValue: (a) => a.id },
      { key: 'warehouse', header: 'Warehouse', render: (a) => a.warehouse },
      { key: 'product', header: 'Item', render: (a) => <span className="font-medium text-slate-900">{a.product}</span>, sortValue: (a) => a.product },
      { key: 'system', header: 'System qty', align: 'right', render: (a) => number(a.system) },
      { key: 'counted', header: 'Counted', align: 'right', render: (a) => number(a.counted) },
      {
        key: 'variance',
        header: 'Variance',
        align: 'right',
        sortValue: (a) => a.variance,
        render: (a) => <span className={a.variance < 0 ? 'font-semibold text-red-600' : 'font-semibold text-emerald-700'}>{a.variance > 0 ? '+' : ''}{a.variance}</span>
      },
      {
        key: 'value',
        header: 'Value impact',
        align: 'right',
        sortValue: (a) => a.value,
        render: (a) => <span className={a.value < 0 ? 'text-red-600' : 'text-emerald-700'}>{currency(a.value)}</span>
      },
      { key: 'reason', header: 'Reason', render: (a) => <span className="text-slate-600">{a.reason}</span> },
      { key: 'date', header: 'Date', render: (a) => shortDate(a.date), sortValue: (a) => a.date },
      { key: 'status', header: 'Status', render: (a) => <StatusBadge status={a.status} />, sortValue: (a) => a.status }]
      } />);


}