import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis } from 'recharts';
import { FileTextIcon, PlusIcon } from 'lucide-react';
import { PageHeader } from '../../components/patterns/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Alert } from '../../components/ui/Alert';
import { Progress } from '../../components/ui/Progress';
import { DataTable } from '../../components/ui/DataTable';
import { DefinitionList } from '../../components/patterns/DefinitionList';
import { StatTile } from '../../components/patterns/StatTile';
import { Timeline } from '../../components/patterns/Timeline';
import { RecordLink } from '../../components/patterns/RecordLink';
import { WorkflowStepper } from '../../components/patterns/WorkflowStepper';
import { NotFound } from '../errors/NotFound';
import { JOBS, PROJECTS, PROJECT_EXPENSES, PROJECT_TASKS, TIMESHEETS } from '../../data/projects';
import { AXIS_PROPS, CHART_COLORS, GRID_PROPS, TOOLTIP_STYLE } from '../../components/charts/chartTheme';
import { currency, number, shortDate } from '../../utils/format';

const TABS = [
{ id: 'overview', label: 'Overview' },
{ id: 'jobs', label: 'Jobs' },
{ id: 'tasks', label: 'Tasks' },
{ id: 'costing', label: 'Job costing' },
{ id: 'timesheets', label: 'Timesheets' },
{ id: 'expenses', label: 'Expenses' },
{ id: 'activity', label: 'Activity' }];


