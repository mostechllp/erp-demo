import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MailIcon, PencilIcon, PhoneIcon, PlusIcon } from 'lucide-react';
import { PageHeader } from '../../components/patterns/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { DefinitionList } from '../../components/patterns/DefinitionList';
import { StatTile } from '../../components/patterns/StatTile';
import { Timeline } from '../../components/patterns/Timeline';
import { RecordLink } from '../../components/patterns/RecordLink';
import { EmptyState } from '../../components/ui/EmptyState';
import { NotFound } from '../errors/NotFound';
import { AR_INVOICES, CUSTOMERS, SALES_ORDERS } from '../../data/sales';
import { PROJECTS } from '../../data/projects';
import { JOB_CARDS } from '../../data/workshop';
import { PAYMENTS } from '../../data/finance';
import { currency, shortDate } from '../../utils/format';

const TABS = [
{ id: 'overview', label: 'Overview' },
{ id: 'orders', label: 'Sales Orders' },
{ id: 'invoices', label: 'Invoices' },
{ id: 'payments', label: 'Payments' },
{ id: 'projects', label: 'Projects' },
{ id: 'jobs', label: 'Workshop Jobs' },
{ id: 'documents', label: 'Documents' },
{ id: 'activity', label: 'Activity' }];


export function CustomerDetail() {
  const { id } = useParams();
  const [tab, setTab] = useState('overview');
  const customer = CUSTOMERS.find((c) => c.id === id);

  if (!customer) return <NotFound />;

  const orders = SALES_ORDERS.filter((o) => o.customerId === customer.id);
  const invoices = AR_INVOICES.filter((i) => i.party === customer.name);
  const payments = PAYMENTS.filter((p) => p.party === customer.name);
  const projects = PROJECTS.filter((p) => p.client === customer.name);
  const jobs = JOB_CARDS.filter((j) => j.customer === customer.name);
  const lifetime = orders.reduce((s, o) => s + o.amount, 0);

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title={customer.name}
        crumbs={[
        { label: 'Home', to: '/dashboard' },
        { label: 'Sales & CRM' },
        { label: 'Customers', to: '/sales/customers' },
        { label: customer.id }]
        }
        meta={
        <>
            <span className="font-mono text-xs text-slate-500">{customer.id}</span>
            <StatusBadge status={customer.status} />
          </>
        }
        description={`${customer.segment} · account owner ${customer.owner} · customer since ${shortDate(customer.since)}`}
        actions={
        <>
            <Button icon={MailIcon}>Email</Button>
            <Button icon={PencilIcon}>Edit</Button>
            <Button variant="primary" icon={PlusIcon}>
              New sales order
            </Button>
          </>
        }
        tabs={<Tabs tabs={TABS.map((t) => ({ ...t }))} active={tab} onChange={setTab} />} />
      

      <div className="flex-1 space-y-4 p-6">
        <div className="grid gap-3 rounded border border-slate-200 bg-white p-4 shadow-card sm:grid-cols-2 lg:grid-cols-5">
          <StatTile label="Lifetime order value" value={currency(lifetime, { compact: true })} sub={`${orders.length} orders`} />
          <StatTile label="Outstanding balance" value={currency(customer.outstanding)} tone={customer.outstanding > 0 ? 'danger' : 'success'} sub="Across open invoices" />
          <StatTile label="Credit limit" value={currency(customer.creditLimit)} sub={`${Math.round(customer.outstanding / customer.creditLimit * 100)}% utilised`} />
          <StatTile label="Open projects" value={String(projects.filter((p) => p.status !== 'Completed').length)} sub={`${projects.length} total`} />
          <StatTile label="Workshop jobs" value={String(jobs.length)} sub={`${jobs.filter((j) => j.status !== 'Closed').length} open`} />
        </div>

        {tab === 'overview' &&
        <div className="grid gap-4 lg:grid-cols-3">
            <Card title="Basic information" className="lg:col-span-2">
              <DefinitionList
              items={[
              { label: 'Legal entity', value: customer.company },
              { label: 'Segment', value: customer.segment },
              { label: 'Primary contact', value: customer.contact },
              { label: 'Account owner', value: customer.owner },
              { label: 'Email', value: <span className="inline-flex items-center gap-1"><MailIcon className="h-3 w-3 text-slate-400" />{customer.email}</span> },
              { label: 'Phone', value: <span className="inline-flex items-center gap-1 tnum"><PhoneIcon className="h-3 w-3 text-slate-400" />{customer.phone}</span> },
              { label: 'Billing address', value: 'Havenstraat 118, 3011 XT Rotterdam, Netherlands', full: true },
              { label: 'Delivery address', value: 'Terminal Gate 4, Waalhaven Oostzijde, Rotterdam', full: true }]
              } />
            
            </Card>
            <Card title="Financial information">
              <DefinitionList
              columns={1}
              items={[
              { label: 'Payment terms', value: 'Net 30 from invoice date' },
              { label: 'Currency', value: 'EUR — Euro' },
              { label: 'Tax registration', value: 'NL 8123.45.678.B01' },
              { label: 'Credit limit', value: currency(customer.creditLimit) },
              { label: 'Credit status', value: <StatusBadge status={customer.status === 'On Hold' ? 'On Hold' : 'Approved'} /> },
              { label: 'Default price list', value: 'EU Industrial 2026' }]
              } />
            
            </Card>
            <Card title="Notes" className="lg:col-span-3">
              <p className="text-[13px] leading-relaxed text-slate-600">
                Long-standing marine account. All pump deliveries require class certification documents (Lloyd&apos;s
                Register) attached to the delivery note. Consolidated monthly invoicing agreed from Q4 2026 — do not
                issue per-delivery invoices without approval from the account owner.
              </p>
            </Card>
          </div>
        }

        {tab === 'orders' &&
        <Card title="Sales orders" padded={false}>
            <RelatedTable
            head={['Order', 'Order date', 'Delivery', 'Warehouse', 'Value', 'Status']}
            rows={orders.map((o) => [
            <RecordLink key="l" to={`/sales/orders/${o.id}`}>{o.id}</RecordLink>,
            shortDate(o.orderDate),
            shortDate(o.deliveryDate),
            o.warehouse,
            currency(o.amount),
            <StatusBadge key="s" status={o.status} />]
            )}
            emptyLabel="No sales orders for this customer yet." />
          
          </Card>
        }

        {tab === 'invoices' &&
        <Card title="Invoices" padded={false}>
            <RelatedTable
            head={['Invoice', 'Reference', 'Issued', 'Due', 'Amount', 'Balance', 'Status']}
            rows={invoices.map((i) => [
            <span key="l" className="font-mono text-xs text-brand-700">{i.id}</span>,
            i.reference,
            shortDate(i.issued),
            shortDate(i.due),
            currency(i.amount),
            currency(i.balance),
            <StatusBadge key="s" status={i.status} />]
            )}
            emptyLabel="No invoices raised." />
          
          </Card>
        }

        {tab === 'payments' &&
        <Card title="Payments received" padded={false}>
            <RelatedTable
            head={['Payment', 'Date', 'Method', 'Against', 'Amount', 'Status']}
            rows={payments.map((p) => [
            <span key="l" className="font-mono text-xs text-brand-700">{p.id}</span>,
            shortDate(p.date),
            p.method,
            p.reference,
            currency(p.amount),
            <StatusBadge key="s" status={p.status} />]
            )}
            emptyLabel="No payments recorded in this period." />
          
          </Card>
        }

        {tab === 'projects' &&
        <Card title="Projects" padded={false}>
            <RelatedTable
            head={['Project', 'Manager', 'Budget', 'Actual', 'Revenue', 'Status']}
            rows={projects.map((p) => [
            <RecordLink key="l" to={`/projects/${p.id}`} mono={false}>{p.name}</RecordLink>,
            p.manager,
            currency(p.budget, { compact: true }),
            currency(p.actual, { compact: true }),
            currency(p.revenue, { compact: true }),
            <StatusBadge key="s" status={p.status} />]
            )}
            emptyLabel="This customer has no projects." />
          
          </Card>
        }

        {tab === 'jobs' &&
        <Card title="Workshop jobs" padded={false}>
            <RelatedTable
            head={['Job', 'Asset', 'Technician', 'Due', 'Revenue', 'Status']}
            rows={jobs.map((j) => [
            <RecordLink key="l" to={`/workshop/jobs/${j.id}`}>{j.id}</RecordLink>,
            j.asset,
            j.technician,
            shortDate(j.due),
            currency(j.revenue),
            <StatusBadge key="s" status={j.status} />]
            )}
            emptyLabel="No workshop jobs logged for this customer." />
          
          </Card>
        }

        {tab === 'documents' &&
        <Card title="Documents">
            <ul className="divide-y divide-slate-100 text-[13px]">
              {[
            ['Master supply agreement 2024–2027.pdf', 'Contract', '2.4 MB', '11 Apr 2024'],
            ['Credit assessment — Q2 2026.xlsx', 'Finance', '184 KB', '02 Jun 2026'],
            ['Class certification template.pdf', 'Quality', '820 KB', '18 Jan 2026']].
            map(([name, type, size, date]) =>
            <li key={name} className="flex items-center justify-between py-2.5">
                  <div>
                    <p className="font-medium text-slate-800">{name}</p>
                    <p className="text-xs text-slate-500">
                      {type} · {size}
                    </p>
                  </div>
                  <span className="text-xs text-slate-400">{date}</span>
                </li>
            )}
            </ul>
          </Card>
        }

        {tab === 'activity' &&
        <Card title="Activity timeline">
            <Timeline
            events={[
            { id: '1', title: 'Sales order SO-5041 moved to Processing', detail: 'Production released WO-7702 against this order.', actor: 'Marek Kowalski', at: '31 Aug 2026 · 16:48', tone: 'info' },
            { id: '2', title: 'Invoice INV-9021 issued', detail: `${currency(184500)} · due 09 Sep 2026`, actor: 'Sophie Laurent', at: '10 Aug 2026 · 09:12', tone: 'brand' },
            { id: '3', title: 'Quotation QUO-3312 accepted', detail: 'Converted to sales order SO-5041.', actor: 'Lars Jensen', at: '06 Aug 2026 · 11:30', tone: 'success' },
            { id: '4', title: 'Credit limit reviewed', detail: `Limit maintained at ${currency(customer.creditLimit)} after Q2 assessment.`, actor: 'Sophie Laurent', at: '02 Jun 2026 · 14:05', tone: 'neutral' }]
            } />
          
          </Card>
        }
      </div>
    </div>);

}

function RelatedTable({
  head,
  rows,
  emptyLabel




}: {head: string[];rows: React.ReactNode[][];emptyLabel: string;}) {
  if (rows.length === 0) return <EmptyState compact title="Nothing to show" description={emptyLabel} />;
  return (
    <div className="erp-scroll overflow-x-auto">
      <table className="w-full min-w-max text-[13px]">
        <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
          <tr>
            {head.map((h, i) =>
            <th key={h} className={`px-4 py-2 font-semibold ${i >= head.length - 2 ? 'text-left' : 'text-left'}`}>
                {h}
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((r, i) =>
          <tr key={i} className="hover:bg-slate-50">
              {r.map((cell, j) =>
            <td key={j} className="px-4 py-2.5 text-slate-700">
                  {cell}
                </td>
            )}
            </tr>
          )}
        </tbody>
      </table>
    </div>);

}