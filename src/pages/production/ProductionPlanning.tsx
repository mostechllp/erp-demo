import React from 'react';
import { PlusIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Badge } from '../../components/ui/Badge';
import { PRODUCTION_PLANS } from '../../data/production';
import { number, shortDate } from '../../utils/format';
import { toneFor } from '../../utils/status';

type Row = (typeof PRODUCTION_PLANS)[number];

export function ProductionPlanning() {
  return (
    <ListPage<Row>
      title="Production Planning"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Production' }, { label: 'Production Planning' }]}
      description="Master production schedule driven by confirmed sales orders and demand forecast."
      actions={
      <>
          <Button>Run MRP</Button>
          <Button variant="primary" icon={PlusIcon}>
            New production plan
          </Button>
        </>
      }
      rows={PRODUCTION_PLANS}
      rowKey={(p) => p.id}
      searchText={(p) => `${p.id} ${p.product} ${p.workCenter} ${p.owner} ${p.source}`}
      selectable
      statusTabs={[
      { id: 'all', label: 'All plans', match: () => true },
      { id: 'draft', label: 'Draft', match: (p) => p.status === 'Draft' },
      { id: 'planned', label: 'Planned', match: (p) => p.status === 'Planned' },
      { id: 'progress', label: 'In progress', match: (p) => p.status === 'In Progress' }]
      }
      filters={[
      { id: 'status', label: 'Status', options: [...new Set(PRODUCTION_PLANS.map((p) => p.status))] },
      { id: 'workCenter', label: 'Work centre', options: [...new Set(PRODUCTION_PLANS.map((p) => p.workCenter))] },
      { id: 'priority', label: 'Priority', options: ['Low', 'Normal', 'High'] }]
      }
      filterValue={(p, id) => id === 'status' ? p.status : id === 'workCenter' ? p.workCenter : p.priority}
      rowActions={() => [{ label: 'Open plan' }, { label: 'Generate work orders' }, { label: 'Check material availability' }, { label: 'Cancel plan', danger: true }]}
      columns={[
      { key: 'id', header: 'Plan', render: (p) => <span className="font-mono text-xs text-brand-700">{p.id}</span>, sortValue: (p) => p.id },
      { key: 'product', header: 'Product', render: (p) => <span className="font-medium text-slate-900">{p.product}</span>, sortValue: (p) => p.product },
      { key: 'qty', header: 'Quantity', align: 'right', render: (p) => number(p.qty), sortValue: (p) => p.qty },
      { key: 'start', header: 'Start', render: (p) => shortDate(p.start), sortValue: (p) => p.start },
      { key: 'due', header: 'Expected completion', render: (p) => shortDate(p.due), sortValue: (p) => p.due },
      { key: 'workCenter', header: 'Work centre', render: (p) => p.workCenter },
      { key: 'priority', header: 'Priority', render: (p) => <Badge tone={toneFor(p.priority)}>{p.priority}</Badge> },
      { key: 'owner', header: 'Responsible', render: (p) => p.owner },
      { key: 'source', header: 'Demand source', render: (p) => <span className="font-mono text-xs text-slate-500">{p.source}</span>, optional: true },
      { key: 'status', header: 'Status', render: (p) => <StatusBadge status={p.status} />, sortValue: (p) => p.status }]
      } />);


}