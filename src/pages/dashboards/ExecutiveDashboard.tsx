import React from 'react';
import { Link } from 'react-router-dom';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis } from
'recharts';
import {
  ArrowRightIcon,
  BoxIcon,
  BriefcaseIcon,
  FactoryIcon,
  FileTextIcon,
  ShoppingCartIcon,
  UserPlusIcon,
  UsersIcon,
  WrenchIcon } from
'lucide-react';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Progress } from '../../components/ui/Progress';
import { KpiCard } from '../../components/patterns/KpiCard';
import { RecordLink } from '../../components/patterns/RecordLink';
import { WorkflowStepper } from '../../components/patterns/WorkflowStepper';
import { SALES_ORDERS } from '../../data/sales';
import { PURCHASE_ORDERS } from '../../data/procurement';
import { APPROVALS } from '../../data/governance';
import { STOCK } from '../../data/inventory';
import { PROJECTS } from '../../data/projects';
import { WORK_ORDERS } from '../../data/production';
import {
  INVENTORY_STATUS,
  PRODUCTION_OUTPUT_TREND,
  PROJECT_PROFITABILITY,
  REVENUE_VS_EXPENSE,
  SALES_TREND } from
'../../data/analytics';
import { AXIS_PROPS, CHART_COLORS, GRID_PROPS, TOOLTIP_STYLE } from '../../components/charts/chartTheme';
import { currency, number } from '../../utils/format';

const QUICK_ACTIONS = [
{ label: 'Sales Order', icon: ShoppingCartIcon, to: '/sales/orders' },
{ label: 'Purchase Order', icon: FileTextIcon, to: '/procurement/orders' },
{ label: 'Project', icon: BriefcaseIcon, to: '/projects' },
{ label: 'Workshop Job', icon: WrenchIcon, to: '/workshop/jobs' },
{ label: 'Work Order', icon: FactoryIcon, to: '/production/work-orders' },
{ label: 'Invoice', icon: FileTextIcon, to: '/sales/invoices' },
{ label: 'Customer', icon: UsersIcon, to: '/sales/customers' },
{ label: 'Product', icon: BoxIcon, to: '/inventory/products' },
{ label: 'Employee', icon: UserPlusIcon, to: '/hr/employees' }];


