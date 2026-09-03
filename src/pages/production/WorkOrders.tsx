import React from 'react';
import { PlayIcon, PlusIcon, SquareIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Progress } from '../../components/ui/Progress';
import { RecordLink } from '../../components/patterns/RecordLink';
import { WORK_ORDERS } from '../../data/production';
import { number, shortDate } from '../../utils/format';
import type { WorkOrder } from '../../types/erp';

export function WorkOrders() {
  return (
    <ListPage<WorkOrder>
      title="Work Orders"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Production' }, { label: 'Work Orders' }]}
      description="Planned → Released → In progress → Paused → Completed. Linked to sales demand and material issues."
      actions={
      <>
          <Button icon={PlayIcon}>Release selected</Button>
          <Button variant="primary" icon={PlusIcon}>
            New work order
          </Button>
        </>
      }
      rows={WORK_ORDERS}
      rowKey={(w) => w.id}
      searchText={(w) => `${w.id} ${w.product} ${w.workCenter} ${w.machine} ${w.operator} ${w.plan}`}
      selectable
      bulkActions={[{ label: 'Release', icon: PlayIcon }, { label: 'Pause', icon: SquareIcon }, { label: 'Cancel', danger: true }]}
      statusTabs={[
      { id: 'all', label: 'All work orders', match: () => true },
      { id: 'planned', label: 'Planned', match: (w) => w.status === 'Planned' },
      { id: 'released', label: 'Released', match: (w) => w.status === 'Released' },
      { id: 'progress', label: 'In progress', match: (w) => w.status === 'In Progress' },
      { id: 'paused', label: 'Paused', match: (w) => w.status === 'Paused' },
      { id: 'completed', label: 'Completed', match: (w) => w.status === 'Completed' }]
      }
      filters={[
      { id: 'status', label: 'Status', options: [...new Set(WORK_ORDERS.map((w) => w.status))] },
      { id: 'workCenter', label: 'Work centre', options: [...new Set(WORK_ORDERS.map((w) => w.workCenter))] },
      { id: 'machine', label: 'Machine', options: [...new Set(WORK_ORDERS.map((w) => w.machine))] },
      { id: 'operator', label: 'Operator', options: [...new Set(WORK_ORDERS.map((w) => w.operator))] }]
      }
      filterValue={(w, id) =>
      id === 'status' ? w.status : id === 'workCenter' ? w.workCenter : id === 'machine' ? w.machine : w.operator
      }
      rowActions={(w) => [
      { label: 'Open work order' },
      { label: 'Release to shop floor', icon: PlayIcon, disabled: w.status !== 'Planned' },
      { label: 'Issue materials' },
      { label: 'Record output' },
      { label: 'Cancel work order', danger: true, separatorBefore: true }]
      }
      columns={[
      { key: 'id', header: 'Work order', render: (w) => <span className="font-mono text-xs text-brand-700">{w.id}</span>, sortValue: (w) => w.id },
      { key: 'plan', header: 'Plan', render: (w) => <span className="font-mono text-xs text-slate-500">{w.plan}</span>, optional: true },
      {
        key: 'product',
        header: 'Product',
        render: (w) =>
        <div>
              <p className="font-medium text-slate-900">{w.product}</p>
              {w.sourceOrder &&
          <p className="text-xs text-slate-500">
                  For <RecordLink to={`/sales/orders/${w.sourceOrder}`}>{w.sourceOrder}</RecordLink>
                </p>
          }
            </div>,

        sortValue: (w) => w.product
      },
      { key: 'qty', header: 'Qty', align: 'right', render: (w) => number(w.qty), sortValue: (w) => w.qty },
      { key: 'produced', header: 'Produced', align: 'right', render: (w) => number(w.produced), sortValue: (w) => w.produced },
      { key: 'rejected', header: 'Rejected', align: 'right', render: (w) => <span className={w.rejected ? 'text-red-600' : 'text-slate-400'}>{w.rejected}</span> },
      { key: 'workCenter', header: 'Work centre', render: (w) => w.workCenter },
      { key: 'machine', header: 'Machine', render: (w) => w.machine, optional: true },
      { key: 'operator', header: 'Operator', render: (w) => w.operator },
      { key: 'start', header: 'Start', render: (w) => shortDate(w.start), sortValue: (w) => w.start, optional: true },
      { key: 'end', header: 'Finish', render: (w) => shortDate(w.end), sortValue: (w) => w.end, optional: true },
      {
        key: 'progress',
        header: 'Progress',
        width: '150px',
        sortValue: (w) => w.progress,
        render: (w) => <Progress value={w.progress} tone={w.status === 'Paused' ? 'warning' : w.status === 'Completed' ? 'success' : 'brand'} showValue label={`${w.id} progress`} />
      },
      { key: 'status', header: 'Status', render: (w) => <StatusBadge status={w.status} />, sortValue: (w) => w.status }]
      } />);


}