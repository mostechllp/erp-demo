import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, DatabaseIcon } from 'lucide-react';
import { PageHeader } from '../components/patterns/PageHeader';
import { Card } from '../components/ui/Card';
import { DataTable } from '../components/ui/DataTable';
import { Alert } from '../components/ui/Alert';
import { MASTER_DATA_SETS } from '../data/reports';
import { number, shortDate } from '../utils/format';

type Row = (typeof MASTER_DATA_SETS)[number];

export function MasterData() {
  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title="Master Data"
        crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Master Data' }]}
        description="Shared reference data consumed by every transactional module. Maintained once, used everywhere." />
      

      <div className="flex-1 space-y-4 p-6">
        <Alert tone="info" title="One record, many modules">
          A product created here flows into sales, procurement, inventory, production, workshop and finance. A customer
          record drives sales orders, project billing, workshop jobs, invoices and payments — so changes are audited and
          permission-controlled.
        </Alert>

        <Card title="Master data sets" padded={false}>
          <DataTable<Row>
            rows={MASTER_DATA_SETS}
            rowKey={(m) => m.id}
            columns={[
            { key: 'id', header: 'Code', render: (m) => <span className="font-mono text-xs text-brand-700">{m.id}</span> },
            { key: 'name', header: 'Data set', render: (m) => <span className="font-medium text-slate-900">{m.name}</span>, sortValue: (m) => m.name },
            { key: 'records', header: 'Records', align: 'right', render: (m) => number(m.records), sortValue: (m) => m.records },
            { key: 'owner', header: 'Owning function', render: (m) => m.owner, sortValue: (m) => m.owner },
            { key: 'usedIn', header: 'Used in', render: (m) => <span className="text-slate-600">{m.usedIn}</span> },
            { key: 'updated', header: 'Last updated', render: (m) => shortDate(m.updated), sortValue: (m) => m.updated },
            {
              key: 'open',
              header: '',
              render: (m) =>
              <Link
                to={m.to}
                className="inline-flex items-center gap-1 text-xs font-medium text-brand-700 hover:underline">
                
                    Manage
                    <ArrowRightIcon className="h-3 w-3" />
                  </Link>

            }]
            } />
          
        </Card>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card title="Product master flow" description="Where a single product record is consumed">
            <ol className="space-y-2 text-[13px]">
              {['Sales — quotations, orders, invoices', 'Procurement — requests, purchase orders, receipts', 'Inventory — stock, transfers, valuation', 'Production — BOM, work orders, consumption', 'Workshop — parts issued to job cards', 'Finance — cost of sales and stock valuation'].map(
                (step, i) =>
                <li key={step} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[11px] font-semibold text-brand-700">
                      {i + 1}
                    </span>
                    <span className="text-slate-700">{step}</span>
                  </li>

              )}
            </ol>
          </Card>

          <Card title="Customer master flow" description="Where a single customer record is consumed">
            <ol className="space-y-2 text-[13px]">
              {['Sales — leads, quotations, sales orders', 'Projects — client contracts and billing', 'Workshop — job cards and service invoices', 'Logistics — delivery addresses and shipments', 'Finance — invoices, receipts, credit control', 'Reports — profitability and ageing analysis'].map(
                (step, i) =>
                <li key={step} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[11px] font-semibold text-brand-700">
                      {i + 1}
                    </span>
                    <span className="text-slate-700">{step}</span>
                  </li>

              )}
            </ol>
          </Card>
        </div>

        <p className="flex items-center gap-2 text-xs text-slate-400">
          <DatabaseIcon className="h-3.5 w-3.5" />
          {MASTER_DATA_SETS.reduce((s, m) => s + m.records, 0).toLocaleString()} master records across{' '}
          {MASTER_DATA_SETS.length} data sets.
        </p>
      </div>
    </div>);

}