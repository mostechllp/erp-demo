import React from 'react';
import { ClockIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { KpiCard } from '../../components/patterns/KpiCard';
import { ATTENDANCE } from '../../data/hr';
import { shortDate } from '../../utils/format';

type Row = (typeof ATTENDANCE)[number];

const STATUS_MAP: Record<string, string> = {
  Present: 'Active',
  Late: 'Pending',
  Absent: 'Rejected',
  'On Leave': 'On Leave'
};

export function Attendance() {
  return (
    <ListPage<Row>
      title="Attendance"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'HR & Payroll' }, { label: 'Attendance' }]}
      description="Daily clock-in records, overtime and exceptions feeding payroll."
      actions={
      <Button variant="primary" icon={ClockIcon}>
          Import time clock
        </Button>
      }
      summary={
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="Present today" value="132" hint="90.4% of active staff" />
          <KpiCard label="Late arrivals" value={String(ATTENDANCE.filter((a) => a.status === 'Late').length)} delta={-12.5} invertDelta />
          <KpiCard label="Absent" value={String(ATTENDANCE.filter((a) => a.status === 'Absent').length)} invertDelta hint="Unexplained" />
          <KpiCard label="Overtime hours" value={`${ATTENDANCE.reduce((s, a) => s + a.overtime, 0).toFixed(1)} h`} delta={8.4} invertDelta />
        </div>
      }
      rows={ATTENDANCE}
      rowKey={(a) => a.id}
      searchText={(a) => `${a.employee} ${a.department} ${a.status}`}
      dense
      statusTabs={[
      { id: 'all', label: 'All records', match: () => true },
      { id: 'present', label: 'Present', match: (a) => a.status === 'Present' },
      { id: 'late', label: 'Late', match: (a) => a.status === 'Late' },
      { id: 'absent', label: 'Absent', match: (a) => a.status === 'Absent' },
      { id: 'leave', label: 'On leave', match: (a) => a.status === 'On Leave' }]
      }
      filters={[
      { id: 'department', label: 'Department', options: [...new Set(ATTENDANCE.map((a) => a.department))] },
      { id: 'status', label: 'Status', options: [...new Set(ATTENDANCE.map((a) => a.status))] }]
      }
      filterValue={(a, id) => id === 'department' ? a.department : a.status}
      rowActions={() => [{ label: 'Edit record' }, { label: 'Approve overtime' }, { label: 'Flag exception', danger: true }]}
      columns={[
      { key: 'employee', header: 'Employee', render: (a) => <span className="font-medium text-slate-900">{a.employee}</span>, sortValue: (a) => a.employee },
      { key: 'department', header: 'Department', render: (a) => a.department },
      { key: 'date', header: 'Date', render: (a) => shortDate(a.date), sortValue: (a) => a.date },
      { key: 'in', header: 'Clock in', render: (a) => <span className="tnum">{a.in}</span> },
      { key: 'out', header: 'Clock out', render: (a) => <span className="tnum">{a.out}</span> },
      { key: 'hours', header: 'Hours', align: 'right', render: (a) => a.hours.toFixed(1), sortValue: (a) => a.hours },
      { key: 'overtime', header: 'Overtime', align: 'right', render: (a) => <span className={a.overtime > 1 ? 'font-semibold text-amber-600' : ''}>{a.overtime.toFixed(1)}</span>, sortValue: (a) => a.overtime },
      { key: 'status', header: 'Status', render: (a) => <StatusBadge status={STATUS_MAP[a.status] ?? a.status} />, sortValue: (a) => a.status }]
      } />);


}