import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, PlusIcon, UploadIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Avatar } from '../../components/ui/Avatar';
import { RecordLink } from '../../components/patterns/RecordLink';
import { EMPLOYEES } from '../../data/hr';
import { currency, shortDate } from '../../utils/format';
import type { Employee } from '../../types/erp';

export function Employees() {
  const navigate = useNavigate();

  return (
    <ListPage<Employee>
      title="Employees"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'HR & Payroll' }, { label: 'Employees' }]}
      description="Employee master used by payroll, projects, workshop and production."
      actions={
      <>
          <Button icon={UploadIcon}>Import</Button>
          <Button variant="primary" icon={PlusIcon}>
            Add employee
          </Button>
        </>
      }
      rows={EMPLOYEES}
      rowKey={(e) => e.id}
      onRowClick={(e) => navigate(`/hr/employees/${e.id}`)}
      searchText={(e) => `${e.id} ${e.name} ${e.department} ${e.designation} ${e.branch} ${e.email}`}
      selectable
      statusTabs={[
      { id: 'all', label: 'All employees', match: () => true },
      { id: 'active', label: 'Active', match: (e) => e.status === 'Active' },
      { id: 'probation', label: 'Probation', match: (e) => e.status === 'Probation' },
      { id: 'leave', label: 'On leave', match: (e) => e.status === 'On Leave' }]
      }
      filters={[
      { id: 'department', label: 'Department', options: [...new Set(EMPLOYEES.map((e) => e.department))] },
      { id: 'branch', label: 'Branch', options: [...new Set(EMPLOYEES.map((e) => e.branch))] },
      { id: 'status', label: 'Status', options: ['Active', 'Probation', 'On Leave'] },
      { id: 'designation', label: 'Designation', options: [...new Set(EMPLOYEES.map((e) => e.designation))] }]
      }
      filterValue={(e, id) =>
      id === 'department' ? e.department : id === 'branch' ? e.branch : id === 'status' ? e.status : e.designation
      }
      rowActions={(e) => [
      { label: 'View profile', icon: EyeIcon, onSelect: () => navigate(`/hr/employees/${e.id}`) },
      { label: 'Edit record' },
      { label: 'View payslips' },
      { label: 'Start offboarding', danger: true, separatorBefore: true }]
      }
      columns={[
      { key: 'id', header: 'Employee ID', render: (e) => <RecordLink to={`/hr/employees/${e.id}`}>{e.id}</RecordLink>, sortValue: (e) => e.id },
      {
        key: 'name',
        header: 'Employee',
        render: (e) =>
        <div className="flex items-center gap-2.5">
              <Avatar name={e.name} size="sm" />
              <div>
                <p className="font-medium text-slate-900">{e.name}</p>
                <p className="text-xs text-slate-500">{e.designation}</p>
              </div>
            </div>,

        sortValue: (e) => e.name
      },
      { key: 'department', header: 'Department', render: (e) => e.department, sortValue: (e) => e.department },
      { key: 'branch', header: 'Branch', render: (e) => e.branch, optional: true },
      { key: 'manager', header: 'Reports to', render: (e) => e.manager, optional: true },
      { key: 'joined', header: 'Joined', render: (e) => shortDate(e.joined), sortValue: (e) => e.joined },
      { key: 'email', header: 'Email', render: (e) => <span className="text-slate-600">{e.email}</span>, optional: true },
      { key: 'salary', header: 'Monthly salary', align: 'right', render: (e) => currency(e.salary), sortValue: (e) => e.salary },
      { key: 'status', header: 'Status', render: (e) => <StatusBadge status={e.status} />, sortValue: (e) => e.status }]
      } />);


}