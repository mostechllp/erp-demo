import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BoxIcon, BriefcaseIcon, FactoryIcon, FileTextIcon, LogOutIcon, PlusIcon, ReceiptTextIcon, SettingsIcon, ShoppingCartIcon, TruckIcon, UserPlusIcon, UsersIcon, WrenchIcon } from 'lucide-react';
import { GlobalSearch } from './GlobalSearch';
import { NotificationsMenu } from './NotificationsMenu';
import { Button } from '../ui/Button';
import { Dropdown } from '../ui/Dropdown';
import { Avatar } from '../ui/Avatar';
import { useApp } from '../../contexts/AppContext';
import { BRANCHES, COMPANY, CURRENT_USER, ROLES } from '../../data/org';
import { useToast } from '../../contexts/ToastContext';
import type { RoleId } from '../../types/erp';
export function Topbar() {
  const {
    branch,
    setBranchId,
    role,
    setRoleId
  } = useApp();
  const navigate = useNavigate();
  const toast = useToast();
  const create = (label: string, to: string) => ({
    label,
    onSelect: () => {
      navigate(to);
      toast.push({
        tone: 'info',
        title: `New ${label.toLowerCase()}`,
        body: 'Draft opened in the module list.'
      });
    }
  });
  return <header className="flex h-14 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4">
      <div className="flex flex-1 items-center gap-3">
        <GlobalSearch />
      </div>

      <select value={branch.id} onChange={(e) => setBranchId(e.target.value)} aria-label="Active branch" className="hidden h-8 max-w-[220px] rounded border border-slate-300 bg-white pl-2 pr-7 text-xs text-slate-700 transition-colors duration-150 ease-erp hover:border-slate-400 focus:border-brand-600 focus:outline-none lg:block">
        {BRANCHES.map((b) => <option key={b.id} value={b.id}>
            {b.name}
          </option>)}
      </select>

      <Dropdown align="right" width="w-60" header={<div className="border-b border-slate-100 px-3 py-1.5 text-2xs font-semibold uppercase tracking-wide text-slate-400">
            Create new record
          </div>} items={[{
      ...create('Sales Order', '/sales/orders'),
      icon: ShoppingCartIcon
    }, {
      ...create('Purchase Order', '/procurement/orders'),
      icon: ReceiptTextIcon
    }, {
      ...create('Invoice', '/sales/invoices'),
      icon: FileTextIcon
    }, {
      ...create('Customer', '/sales/customers'),
      icon: UsersIcon
    }, {
      ...create('Supplier', '/procurement/suppliers'),
      icon: TruckIcon
    }, {
      ...create('Product', '/inventory/products'),
      icon: BoxIcon,
      separatorBefore: true
    }, {
      ...create('Work Order', '/production/work-orders'),
      icon: FactoryIcon
    }, {
      ...create('Workshop Job', '/workshop/jobs'),
      icon: WrenchIcon
    }, {
      ...create('Project', '/projects'),
      icon: BriefcaseIcon
    }, {
      ...create('Job', '/projects/jobs'),
      icon: BriefcaseIcon
    }, {
      ...create('Expense', '/finance/expenses'),
      icon: ReceiptTextIcon,
      separatorBefore: true
    }, {
      ...create('Employee', '/hr/employees'),
      icon: UserPlusIcon
    }]} trigger={<Button variant="primary" size="sm" icon={PlusIcon}>
            Create
          </Button>} />

      <NotificationsMenu />

      <button type="button" aria-label="Help and documentation" onClick={() => toast.push({
      tone: 'info',
      title: 'Help centre',
      body: 'Opening the ERP knowledge base.'
    })} className="rounded p-1.5 text-slate-500 transition-colors duration-150 ease-erp hover:bg-slate-100 hover:text-slate-800">
        <div className="h-4 w-4" />
      </button>

      <div className="h-6 w-px bg-slate-200" />

      <Dropdown align="right" width="w-64" header={<div className="border-b border-slate-100 px-3 py-2">
            <p className="text-[13px] font-semibold text-slate-900">{CURRENT_USER.name}</p>
            <p className="text-xs text-slate-500">{CURRENT_USER.email}</p>
            <p className="mt-1.5 text-2xs font-semibold uppercase tracking-wide text-slate-400">Switch role view</p>
            <div className="mt-1 space-y-0.5">
              {ROLES.map((r) => <button key={r.id} type="button" onClick={() => setRoleId(r.id as RoleId)} className={`block w-full rounded px-2 py-1 text-left text-xs transition-colors duration-150 ease-erp ${role.id === r.id ? 'bg-brand-50 font-medium text-brand-800' : 'text-slate-600 hover:bg-slate-100'}`}>
                  {r.name}
                </button>)}
            </div>
          </div>} items={[{
      label: 'My profile',
      icon: UsersIcon,
      onSelect: () => navigate('/hr/employees/EMP-1002')
    }, {
      label: 'Preferences',
      icon: SettingsIcon,
      onSelect: () => navigate('/settings')
    }, {
      label: 'Sign out',
      icon: LogOutIcon,
      danger: true,
      separatorBefore: true,
      onSelect: () => navigate('/login')
    }]} trigger={<button type="button" className="flex items-center gap-2 rounded px-1 py-1 transition-colors duration-150 ease-erp hover:bg-slate-100">
            <Avatar name={CURRENT_USER.name} size="sm" />
            <span className="hidden text-left leading-tight xl:block">
              <span className="block text-[13px] font-medium text-slate-800">{CURRENT_USER.name}</span>
              <span className="block text-[11px] text-slate-500">
                {role.name} · {COMPANY.code}
              </span>
            </span>
          </button>} />
    </header>;
}