import React from 'react';
import { ClipboardCheckIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { KpiCard } from '../../components/patterns/KpiCard';
import { QUALITY_INSPECTIONS } from '../../data/production';
import { number, shortDate } from '../../utils/format';

type Row = (typeof QUALITY_INSPECTIONS)[number];

export function QualityControl() {
  const inspected = QUALITY_INSPECTIONS.reduce((s, q) => s + q.inspected, 0);
  const rejected = QUALITY_INSPECTIONS.reduce((s, q) => s + q.rejected, 0);

  return (
    <ListPage<Row>
      title="Quality Control"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Production' }, { label: 'Quality Control' }]}
      description="In-process and incoming inspections, defect reasons and non-conformance disposition."
      actions={
      <Button variant="primary" icon={ClipboardCheckIcon}>
          New inspection
        </Button>
      }
      summary={
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="Units inspected" value={number(inspected)} delta={6.4} />
          <KpiCard label="Rejected" value={number(rejected)} delta={-8.1} invertDelta />
          <KpiCard label="Rejection rate" value={`${(rejected / inspected * 100).toFixed(2)}%`} delta={-0.4} invertDelta />
          <KpiCard label="Open NCRs" value="1" hint="NCR-118 casting porosity" />
        </div>
      }
      rows={QUALITY_INSPECTIONS}
      rowKey={(q) => q.id}
      searchText={(q) => `${q.id} ${q.wo} ${q.product} ${q.batch} ${q.defect} ${q.inspector}`}
      selectable
      statusTabs={[
      { id: 'all', label: 'All inspections', match: () => true },
      { id: 'passed', label: 'Passed', match: (q) => q.status === 'Passed' },
      { id: 'rejected', label: 'Rejected', match: (q) => q.status === 'Rejected' },
      { id: 'open', label: 'In progress', match: (q) => q.status === 'In Progress' }]
      }
      filters={[
      { id: 'status', label: 'Status', options: [...new Set(QUALITY_INSPECTIONS.map((q) => q.status))] },
      { id: 'inspector', label: 'Inspector', options: [...new Set(QUALITY_INSPECTIONS.map((q) => q.inspector))] }]
      }
      filterValue={(q, id) => id === 'status' ? q.status : q.inspector}
      rowActions={() => [{ label: 'Open inspection' }, { label: 'Raise NCR' }, { label: 'Release batch' }, { label: 'Scrap batch', danger: true }]}
      columns={[
      { key: 'id', header: 'Inspection', render: (q) => <span className="font-mono text-xs text-brand-700">{q.id}</span>, sortValue: (q) => q.id },
      { key: 'wo', header: 'Reference', render: (q) => <span className="font-mono text-xs text-slate-500">{q.wo}</span> },
      { key: 'product', header: 'Product', render: (q) => <span className="font-medium text-slate-900">{q.product}</span>, sortValue: (q) => q.product },
      { key: 'batch', header: 'Batch / lot', render: (q) => q.batch },
      { key: 'inspected', header: 'Inspected', align: 'right', render: (q) => number(q.inspected), sortValue: (q) => q.inspected },
      { key: 'accepted', header: 'Accepted', align: 'right', render: (q) => <span className="text-emerald-700">{number(q.accepted)}</span> },
      { key: 'rejected', header: 'Rejected', align: 'right', render: (q) => <span className={q.rejected ? 'font-semibold text-red-600' : 'text-slate-400'}>{q.rejected}</span>, sortValue: (q) => q.rejected },
      { key: 'defect', header: 'Defect reason', render: (q) => <span className="text-slate-600">{q.defect}</span> },
      { key: 'inspector', header: 'Inspector', render: (q) => q.inspector, optional: true },
      { key: 'date', header: 'Date', render: (q) => shortDate(q.date), sortValue: (q) => q.date, optional: true },
      { key: 'status', header: 'Status', render: (q) => <StatusBadge status={q.status} />, sortValue: (q) => q.status }]
      } />);


}