export function ExecutiveDashboard() {
  const lowStock = STOCK.filter((s) => s.available <= s.reorderLevel).slice(0, 6);
  const pending = APPROVALS.filter((a) => a.status === 'Pending').slice(0, 6);

  return (
    <div className="space-y-4 p-6">
      {/* Order-to-cash lifecycle: makes the module interconnection explicit */}
      <Card
        title="Order-to-cash pipeline — this period"
        description="Live position of the commercial lifecycle across modules"
        actions={
        <Link
          to="/reports"
          className="inline-flex items-center gap-1 text-xs font-medium text-brand-700 hover:underline">
          
            Open flow report <ArrowRightIcon className="h-3 w-3" />
          </Link>
        }>
        
        <WorkflowStepper
          steps={[
          { label: 'Leads', state: 'done', meta: '6 open', to: '/sales/leads' },
          { label: 'Quotations', state: 'done', meta: '2 accepted', to: '/sales/quotations' },
          { label: 'Sales Orders', state: 'current', meta: '10 active', to: '/sales/orders' },
          { label: 'Production / Procurement', state: 'current', meta: '8 WOs · 8 POs', to: '/production/work-orders' },
          { label: 'Delivery', state: 'todo', meta: '6 shipments', to: '/logistics/shipments' },
          { label: 'Invoice', state: 'todo', meta: '$1.28M open', to: '/sales/invoices' },
          { label: 'Payment', state: 'blocked', meta: '$757K overdue', to: '/finance/receivable' }]
          } />
        
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <KpiCard label="Total revenue" value={currency(22506800, { compact: true })} delta={11.4} emphasis to="/finance/pnl" />
        <KpiCard label="Net profit" value={currency(4985600, { compact: true })} delta={8.2} emphasis to="/finance/pnl" />
        <KpiCard label="Total sales (booked)" value={currency(2870000, { compact: true })} delta={9.9} to="/sales/orders" />
        <KpiCard label="Total purchases" value={currency(1710000, { compact: true })} delta={5.6} invertDelta to="/procurement/orders" />
        <KpiCard label="Outstanding receivables" value={currency(1279520, { compact: true })} delta={4.1} invertDelta to="/finance/receivable" />
        <KpiCard label="Outstanding payables" value={currency(788680, { compact: true })} delta={-2.8} invertDelta to="/finance/payable" />
        <KpiCard label="Inventory value" value={currency(11118700, { compact: true })} delta={3.2} to="/inventory" />
        <KpiCard label="Active projects" value="6" delta={0} hint="2 at risk" to="/projects" />
        <KpiCard label="Production orders" value="8" delta={14.3} hint="1 paused · 1 delayed" to="/production/work-orders" />
        <KpiCard label="Employees" value="146" delta={1.4} hint="4 open requisitions" to="/hr/employees" />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card title="Revenue vs expenses" description="Rolling 6 months · $ thousands" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height={244}>
            <AreaChart data={REVENUE_VS_EXPENSE} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS.brand} stopOpacity={0.18} />
                  <stop offset="100%" stopColor={CHART_COLORS.brand} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid {...GRID_PROPS} />
              <XAxis dataKey="month" {...AXIS_PROPS} />
              <YAxis {...AXIS_PROPS} />
              <RTooltip {...TOOLTIP_STYLE} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke={CHART_COLORS.brand} strokeWidth={2} fill="url(#rev)" />
              <Area type="monotone" dataKey="expenses" name="Expenses" stroke={CHART_COLORS.neutral} strokeWidth={1.5} fill="transparent" />
              <Area type="monotone" dataKey="profit" name="Profit" stroke={CHART_COLORS.success} strokeWidth={2} fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Inventory status" description="738 SKUs across 6 locations">
          <ResponsiveContainer width="100%" height={244}>
            <PieChart>
              <Pie data={INVENTORY_STATUS} dataKey="value" nameKey="name" innerRadius={52} outerRadius={82} paddingAngle={2}>
                {INVENTORY_STATUS.map((d) =>
                <Cell key={d.name} fill={d.tone} />
                )}
              </Pie>
              <RTooltip {...TOOLTIP_STYLE} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card title="Sales & purchase trend" description="Order value, $ thousands">
          <ResponsiveContainer width="100%" height={210}>
            <LineChart data={SALES_TREND} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid {...GRID_PROPS} />
              <XAxis dataKey="month" {...AXIS_PROPS} />
              <YAxis {...AXIS_PROPS} />
              <RTooltip {...TOOLTIP_STYLE} />
              <Line type="monotone" dataKey="value" name="Sales" stroke={CHART_COLORS.brand} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="orders" name="Orders" stroke={CHART_COLORS.info} strokeWidth={1.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Production output" description="Planned vs produced units per week">
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={PRODUCTION_OUTPUT_TREND} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid {...GRID_PROPS} />
              <XAxis dataKey="week" {...AXIS_PROPS} />
              <YAxis {...AXIS_PROPS} />
              <RTooltip {...TOOLTIP_STYLE} />
              <Bar dataKey="planned" name="Planned" fill={CHART_COLORS.brandLight} radius={[2, 2, 0, 0]} />
              <Bar dataKey="produced" name="Produced" fill={CHART_COLORS.brand} radius={[2, 2, 0, 0]} />
              <Bar dataKey="rejected" name="Rejected" fill={CHART_COLORS.danger} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Project profitability" description="Budget · actual · revenue, $ thousands">
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={PROJECT_PROFITABILITY} layout="vertical" margin={{ top: 4, right: 8, left: 24, bottom: 0 }}>
              <CartesianGrid {...GRID_PROPS} horizontal={false} vertical />
              <XAxis type="number" {...AXIS_PROPS} />
              <YAxis type="category" dataKey="project" width={92} {...AXIS_PROPS} />
              <RTooltip {...TOOLTIP_STYLE} />
              <Bar dataKey="actual" name="Actual cost" fill={CHART_COLORS.warning} radius={[0, 2, 2, 0]} />
              <Bar dataKey="revenue" name="Revenue" fill={CHART_COLORS.success} radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card
          title="Pending approvals"
          description="Awaiting your action or your delegates"
          actions={<Link to="/approvals" className="text-xs font-medium text-brand-700 hover:underline">Open centre</Link>}
          padded={false}
          className="xl:col-span-2">
          
          <ul className="divide-y divide-slate-100">
            {pending.map((a) =>
            <li key={a.id} className="flex items-center gap-3 px-4 py-2.5">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <RecordLink to={`/approvals/${a.id}`} mono={false} className="truncate text-[13px]">
                      {a.title}
                    </RecordLink>
                    <StatusBadge status={a.priority} />
                  </div>
                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {a.type} · {a.requester} · {a.department} · level {a.currentLevel} of {a.levels.length}
                  </p>
                </div>
                <span className="shrink-0 text-[13px] font-semibold tnum text-slate-800">
                  {a.amount === 0 ? '—' : currency(a.amount, { compact: true })}
                </span>
              </li>
            )}
          </ul>
        </Card>

        <Card title="Quick actions" description="Create records across modules">
          <div className="grid grid-cols-2 gap-2">
            {QUICK_ACTIONS.map((a) =>
            <Link
              key={a.label}
              to={a.to}
              className="flex items-center gap-2 rounded border border-slate-200 px-2.5 py-2 text-xs font-medium text-slate-700 transition-colors duration-150 ease-erp hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800">
              
                <a.icon className="h-3.5 w-3.5 text-slate-400" />
                {a.label}
              </Link>
            )}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card title="Recent sales orders" padded={false} actions={<Link to="/sales/orders" className="text-xs font-medium text-brand-700 hover:underline">View all</Link>}>
          <table className="w-full text-[13px]">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-1.5 text-left font-semibold">Order</th>
                <th className="px-4 py-1.5 text-left font-semibold">Customer</th>
                <th className="px-4 py-1.5 text-right font-semibold">Value</th>
                <th className="px-4 py-1.5 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SALES_ORDERS.slice(0, 6).map((o) =>
              <tr key={o.id}>
                  <td className="px-4 py-2"><RecordLink to={`/sales/orders/${o.id}`}>{o.id}</RecordLink></td>
                  <td className="max-w-[180px] truncate px-4 py-2 text-slate-700">{o.customer}</td>
                  <td className="px-4 py-2 text-right tnum text-slate-800">{currency(o.amount, { compact: true })}</td>
                  <td className="px-4 py-2"><StatusBadge status={o.status} /></td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>

        <Card title="Recent purchase orders" padded={false} actions={<Link to="/procurement/orders" className="text-xs font-medium text-brand-700 hover:underline">View all</Link>}>
          <table className="w-full text-[13px]">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-1.5 text-left font-semibold">PO</th>
                <th className="px-4 py-1.5 text-left font-semibold">Supplier</th>
                <th className="px-4 py-1.5 text-right font-semibold">Value</th>
                <th className="px-4 py-1.5 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PURCHASE_ORDERS.slice(0, 6).map((o) =>
              <tr key={o.id}>
                  <td className="px-4 py-2"><RecordLink to={`/procurement/orders/${o.id}`}>{o.id}</RecordLink></td>
                  <td className="max-w-[180px] truncate px-4 py-2 text-slate-700">{o.supplier}</td>
                  <td className="px-4 py-2 text-right tnum text-slate-800">{currency(o.amount, { compact: true })}</td>
                  <td className="px-4 py-2"><StatusBadge status={o.status} /></td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>

        <Card title="Low stock & reorder" padded={false} actions={<Link to="/inventory/reorder" className="text-xs font-medium text-brand-700 hover:underline">Reorder desk</Link>}>
          <table className="w-full text-[13px]">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-1.5 text-left font-semibold">SKU</th>
                <th className="px-4 py-1.5 text-left font-semibold">Item</th>
                <th className="px-4 py-1.5 text-right font-semibold">Avail.</th>
                <th className="px-4 py-1.5 text-right font-semibold">Reorder at</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {lowStock.map((s) =>
              <tr key={s.sku + s.warehouse}>
                  <td className="px-4 py-2 font-mono text-xs text-slate-600">{s.sku}</td>
                  <td className="max-w-[190px] truncate px-4 py-2 text-slate-700">{s.name}</td>
                  <td className={`px-4 py-2 text-right tnum font-semibold ${s.available === 0 ? 'text-red-600' : 'text-amber-600'}`}>
                    {number(s.available)}
                  </td>
                  <td className="px-4 py-2 text-right tnum text-slate-500">{number(s.reorderLevel)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>

        <Card title="Active projects & production jobs" padded={false} actions={<Link to="/projects" className="text-xs font-medium text-brand-700 hover:underline">Portfolio</Link>}>
          <ul className="divide-y divide-slate-100">
            {PROJECTS.filter((p) => p.status !== 'Completed').
            slice(0, 4).
            map((p) =>
            <li key={p.id} className="px-4 py-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <RecordLink to={`/projects/${p.id}`} mono={false} className="truncate text-[13px]">
                      {p.name}
                    </RecordLink>
                    <StatusBadge status={p.status} />
                  </div>
                  <div className="mt-1.5 flex items-center gap-3">
                    <Progress
                  value={p.progress}
                  tone={p.actual > p.budget ? 'danger' : 'brand'}
                  showValue
                  label={`${p.name} progress`} />
                
                    <span className="shrink-0 text-xs tnum text-slate-500">
                      {currency(p.actual, { compact: true })} / {currency(p.budget, { compact: true })}
                    </span>
                  </div>
                </li>
            )}
            {WORK_ORDERS.filter((w) => w.status === 'In Progress').map((w) =>
            <li key={w.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-[13px] text-slate-800">
                    <span className="font-mono text-xs text-brand-700">{w.id}</span> · {w.product}
                  </p>
                  <p className="text-xs text-slate-500">
                    {w.workCenter} · {w.operator} · {w.produced}/{w.qty} units
                  </p>
                </div>
                <StatusBadge status={w.status} />
              </li>
            )}
          </ul>
        </Card>
      </div>
    </div>);

}