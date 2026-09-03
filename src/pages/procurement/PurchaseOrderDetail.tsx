import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckIcon, PackageCheckIcon, PrinterIcon, SendIcon } from 'lucide-react';
import { PageHeader } from '../../components/patterns/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Alert } from '../../components/ui/Alert';
import { DefinitionList } from '../../components/patterns/DefinitionList';
import { StatTile } from '../../components/patterns/StatTile';
import { WorkflowStepper } from '../../components/patterns/WorkflowStepper';
import { Timeline } from '../../components/patterns/Timeline';
import { RecordLink } from '../../components/patterns/RecordLink';
import { NotFound } from '../errors/NotFound';
import { GOODS_RECEIPTS, PURCHASE_ORDERS, AP_INVOICES } from '../../data/procurement';
import { currency, shortDate } from '../../utils/format';

const TABS = [
{ id: 'lines', label: 'Order lines' },
{ id: 'receipts', label: 'Goods receipts' },
{ id: 'matching', label: 'Invoice matching' },
{ id: 'approval', label: 'Approval trail' }];


export function PurchaseOrderDetail() {
  const { id } = useParams();
  const [tab, setTab] = useState('lines');
  const po = PURCHASE_ORDERS.find((o) => o.id === id);

  if (!po) return <NotFound />;

  const receipts = GOODS_RECEIPTS.filter((g) => g.po === po.id);
  const invoices = AP_INVOICES.filter((i) => i.reference === po.id);
  const net = po.lines.reduce((s, l) => s + l.qty * l.unitPrice * (1 - l.discountPct / 100), 0) || po.amount;

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title={`Purchase order ${po.id}`}
        crumbs={[
        { label: 'Home', to: '/dashboard' },
        { label: 'Procurement' },
        { label: 'Purchase Orders', to: '/procurement/orders' },
        { label: po.id }]
        }
        meta={<StatusBadge status={po.status} />}
        description={`${po.supplier} · raised ${shortDate(po.date)} · expected ${shortDate(po.expected)}`}
        actions={
        <>
            <Button icon={PrinterIcon}>Print</Button>
            <Button icon={SendIcon}>Send to supplier</Button>
            <Button variant="primary" icon={PackageCheckIcon}>
              Record receipt
            </Button>
          </>
        }
        tabs={<Tabs tabs={TABS} active={tab} onChange={setTab} />} />
      

      <div className="flex-1 space-y-4 p-6">
        {po.receiptStatus === 'Partially Received' &&
        <Alert tone="warning" title="Partially received — 8 units outstanding">
            One casting was rejected at inspection (NCR-118) and returned on PRT-880. The replacement is expected with the
            balance delivery on 12 Sep.
          </Alert>
        }

        <Card title="Procurement lifecycle">
          <WorkflowStepper
            steps={[
            { label: 'Purchase Request', state: 'done', meta: po.fromRequest ?? 'direct', to: '/procurement/requests' },
            { label: 'Approval', state: 'done', meta: '3 levels', to: '/approvals' },
            { label: 'PO issued', state: 'done', meta: shortDate(po.date) },
            { label: 'Goods Receipt', state: receipts.length ? 'current' : 'todo', meta: `${receipts.length} GRN`, to: '/procurement/receipts' },
            { label: 'Inventory', state: receipts.length ? 'current' : 'todo', to: '/inventory/movements' },
            { label: 'Supplier Invoice', state: invoices.length ? 'current' : 'todo', to: '/procurement/invoices' },
            { label: 'Payment', state: 'todo', to: '/finance/payments' }]
            } />
          
        </Card>

        <div className="grid gap-3 rounded border border-slate-200 bg-white p-4 shadow-card sm:grid-cols-2 lg:grid-cols-5">
          <StatTile label="Order value" value={currency(po.amount)} sub="Excl. freight" />
          <StatTile label="Received value" value={currency(48595)} tone="info" sub="16 of 24 castings" />
          <StatTile label="Invoiced" value={currency(58800)} sub="SIN-7710" />
          <StatTile label="Paid" value={currency(30000)} tone="success" sub="Partial settlement" />
          <StatTile label="Open commitment" value={currency(po.amount - 48595)} tone="warning" sub="Not yet received" />
        </div>

        {tab === 'lines' &&
        <div className="grid gap-4 lg:grid-cols-3">
            <Card title="Order lines" padded={false} className="lg:col-span-2">
              {po.lines.length === 0 ?
            <p className="px-4 py-10 text-center text-[13px] text-slate-500">
                  Line detail is held with the supplier confirmation for this order.
                </p> :

            <table className="w-full text-[13px]">
                  <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold">SKU</th>
                      <th className="px-4 py-2 text-left font-semibold">Item</th>
                      <th className="px-4 py-2 text-right font-semibold">Qty</th>
                      <th className="px-4 py-2 text-right font-semibold">Unit cost</th>
                      <th className="px-4 py-2 text-right font-semibold">Disc %</th>
                      <th className="px-4 py-2 text-right font-semibold">Line total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {po.lines.map((l) =>
                <tr key={l.sku} className="hover:bg-slate-50">
                        <td className="px-4 py-2.5 font-mono text-xs text-slate-600">{l.sku}</td>
                        <td className="px-4 py-2.5 text-slate-800">{l.name}</td>
                        <td className="px-4 py-2.5 text-right tnum">{l.qty}</td>
                        <td className="px-4 py-2.5 text-right tnum">{currency(l.unitPrice)}</td>
                        <td className="px-4 py-2.5 text-right tnum">{l.discountPct}%</td>
                        <td className="px-4 py-2.5 text-right font-medium tnum">
                          {currency(l.qty * l.unitPrice * (1 - l.discountPct / 100))}
                        </td>
                      </tr>
                )}
                  </tbody>
                </table>
            }
            </Card>
            <Card title="Order information">
              <DefinitionList
              columns={1}
              items={[
              { label: 'Supplier', value: po.supplier },
              { label: 'Buyer', value: 'Sophie Laurent' },
              { label: 'Delivery warehouse', value: 'WH-02 Vlaardingen Plant Store' },
              { label: 'Payment terms', value: 'Net 45 days' },
              { label: 'Incoterms', value: 'FCA Düsseldorf' },
              { label: 'Net total', value: currency(net) },
              { label: 'Cost centre', value: 'CC-300 Production' }]
              } />
            
            </Card>
          </div>
        }

        {tab === 'receipts' &&
        <Card title="Goods receipts" padded={false}>
            <table className="w-full text-[13px]">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                <tr>
                  {['GRN', 'Received', 'Warehouse', 'Ordered', 'Received', 'Damaged', 'Accepted', 'Status'].map((h) =>
                <th key={h} className="px-4 py-2 text-left font-semibold">
                      {h}
                    </th>
                )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {receipts.map((g) =>
              <tr key={g.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2.5 font-mono text-xs text-brand-700">{g.id}</td>
                    <td className="px-4 py-2.5">{shortDate(g.received)}</td>
                    <td className="px-4 py-2.5">{g.warehouse}</td>
                    <td className="px-4 py-2.5 tnum">{g.ordered}</td>
                    <td className="px-4 py-2.5 tnum">{g.receivedQty}</td>
                    <td className="px-4 py-2.5 tnum text-red-600">{g.damaged}</td>
                    <td className="px-4 py-2.5 tnum text-emerald-700">{g.accepted}</td>
                    <td className="px-4 py-2.5">
                      <StatusBadge status={g.status} />
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </Card>
        }

        {tab === 'matching' &&
        <Card title="Three-way match" description="Purchase order · goods receipt · supplier invoice">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
            ['Purchase order', currency(po.amount), 'PO quantity 24 units', 'brand'],
            ['Goods receipt', currency(48595), 'Received 16, accepted 15', 'info'],
            ['Supplier invoice', currency(58800), 'SIN-7710 — variance $10,205', 'warning']].
            map(([label, value, sub]) =>
            <div key={label as string} className="rounded border border-slate-200 p-3">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{label as string}</p>
                  <p className="mt-1 text-lg font-semibold tnum text-slate-900">{value as string}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{sub as string}</p>
                </div>
            )}
            </div>
            <Alert tone="warning" title="Match exception — quantity variance" className="mt-4">
              Invoiced quantity exceeds accepted quantity by 1 unit. Debit note{' '}
              <RecordLink to="/procurement/returns" mono={false}>
                DN-2201
              </RecordLink>{' '}
              has been raised against return PRT-880. Resolve before releasing payment.
            </Alert>
          </Card>
        }

        {tab === 'approval' &&
        <Card title="Approval and audit trail">
            <Timeline
            events={[
            { id: '1', title: 'Approved at level 2 — Department Head', detail: 'Amara Osei approved $96,400.', actor: 'Amara Osei', at: '09 Aug 2026 · 10:04', tone: 'success' },
            { id: '2', title: 'Approved at level 1 — Department Manager', detail: 'Volumes verified against MRP run.', actor: 'Marek Kowalski', at: '08 Aug 2026 · 16:22', tone: 'success' },
            { id: '3', title: 'Purchase order created from PR-4410', actor: 'Sophie Laurent', at: '08 Aug 2026 · 14:10', tone: 'neutral' },
            { id: '4', title: 'Purchase request approved', detail: 'Raised to cover SO-5041 shortfall.', actor: 'Amara Osei', at: '07 Aug 2026 · 09:35', tone: 'success' }]
            } />
          
          </Card>
        }
      </div>
    </div>);

}