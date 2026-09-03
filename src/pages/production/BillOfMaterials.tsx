import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon, PlusIcon } from 'lucide-react';
import { PageHeader } from '../../components/patterns/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Badge } from '../../components/ui/Badge';
import { DefinitionList } from '../../components/patterns/DefinitionList';
import { BOMS } from '../../data/production';
import { currency } from '../../utils/format';
import type { Bom, BomLine } from '../../types/erp';

export function BillOfMaterials() {
  const [selected, setSelected] = useState<Bom>(BOMS[0]);
  const [expanded, setExpanded] = useState<string[]>(['SUB-ROT-150']);

  const toggle = (sku: string) =>
  setExpanded((prev) => prev.includes(sku) ? prev.filter((s) => s !== sku) : [...prev, sku]);

  const renderLine = (line: BomLine, depth: number): React.ReactNode[] => {
    const isOpen = expanded.includes(line.sku);
    const rows: React.ReactNode[] = [
    <tr key={line.sku} className="hover:bg-slate-50">
        <td className="px-4 py-2.5">
          <div className="flex items-center gap-1.5" style={{ paddingLeft: depth * 20 }}>
            {line.children ?
          <button
            type="button"
            onClick={() => toggle(line.sku)}
            aria-expanded={isOpen}
            aria-label={`Toggle ${line.name}`}
            className="rounded p-0.5 text-slate-400 transition-colors duration-150 ease-erp hover:bg-slate-200 hover:text-slate-700">
            
                {isOpen ? <ChevronDownIcon className="h-3.5 w-3.5" /> : <ChevronRightIcon className="h-3.5 w-3.5" />}
              </button> :

          <span className="inline-block w-[18px]" />
          }
            <span className="font-mono text-xs text-brand-700">{line.sku}</span>
          </div>
        </td>
        <td className="px-4 py-2.5">
          <span className="font-medium text-slate-900">{line.name}</span>
        </td>
        <td className="px-4 py-2.5">
          <Badge tone={line.kind === 'Component' ? 'brand' : 'neutral'}>{line.kind}</Badge>
        </td>
        <td className="px-4 py-2.5 text-right tnum">{line.qty}</td>
        <td className="px-4 py-2.5 text-slate-500">{line.unit}</td>
        <td className="px-4 py-2.5 text-right tnum">{currency(line.cost)}</td>
      </tr>];

    if (line.children && isOpen) {
      line.children.forEach((child) => rows.push(...renderLine(child, depth + 1)));
    }
    return rows;
  };

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title="Bill of Materials"
        crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Production' }, { label: 'Bill of Materials' }]}
        description="Multi-level product structures with costed raw materials, components and sub-assemblies."
        actions={
        <>
            <Button>Compare versions</Button>
            <Button variant="primary" icon={PlusIcon}>
              New BOM
            </Button>
          </>
        } />
      

      <div className="grid flex-1 gap-4 p-6 xl:grid-cols-3">
        <Card title="BOM register" padded={false} className="xl:col-span-1">
          <DataTable<Bom>
            rows={BOMS}
            rowKey={(b) => b.id}
            dense
            onRowClick={setSelected}
            columns={[
            { key: 'id', header: 'BOM', render: (b) => <span className="font-mono text-xs text-brand-700">{b.id}</span> },
            {
              key: 'product',
              header: 'Finished product',
              render: (b) =>
              <div>
                    <p className="font-medium text-slate-900">{b.product}</p>
                    <p className="text-xs text-slate-500">{b.version}</p>
                  </div>

            },
            { key: 'cost', header: 'Cost', align: 'right', render: (b) => currency(b.cost, { compact: true }) },
            { key: 'status', header: 'Status', render: (b) => <StatusBadge status={b.status} /> }]
            } />
          
        </Card>

        <div className="space-y-4 xl:col-span-2">
          <Card title={`${selected.product} — ${selected.version}`} description={`${selected.id} · output ${selected.outputQty} ${selected.unit}`}>
            <DefinitionList
              columns={3}
              items={[
              { label: 'Status', value: <StatusBadge status={selected.status} /> },
              { label: 'Standard cost', value: currency(selected.cost) },
              { label: 'Components', value: `${selected.lines.length} first-level lines` },
              { label: 'Routing', value: 'WC-MACH-2 → WC-SUB-1 → WC-ASSY-1' },
              { label: 'Effective from', value: '01 Jul 2026' },
              { label: 'Approved by', value: 'Elena Petrova (QA)' }]
              } />
            
          </Card>

          <Card
            title="Structure"
            description="Finished product exploded into raw materials, components and sub-assemblies"
            padded={false}>
            
            {selected.lines.length === 0 ?
            <p className="px-4 py-10 text-center text-[13px] text-slate-500">
                This BOM version has no published structure. Select BOM-4401 to view a fully exploded example.
              </p> :

            <div className="erp-scroll overflow-x-auto">
                <table className="w-full min-w-max text-[13px]">
                  <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold">SKU</th>
                      <th className="px-4 py-2 text-left font-semibold">Material / component</th>
                      <th className="px-4 py-2 text-left font-semibold">Kind</th>
                      <th className="px-4 py-2 text-right font-semibold">Qty</th>
                      <th className="px-4 py-2 text-left font-semibold">Unit</th>
                      <th className="px-4 py-2 text-right font-semibold">Expected cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-brand-50/60">
                      <td className="px-4 py-2.5 font-mono text-xs font-semibold text-brand-800">FG</td>
                      <td className="px-4 py-2.5 font-semibold text-slate-900">{selected.product}</td>
                      <td className="px-4 py-2.5">
                        <Badge tone="brand">Finished good</Badge>
                      </td>
                      <td className="px-4 py-2.5 text-right tnum font-semibold">{selected.outputQty}</td>
                      <td className="px-4 py-2.5 text-slate-500">{selected.unit}</td>
                      <td className="px-4 py-2.5 text-right font-semibold tnum">{currency(selected.cost)}</td>
                    </tr>
                    {selected.lines.flatMap((l) => renderLine(l, 1))}
                  </tbody>
                  <tfoot className="bg-slate-50">
                    <tr className="border-t-2 border-slate-200 font-semibold text-slate-800">
                      <td className="px-4 py-2" colSpan={5}>
                        Total material cost per unit
                      </td>
                      <td className="px-4 py-2 text-right tnum">
                        {currency(selected.lines.reduce((s, l) => s + l.cost, 0))}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            }
          </Card>
        </div>
      </div>
    </div>);

}