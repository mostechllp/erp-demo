export interface ReportDef {
  id: string;
  name: string;
  category: string;
  description: string;
  frequency: string;
  owner: string;
  lastRun: string;
}

export const REPORT_CATEGORIES = [
'Sales',
'Procurement',
'Inventory',
'Production',
'Workshop',
'Projects',
'Job Costing',
'Finance',
'HR',
'Payroll',
'Logistics'];


export const REPORTS: ReportDef[] = [
{ id: 'RPT-S01', name: 'Sales Summary', category: 'Sales', description: 'Booked, invoiced and delivered value by period and branch.', frequency: 'Daily', owner: 'Lars Jensen', lastRun: '2026-09-02 06:00' },
{ id: 'RPT-S02', name: 'Sales by Customer', category: 'Sales', description: 'Revenue, margin and outstanding balance per customer account.', frequency: 'Weekly', owner: 'Lars Jensen', lastRun: '2026-09-01 06:00' },
{ id: 'RPT-S03', name: 'Sales by Product', category: 'Sales', description: 'Volume and margin performance by SKU and category.', frequency: 'Weekly', owner: 'Wei Lin Tan', lastRun: '2026-09-01 06:00' },
{ id: 'RPT-S04', name: 'Sales by Region', category: 'Sales', description: 'Geographic split of bookings against target.', frequency: 'Monthly', owner: 'Amara Osei', lastRun: '2026-09-01 06:00' },
{ id: 'RPT-P01', name: 'Purchase Summary', category: 'Procurement', description: 'Committed and received spend by supplier and category.', frequency: 'Daily', owner: 'Sophie Laurent', lastRun: '2026-09-02 06:00' },
{ id: 'RPT-P02', name: 'Supplier Performance', category: 'Procurement', description: 'On-time delivery, quality rejections and price variance.', frequency: 'Monthly', owner: 'Sophie Laurent', lastRun: '2026-09-01 06:00' },
{ id: 'RPT-P03', name: 'Purchase Price Analysis', category: 'Procurement', description: 'Price movement per item across suppliers and periods.', frequency: 'Monthly', owner: 'Sophie Laurent', lastRun: '2026-08-31 06:00' },
{ id: 'RPT-I01', name: 'Stock Summary', category: 'Inventory', description: 'On-hand, reserved and available quantity per warehouse.', frequency: 'Daily', owner: 'Nadia Rahman', lastRun: '2026-09-02 05:30' },
{ id: 'RPT-I02', name: 'Stock Valuation', category: 'Inventory', description: 'Weighted average valuation by category and location.', frequency: 'Monthly', owner: 'Sophie Laurent', lastRun: '2026-09-01 05:30' },
{ id: 'RPT-I03', name: 'Stock Movement', category: 'Inventory', description: 'All inbound, outbound and internal movements with references.', frequency: 'Daily', owner: 'Nadia Rahman', lastRun: '2026-09-02 05:30' },
{ id: 'RPT-I04', name: 'Low Stock Report', category: 'Inventory', description: 'Items at or below reorder level with suggested order quantity.', frequency: 'Daily', owner: 'Nadia Rahman', lastRun: '2026-09-02 05:30' },
{ id: 'RPT-I05', name: 'Inventory Aging', category: 'Inventory', description: 'Slow moving and obsolete stock by age bucket.', frequency: 'Monthly', owner: 'Nadia Rahman', lastRun: '2026-09-01 05:30' },
{ id: 'RPT-M01', name: 'Production Summary', category: 'Production', description: 'Planned versus produced output by work centre.', frequency: 'Daily', owner: 'Marek Kowalski', lastRun: '2026-09-02 06:15' },
{ id: 'RPT-M02', name: 'Production Efficiency', category: 'Production', description: 'OEE, cycle time and downtime analysis.', frequency: 'Weekly', owner: 'Marek Kowalski', lastRun: '2026-09-01 06:15' },
{ id: 'RPT-M03', name: 'Material Consumption', category: 'Production', description: 'Issued versus consumed materials with variance to BOM.', frequency: 'Weekly', owner: 'Marek Kowalski', lastRun: '2026-09-01 06:15' },
{ id: 'RPT-M04', name: 'Machine Utilisation', category: 'Production', description: 'Run hours and idle time per machine and shift.', frequency: 'Weekly', owner: 'Marek Kowalski', lastRun: '2026-09-01 06:15' },
{ id: 'RPT-M05', name: 'Quality Report', category: 'Production', description: 'Inspection results, rejection rate and defect Pareto.', frequency: 'Weekly', owner: 'Elena Petrova', lastRun: '2026-09-01 06:15' },
{ id: 'RPT-W01', name: 'Jobs Completed', category: 'Workshop', description: 'Closed job cards with turnaround time and revenue.', frequency: 'Weekly', owner: 'Dieter Ruhl', lastRun: '2026-09-01 07:00' },
{ id: 'RPT-W02', name: 'Jobs Pending', category: 'Workshop', description: 'Open jobs by status, ageing and blocking reason.', frequency: 'Daily', owner: 'Dieter Ruhl', lastRun: '2026-09-02 07:00' },
{ id: 'RPT-W03', name: 'Technician Performance', category: 'Workshop', description: 'Billable hours, utilisation and rework rate per technician.', frequency: 'Monthly', owner: 'Dieter Ruhl', lastRun: '2026-09-01 07:00' },
{ id: 'RPT-W04', name: 'Parts Consumption', category: 'Workshop', description: 'Parts issued to jobs with cost and recharge status.', frequency: 'Weekly', owner: 'Dieter Ruhl', lastRun: '2026-09-01 07:00' },
{ id: 'RPT-W05', name: 'Workshop Profitability', category: 'Workshop', description: 'Revenue less parts and labour cost per job and customer.', frequency: 'Monthly', owner: 'Sophie Laurent', lastRun: '2026-09-01 07:00' },
{ id: 'RPT-J01', name: 'Project Profitability', category: 'Projects', description: 'Revenue, cost and margin per project and manager.', frequency: 'Weekly', owner: 'Claire Dubois', lastRun: '2026-09-01 06:45' },
{ id: 'RPT-J02', name: 'Budget vs Actual', category: 'Projects', description: 'Budget, committed and actual cost with variance analysis.', frequency: 'Weekly', owner: 'Claire Dubois', lastRun: '2026-09-01 06:45' },
{ id: 'RPT-J03', name: 'Project Cost Breakdown', category: 'Job Costing', description: 'Material, labour, equipment and expense cost per job.', frequency: 'Weekly', owner: 'Sophie Laurent', lastRun: '2026-09-01 06:45' },
{ id: 'RPT-J04', name: 'Labour Cost Analysis', category: 'Job Costing', description: 'Timesheet hours costed against job and cost centre.', frequency: 'Weekly', owner: 'Sophie Laurent', lastRun: '2026-09-01 06:45' },
{ id: 'RPT-J05', name: 'Project Revenue Recognition', category: 'Job Costing', description: 'Percentage of completion revenue and WIP position.', frequency: 'Monthly', owner: 'Sophie Laurent', lastRun: '2026-09-01 06:45' },
{ id: 'RPT-F01', name: 'Profit & Loss', category: 'Finance', description: 'Income statement by period, branch and cost centre.', frequency: 'Monthly', owner: 'Sophie Laurent', lastRun: '2026-09-01 04:00' },
{ id: 'RPT-F02', name: 'Balance Sheet', category: 'Finance', description: 'Statement of financial position at period end.', frequency: 'Monthly', owner: 'Sophie Laurent', lastRun: '2026-09-01 04:00' },
{ id: 'RPT-F03', name: 'Cash Flow', category: 'Finance', description: 'Operating, investing and financing cash movements.', frequency: 'Monthly', owner: 'Sophie Laurent', lastRun: '2026-09-01 04:00' },
{ id: 'RPT-F04', name: 'Trial Balance', category: 'Finance', description: 'Debit and credit balances across all ledger accounts.', frequency: 'Monthly', owner: 'Sophie Laurent', lastRun: '2026-09-01 04:00' },
{ id: 'RPT-F05', name: 'Receivables Aging', category: 'Finance', description: 'Outstanding customer balances by ageing bucket.', frequency: 'Weekly', owner: 'Sophie Laurent', lastRun: '2026-09-01 04:00' },
{ id: 'RPT-F06', name: 'Payables Aging', category: 'Finance', description: 'Outstanding supplier balances by ageing bucket.', frequency: 'Weekly', owner: 'Sophie Laurent', lastRun: '2026-09-01 04:00' },
{ id: 'RPT-H01', name: 'Employee Summary', category: 'HR', description: 'Headcount, joiners and leavers by department.', frequency: 'Monthly', owner: 'Ibrahim Kone', lastRun: '2026-09-01 05:00' },
{ id: 'RPT-H02', name: 'Attendance Report', category: 'HR', description: 'Presence, lateness and overtime hours by period.', frequency: 'Daily', owner: 'Ibrahim Kone', lastRun: '2026-09-02 05:00' },
{ id: 'RPT-H03', name: 'Leave Report', category: 'HR', description: 'Leave taken, balances and pending requests.', frequency: 'Weekly', owner: 'Ibrahim Kone', lastRun: '2026-09-01 05:00' },
{ id: 'RPT-H04', name: 'Payroll Register', category: 'Payroll', description: 'Gross, deductions, tax and net pay per employee.', frequency: 'Monthly', owner: 'Ibrahim Kone', lastRun: '2026-08-28 05:00' },
{ id: 'RPT-H05', name: 'Department Analysis', category: 'HR', description: 'Cost per department against budget and headcount.', frequency: 'Monthly', owner: 'Sophie Laurent', lastRun: '2026-09-01 05:00' },
{ id: 'RPT-L01', name: 'Shipment Status', category: 'Logistics', description: 'Open shipments by stage, carrier and on-time performance.', frequency: 'Daily', owner: 'Nadia Rahman', lastRun: '2026-09-02 06:30' },
{ id: 'RPT-L02', name: 'Delivery Performance', category: 'Logistics', description: 'Promised versus actual delivery dates by customer.', frequency: 'Monthly', owner: 'Nadia Rahman', lastRun: '2026-09-01 06:30' }];


