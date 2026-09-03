import React from 'react';
import { CalendarDaysIcon, Building2Icon, WalletIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { COMPANY, CURRENT_USER, ROLE_DASHBOARD_TITLE } from '../data/org';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ExecutiveDashboard } from './dashboards/ExecutiveDashboard';
import { ProjectDashboard } from './dashboards/ProjectDashboard';
import { FinanceDashboard } from './finance/FinanceDashboard';
import { ProductionDashboard } from './production/ProductionDashboard';
import { WorkshopDashboard } from './workshop/WorkshopDashboard';
import { HrDashboard } from './hr/HrDashboard';

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

export function Dashboard() {
  const { role, branch } = useApp();
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-slate-200 bg-white px-6 pb-4 pt-4">
        <Breadcrumbs items={[{ label: 'Home', to: '/dashboard' }, { label: 'Dashboard' }]} />
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-900">
              {greeting()}, {CURRENT_USER.name.split(' ')[0]}
            </h1>
            <p className="mt-1 text-[13px] text-slate-500">
              {ROLE_DASHBOARD_TITLE[role.id]} · {role.name}
            </p>
          </div>
          <dl className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
            <div className="flex items-center gap-1.5">
              <CalendarDaysIcon className="h-3.5 w-3.5 text-slate-400" />
              <dt className="sr-only">Date</dt>
              <dd className="text-slate-600">{today}</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <Building2Icon className="h-3.5 w-3.5 text-slate-400" />
              <dt className="sr-only">Company and branch</dt>
              <dd className="text-slate-600">
                {COMPANY.name} · <span className="font-medium text-slate-800">{branch.name}</span>
              </dd>
            </div>
            <div className="flex items-center gap-1.5">
              <WalletIcon className="h-3.5 w-3.5 text-slate-400" />
              <dt className="sr-only">Financial period</dt>
              <dd className="text-slate-600">
                {COMPANY.fiscalYear} · {COMPANY.period}
              </dd>
            </div>
          </dl>
        </div>
      </header>

      {role.id === 'super-admin' && <ExecutiveDashboard />}
      {role.id === 'project' && <ProjectDashboard />}
      {role.id === 'finance' && <FinanceDashboard embedded />}
      {role.id === 'production' && <ProductionDashboard embedded />}
      {role.id === 'workshop' && <WorkshopDashboard embedded />}
      {role.id === 'hr' && <HrDashboard embedded />}
    </div>);

}