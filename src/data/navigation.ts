import type { ComponentType } from 'react';
import {
  BadgeCheckIcon,
  BarChart3Icon,
  BellIcon,
  BoxesIcon,
  BriefcaseIcon,
  DatabaseIcon,
  FactoryIcon,
  LayoutDashboardIcon,
  ReceiptTextIcon,
  SettingsIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  TruckIcon,
  UsersIcon,
  WrenchIcon } from
'lucide-react';

export interface NavChild {
  label: string;
  to: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: ComponentType<{className?: string;}>;
  to?: string;
  children?: NavChild[];
  badgeKey?: 'approvals' | 'notifications';
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const NAV: NavSection[] = [
{
  label: 'Overview',
  items: [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboardIcon, to: '/dashboard' }]
},
{
  label: 'Commercial',
  items: [
  {
    id: 'sales',
    label: 'Sales & CRM',
    icon: ShoppingCartIcon,
    children: [
    { label: 'Customers', to: '/sales/customers' },
    { label: 'Leads', to: '/sales/leads' },
    { label: 'Quotations', to: '/sales/quotations' },
    { label: 'Sales Orders', to: '/sales/orders' },
    { label: 'Invoices', to: '/sales/invoices' },
    { label: 'Sales Returns', to: '/sales/returns' },
    { label: 'Customer Receivables', to: '/sales/receivables' }]

  },
  {
    id: 'procurement',
    label: 'Procurement',
    icon: ReceiptTextIcon,
    children: [
    { label: 'Suppliers', to: '/procurement/suppliers' },
    { label: 'Purchase Requests', to: '/procurement/requests' },
    { label: 'Purchase Orders', to: '/procurement/orders' },
    { label: 'Goods Receipts', to: '/procurement/receipts' },
    { label: 'Purchase Returns', to: '/procurement/returns' },
    { label: 'Supplier Invoices', to: '/procurement/invoices' }]

  }]

},
{
  label: 'Operations',
  items: [
  {
    id: 'inventory',
    label: 'Inventory & Store',
    icon: BoxesIcon,
    children: [
    { label: 'Inventory Dashboard', to: '/inventory' },
    { label: 'Products', to: '/inventory/products' },
    { label: 'Categories', to: '/inventory/categories' },
    { label: 'Warehouses & Stores', to: '/inventory/warehouses' },
    { label: 'Stock', to: '/inventory/stock' },
    { label: 'Stock Transfers', to: '/inventory/transfers' },
    { label: 'Stock Adjustments', to: '/inventory/adjustments' },
    { label: 'Stock Movements', to: '/inventory/movements' },
    { label: 'Reorder Management', to: '/inventory/reorder' }]

  },
  {
    id: 'production',
    label: 'Production',
    icon: FactoryIcon,
    children: [
    { label: 'Production Dashboard', to: '/production' },
    { label: 'Production Planning', to: '/production/planning' },
    { label: 'Work Orders', to: '/production/work-orders' },
    { label: 'Bill of Materials', to: '/production/bom' },
    { label: 'Work Centers & Machines', to: '/production/work-centers' },
    { label: 'Material Consumption', to: '/production/consumption' },
    { label: 'Production Output', to: '/production/output' },
    { label: 'Quality Control', to: '/production/quality' }]

  },
  {
    id: 'workshop',
    label: 'Workshop',
    icon: WrenchIcon,
    children: [
    { label: 'Workshop Dashboard', to: '/workshop' },
    { label: 'Job Cards', to: '/workshop/jobs' },
    { label: 'Technicians', to: '/workshop/technicians' },
    { label: 'Maintenance', to: '/workshop/maintenance' }]

  },
  {
    id: 'projects',
    label: 'Projects & Job Costing',
    icon: BriefcaseIcon,
    children: [
    { label: 'Projects', to: '/projects' },
    { label: 'Jobs', to: '/projects/jobs' },
    { label: 'Tasks', to: '/projects/tasks' },
    { label: 'Job Costing', to: '/projects/costing' },
    { label: 'Timesheets', to: '/projects/timesheets' }]

  },
  {
    id: 'logistics',
    label: 'Logistics',
    icon: TruckIcon,
    children: [
    { label: 'Shipments', to: '/logistics/shipments' },
    { label: 'Dispatch Board', to: '/logistics/dispatch' }]

  }]

},
{
  label: 'Back office',
  items: [
  {
    id: 'finance',
    label: 'Finance & Accounting',
    icon: BarChart3Icon,
    children: [
    { label: 'Finance Dashboard', to: '/finance' },
    { label: 'Chart of Accounts', to: '/finance/coa' },
    { label: 'General Ledger', to: '/finance/ledger' },
    { label: 'Journal Entries', to: '/finance/journals' },
    { label: 'Accounts Receivable', to: '/finance/receivable' },
    { label: 'Accounts Payable', to: '/finance/payable' },
    { label: 'Payments', to: '/finance/payments' },
    { label: 'Expenses', to: '/finance/expenses' },
    { label: 'Bank & Cash', to: '/finance/bank' },
    { label: 'Tax', to: '/finance/tax' },
    { label: 'Profit & Loss', to: '/finance/pnl' },
    { label: 'Balance Sheet', to: '/finance/balance-sheet' },
    { label: 'Cash Flow', to: '/finance/cash-flow' }]

  },
  {
    id: 'hr',
    label: 'HR & Payroll',
    icon: UsersIcon,
    children: [
    { label: 'HR Dashboard', to: '/hr' },
    { label: 'Employees', to: '/hr/employees' },
    { label: 'Departments', to: '/hr/departments' },
    { label: 'Attendance', to: '/hr/attendance' },
    { label: 'Leave', to: '/hr/leave' },
    { label: 'Payroll', to: '/hr/payroll' },
    { label: 'Recruitment', to: '/hr/recruitment' },
    { label: 'Performance', to: '/hr/performance' }]

  }]

},
{
  label: 'Insight & control',
  items: [
  { id: 'reports', label: 'Reports & Analytics', icon: BarChart3Icon, to: '/reports' },
  { id: 'approvals', label: 'Workflow & Approvals', icon: BadgeCheckIcon, to: '/approvals', badgeKey: 'approvals' },
  { id: 'notifications', label: 'Notifications', icon: BellIcon, to: '/notifications', badgeKey: 'notifications' },
  { id: 'master-data', label: 'Master Data', icon: DatabaseIcon, to: '/master-data' },
  {
    id: 'admin',
    label: 'Administration',
    icon: ShieldCheckIcon,
    children: [
    { label: 'Users', to: '/admin/users' },
    { label: 'Roles & Permissions', to: '/admin/roles' },
    { label: 'Approval Workflows', to: '/admin/workflows' },
    { label: 'Branches', to: '/admin/branches' },
    { label: 'Audit Logs', to: '/admin/audit' }]

  },
  { id: 'settings', label: 'Settings', icon: SettingsIcon, to: '/settings' }]

}];