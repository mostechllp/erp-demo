import React from 'react';
import { Link } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis } from 'recharts';
import { ArrowLeftRightIcon, PackagePlusIcon, ScaleIcon } from 'lucide-react';
import { PageHeader } from '../../components/patterns/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { KpiCard } from '../../components/patterns/KpiCard';
import { Progress } from '../../components/ui/Progress';
import { Timeline } from '../../components/patterns/Timeline';
import { STOCK, STOCK_MOVEMENTS, WAREHOUSES } from '../../data/inventory';
import { INVENTORY_STATUS } from '../../data/analytics';
import { AXIS_PROPS, CHART_COLORS, GRID_PROPS, TOOLTIP_STYLE } from '../../components/charts/chartTheme';
import { currency, number } from '../../utils/format';

export function InventoryDashboard() {
  const totalValue = WAREHOUSES.reduce((s, w) => s + w.valuation, 0);
  const low = STOCK.filter((s) => s.available > 0 && s.available <= s.reorderLevel);
  const out = STOCK.filter((s) => s.available === 0);

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title="Inventory Dashboard"
        crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Inventory & Store' }, { label: 'Dashboard' }]}
        description="Stock position, valuation and movement across all warehouses and stores."
        actions={
        <>
            <Link to="/inventory/transfers">
              <Button icon={ArrowLeftRightIcon}>New transfer</Button>
            </Link>
            <Link to="/inventory/adjustments">
              <Button icon={ScaleIcon}>Stock count</Button>
            </Link>
            <Link to="/inventory/products">
              <Button variant="primary" icon={PackagePlusIcon}>
                Add product
              </Button>
            </Link>
          </>
        } />
      

      <div className="flex-1 space-y-4 p-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          <KpiCard label="Total products" value="738" delta={2.1} to="/inventory/products" />
          <KpiCard label="Inventory value" value={currency(totalValue, { compact: true })} delta={3.2} emphasis />
          <KpiCard label="Low stock" value={String(low.length)} delta={18.4} invertDelta to="/inventory/reorder" />
          <KpiCard label="Out of stock" value={String(out.length)} delta={12.0} invertDelta to="/inventory/reorder" />
          <KpiCard label="Reserved stock" value={number(STOCK.reduce((s, x) => s + x.reserved, 0))} hint="Committed to orders" />
          <KpiCard label="Incoming" value={number(STOCK.reduce((s, x) => s + x.incoming, 0))} hint="On open purchase orders" />
          <KpiCard label="Outgoing (30d)" value="184" hint="Units issued to orders and jobs" />
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          <Card title="Stock value by location" description="Weighted average valuation" className="xl:col-span-2">
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={WAREHOUSES} margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
                <CartesianGrid {...GRID_PROPS} />
                <XAxis dataKey="id" {...AXIS_PROPS} />
                <YAxis {...AXIS_PROPS} tickFormatter={(v: number) => `${v / 1000}K`} />
                <RTooltip {...TOOLTIP_STYLE} formatter={(v: number) => currency(v)} />
                <Bar dataKey="valuation" name="Valuation" fill={CHART_COLORS.brand} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card title="Stock health" description="SKU distribution">
            <ResponsiveContainer width="100%" height={230}>
              <PieChart>
                <Pie data={INVENTORY_STATUS} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
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

        <div className="grid gap-4 xl:grid-cols-2">
          <Card title="Warehouse utilisation" padded={false}>
            <table className="w-full text-[13px]">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Location</th>
                  <th className="px-4 py-2 text-left font-semibold">Manager</th>
                  <th className="px-4 py-2 text-right font-semibold">Value</th>
                  <th className="px-4 py-2 text-left font-semibold">Utilisation</th>
                  <th className="px-4 py-2 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {WAREHOUSES.map((w) =>
                <tr key={w.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2.5">
                      <p className="font-medium text-slate-900">{w.name}</p>
                      <p className="font-mono text-xs text-slate-500">{w.id} · {w.type}</p>
                    </td>
                    <td className="px-4 py-2.5">{w.manager}</td>
                    <td className="px-4 py-2.5 text-right tnum">{currency(w.valuation, { compact: true })}</td>
                    <td className="w-40 px-4 py-2.5">
                      <Progress value={w.utilisation} tone={w.utilisation > 80 ? 'warning' : 'brand'} showValue label={`${w.name} utilisation`} />
                    </td>
                    <td className="px-4 py-2.5">
                      <StatusBadge status={w.status} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>

          <Card
            title="Stock movement timeline"
            description="Receipts, issues, transfers, adjustments and production postings"
            actions={<Link to="/inventory/movements" className="text-xs font-medium text-brand-700 hover:underline">View all</Link>}>
            
            <Timeline
              events={STOCK_MOVEMENTS.slice(0, 7).map((m) => ({
                id: m.id,
                title: `${m.type} · ${m.qty > 0 ? '+' : ''}${m.qty} ${m.sku}`,
                detail: `${m.name} — ${m.from} → ${m.to} (${m.reference})`,
                actor: m.user,
                at: m.date,
                tone: m.qty > 0 ? 'success' : m.type === 'Adjustment' ? 'warning' : 'info'
              }))} />
            
          </Card>
        </div>
      </div>
    </div>);

}