import type { Branch, Role, RoleId } from '../types/erp';

export const COMPANY = {
  name: 'Mostech ERP Demo',
  legal: 'Mostech Business Solutions',
  code: 'MOS',
  fiscalYear: 'FY 2026',
  period: 'Q3 · Jul – Sep 2026',
  baseCurrency: 'USD',
  taxId: 'TRN 100-448-921'
};

export const BRANCHES: Branch[] = [
  { id: 'br-dxb', name: 'Dubai Trading Branch', city: 'Dubai', country: 'UAE', currency: 'AED' },
// { id: 'br-hq', name: 'Head Office — Rotterdam', city: 'Rotterdam', country: 'Netherlands', currency: 'EUR' },
// { id: 'br-plant', name: 'Vlaardingen Plant', city: 'Vlaardingen', country: 'Netherlands', currency: 'EUR' },
// { id: 'br-ws', name: 'Antwerp Service Workshop', city: 'Antwerp', country: 'Belgium', currency: 'EUR' },
// { id: 'br-sg', name: 'Singapore Distribution', city: 'Singapore', country: 'Singapore', currency: 'SGD' }
];


export const ROLES: Role[] = [
{ id: 'super-admin', name: 'Super Admin', scope: 'All modules · All branches' },
{ id: 'finance', name: 'Finance Controller', scope: 'Finance, Reports, Approvals' },
{ id: 'production', name: 'Production Manager', scope: 'Production, Inventory, Work orders' },
{ id: 'project', name: 'Project Manager', scope: 'Projects, Jobs, Timesheets' },
{ id: 'workshop', name: 'Workshop Manager', scope: 'Workshop, Maintenance, Parts' },
{ id: 'hr', name: 'HR Manager', scope: 'HR, Payroll, Recruitment' }];


export const CURRENT_USER = {
  name: 'Amara Osei',
  email: 'amara.osei@meridian-ig.com',
  employeeId: 'EMP-1002'
};

/** Modules each role may see in the sidebar. `*` grants everything. */
export const ROLE_MODULES: Record<RoleId, string[]> = {
  'super-admin': ['*'],
  finance: ['dashboard', 'sales', 'procurement', 'finance', 'projects', 'reports', 'approvals', 'notifications'],
  production: ['dashboard', 'production', 'inventory', 'procurement', 'projects', 'reports', 'approvals', 'notifications'],
  project: ['dashboard', 'projects', 'sales', 'inventory', 'reports', 'approvals', 'notifications'],
  workshop: ['dashboard', 'workshop', 'inventory', 'sales', 'reports', 'approvals', 'notifications'],
  hr: ['dashboard', 'hr', 'reports', 'approvals', 'notifications']
};

export const ROLE_DASHBOARD_TITLE: Record<RoleId, string> = {
  'super-admin': 'Executive overview',
  finance: 'Finance overview',
  production: 'Production control',
  project: 'Project portfolio',
  workshop: 'Workshop operations',
  hr: 'People overview'
};