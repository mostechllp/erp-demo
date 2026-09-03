import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FileTextIcon, PrinterIcon, WrenchIcon } from 'lucide-react';
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
import { NotFound } from '../errors/NotFound';
import { JOB_CARDS, JOB_LABOUR, JOB_PARTS } from '../../data/workshop';
import { currency, shortDate } from '../../utils/format';

const TABS = [
{ id: 'overview', label: 'Overview' },
{ id: 'parts', label: 'Parts' },
{ id: 'labour', label: 'Labour' },
{ id: 'invoice', label: 'Invoice' },
{ id: 'activity', label: 'Activity' }];


const STAGES = ['Received', 'Inspection', 'Waiting for Parts', 'In Progress', 'Quality Check', 'Ready', 'Delivered', 'Closed'];

export function JobCardDetail() {
  const { id } = useParams();
  const [tab, setTab] = useState('overview');
  const job = JOB_CARDS.find((j) => j.id === id);

  if (!job) return <NotFound />;

  const parts = JOB_PARTS.filter((p) => p.job === job.id);
  const labour = JOB_LABOUR.filter((l) => l.job === job.id);
  const other = 480;
  const cost = job.parts + job.labour + other;
  const tax = job.revenue * 0.21;
  const current = STAGES.indexOf(job.status);

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title={`Job card ${job.id}`}
        crumbs={[
        { label: 'Home', to: '/dashboard' },
        { label: 'Workshop' },
        { label: 'Job Cards', to: '/workshop/jobs' },
        { label: job.id }]
        }
        meta={<StatusBadge status={job.status} />}
        description={`${job.customer} · ${job.asset} · technician ${job.technician}`}
        actions={
        <>
            <Button icon={PrinterIcon}>Print job card</Button>
            <Button icon={WrenchIcon}>Log labour</Button>
            <Button variant="primary" icon={FileTextIcon}>
              Create invoice
            </Button>
          </>
        }
        tabs={<Tabs tabs={TABS} active={tab} onChange={setTab} />} />
      

      <div className="flex-1 space-y-4 p-6">
        {job.status === 'Waiting for Parts' &&
        <Alert tone="warning" title="Job blocked — parts not available">
            4 × Spherical Roller Bearing 6320 are out of stock at WH-02. Purchase request PR-4412 is awaiting approval;
            60 units are inbound on PO-1025 with ETA 08 Sep.
          </Alert>
        }

        <Card title="Job progress">
          <WorkflowStepper
            steps={STAGES.map((s, i) => ({
              label: s,
              state: i < current ? 'done' : i === current ? 'current' : 'todo'
            }))} />
          
        </Card>

        <div className="grid gap-3 rounded border border-slate-200 bg-white p-4 shadow-card sm:grid-cols-2 lg:grid-cols-5">
          <StatTile label="Parts cost" value={currency(job.parts)} />
          <StatTile label="Labour cost" value={currency(job.labour)} />
          <StatTile label="Other charges" value={currency(other)} />
          <StatTile label="Revenue" value={currency(job.revenue)} tone="info" />
          <StatTile label="Gross profit" value={currency(job.revenue - cost)} tone={job.revenue - cost > 0 ? 'success' : 'danger'} sub={`${((job.revenue - cost) / job.revenue * 100).toFixed(1)}% margin`} />
        </div>

        {tab === 'overview' &&
        <div className="grid gap-4 lg:grid-cols-3">
            <Card title="Job information" className="lg:col-span-2">
              <DefinitionList
              columns={3}
              items={[
              { label: 'Customer', value: job.customer },
              { label: 'Equipment / asset', value: job.asset },
              { label: 'Priority', value: job.priority },
              { label: 'Assigned technician', value: job.technician },
              { label: 'Received', value: shortDate(job.start) },
              { label: 'Expected completion', value: shortDate(job.due) },
              { label: 'Workshop', value: 'Antwerp Service Workshop (WH-03)' },
              { label: 'Warranty', value: 'Out of warranty — chargeable' },
              { label: 'Related sales order', value: '—' },
              { label: 'Problem description', value: job.problem, full: true }]
              } />
            
            </Card>
            <Card title="Inspection findings">
              <p className="text-[13px] leading-relaxed text-slate-600">
                Vibration analysis confirmed bearing wear on the drive end with 0.42 mm shaft runout, beyond the 0.15 mm
                limit. Mechanical seal faces scored. Recommendation: replace bearings and seal kit, re-machine shaft
                journal and re-balance the rotor before test running at rated speed.
              </p>
            </Card>
          </div>
        }

        {tab === 'parts' &&
        <Card title="Parts issued to job" padded={false}>
            <table className="w-full text-[13px]">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                <tr>
                  {['SKU', 'Part', 'Required', 'Available', 'Used', 'Cost'].map((h) =>
                <th key={h} className="px-4 py-2 text-left font-semibold">{h}</th>
                )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {parts.length === 0 ?
              <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-slate-500">No parts issued to this job yet.</td>
                  </tr> :

              parts.map((p) =>
              <tr key={p.sku} className="hover:bg-slate-50">
                      <td className="px-4 py-2.5 font-mono text-xs text-brand-700">{p.sku}</td>
                      <td className="px-4 py-2.5 font-medium text-slate-900">{p.part}</td>
                      <td className="px-4 py-2.5 tnum">{p.required}</td>
                      <td className={`px-4 py-2.5 tnum ${p.available === 0 ? 'font-semibold text-red-600' : ''}`}>{p.available}</td>
                      <td className="px-4 py-2.5 tnum">{p.used}</td>
                      <td className="px-4 py-2.5 tnum">{currency(p.cost)}</td>
                    </tr>
              )
              }
              </tbody>
            </table>
          </Card>
        }

        {tab === 'labour' &&
        <Card title="Labour bookings" padded={false}>
            <table className="w-full text-[13px]">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                <tr>
                  {['Technician', 'Date', 'Activity', 'Hours', 'Rate', 'Labour cost'].map((h) =>
                <th key={h} className="px-4 py-2 text-left font-semibold">{h}</th>
                )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {labour.length === 0 ?
              <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-slate-500">No labour booked yet.</td>
                  </tr> :

              labour.map((l, i) =>
              <tr key={i} className="hover:bg-slate-50">
                      <td className="px-4 py-2.5 font-medium text-slate-900">{l.technician}</td>
                      <td className="px-4 py-2.5">{shortDate(l.date)}</td>
                      <td className="px-4 py-2.5 text-slate-600">{l.activity}</td>
                      <td className="px-4 py-2.5 tnum">{l.hours}</td>
                      <td className="px-4 py-2.5 tnum">{currency(l.rate)}</td>
                      <td className="px-4 py-2.5 tnum">{currency(l.cost)}</td>
                    </tr>
              )
              }
              </tbody>
            </table>
          </Card>
        }

        {tab === 'invoice' &&
        <Card title="Workshop invoice preview" className="max-w-xl">
            <dl className="space-y-2 text-[13px]">
              {[
            ['Parts cost', job.parts],
            ['Labour cost', job.labour],
            ['Other charges', other],
            ['Tax (21% VAT)', tax]].
            map(([label, value]) =>
            <div key={label as string} className="flex justify-between">
                  <dt className="text-slate-500">{label as string}</dt>
                  <dd className="tnum text-slate-800">{currency(value as number)}</dd>
                </div>
            )}
              <div className="flex justify-between border-t border-slate-200 pt-2">
                <dt className="font-semibold text-slate-900">Invoice total</dt>
                <dd className="text-base font-semibold tnum text-slate-900">{currency(job.revenue + tax)}</dd>
              </div>
            </dl>
          </Card>
        }

        {tab === 'activity' &&
        <Card title="Activity timeline">
            <Timeline
            events={[
            { id: '1', title: `Status changed to ${job.status}`, actor: job.technician, at: '02 Sep 2026 · 09:50', tone: 'info' },
            { id: '2', title: 'Purchase request PR-4412 raised', detail: 'Urgent bearings required to release the job.', actor: 'Samuel Adeyemi', at: '25 Aug 2026 · 14:12', tone: 'warning' },
            { id: '3', title: 'Inspection completed', detail: 'Bearing wear and seal scoring confirmed.', actor: 'Samuel Adeyemi', at: '20 Aug 2026 · 11:05', tone: 'neutral' },
            { id: '4', title: 'Job card created', detail: `${job.customer} — ${job.asset}`, actor: 'Dieter Ruhl', at: `${shortDate(job.start)} · 08:30`, tone: 'brand' }]
            } />
          
          </Card>
        }
      </div>
    </div>);

}