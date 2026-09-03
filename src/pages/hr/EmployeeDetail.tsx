import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MailIcon, PencilIcon, PhoneIcon } from 'lucide-react';
import { PageHeader } from '../../components/patterns/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Avatar } from '../../components/ui/Avatar';
import { DefinitionList } from '../../components/patterns/DefinitionList';
import { StatTile } from '../../components/patterns/StatTile';
import { Timeline } from '../../components/patterns/Timeline';
import { EmptyState } from '../../components/ui/EmptyState';
import { NotFound } from '../errors/NotFound';
import { ATTENDANCE, EMPLOYEES, LEAVE_REQUESTS, PERFORMANCE } from '../../data/hr';
import { TIMESHEETS } from '../../data/projects';
import { currency, shortDate } from '../../utils/format';

const TABS = [
{ id: 'overview', label: 'Overview' },
{ id: 'employment', label: 'Employment' },
{ id: 'attendance', label: 'Attendance' },
{ id: 'leave', label: 'Leave' },
{ id: 'payroll', label: 'Payroll' },
{ id: 'timesheets', label: 'Timesheets' },
{ id: 'performance', label: 'Performance' },
{ id: 'documents', label: 'Documents' }];


export function EmployeeDetail() {
  const { id } = useParams();
  const [tab, setTab] = useState('overview');
  const employee = EMPLOYEES.find((e) => e.id === id);

  if (!employee) return <NotFound />;

  const attendance = ATTENDANCE.filter((a) => a.employee === employee.name);
  const leave = LEAVE_REQUESTS.filter((l) => l.employee === employee.name);
  const timesheets = TIMESHEETS.filter((t) => t.employee === employee.name);
  const review = PERFORMANCE.find((p) => p.employee === employee.name);

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title={employee.name}
        crumbs={[
        { label: 'Home', to: '/dashboard' },
        { label: 'HR & Payroll' },
        { label: 'Employees', to: '/hr/employees' },
        { label: employee.id }]
        }
        meta={
        <>
            <span className="font-mono text-xs text-slate-500">{employee.id}</span>
            <StatusBadge status={employee.status} />
          </>
        }
        description={`${employee.designation} · ${employee.department} · ${employee.branch}`}
        actions={
        <>
            <Button icon={MailIcon}>Email</Button>
            <Button variant="primary" icon={PencilIcon}>
              Edit record
            </Button>
          </>
        }
        tabs={<Tabs tabs={TABS} active={tab} onChange={setTab} />} />
      

      <div className="flex-1 space-y-4 p-6">
        <div className="flex flex-wrap items-center gap-4 rounded border border-slate-200 bg-white p-4 shadow-card">
          <Avatar name={employee.name} size="lg" />
          <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile label="Monthly salary" value={currency(employee.salary)} sub="Gross, excl. benefits" />
            <StatTile label="Tenure" value={`${new Date().getFullYear() - new Date(employee.joined).getFullYear()} yrs`} sub={`Joined ${shortDate(employee.joined)}`} />
            <StatTile label="Leave balance" value="14.5 days" sub="Annual entitlement 25 days" tone="info" />
            <StatTile label="Performance rating" value={review && review.rating > 0 ? review.rating.toFixed(1) : '—'} sub={review?.cycle ?? 'No review cycle'} tone="success" />
          </div>
        </div>

        {tab === 'overview' &&
        <div className="grid gap-4 lg:grid-cols-2">
            <Card title="Personal information">
              <DefinitionList
              items={[
              { label: 'Full name', value: employee.name },
              { label: 'Employee ID', value: employee.id },
              { label: 'Date of birth', value: '14 Mar 1989' },
              { label: 'Nationality', value: 'Netherlands' },
              { label: 'Email', value: <span className="inline-flex items-center gap-1"><MailIcon className="h-3 w-3 text-slate-400" />{employee.email}</span> },
              { label: 'Phone', value: <span className="inline-flex items-center gap-1 tnum"><PhoneIcon className="h-3 w-3 text-slate-400" />{employee.phone}</span> },
              { label: 'Address', value: 'Weena 340, 3012 NJ Rotterdam, Netherlands', full: true },
              { label: 'Emergency contact', value: 'K. Osei — +31 6 5544 8812', full: true }]
              } />
            
            </Card>
            <Card title="Employment">
              <DefinitionList
              items={[
              { label: 'Designation', value: employee.designation },
              { label: 'Department', value: employee.department },
              { label: 'Branch', value: employee.branch },
              { label: 'Reports to', value: employee.manager },
              { label: 'Joining date', value: shortDate(employee.joined) },
              { label: 'Contract type', value: 'Permanent — full time' },
              { label: 'Cost centre', value: 'CC-100 Executive' },
              { label: 'Status', value: <StatusBadge status={employee.status} /> }]
              } />
            
            </Card>
          </div>
        }

        {tab === 'employment' &&
        <Card title="Employment history">
            <Timeline
            events={[
            { id: '1', title: `Promoted to ${employee.designation}`, detail: 'Salary band adjusted to grade E1.', actor: 'HR', at: '01 Jan 2024', tone: 'success' },
            { id: '2', title: 'Annual salary review', detail: '+4.2% inflation adjustment applied.', actor: 'HR', at: '01 Jan 2023', tone: 'neutral' },
            { id: '3', title: 'Transferred to Head Office — Rotterdam', actor: 'HR', at: '01 Jul 2019', tone: 'info' },
            { id: '4', title: 'Joined Mostech Business Solutions', detail: employee.designation, actor: 'HR', at: shortDate(employee.joined), tone: 'brand' }]
            } />
          
          </Card>
        }

        {tab === 'attendance' &&
        <Card title="Recent attendance" padded={false}>
            {attendance.length === 0 ?
          <EmptyState compact title="No attendance records" description="No clock-in data captured for this employee in the selected period." /> :

          <table className="w-full text-[13px]">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                  <tr>
                    {['Date', 'Clock in', 'Clock out', 'Hours', 'Overtime', 'Status'].map((h) =>
                <th key={h} className="px-4 py-2 text-left font-semibold">
                        {h}
                      </th>
                )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {attendance.map((a) =>
              <tr key={a.id} className="hover:bg-slate-50">
                      <td className="px-4 py-2.5">{shortDate(a.date)}</td>
                      <td className="px-4 py-2.5 tnum">{a.in}</td>
                      <td className="px-4 py-2.5 tnum">{a.out}</td>
                      <td className="px-4 py-2.5 tnum">{a.hours}</td>
                      <td className="px-4 py-2.5 tnum">{a.overtime}</td>
                      <td className="px-4 py-2.5">
                        <StatusBadge status={a.status === 'Late' ? 'Pending' : a.status === 'Absent' ? 'Rejected' : 'Active'} />
                      </td>
                    </tr>
              )}
                </tbody>
              </table>
          }
          </Card>
        }

        {tab === 'leave' &&
        <Card title="Leave requests" padded={false}>
            {leave.length === 0 ?
          <EmptyState compact title="No leave requests" description="This employee has not submitted leave in the current year." /> :

          <table className="w-full text-[13px]">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                  <tr>
                    {['Request', 'Type', 'From', 'To', 'Days', 'Stage', 'Status'].map((h) =>
                <th key={h} className="px-4 py-2 text-left font-semibold">
                        {h}
                      </th>
                )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leave.map((l) =>
              <tr key={l.id} className="hover:bg-slate-50">
                      <td className="px-4 py-2.5 font-mono text-xs text-brand-700">{l.id}</td>
                      <td className="px-4 py-2.5">{l.type}</td>
                      <td className="px-4 py-2.5">{shortDate(l.from)}</td>
                      <td className="px-4 py-2.5">{shortDate(l.to)}</td>
                      <td className="px-4 py-2.5 tnum">{l.days}</td>
                      <td className="px-4 py-2.5 text-slate-600">{l.stage}</td>
                      <td className="px-4 py-2.5">
                        <StatusBadge status={l.status} />
                      </td>
                    </tr>
              )}
                </tbody>
              </table>
          }
          </Card>
        }

        {tab === 'payroll' &&
        <Card title="Payroll summary" description="Last three processed periods">
            <table className="w-full text-[13px]">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                <tr>
                  {['Period', 'Gross', 'Deductions', 'Tax', 'Net', 'Status'].map((h) =>
                <th key={h} className="px-3 py-2 text-left font-semibold">
                      {h}
                    </th>
                )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {['August 2026', 'July 2026', 'June 2026'].map((period, i) => {
                const gross = employee.salary;
                const deductions = Math.round(gross * 0.09);
                const tax = Math.round(gross * 0.18);
                return (
                  <tr key={period} className="hover:bg-slate-50">
                      <td className="px-3 py-2.5 font-medium text-slate-800">{period}</td>
                      <td className="px-3 py-2.5 tnum">{currency(gross)}</td>
                      <td className="px-3 py-2.5 tnum">{currency(deductions)}</td>
                      <td className="px-3 py-2.5 tnum">{currency(tax)}</td>
                      <td className="px-3 py-2.5 font-semibold tnum">{currency(gross - deductions - tax)}</td>
                      <td className="px-3 py-2.5">
                        <StatusBadge status={i === 0 ? 'Approved' : 'Paid'} />
                      </td>
                    </tr>);

              })}
              </tbody>
            </table>
          </Card>
        }

        {tab === 'timesheets' &&
        <Card title="Timesheets" padded={false}>
            {timesheets.length === 0 ?
          <EmptyState compact title="No timesheets" description="This employee does not book time against projects or jobs." /> :

          <table className="w-full text-[13px]">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                  <tr>
                    {['Week', 'Project', 'Job', 'Hours', 'Billable', 'Status'].map((h) =>
                <th key={h} className="px-4 py-2 text-left font-semibold">
                        {h}
                      </th>
                )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {timesheets.map((t) =>
              <tr key={t.id} className="hover:bg-slate-50">
                      <td className="px-4 py-2.5">{t.week}</td>
                      <td className="px-4 py-2.5 font-mono text-xs text-slate-500">{t.project}</td>
                      <td className="px-4 py-2.5 font-mono text-xs text-slate-500">{t.job}</td>
                      <td className="px-4 py-2.5 tnum">{t.hours}</td>
                      <td className="px-4 py-2.5 tnum">{t.billable}</td>
                      <td className="px-4 py-2.5">
                        <StatusBadge status={t.status} />
                      </td>
                    </tr>
              )}
                </tbody>
              </table>
          }
          </Card>
        }

        {tab === 'performance' &&
        <Card title="Performance">
            {review ?
          <DefinitionList
            items={[
            { label: 'Review cycle', value: review.cycle },
            { label: 'Reviewer', value: review.reviewer },
            { label: 'Rating', value: review.rating > 0 ? `${review.rating.toFixed(1)} / 5.0` : 'Not yet rated' },
            { label: 'Goals achieved', value: `${review.goalsMet} of ${review.goalsTotal}` },
            { label: 'Status', value: <StatusBadge status={review.status} /> }]
            } /> :


          <EmptyState compact title="No review on file" description="This employee is not part of the current performance cycle." />
          }
          </Card>
        }

        {tab === 'documents' &&
        <Card title="Employee documents">
            <ul className="divide-y divide-slate-100 text-[13px]">
              {[
            ['Employment contract.pdf', 'Contract', '1.2 MB'],
            ['ID verification.pdf', 'Compliance', '640 KB'],
            ['Payroll declaration 2026.pdf', 'Payroll', '218 KB'],
            ['Safety induction certificate.pdf', 'Training', '380 KB']].
            map(([name, type, size]) =>
            <li key={name} className="flex items-center justify-between py-2.5">
                  <div>
                    <p className="font-medium text-slate-800">{name}</p>
                    <p className="text-xs text-slate-500">{type}</p>
                  </div>
                  <span className="text-xs text-slate-400">{size}</span>
                </li>
            )}
            </ul>
          </Card>
        }
      </div>
    </div>);

}