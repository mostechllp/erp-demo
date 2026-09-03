import React from 'react';
import { FactoryIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { Progress } from '../../components/ui/Progress';
import { RecordLink } from '../../components/patterns/RecordLink';
import { PRODUCTION_OUTPUT } from '../../data/production';
import { number, shortDate } from '../../utils/format';

type Row = (typeof PRODUCTION_OUTPUT)[number];

export function ProductionOutput() {
  return (
    <ListPage<Row>
      title="Production Output"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Production' }, { label: 'Production Output' }]}
      description="Declared output per work order and shift, feeding finished goods into inventory."
      actions={
      <Button variant="primary" icon={FactoryIcon}>
          Declare output
        </Button>
      }
      rows={PRODUCTION_OUTPUT}
      rowKey={(r) => r.wo + r.date}
      searchText={(r) => `${r.wo} ${r.product} ${r.shift}`}
      statusTabs={[
      { id: 'all', label: 'All output', match: () => true },
      { id: 'open', label: 'Incomplete', match: (r) => r.completion < 100 },
      { id: 'rejects', label: 'With rejects', match: (r) => r.rejected > 0 }]
      }
      filters={[
      { id: 'shift', label: 'Shift', options: [...new Set(PRODUCTION_OUTPUT.map((r) => r.shift))] },
      { id: 'wo', label: 'Work order', options: [...new Set(PRODUCTION_OUTPUT.map((r) => r.wo))] }]
      }
      filterValue={(r, id) => id === 'shift' ? r.shift : r.wo}
      rowActions={() => [{ label: 'View work order' }, { label: 'Post to inventory' }, { label: 'Open QC inspection' }]}
      columns={[
      { key: 'wo', header: 'Work order', render: (r) => <RecordLink to="/production/work-orders">{r.wo}</RecordLink> },
      { key: 'product', header: 'Product', render: (r) => <span className="font-medium text-slate-900">{r.product}</span>, sortValue: (r) => r.product },
      { key: 'date', header: 'Date', render: (r) => shortDate(r.date), sortValue: (r) => r.date },
      { key: 'shift', header: 'Shift', render: (r) => r.shift },
      { key: 'planned', header: 'Planned', align: 'right', render: (r) => number(r.planned) },
      { key: 'produced', header: 'Produced', align: 'right', render: (r) => number(r.produced), sortValue: (r) => r.produced },
      { key: 'rejected', header: 'Rejected', align: 'right', render: (r) => <span className={r.rejected ? 'font-semibold text-red-600' : 'text-slate-400'}>{r.rejected}</span> },
      { key: 'accepted', header: 'Accepted', align: 'right', render: (r) => <span className="font-medium text-emerald-700">{number(r.accepted)}</span> },
      {
        key: 'completion',
        header: 'Completion',
        width: '160px',
        sortValue: (r) => r.completion,
        render: (r) => <Progress value={r.completion} tone={r.completion === 100 ? 'success' : 'brand'} showValue label={`${r.wo} completion`} />
      }]
      } />);


}