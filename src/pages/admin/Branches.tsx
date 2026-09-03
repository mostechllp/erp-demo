import React from 'react';
import { PlusIcon } from 'lucide-react';
import { PageHeader } from '../../components/patterns/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { DefinitionList } from '../../components/patterns/DefinitionList';
import { BRANCHES, COMPANY } from '../../data/org';
import { DEPARTMENTS } from '../../data/hr';
import { currency, number } from '../../utils/format';
import type { Branch } from '../../types/erp';

export function Branches() {
  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title="Branches, Departments & Cost Centres"
        crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Administration' }, { label: 'Branches' }]}
        description="Legal and operational structure that scopes every transaction, report and permission."
        actions={
        <Button variant="primary" icon={PlusIcon}>
            New branch
          </Button>
        } />
      

      <div className="flex-1 space-y-4 p-6">
        <Card title="Company profile">
          <DefinitionList
            columns={4}
            items={[
            { label: 'Legal entity', value: COMPANY.legal },
            { label: 'Company code', value: COMPANY.code },
            { label: 'Tax registration', value: COMPANY.taxId },
            { label: 'Base currency', value: COMPANY.baseCurrency },
            { label: 'Financial year', value: COMPANY.fiscalYear },
            { label: 'Current period', value: COMPANY.period },
            { label: 'Branches', value: String(BRANCHES.length) },
            { label: 'Cost centres', value: String(DEPARTMENTS.length) }]
            } />
          
        </Card>

        <Card title="Branches" padded={false}>
          <DataTable<Branch>
            rows={BRANCHES}
            rowKey={(b) => b.id}
            columns={[
            { key: 'id', header: 'Code', render: (b) => <span className="font-mono text-xs text-brand-700">{b.id}</span> },
            { key: 'name', header: 'Branch', render: (b) => <span className="font-medium text-slate-900">{b.name}</span>, sortValue: (b) => b.name },
            { key: 'city', header: 'City', render: (b) => b.city },
            { key: 'country', header: 'Country', render: (b) => b.country, sortValue: (b) => b.country },
            { key: 'currency', header: 'Local currency', render: (b) => b.currency },
            { key: 'status', header: 'Status', render: () => <StatusBadge status="Active" /> }]
            }
            rowActions={() => [{ label: 'Edit branch' }, { label: 'View users' }, { label: 'Deactivate', danger: true }]} />
          
        </Card>

        <Card title="Departments & cost centres" padded={false}>
          <DataTable
            rows={DEPARTMENTS}
            rowKey={(d) => d.id}
            dense
            columns={[
            { key: 'id', header: 'Code', render: (d) => <span className="font-mono text-xs text-brand-700">{d.id}</span> },
            { key: 'name', header: 'Department', render: (d) => <span className="font-medium text-slate-900">{d.name}</span>, sortValue: (d) => d.name },
            { key: 'costCenter', header: 'Cost centre', render: (d) => <span className="font-mono text-xs text-slate-500">{d.costCenter}</span> },
            { key: 'head', header: 'Head', render: (d) => d.head },
            { key: 'headcount', header: 'Headcount', align: 'right', render: (d) => number(d.headcount), sortValue: (d) => d.headcount },
            { key: 'budget', header: 'Annual budget', align: 'right', render: (d) => currency(d.budget), sortValue: (d) => d.budget }]
            }
            rowActions={() => [{ label: 'Edit department' }, { label: 'Reassign cost centre' }]} />
          
        </Card>
      </div>
    </div>);

}