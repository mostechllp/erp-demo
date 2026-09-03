import React from 'react';
import { PlusIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Progress } from '../../components/ui/Progress';
import { RecordLink } from '../../components/patterns/RecordLink';
import { PROJECT_TASKS } from '../../data/projects';
import { number, shortDate } from '../../utils/format';

type Row = (typeof PROJECT_TASKS)[number];

export function Tasks() {
  return (
    <ListPage<Row>
      title="Tasks"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Projects & Job Costing' }, { label: 'Tasks' }]}
      description="Work breakdown across all active projects with progress and booked hours."
      actions={
      <Button variant="primary" icon={PlusIcon}>
          New task
        </Button>
      }
      rows={PROJECT_TASKS}
      rowKey={(t) => t.id}
      searchText={(t) => `${t.id} ${t.name} ${t.assignee} ${t.project}`}
      selectable
      statusTabs={[
      { id: 'all', label: 'All tasks', match: () => true },
      { id: 'progress', label: 'In progress', match: (t) => t.status === 'In Progress' },
      { id: 'hold', label: 'On hold', match: (t) => t.status === 'On Hold' },
      { id: 'done', label: 'Completed', match: (t) => t.status === 'Completed' }]
      }
      filters={[
      { id: 'project', label: 'Project', options: [...new Set(PROJECT_TASKS.map((t) => t.project))] },
      { id: 'assignee', label: 'Assignee', options: [...new Set(PROJECT_TASKS.map((t) => t.assignee))] },
      { id: 'status', label: 'Status', options: [...new Set(PROJECT_TASKS.map((t) => t.status))] }]
      }
      filterValue={(t, id) => id === 'project' ? t.project : id === 'assignee' ? t.assignee : t.status}
      rowActions={() => [{ label: 'Open task' }, { label: 'Reassign' }, { label: 'Log hours' }, { label: 'Delete task', danger: true }]}
      columns={[
      { key: 'id', header: 'Task', render: (t) => <span className="font-mono text-xs text-brand-700">{t.id}</span>, sortValue: (t) => t.id },
      { key: 'project', header: 'Project', render: (t) => <RecordLink to={`/projects/${t.project}`}>{t.project}</RecordLink> },
      { key: 'name', header: 'Task', render: (t) => <span className="font-medium text-slate-900">{t.name}</span>, sortValue: (t) => t.name },
      { key: 'assignee', header: 'Assignee', render: (t) => t.assignee, sortValue: (t) => t.assignee },
      { key: 'start', header: 'Start', render: (t) => shortDate(t.start), optional: true },
      { key: 'due', header: 'Due', render: (t) => shortDate(t.due), sortValue: (t) => t.due },
      { key: 'hours', header: 'Hours', align: 'right', render: (t) => number(t.hours), sortValue: (t) => t.hours },
      {
        key: 'progress',
        header: 'Progress',
        width: '170px',
        sortValue: (t) => t.progress,
        render: (t) => <Progress value={t.progress} tone={t.status === 'On Hold' ? 'warning' : t.progress === 100 ? 'success' : 'brand'} showValue label={`${t.name} progress`} />
      },
      { key: 'status', header: 'Status', render: (t) => <StatusBadge status={t.status} />, sortValue: (t) => t.status }]
      } />);


}