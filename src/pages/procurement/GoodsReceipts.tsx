import React from 'react';
import { PackageCheckIcon, PlusIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { RecordLink } from '../../components/patterns/RecordLink';
import { GOODS_RECEIPTS } from '../../data/procurement';
import { shortDate } from '../../utils/format';
import type { GoodsReceipt } from '../../types/erp';

export function GoodsReceipts() {
  return (
    <ListPage<GoodsReceipt>
      title="Goods Receipts"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Procurement' }, { label: 'Goods Receipts' }]}
      description="Inbound receipts, inspection outcome and the stock postings they generate."
      actions={
      <Button variant="primary" icon={PlusIcon}>
          Record receipt
        </Button>
      }
      rows={GOODS_RECEIPTS}
      rowKey={(g) => g.id}
      searchText={(g) => `${g.id} ${g.po} ${g.supplier} ${g.warehouse} ${g.remarks}`}
      selectable
      statusTabs={[
      { id: 'all', label: 'All receipts', match: () => true },
      { id: 'partial', label: 'Partially received', match: (g) => g.status === 'Partially Received' },
      { id: 'full', label: 'Fully received', match: (g) => g.status === 'Fully Received' },
      { id: 'damaged', label: 'With damage', match: (g) => g.damaged > 0 }]
      }
      filters={[
      { id: 'status', label: 'Status', options: [...new Set(GOODS_RECEIPTS.map((g) => g.status))] },
      { id: 'warehouse', label: 'Warehouse', options: [...new Set(GOODS_RECEIPTS.map((g) => g.warehouse))] },
      { id: 'supplier', label: 'Supplier', options: [...new Set(GOODS_RECEIPTS.map((g) => g.supplier))] }]
      }
      filterValue={(g, id) => id === 'status' ? g.status : id === 'warehouse' ? g.warehouse : g.supplier}
      rowActions={() => [
      { label: 'View receipt', icon: PackageCheckIcon },
      { label: 'Open quality inspection' },
      { label: 'Create purchase return', danger: true, separatorBefore: true }]
      }
      columns={[
      { key: 'id', header: 'GRN', render: (g) => <span className="font-mono text-xs text-brand-700">{g.id}</span>, sortValue: (g) => g.id },
      { key: 'po', header: 'PO number', render: (g) => <RecordLink to={`/procurement/orders/${g.po}`}>{g.po}</RecordLink> },
      { key: 'supplier', header: 'Supplier', render: (g) => <span className="font-medium text-slate-900">{g.supplier}</span>, sortValue: (g) => g.supplier },
      { key: 'warehouse', header: 'Warehouse', render: (g) => g.warehouse },
      { key: 'received', header: 'Received', render: (g) => shortDate(g.received), sortValue: (g) => g.received },
      { key: 'ordered', header: 'Ordered', align: 'right', render: (g) => g.ordered },
      { key: 'receivedQty', header: 'Received qty', align: 'right', render: (g) => g.receivedQty, sortValue: (g) => g.receivedQty },
      { key: 'damaged', header: 'Damaged', align: 'right', render: (g) => <span className={g.damaged > 0 ? 'font-semibold text-red-600' : 'text-slate-400'}>{g.damaged}</span> },
      { key: 'accepted', header: 'Accepted', align: 'right', render: (g) => <span className="font-medium text-emerald-700">{g.accepted}</span> },
      { key: 'remarks', header: 'Remarks', render: (g) => <span className="text-slate-600">{g.remarks}</span>, optional: true },
      { key: 'status', header: 'Status', render: (g) => <StatusBadge status={g.status} />, sortValue: (g) => g.status }]
      } />);


}