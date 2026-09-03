import React, { useState } from 'react';
import { SaveIcon } from 'lucide-react';
import { PageHeader } from '../components/patterns/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { useToast } from '../contexts/ToastContext';
import { BRANCHES, COMPANY } from '../data/org';
import { TAX_LINES } from '../data/finance';
import { WAREHOUSES } from '../data/inventory';
import { APPROVAL_WORKFLOWS } from '../data/governance';
import { currency } from '../utils/format';
import type { Branch } from '../types/erp';

const TABS = [
{ id: 'company', label: 'Company profile' },
{ id: 'branches', label: 'Branches' },
{ id: 'financial', label: 'Financial' },
{ id: 'tax', label: 'Tax & currencies' },
{ id: 'inventory', label: 'Inventory & stores' },
{ id: 'production', label: 'Production' },
{ id: 'payroll', label: 'Payroll' },
{ id: 'workflow', label: 'Workflow' },
{ id: 'notifications', label: 'Notifications' },
{ id: 'system', label: 'System preferences' }];


export function Settings() {
  const { push } = useToast();
  const [tab, setTab] = useState('company');

  const save = () => push({ tone: 'success', title: 'Settings saved', description: 'Changes apply immediately.' });

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title="Settings"
        crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Settings' }]}
        description="Company, financial, operational and system configuration."
        actions={
        <Button variant="primary" icon={SaveIcon} onClick={save}>
            Save changes
          </Button>
        }
        tabs={<Tabs tabs={TABS} active={tab} onChange={setTab} />} />
      

      <div className="flex-1 space-y-4 p-6">
        {tab === 'company' &&
        <Card title="Company profile" description="Used on all printed and exported documents">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Input label="Legal name" defaultValue={COMPANY.legal} required />
              <Input label="Trading name" defaultValue={COMPANY.name} required />
              <Input label="Company code" defaultValue={COMPANY.code} required />
              <Input label="Tax registration number" defaultValue={COMPANY.taxId} />
              <Input label="Registered address" defaultValue="Weena 340, 3012 NJ Rotterdam" />
              <Input label="Country" defaultValue="Netherlands" />
              <Input label="Primary contact email" type="email" defaultValue="info@meridian-ig.com" />
              <Input label="Primary contact phone" defaultValue="+31 10 448 2200" />
              <Select label="Default language" options={[{ value: 'en', label: 'English (UK)' }, { value: 'nl', label: 'Nederlands' }]} />
            </div>
          </Card>
        }

        {tab === 'branches' &&
        <Card title="Branches" description="Transaction scope, reporting and permission boundaries" padded={false}>
            <DataTable<Branch>
            rows={BRANCHES}
            rowKey={(b) => b.id}
            columns={[
            { key: 'name', header: 'Branch', render: (b) => <span className="font-medium text-slate-900">{b.name}</span> },
            { key: 'city', header: 'City', render: (b) => b.city },
            { key: 'country', header: 'Country', render: (b) => b.country },
            { key: 'currency', header: 'Currency', render: (b) => b.currency },
            { key: 'status', header: 'Status', render: () => <StatusBadge status="Active" /> }]
            }
            rowActions={() => [{ label: 'Edit branch' }, { label: 'Set as default' }]} />
          
          </Card>
        }

        {tab === 'financial' &&
        <div className="grid gap-4 lg:grid-cols-2">
            <Card title="Financial settings">
              <div className="grid gap-4 sm:grid-cols-2">
                <Select label="Financial year start" options={[{ value: 'jan', label: 'January' }, { value: 'apr', label: 'April' }]} />
                <Select label="Base currency" options={[{ value: 'usd', label: 'USD — US Dollar' }, { value: 'eur', label: 'EUR — Euro' }]} />
                <Select label="Costing method" options={[{ value: 'wavg', label: 'Weighted average' }, { value: 'fifo', label: 'FIFO' }, { value: 'std', label: 'Standard cost' }]} />
                <Select label="Rounding" options={[{ value: '2', label: '2 decimal places' }, { value: '0', label: 'Whole units' }]} />
                <Input label="Default payment terms (days)" type="number" defaultValue="30" />
                <Input label="Credit limit tolerance (%)" type="number" defaultValue="5" />
              </div>
            </Card>
            <Card title="Document numbering">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Sales order prefix" defaultValue="SO-" />
                <Input label="Purchase order prefix" defaultValue="PO-" />
                <Input label="Invoice prefix" defaultValue="INV-" />
                <Input label="Work order prefix" defaultValue="WO-" />
                <Input label="Job card prefix" defaultValue="JOB-" />
                <Input label="Journal prefix" defaultValue="JV-" />
              </div>
            </Card>
          </div>
        }

        {tab === 'tax' &&
        <Card title="Tax configuration" description="Applied by default on sales and purchase documents" padded={false}>
            <DataTable
            rows={TAX_LINES}
            rowKey={(t) => t.id}
            columns={[
            { key: 'name', header: 'Tax code', render: (t) => <span className="font-medium text-slate-900">{t.name}</span> },
            { key: 'rate', header: 'Rate', align: 'right', render: (t) => `${t.rate}%` },
            { key: 'type', header: 'Applies to', render: (t) => t.type === 'Output' ? 'Sales' : 'Purchases' },
            { key: 'taxable', header: 'Period base', align: 'right', render: (t) => currency(t.taxable) },
            { key: 'status', header: 'Status', render: (t) => <StatusBadge status={t.status} /> }]
            }
            rowActions={() => [{ label: 'Edit rate' }, { label: 'Set as default' }, { label: 'Archive', danger: true }]} />
          
          </Card>
        }

        {tab === 'inventory' &&
        <div className="grid gap-4 lg:grid-cols-2">
            <Card title="Inventory settings">
              <div className="grid gap-4 sm:grid-cols-2">
                <Select label="Valuation method" options={[{ value: 'wavg', label: 'Weighted average' }, { value: 'fifo', label: 'FIFO' }]} />
                <Select label="Allow negative stock" options={[{ value: 'no', label: 'No — block issue' }, { value: 'yes', label: 'Yes — warn only' }]} />
                <Input label="Reorder alert threshold (%)" type="number" defaultValue="10" />
                <Input label="Cycle count frequency (days)" type="number" defaultValue="30" />
                <Input label="Adjustment approval limit" type="number" defaultValue="1000" />
                <Select label="Default warehouse" options={WAREHOUSES.map((w) => ({ value: w.id, label: w.name }))} />
              </div>
            </Card>
            <Card title="Warehouses & stores" padded={false}>
              <DataTable
              rows={WAREHOUSES}
              rowKey={(w) => w.id}
              dense
              columns={[
              { key: 'id', header: 'Code', render: (w) => <span className="font-mono text-xs text-brand-700">{w.id}</span> },
              { key: 'name', header: 'Location', render: (w) => <span className="font-medium text-slate-900">{w.name}</span> },
              { key: 'type', header: 'Type', render: (w) => w.type },
              { key: 'status', header: 'Status', render: () => <StatusBadge status="Active" /> }]
              } />
            
            </Card>
          </div>
        }

        {tab === 'production' &&
        <Card title="Production settings">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Select label="Backflush materials" options={[{ value: 'output', label: 'On output declaration' }, { value: 'manual', label: 'Manual issue only' }]} />
              <Select label="Work order release" options={[{ value: 'approval', label: 'Requires approval above $50,000' }, { value: 'auto', label: 'Automatic on plan' }]} />
              <Input label="Standard shift length (hours)" type="number" defaultValue="8" />
              <Input label="Efficiency target (%)" type="number" defaultValue="92" />
              <Input label="Scrap tolerance (%)" type="number" defaultValue="2" />
              <Select label="Quality inspection" options={[{ value: 'mandatory', label: 'Mandatory before finished goods' }, { value: 'sample', label: 'Sample based' }]} />
            </div>
          </Card>
        }

        {tab === 'payroll' &&
        <Card title="Payroll settings">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Select label="Pay cycle" options={[{ value: 'monthly', label: 'Monthly' }, { value: 'biweekly', label: 'Bi-weekly' }]} />
              <Input label="Pay day (day of month)" type="number" defaultValue="28" />
              <Input label="Overtime multiplier" type="number" step="0.1" defaultValue="1.5" />
              <Input label="Annual leave entitlement (days)" type="number" defaultValue="25" />
              <Input label="Default tax rate (%)" type="number" defaultValue="18" />
              <Select label="Payslip delivery" options={[{ value: 'email', label: 'Email to employee' }, { value: 'portal', label: 'Self-service portal' }]} />
            </div>
          </Card>
        }

        {tab === 'workflow' &&
        <Card title="Workflow settings" description="Active approval chains" padded={false}>
            <DataTable
            rows={APPROVAL_WORKFLOWS.filter((w) => w.active)}
            rowKey={(w) => w.id}
            dense
            columns={[
            { key: 'name', header: 'Workflow', render: (w) => <span className="font-medium text-slate-900">{w.name}</span> },
            { key: 'module', header: 'Module', render: (w) => w.module },
            { key: 'trigger', header: 'Trigger', render: (w) => <span className="text-slate-600">{w.trigger}</span> },
            { key: 'levels', header: 'Levels', align: 'right', render: (w) => w.levels },
            { key: 'sla', header: 'SLA', render: (w) => w.sla }]
            }
            rowActions={() => [{ label: 'Edit chain' }, { label: 'Deactivate', danger: true }]} />
          
          </Card>
        }

        {tab === 'notifications' &&
        <Card title="Notification settings" description="Choose how each event category reaches users">
            <ul className="divide-y divide-slate-100">
              {[
            ['Approval requests', 'In-app + email', 'Immediate'],
            ['Overdue invoices', 'In-app + email', 'Daily digest'],
            ['Low stock alerts', 'In-app', 'Daily digest'],
            ['Production delays', 'In-app + email', 'Immediate'],
            ['Workshop job status', 'In-app', 'Immediate'],
            ['Project budget breaches', 'In-app + email', 'Immediate'],
            ['Leave requests', 'In-app + email', 'Immediate'],
            ['Payment confirmations', 'In-app', 'Daily digest']].
            map(([label, channel, cadence]) =>
            <li key={label} className="grid gap-3 py-3 sm:grid-cols-3 sm:items-center">
                  <span className="text-[13px] font-medium text-slate-800">{label}</span>
                  <Select
                aria-label={`${label} channel`}
                options={[
                { value: 'both', label: 'In-app + email' },
                { value: 'app', label: 'In-app' },
                { value: 'off', label: 'Off' }]
                }
                defaultValue={channel === 'In-app' ? 'app' : 'both'} />
              
                  <Select
                aria-label={`${label} cadence`}
                options={[
                { value: 'now', label: 'Immediate' },
                { value: 'daily', label: 'Daily digest' },
                { value: 'weekly', label: 'Weekly digest' }]
                }
                defaultValue={cadence === 'Immediate' ? 'now' : 'daily'} />
              
                </li>
            )}
            </ul>
          </Card>
        }

        {tab === 'system' &&
        <Card title="System preferences">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Select label="Date format" options={[{ value: 'dmy', label: 'DD MMM YYYY' }, { value: 'iso', label: 'YYYY-MM-DD' }]} />
              <Select label="Number format" options={[{ value: 'comma', label: '1,234,567.89' }, { value: 'dot', label: '1.234.567,89' }]} />
              <Select label="Time zone" options={[{ value: 'cet', label: 'Europe/Amsterdam (CET)' }, { value: 'utc', label: 'UTC' }]} />
              <Input label="Session timeout (minutes)" type="number" defaultValue="30" />
              <Input label="Password expiry (days)" type="number" defaultValue="90" />
              <Select label="Require MFA" options={[{ value: 'all', label: 'All users' }, { value: 'admin', label: 'Administrators only' }]} />
              <Input label="Audit log retention (months)" type="number" defaultValue="84" />
              <Select label="Default landing page" options={[{ value: 'dashboard', label: 'Role dashboard' }, { value: 'approvals', label: 'Approval centre' }]} />
              <Select label="Rows per page" options={[{ value: '25', label: '25' }, { value: '50', label: '50' }, { value: '100', label: '100' }]} />
            </div>
          </Card>
        }
      </div>
    </div>);

}