export function ProjectDetail() {
  const { id } = useParams();
  const [tab, setTab] = useState('overview');
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) return <NotFound />;

  const jobs = JOBS.filter((j) => j.projectId === project.id);
  const tasks = PROJECT_TASKS.filter((t) => t.project === project.id);
  const sheets = TIMESHEETS.filter((t) => t.project === project.id);
  const expenses = PROJECT_EXPENSES.filter((e) => e.project === project.id);
  const variance = project.budget - project.actual;
  const margin = (project.revenue - project.actual) / project.revenue * 100;

  const costByCategory = jobs.length ?
  [
  { name: 'Material', value: jobs.reduce((s, j) => s + j.costs.material, 0) },
  { name: 'Labour', value: jobs.reduce((s, j) => s + j.costs.labour, 0) },
  { name: 'Equipment', value: jobs.reduce((s, j) => s + j.costs.equipment, 0) },
  { name: 'Travel', value: jobs.reduce((s, j) => s + j.costs.travel, 0) },
  { name: 'Other', value: jobs.reduce((s, j) => s + j.costs.other, 0) }] :

  [];

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title={project.name}
        crumbs={[
        { label: 'Home', to: '/dashboard' },
        { label: 'Projects & Job Costing' },
        { label: 'Projects', to: '/projects' },
        { label: project.id }]
        }
        meta={
        <>
            <span className="font-mono text-xs text-slate-500">{project.id}</span>
            <StatusBadge status={project.status} />
          </>
        }
        description={`${project.client} · manager ${project.manager} · ${shortDate(project.start)} → ${shortDate(project.end)}`}
        actions={
        <>
            <Button icon={FileTextIcon}>Progress invoice</Button>
            <Button variant="primary" icon={PlusIcon}>
              New job
            </Button>
          </>
        }
        tabs={<Tabs tabs={TABS} active={tab} onChange={setTab} />} />
      

      <div className="flex-1 space-y-4 p-6">
        {project.actual > project.budget &&
        <Alert tone="danger" title={`Budget exceeded by ${currency(project.actual - project.budget)}`}>
            A budget uplift request (APR-5507) was returned by finance pending a revised cost-to-complete and a signed
            customer variation order.
          </Alert>
        }

        <Card title="Project lifecycle" description="Project → jobs → tasks → labour, materials, expenses → job cost → revenue → profitability">
          <WorkflowStepper
            steps={[
            { label: 'Project', state: 'done', meta: project.id },
            { label: 'Jobs', state: 'done', meta: `${jobs.length}`, to: '/projects/jobs' },
            { label: 'Tasks', state: 'current', meta: `${tasks.length}`, to: '/projects/tasks' },
            { label: 'Labour & materials', state: 'current', to: '/projects/timesheets' },
            { label: 'Expenses', state: 'current', meta: `${expenses.length}`, to: '/finance/expenses' },
            { label: 'Job cost', state: 'current', to: '/projects/costing' },
            { label: 'Revenue & profit', state: project.progress === 100 ? 'done' : 'todo', to: '/finance/pnl' }]
            } />
          
        </Card>

        <div className="grid gap-3 rounded border border-slate-200 bg-white p-4 shadow-card sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
          <StatTile label="Budget" value={currency(project.budget, { compact: true })} />
          <StatTile label="Actual cost" value={currency(project.actual, { compact: true })} tone={project.actual > project.budget ? 'danger' : 'default'} />
          <StatTile label="Committed" value={currency(project.committed, { compact: true })} sub="Open POs" />
          <StatTile label="Revenue" value={currency(project.revenue, { compact: true })} tone="info" />
          <StatTile label="Gross profit" value={currency(project.revenue - project.actual, { compact: true })} tone="success" />
          <StatTile label="Profit margin" value={`${margin.toFixed(1)}%`} tone={margin > 15 ? 'success' : 'warning'} />
          <StatTile label="Budget variance" value={currency(variance, { compact: true })} tone={variance < 0 ? 'danger' : 'success'} />
          <StatTile label="Hours worked" value={number(project.hours)} sub={`${sheets.length} timesheets`} />
        </div>

        {tab === 'overview' &&
        <div className="grid gap-4 lg:grid-cols-3">
            <Card title="Project information" className="lg:col-span-2">
              <DefinitionList
              columns={3}
              items={[
              { label: 'Client', value: project.client },
              { label: 'Project manager', value: project.manager },
              { label: 'Contract type', value: 'Lump sum with variations' },
              { label: 'Start date', value: shortDate(project.start) },
              { label: 'Completion date', value: shortDate(project.end) },
              { label: 'Cost centre', value: 'CC-500 Projects' },
              { label: 'Progress', value: <Progress value={project.progress} showValue label="Project progress" />, full: true }]
              } />
            
            </Card>
            <Card title="Budget vs actual" description="$ thousands">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                data={[
                { name: 'Budget', value: project.budget / 1000 },
                { name: 'Committed', value: project.committed / 1000 },
                { name: 'Actual', value: project.actual / 1000 },
                { name: 'Revenue', value: project.revenue / 1000 }]
                }
                margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                
                  <CartesianGrid {...GRID_PROPS} />
                  <XAxis dataKey="name" {...AXIS_PROPS} />
                  <YAxis {...AXIS_PROPS} />
                  <RTooltip {...TOOLTIP_STYLE} />
                  <Bar dataKey="value" name="$K" fill={CHART_COLORS.brand} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        }

        {tab === 'jobs' &&
        <Card title="Jobs" padded={false}>
            <DataTable
            rows={jobs}
            rowKey={(j) => j.id}
            columns={[
            { key: 'id', header: 'Job', render: (j) => <RecordLink to={`/projects/jobs/${j.id}`}>{j.id}</RecordLink> },
            { key: 'type', header: 'Type', render: (j) => j.type },
            { key: 'team', header: 'Team', render: (j) => j.team },
            { key: 'due', header: 'Due', render: (j) => shortDate(j.due) },
            { key: 'estimate', header: 'Estimate', align: 'right', render: (j) => currency(j.estimate, { compact: true }) },
            { key: 'actual', header: 'Actual', align: 'right', render: (j) => currency(j.actual, { compact: true }) },
            { key: 'revenue', header: 'Revenue', align: 'right', render: (j) => currency(j.revenue, { compact: true }) },
            { key: 'status', header: 'Status', render: (j) => <StatusBadge status={j.status} /> }]
            } />
          
          </Card>
        }

        {tab === 'tasks' &&
        <Card title="Tasks" padded={false}>
            <DataTable
            rows={tasks}
            rowKey={(t) => t.id}
            columns={[
            { key: 'id', header: 'Task', render: (t) => <span className="font-mono text-xs text-brand-700">{t.id}</span> },
            { key: 'name', header: 'Task', render: (t) => <span className="font-medium text-slate-900">{t.name}</span> },
            { key: 'assignee', header: 'Assignee', render: (t) => t.assignee },
            { key: 'due', header: 'Due', render: (t) => shortDate(t.due) },
            { key: 'hours', header: 'Hours', align: 'right', render: (t) => number(t.hours) },
            { key: 'progress', header: 'Progress', width: '160px', render: (t) => <Progress value={t.progress} showValue label={`${t.name} progress`} /> },
            { key: 'status', header: 'Status', render: (t) => <StatusBadge status={t.status} /> }]
            } />
          
          </Card>
        }

        {tab === 'costing' &&
        <div className="grid gap-4 lg:grid-cols-2">
            <Card title="Cost by category" description="Actual cost build-up">
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={costByCategory} layout="vertical" margin={{ top: 4, right: 12, left: 20, bottom: 0 }}>
                  <CartesianGrid {...GRID_PROPS} horizontal={false} vertical />
                  <XAxis type="number" {...AXIS_PROPS} />
                  <YAxis type="category" dataKey="name" width={78} {...AXIS_PROPS} />
                  <RTooltip {...TOOLTIP_STYLE} formatter={(v: number) => currency(v)} />
                  <Bar dataKey="value" name="Cost" fill={CHART_COLORS.warning} radius={[0, 2, 2, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card title="Cost summary">
              <dl className="space-y-2 text-[13px]">
                {costByCategory.map((c) =>
              <div key={c.name} className="flex justify-between">
                    <dt className="text-slate-500">{c.name} cost</dt>
                    <dd className="tnum text-slate-800">{currency(c.value)}</dd>
                  </div>
              )}
                <div className="flex justify-between border-t border-slate-200 pt-2">
                  <dt className="font-semibold text-slate-900">Total job cost</dt>
                  <dd className="font-semibold tnum text-slate-900">{currency(costByCategory.reduce((s, c) => s + c.value, 0))}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Revenue</dt>
                  <dd className="tnum text-slate-800">{currency(project.revenue)}</dd>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2">
                  <dt className="font-semibold text-slate-900">Gross profit</dt>
                  <dd className="font-semibold tnum text-emerald-700">{currency(project.revenue - project.actual)}</dd>
                </div>
              </dl>
            </Card>
          </div>
        }

        {tab === 'timesheets' &&
        <Card title="Timesheets" padded={false}>
            <DataTable
            rows={sheets}
            rowKey={(t) => t.id}
            columns={[
            { key: 'id', header: 'Sheet', render: (t) => <span className="font-mono text-xs text-brand-700">{t.id}</span> },
            { key: 'employee', header: 'Employee', render: (t) => t.employee },
            { key: 'week', header: 'Week', render: (t) => t.week },
            { key: 'hours', header: 'Hours', align: 'right', render: (t) => t.hours },
            { key: 'billable', header: 'Billable', align: 'right', render: (t) => t.billable },
            { key: 'cost', header: 'Labour cost', align: 'right', render: (t) => currency(t.hours * t.rate) },
            { key: 'status', header: 'Status', render: (t) => <StatusBadge status={t.status} /> }]
            } />
          
          </Card>
        }

        {tab === 'expenses' &&
        <Card title="Project expenses" padded={false}>
            <DataTable
            rows={expenses}
            rowKey={(e) => e.id}
            columns={[
            { key: 'id', header: 'Expense', render: (e) => <span className="font-mono text-xs text-brand-700">{e.id}</span> },
            { key: 'category', header: 'Category', render: (e) => e.category },
            { key: 'description', header: 'Description', render: (e) => e.description },
            { key: 'date', header: 'Date', render: (e) => shortDate(e.date) },
            { key: 'amount', header: 'Amount', align: 'right', render: (e) => currency(e.amount) },
            { key: 'status', header: 'Status', render: (e) => <StatusBadge status={e.status} /> }]
            } />
          
          </Card>
        }

        {tab === 'activity' &&
        <Card title="Activity timeline">
            <Timeline
            events={[
            { id: '1', title: 'Budget uplift request returned', detail: 'Finance requested revised cost-to-complete.', actor: 'Sophie Laurent', at: '29 Aug 2026 · 16:04', tone: 'warning' },
            { id: '2', title: 'Crane hire expense approved', detail: currency(14600), actor: 'Claire Dubois', at: '18 Aug 2026 · 10:22', tone: 'success' },
            { id: '3', title: 'Job JB-7103 progressed to 88%', actor: 'Kwame Boateng', at: '15 Aug 2026 · 17:40', tone: 'info' },
            { id: '4', title: 'Project created', detail: `${project.client} — budget ${currency(project.budget)}`, actor: project.manager, at: `${shortDate(project.start)} · 09:00`, tone: 'brand' }]
            } />
          
          </Card>
        }
      </div>
    </div>);

}