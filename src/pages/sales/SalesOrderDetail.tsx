import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckIcon, FileTextIcon, PrinterIcon, TruckIcon, XIcon } from 'lucide-react';
import { PageHeader } from '../../components/patterns/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Alert } from '../../components/ui/Alert';
import { DefinitionList } from '../../components/patterns/DefinitionList';
import { StatTile } from '../../components/patterns/StatTile';
import { WorkflowStepper, type WorkflowStep } from '../../components/patterns/WorkflowStepper';
import { Timeline } from '../../components/patterns/Timeline';
import { RecordLink } from '../../components/patterns/RecordLink';
import { ConfirmDialog } from '../../components/patterns/ConfirmDialog';
import { NotFound } from '../errors/NotFound';
import { SALES_ORDERS } from '../../data/sales';
import { useToast } from '../../contexts/ToastContext';
import { currency, shortDate } from '../../utils/format';

const TABS = [
{ id: 'lines', label: 'Order lines' },
{ id: 'fulfilment', label: 'Fulfilment' },
{ id: 'finance', label: 'Invoices & payments' },
{ id: 'documents', label: 'Documents' },
{ id: 'activity', label: 'Activity & audit' }];


export function SalesOrderDetail() {
  const { id } = useParams();
  const [tab, setTab] = useState('lines');
  const [confirm, setConfirm] = useState(false);
  const toast = useToast();
  const order = SALES_ORDERS.find((o) => o.id === id);

  if (!order) return <NotFound />;

  const lineTotal = (l: (typeof order.lines)[number]) => l.qty * l.unitPrice * (1 - l.discountPct / 100);
  const net = order.lines.reduce((s, l) => s + lineTotal(l), 0);
  const tax = order.lines.reduce((s, l) => s + lineTotal(l) * (l.taxPct / 100), 0);
  const gross = net + tax || order.amount;

  const steps: WorkflowStep[] = [
  { label: 'Quotation', state: 'done', meta: 'QUO-3312', to: '/sales/quotations' },
  { label: 'Order confirmed', state: 'done', meta: shortDate(order.orderDate) },
  { label: 'Inventory reserved', state: 'done', meta: order.warehouse, to: '/inventory/stock' },
  { label: 'Production', state: order.linkedWo ? 'current' : 'todo', meta: order.linkedWo ?? 'not required', to: '/production/work-orders' },
  { label: 'Delivery', state: 'todo', meta: order.linkedShipment ?? 'planned', to: '/logistics/shipments' },
  { label: 'Invoice', state: order.linkedInvoice ? 'current' : 'todo', meta: order.linkedInvoice ?? 'pending', to: '/sales/invoices' },
  { label: 'Payment', state: order.paid > 0 ? 'current' : 'todo', meta: `${currency(order.paid, { compact: true })} received`, to: '/finance/receivable' }];


  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title={`Sales order ${order.id}`}
        crumbs={[
        { label: 'Home', to: '/dashboard' },
        { label: 'Sales & CRM' },
        { label: 'Sales Orders', to: '/sales/orders' },
        { label: order.id }]
        }
        meta={<StatusBadge status={order.status} />}
        description={`${order.customer} · ordered ${shortDate(order.orderDate)} · delivery due ${shortDate(order.deliveryDate)}`}
        actions={
        <>
            <Button icon={PrinterIcon}>Print</Button>
            <Button icon={FileTextIcon}>Create invoice</Button>
            <Button icon={TruckIcon}>Create delivery</Button>
            <Button variant="primary" icon={CheckIcon} onClick={() => setConfirm(true)}>
              Confirm order
            </Button>
          </>
        }
        tabs={<Tabs tabs={TABS} active={tab} onChange={setTab} />} />
      

      <div className="flex-1 space-y-4 p-6">
        {order.status === 'Pending Approval' &&
        <Alert
          tone="warning"
          title="Awaiting approval — credit limit exceeded"
          action={
          <div className="flex gap-2">
                <Button size="xs" variant="danger" icon={XIcon}>
                  Reject
                </Button>
                <Button size="xs" variant="success" icon={CheckIcon}>
                  Approve
                </Button>
              </div>
          }>
          
            This order takes the customer $71,900 beyond their approved credit limit and applies a 7% discount. Finance
            sign-off is required before inventory can be reserved.
          </Alert>
        }

        <Card title="Order lifecycle" description="Connected records across sales, inventory, production, logistics and finance">
          <WorkflowStepper steps={steps} />
        </Card>

        <div className="grid gap-3 rounded border border-slate-200 bg-white p-4 shadow-card sm:grid-cols-2 lg:grid-cols-5">
          <StatTile label="Order value" value={currency(gross)} sub={`${order.currency} · incl. tax`} />
          <StatTile label="Invoiced" value={currency(order.linkedInvoice ? gross : 0)} sub={order.linkedInvoice ?? 'Not invoiced'} />
          <StatTile label="Received" value={currency(order.paid)} tone="success" sub="Cash applied" />
          <StatTile label="Balance" value={currency(gross - order.paid)} tone={gross - order.paid > 0 ? 'warning' : 'success'} sub="Outstanding" />
          <StatTile label="Margin" value="28.4%" tone="info" sub="Estimated at standard cost" />
        </div>

        {tab === 'lines' &&
        <>
            <Card title="Order lines" padded={false}>
              {order.lines.length === 0 ?
            <p className="px-4 py-10 text-center text-[13px] text-slate-500">
                  Line details for this order are held in the linked quotation and have not been released yet.
                </p> :

            <div className="erp-scroll overflow-x-auto">
                  <table className="w-full min-w-max text-[13px]">
                    <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold">#</th>
                        <th className="px-4 py-2 text-left font-semibold">SKU</th>
                        <th className="px-4 py-2 text-left font-semibold">Description</th>
                        <th className="px-4 py-2 text-right font-semibold">Qty</th>
                        <th className="px-4 py-2 text-left font-semibold">Unit</th>
                        <th className="px-4 py-2 text-right font-semibold">Unit price</th>
                        <th className="px-4 py-2 text-right font-semibold">Disc %</th>
                        <th className="px-4 py-2 text-right font-semibold">Tax %</th>
                        <th className="px-4 py-2 text-right font-semibold">Line total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {order.lines.map((l, i) =>
                  <tr key={l.sku} className="hover:bg-slate-50">
                          <td className="px-4 py-2.5 tnum text-slate-400">{i + 1}</td>
                          <td className="px-4 py-2.5 font-mono text-xs text-slate-600">{l.sku}</td>
                          <td className="px-4 py-2.5 text-slate-800">{l.name}</td>
                          <td className="px-4 py-2.5 text-right tnum">{l.qty}</td>
                          <td className="px-4 py-2.5 text-slate-500">{l.unit}</td>
                          <td className="px-4 py-2.5 text-right tnum">{currency(l.unitPrice)}</td>
                          <td className="px-4 py-2.5 text-right tnum">{l.discountPct}%</td>
                          <td className="px-4 py-2.5 text-right tnum">{l.taxPct}%</td>
                          <td className="px-4 py-2.5 text-right font-medium tnum text-slate-900">{currency(lineTotal(l))}</td>
                        </tr>
                  )}
                    </tbody>
                  </table>
                </div>
            }
            </Card>

            <div className="grid gap-4 lg:grid-cols-3">
              <Card title="Order information" className="lg:col-span-2">
                <DefinitionList
                columns={3}
                items={[
                { label: 'Customer', value: order.customer },
                { label: 'Salesperson', value: order.salesperson },
                { label: 'Warehouse', value: order.warehouse },
                { label: 'Order date', value: shortDate(order.orderDate) },
                { label: 'Requested delivery', value: shortDate(order.deliveryDate) },
                { label: 'Currency', value: order.currency },
                { label: 'Payment terms', value: 'Net 30 days' },
                { label: 'Incoterms', value: 'DAP — Delivered at Place' },
                { label: 'Cost centre', value: 'CC-200 Sales HQ' },
                { label: 'Notes', value: order.notes ?? 'No special instructions.', full: true }]
                } />
              
              </Card>
              <Card title="Totals">
                <dl className="space-y-2 text-[13px]">
                  {[
                ['Net total', net || order.amount],
                ['Discount applied', -order.lines.reduce((s, l) => s + l.qty * l.unitPrice * (l.discountPct / 100), 0)],
                ['Tax', tax]].
                map(([label, value]) =>
                <div key={label as string} className="flex justify-between">
                      <dt className="text-slate-500">{label as string}</dt>
                      <dd className="tnum text-slate-800">{currency(value as number)}</dd>
                    </div>
                )}
                  <div className="flex justify-between border-t border-slate-200 pt-2">
                    <dt className="font-semibold text-slate-900">Order total</dt>
                    <dd className="text-base font-semibold tnum text-slate-900">{currency(gross)}</dd>
                  </div>
                </dl>
              </Card>
            </div>
          </>
        }

        {tab === 'fulfilment' &&
        <div className="grid gap-4 lg:grid-cols-2">
            <Card title="Inventory & production" description="Stock reservation and manufacturing coverage">
              <ul className="space-y-3 text-[13px]">
                <li className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <p className="font-medium text-slate-800">Stock reserved at {order.warehouse}</p>
                    <p className="text-xs text-slate-500">12 of 18 line units allocated from available stock</p>
                  </div>
                  <StatusBadge status="Partially Delivered" />
                </li>
                <li className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <p className="font-medium text-slate-800">
                      Work order {order.linkedWo ? <RecordLink to="/production/work-orders">{order.linkedWo}</RecordLink> : '—'}
                    </p>
                    <p className="text-xs text-slate-500">Balance quantity being manufactured on Assembly Line A</p>
                  </div>
                  <StatusBadge status="In Progress" />
                </li>
                <li className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-800">
                      Purchase request {order.linkedPr ? <RecordLink to="/procurement/requests">{order.linkedPr}</RecordLink> : '—'}
                    </p>
                    <p className="text-xs text-slate-500">Castings procured to cover the production shortfall</p>
                  </div>
                  <StatusBadge status="Approved" />
                </li>
              </ul>
            </Card>
            <Card title="Delivery & logistics">
              <ul className="space-y-3 text-[13px]">
                <li className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <p className="font-medium text-slate-800">
                      Shipment {order.linkedShipment ? <RecordLink to="/logistics/shipments">{order.linkedShipment}</RecordLink> : '—'}
                    </p>
                    <p className="text-xs text-slate-500">Batavia Logistics · ETA {shortDate(order.deliveryDate)}</p>
                  </div>
                  <StatusBadge status="Packed" />
                </li>
                <li className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-800">Dispatch slot DSP-2201</p>
                    <p className="text-xs text-slate-500">Dock 3 · 18 Sep 08:00–10:00 · Truck NL-42-BXK</p>
                  </div>
                  <StatusBadge status="Scheduled" />
                </li>
              </ul>
            </Card>
          </div>
        }

        {tab === 'finance' &&
        <Card title="Invoices and payments" padded={false}>
            <table className="w-full text-[13px]">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Document</th>
                  <th className="px-4 py-2 text-left font-semibold">Type</th>
                  <th className="px-4 py-2 text-left font-semibold">Date</th>
                  <th className="px-4 py-2 text-right font-semibold">Amount</th>
                  <th className="px-4 py-2 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-2.5 font-mono text-xs text-brand-700">{order.linkedInvoice ?? '—'}</td>
                  <td className="px-4 py-2.5">Customer invoice</td>
                  <td className="px-4 py-2.5">{shortDate('2026-08-10')}</td>
                  <td className="px-4 py-2.5 text-right tnum">{currency(gross)}</td>
                  <td className="px-4 py-2.5">
                    <StatusBadge status="Partially Paid" />
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-2.5 font-mono text-xs text-brand-700">PAY-3314</td>
                  <td className="px-4 py-2.5">Customer receipt</td>
                  <td className="px-4 py-2.5">{shortDate('2026-09-01')}</td>
                  <td className="px-4 py-2.5 text-right tnum">{currency(order.paid)}</td>
                  <td className="px-4 py-2.5">
                    <StatusBadge status="Posted" />
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        }

        {tab === 'documents' &&
        <Card title="Attached documents">
            <ul className="divide-y divide-slate-100 text-[13px]">
              {[
            ['Signed purchase order — customer copy.pdf', '412 KB'],
            ['Technical datasheet CS-150.pdf', '1.8 MB'],
            ['Class certification request.docx', '96 KB']].
            map(([name, size]) =>
            <li key={name} className="flex items-center justify-between py-2.5">
                  <span className="font-medium text-slate-800">{name}</span>
                  <span className="text-xs text-slate-400">{size}</span>
                </li>
            )}
            </ul>
          </Card>
        }

        {tab === 'activity' &&
        <Card title="Activity and audit history">
            <Timeline
            events={[
            { id: '1', title: 'Work order WO-7702 released', detail: 'Production coverage created for 12 units.', actor: 'Marek Kowalski', at: '24 Aug 2026 · 08:15', tone: 'info' },
            { id: '2', title: 'Invoice INV-9021 generated', detail: `${currency(gross)} raised against the order.`, actor: 'System', at: '10 Aug 2026 · 09:12', tone: 'brand' },
            { id: '3', title: 'Stock reserved at WH-01', detail: '12 of 18 units allocated.', actor: 'Nadia Rahman', at: '07 Aug 2026 · 15:44', tone: 'neutral' },
            { id: '4', title: 'Order approved', detail: 'Within credit limit — auto approved by workflow WF-03.', actor: 'Amara Osei', at: '06 Aug 2026 · 12:02', tone: 'success' },
            { id: '5', title: 'Order created from QUO-3312', actor: 'Lars Jensen', at: '06 Aug 2026 · 11:30', tone: 'neutral' }]
            } />
          
          </Card>
        }
      </div>

      <ConfirmDialog
        open={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={() => toast.push({ tone: 'success', title: `${order.id} confirmed`, body: 'Stock reserved and production notified.' })}
        title="Confirm sales order"
        message={`Confirm ${order.id} for ${order.customer}?`}
        confirmLabel="Confirm order"
        tone="success"
        detail="Confirming reserves inventory, triggers production coverage for shortfalls and locks the pricing on this order." />
      
    </div>);

}