import React from 'react';
import { PlusIcon, ShieldCheckIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Avatar } from '../../components/ui/Avatar';
import { KpiCard } from '../../components/patterns/KpiCard';
import { USERS } from '../../data/governance';

type Row = (typeof USERS)[number];

export function Users() {
  return (
    <ListPage<Row>
      title="Users"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Administration' }, { label: 'Users' }]}
      description="System accounts, assigned roles, branch scope and multi-factor status."
      actions={
      <>
          <Button icon={ShieldCheckIcon}>Enforce MFA</Button>
          <Button variant="primary" icon={PlusIcon}>
            Invite user
          </Button>
        </>
      }
      summary={
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="Active users" value={String(USERS.filter((u) => u.status === 'Active').length)} />
          <KpiCard label="MFA enabled" value={`${Math.round(USERS.filter((u) => u.mfa).length / USERS.length * 100)}%`} delta={8.3} />
          <KpiCard label="Suspended" value={String(USERS.filter((u) => u.status === 'Suspended').length)} invertDelta />
          <KpiCard label="Inactive 30+ days" value={String(USERS.filter((u) => u.status === 'Inactive').length)} />
        </div>
      }
      rows={USERS}
      rowKey={(u) => u.id}
      searchText={(u) => `${u.id} ${u.name} ${u.email} ${u.role} ${u.branch}`}
      selectable
      bulkActions={[{ label: 'Reset password' }, { label: 'Suspend', danger: true }]}
      statusTabs={[
      { id: 'all', label: 'All users', match: () => true },
      { id: 'active', label: 'Active', match: (u) => u.status === 'Active' },
      { id: 'suspended', label: 'Suspended', match: (u) => u.status === 'Suspended' },
      { id: 'nomfa', label: 'Without MFA', match: (u) => !u.mfa }]
      }
      filters={[
      { id: 'role', label: 'Role', options: [...new Set(USERS.map((u) => u.role))] },
      { id: 'branch', label: 'Branch', options: [...new Set(USERS.map((u) => u.branch))] },
      { id: 'status', label: 'Status', options: [...new Set(USERS.map((u) => u.status))] }]
      }
      filterValue={(u, id) => id === 'role' ? u.role : id === 'branch' ? u.branch : u.status}
      rowActions={() => [
      { label: 'Edit user' },
      { label: 'Change role' },
      { label: 'Reset password' },
      { label: 'View audit trail' },
      { label: 'Suspend account', danger: true, separatorBefore: true }]
      }
      columns={[
      { key: 'id', header: 'User ID', render: (u) => <span className="font-mono text-xs text-brand-700">{u.id}</span>, sortValue: (u) => u.id },
      {
        key: 'name',
        header: 'User',
        render: (u) =>
        <div className="flex items-center gap-2.5">
              <Avatar name={u.name} size="sm" />
              <div>
                <p className="font-medium text-slate-900">{u.name}</p>
                <p className="text-xs text-slate-500">{u.email}</p>
              </div>
            </div>,

        sortValue: (u) => u.name
      },
      { key: 'role', header: 'Role', render: (u) => <Badge tone="brand">{u.role}</Badge>, sortValue: (u) => u.role },
      { key: 'branch', header: 'Branch scope', render: (u) => u.branch },
      { key: 'lastLogin', header: 'Last login', render: (u) => <span className="tnum text-slate-500">{u.lastLogin}</span>, sortValue: (u) => u.lastLogin },
      {
        key: 'mfa',
        header: 'MFA',
        render: (u) => <Badge tone={u.mfa ? 'success' : 'warning'}>{u.mfa ? 'Enabled' : 'Not set'}</Badge>
      },
      { key: 'status', header: 'Status', render: (u) => <StatusBadge status={u.status} />, sortValue: (u) => u.status }]
      } />);


}