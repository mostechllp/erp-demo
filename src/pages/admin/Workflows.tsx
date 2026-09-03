import React from 'react';
import { PlusIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { APPROVAL_WORKFLOWS } from '../../data/governance';

type Row = (typeof APPROVAL_WORKFLOWS)[number];

export function Workflows() {
  return (
    <ListPage<Row>
      title="Approval Workflows"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Administration' }, { label: 'Approval Workflows' }]}
      description="Configurable approval chains: level 1 manager → level 2 department head → level 3 finance or admin."
      actions={
      <Button variant="primary" icon={PlusIcon}>
          New workflow
        </Button>
      }
      rows={APPROVAL_WORKFLOWS}
      rowKey={(w) => w.id}
      searchText={(w) => `${w.id} ${w.name} ${w.module} ${w.trigger} ${w.owner}`}
      selectable
      statusTabs={[
      { id: 'all', label: 'All workflows', match: () => true },
      { id: 'active', label: 'Active', match: (w) => w.active },
      { id: 'inactive', label: 'Inactive', match: (w) => !w.active }]
      }
      filters={[
      { id: 'module', label: 'Module', options: [...new Set(APPROVAL_WORKFLOWS.map((w) => w.module))] },
      { id: 'owner', label: 'Owner', options: [...new Set(APPROVAL_WORKFLOWS.map((w) => w.owner))] }]
      }
      filterValue={(w, id) => id === 'module' ? w.module : w.owner}
      rowActions={(w) => [
      { label: 'Edit levels' },
      { label: 'Test workflow' },
      { label: w.active ? 'Deactivate' : 'Activate', danger: w.active, separatorBefore: true }]
      }
      columns={[
      { key: 'id', header: 'Code', render: (w) => <span className="font-mono text-xs text-brand-700">{w.id}</span>, sortValue: (w) => w.id },
      { key: 'name', header: 'Workflow', render: (w) => <span className="font-medium text-slate-900">{w.name}</span>, sortValue: (w) => w.name },
      { key: 'module', header: 'Module', render: (w) => <Badge tone="neutral">{w.module}</Badge>, sortValue: (w) => w.module },
      { key: 'trigger', header: 'Trigger condition', render: (w) => <span className="text-slate-600">{w.trigger}</span> },
      {
        key: 'levels',
        header: 'Approval chain',
        render: (w) =>
        <span className="text-xs text-slate-600">
              {['Manager', 'Department Head', 'Finance / Admin'].slice(0, w.levels).join(' → ')}
            </span>,

        sortValue: (w) => w.levels
      },
      { key: 'sla', header: 'SLA', render: (w) => w.sla },
      { key: 'owner', header: 'Owner', render: (w) => w.owner, optional: true },
      { key: 'active', header: 'State', render: (w) => <Badge tone={w.active ? 'success' : 'neutral'}>{w.active ? 'Active' : 'Inactive'}</Badge> }]
      } />);


}