export const MASTER_DATA_SETS = [
{ id: 'MD-01', name: 'Customers', records: 248, owner: 'Sales', usedIn: 'Sales · Projects · Workshop · Finance', updated: '2026-09-02', to: '/sales/customers' },
{ id: 'MD-02', name: 'Suppliers', records: 132, owner: 'Procurement', usedIn: 'Procurement · Inventory · Finance', updated: '2026-09-01', to: '/procurement/suppliers' },
{ id: 'MD-03', name: 'Products', records: 738, owner: 'Inventory', usedIn: 'Sales · Procurement · Inventory · Production · Workshop', updated: '2026-09-02', to: '/inventory/products' },
{ id: 'MD-04', name: 'Categories', records: 42, owner: 'Inventory', usedIn: 'Inventory · Reporting', updated: '2026-08-24', to: '/inventory/categories' },
{ id: 'MD-05', name: 'Units of Measure', records: 18, owner: 'Inventory', usedIn: 'All transactional modules', updated: '2026-06-12', to: '/settings' },
{ id: 'MD-06', name: 'Warehouses & Stores', records: 6, owner: 'Stores', usedIn: 'Inventory · Production · Logistics', updated: '2026-08-30', to: '/inventory/warehouses' },
{ id: 'MD-07', name: 'Branches', records: 5, owner: 'Administration', usedIn: 'All modules', updated: '2026-07-04', to: '/admin/branches' },
{ id: 'MD-08', name: 'Departments', records: 10, owner: 'HR', usedIn: 'HR · Finance · Procurement', updated: '2026-08-18', to: '/hr/departments' },
{ id: 'MD-09', name: 'Employees', records: 146, owner: 'HR', usedIn: 'HR · Projects · Workshop · Production', updated: '2026-09-01', to: '/hr/employees' },
{ id: 'MD-10', name: 'Tax Rates', records: 12, owner: 'Finance', usedIn: 'Sales · Procurement · Finance', updated: '2026-05-30', to: '/finance/tax' },
{ id: 'MD-11', name: 'Currencies', records: 8, owner: 'Finance', usedIn: 'All transactional modules', updated: '2026-09-02', to: '/settings' },
{ id: 'MD-12', name: 'Payment Terms', records: 9, owner: 'Finance', usedIn: 'Sales · Procurement', updated: '2026-04-16', to: '/settings' },
{ id: 'MD-13', name: 'Cost Centers', records: 24, owner: 'Finance', usedIn: 'Finance · Projects · HR', updated: '2026-08-11', to: '/admin/branches' },
{ id: 'MD-14', name: 'Projects', records: 38, owner: 'Projects', usedIn: 'Projects · Finance · Timesheets', updated: '2026-09-01', to: '/projects' },
{ id: 'MD-15', name: 'Work Centers', records: 6, owner: 'Production', usedIn: 'Production · Costing', updated: '2026-08-27', to: '/production/work-centers' },
{ id: 'MD-16', name: 'Machines & Equipment', records: 34, owner: 'Production', usedIn: 'Production · Maintenance', updated: '2026-08-29', to: '/production/work-centers' },
{ id: 'MD-17', name: 'Assets', records: 212, owner: 'Finance', usedIn: 'Finance · Maintenance · Workshop', updated: '2026-08-20', to: '/workshop/maintenance' }];