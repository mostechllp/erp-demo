import type { ApprovalRequest, AuditEntry, Notification } from '../types/erp';

export const APPROVALS: ApprovalRequest[] = [
{
  id: 'APR-5501',
  type: 'Purchase Order',
  title: 'PO-1026 — Meridian Steel Supply',
  requester: 'Marek Kowalski',
  department: 'Production',
  amount: 218900,
  date: '2026-08-13',
  priority: 'High',
  status: 'Pending',
  currentLevel: 2,
  record: 'PO-1026',
  module: 'Procurement',
  summary: 'Q4 alloy steel bar and plate call-off against annual framework agreement. Required to cover PP-2211 and PP-2212 production plans.',
  levels: [
  { level: 1, role: 'Department Manager', approver: 'Marek Kowalski', state: 'Approved', at: '13 Aug 2026 · 14:22', note: 'Volumes match MRP run.' },
  { level: 2, role: 'Department Head', approver: 'Amara Osei', state: 'Pending' },
  { level: 3, role: 'Finance Controller', approver: 'Sophie Laurent', state: 'Waiting' }]

},
{
  id: 'APR-5502',
  type: 'Purchase Request',
  title: 'PR-4412 — Urgent workshop spares',
  requester: 'Samuel Adeyemi',
  department: 'Workshop',
  amount: 7320,
  date: '2026-08-13',
  priority: 'Urgent',
  status: 'Pending',
  currentLevel: 1,
  record: 'PR-4412',
  module: 'Procurement',
  summary: 'Bearings and seals required to release JOB-8812 (Baltic Rail axle press) currently held in Waiting for Parts.',
  levels: [
  { level: 1, role: 'Department Manager', approver: 'Dieter Ruhl', state: 'Pending' },
  { level: 2, role: 'Finance Controller', approver: 'Sophie Laurent', state: 'Waiting' }]

},
{
  id: 'APR-5503',
  type: 'Sales Order',
  title: 'SO-5043 — Al Ruwais Petrochem',
  requester: 'Rania Haddad',
  department: 'Sales',
  amount: 612300,
  date: '2026-08-11',
  priority: 'High',
  status: 'Pending',
  currentLevel: 2,
  record: 'SO-5043',
  module: 'Sales',
  summary: 'Order exceeds customer credit limit headroom by $71,900 and carries a 7% discount — requires commercial and finance sign-off.',
  levels: [
  { level: 1, role: 'Sales Manager', approver: 'Amara Osei', state: 'Approved', at: '12 Aug 2026 · 09:40' },
  { level: 2, role: 'Finance Controller', approver: 'Sophie Laurent', state: 'Pending' }]

},
{
  id: 'APR-5504',
  type: 'Leave',
  title: 'LV-2202 — Piotr Nowak · 5 days',
  requester: 'Piotr Nowak',
  department: 'Production',
  amount: 0,
  date: '2026-08-29',
  priority: 'Normal',
  status: 'Pending',
  currentLevel: 1,
  record: 'LV-2202',
  module: 'HR',
  summary: 'Annual leave 21–25 Sep. Overlaps with WO-7705 machining window — cover required from CNC cell 2.',
  levels: [
  { level: 1, role: 'Line Manager', approver: 'Marek Kowalski', state: 'Pending' },
  { level: 2, role: 'HR Manager', approver: 'Ibrahim Kone', state: 'Waiting' }]

},
{
  id: 'APR-5505',
  type: 'Stock Adjustment',
  title: 'ADJ-0444 — Steel bar variance',
  requester: 'Nadia Rahman',
  department: 'Stores',
  amount: -1720,
  date: '2026-08-31',
  priority: 'Normal',
  status: 'Pending',
  currentLevel: 1,
  record: 'ADJ-0444',
  module: 'Inventory',
  summary: 'Negative variance of 20 m alloy bar attributed to unbooked offcut scrap in CNC cell 1.',
  levels: [
  { level: 1, role: 'Finance Controller', approver: 'Sophie Laurent', state: 'Pending' }]

},
{
  id: 'APR-5506',
  type: 'Expense',
  title: 'EXP-7704 — Plant electricity August',
  requester: 'Sophie Laurent',
  department: 'Finance',
  amount: 18400,
  date: '2026-08-30',
  priority: 'Normal',
  status: 'Pending',
  currentLevel: 1,
  record: 'EXP-7704',
  module: 'Finance',
  summary: 'Utility invoice above monthly accrual by 9% due to extended second-shift running.',
  levels: [{ level: 1, role: 'Finance Controller', approver: 'Amara Osei', state: 'Pending' }]
},
{
  id: 'APR-5507',
  type: 'Project Budget',
  title: 'PRJ-9003 — Budget uplift request',
  requester: 'Tomás Ferreira',
  department: 'Projects',
  amount: 68000,
  date: '2026-08-28',
  priority: 'Urgent',
  status: 'Returned',
  currentLevel: 2,
  record: 'PRJ-9003',
  module: 'Projects',
  summary: 'Baltic Rail depot fit-out is 7.5% over budget. Uplift requested to cover additional fabrication hours and NDT scope.',
  levels: [
  { level: 1, role: 'Head of Projects', approver: 'Claire Dubois', state: 'Approved', at: '28 Aug 2026 · 11:12' },
  { level: 2, role: 'Finance Controller', approver: 'Sophie Laurent', state: 'Returned', at: '29 Aug 2026 · 16:04', note: 'Attach revised cost-to-complete and customer variation order before resubmission.' }]

},
{
  id: 'APR-5508',
  type: 'Payment',
  title: 'PAY-3315 — Rheinstahl part payment',
  requester: 'Sophie Laurent',
  department: 'Finance',
  amount: 30000,
  date: '2026-09-02',
  priority: 'High',
  status: 'Pending',
  currentLevel: 1,
  record: 'PAY-3315',
  module: 'Finance',
  summary: 'Partial settlement of SIN-7710 to release balance of PO-1024 castings.',
  levels: [{ level: 1, role: 'COO', approver: 'Amara Osei', state: 'Pending' }]
},
{
  id: 'APR-5509',
  type: 'Production Order',
  title: 'WO-7706 — Gearbox build release',
  requester: 'Marek Kowalski',
  department: 'Production',
  amount: 230400,
  date: '2026-08-27',
  priority: 'Normal',
  status: 'Approved',
  currentLevel: 2,
  record: 'WO-7706',
  module: 'Production',
  summary: 'Release of 6 × HD-900 gearbox build to Assembly Line B against forecast demand.',
  levels: [
  { level: 1, role: 'Production Manager', approver: 'Marek Kowalski', state: 'Approved', at: '27 Aug 2026 · 08:30' },
  { level: 2, role: 'COO', approver: 'Amara Osei', state: 'Approved', at: '27 Aug 2026 · 15:02' }]

},
{
  id: 'APR-5510',
  type: 'Purchase Request',
  title: 'PR-4414 — Additional casting capacity',
  requester: 'Marek Kowalski',
  department: 'Production',
  amount: 132700,
  date: '2026-08-18',
  priority: 'High',
  status: 'Rejected',
  currentLevel: 2,
  record: 'PR-4414',
  module: 'Procurement',
  summary: 'Outsourced casting capacity request rejected — internal foundry slot secured for October instead.',
  levels: [
  { level: 1, role: 'Department Manager', approver: 'Marek Kowalski', state: 'Approved', at: '18 Aug 2026 · 10:14' },
  { level: 2, role: 'Finance Controller', approver: 'Claire Dubois', state: 'Rejected', at: '19 Aug 2026 · 09:22', note: 'Capex committee prefers internal capacity — resubmit in Q4 if slot is lost.' }]

}];


export const APPROVAL_WORKFLOWS = [
{ id: 'WF-01', name: 'Purchase Order Approval', module: 'Procurement', trigger: 'Amount > $10,000', levels: 3, sla: '2 business days', active: true, owner: 'Sophie Laurent' },
{ id: 'WF-02', name: 'Purchase Request Approval', module: 'Procurement', trigger: 'All requests', levels: 2, sla: '1 business day', active: true, owner: 'Sophie Laurent' },
{ id: 'WF-03', name: 'Sales Discount Approval', module: 'Sales', trigger: 'Discount > 5%', levels: 2, sla: '1 business day', active: true, owner: 'Amara Osei' },
{ id: 'WF-04', name: 'Credit Limit Override', module: 'Sales', trigger: 'Exposure > credit limit', levels: 2, sla: '4 hours', active: true, owner: 'Sophie Laurent' },
{ id: 'WF-05', name: 'Leave Approval', module: 'HR', trigger: 'All leave requests', levels: 2, sla: '2 business days', active: true, owner: 'Ibrahim Kone' },
{ id: 'WF-06', name: 'Expense Approval', module: 'Finance', trigger: 'Amount > $500', levels: 2, sla: '3 business days', active: true, owner: 'Sophie Laurent' },
{ id: 'WF-07', name: 'Stock Adjustment Approval', module: 'Inventory', trigger: 'Variance value > $1,000', levels: 1, sla: '1 business day', active: true, owner: 'Nadia Rahman' },
{ id: 'WF-08', name: 'Stock Transfer Approval', module: 'Inventory', trigger: 'Inter-branch transfers', levels: 1, sla: '1 business day', active: true, owner: 'Nadia Rahman' },
{ id: 'WF-09', name: 'Production Order Release', module: 'Production', trigger: 'Value > $50,000', levels: 2, sla: '1 business day', active: true, owner: 'Marek Kowalski' },
{ id: 'WF-10', name: 'Project Budget Change', module: 'Projects', trigger: 'Any budget uplift', levels: 3, sla: '3 business days', active: true, owner: 'Claire Dubois' },
{ id: 'WF-11', name: 'Payment Release', module: 'Finance', trigger: 'Amount > $25,000', levels: 2, sla: '1 business day', active: true, owner: 'Amara Osei' },
{ id: 'WF-12', name: 'Vendor Onboarding', module: 'Procurement', trigger: 'New supplier record', levels: 2, sla: '5 business days', active: false, owner: 'Sophie Laurent' }];


export const NOTIFICATIONS: Notification[] = [
{ id: 'NTF-01', title: 'PO-1026 requires your approval', body: 'Meridian Steel Supply · $218,900 · level 2 of 3 · waiting 3 days', category: 'Approval', priority: 'High', time: '12 min ago', read: false, record: 'PO-1026', href: '/approvals/APR-5501' },
{ id: 'NTF-02', title: 'Invoice INV-9019 is overdue', body: 'Al Ruwais Petrochem · $421,900 · 2 days past due', category: 'Finance', priority: 'High', time: '48 min ago', read: false, record: 'INV-9019', href: '/finance/receivable' },
{ id: 'NTF-03', title: 'Stock below reorder level', body: 'BRG-SPH-6320 Spherical Roller Bearing is out of stock at WH-02', category: 'Inventory', priority: 'High', time: '1 hr ago', read: false, record: 'BRG-SPH-6320', href: '/inventory/reorder' },
{ id: 'NTF-04', title: 'Work order WO-7707 paused', body: 'Seal housing machining paused — awaiting QC disposition on bore finish', category: 'Production', priority: 'Normal', time: '2 hrs ago', read: false, record: 'WO-7707', href: '/production/work-orders' },
{ id: 'NTF-05', title: 'Workshop job ready for delivery', body: 'JOB-8813 Delta Water intake pump passed final check', category: 'Workshop', priority: 'Normal', time: '3 hrs ago', read: true, record: 'JOB-8813', href: '/workshop/jobs' },
{ id: 'NTF-06', title: 'Project budget exceeded', body: 'PRJ-9003 Baltic Rail Depot Fit-out is 7.5% over approved budget', category: 'Projects', priority: 'High', time: '5 hrs ago', read: false, record: 'PRJ-9003', href: '/projects/PRJ-9003' },
{ id: 'NTF-07', title: 'Leave request awaiting approval', body: 'Piotr Nowak requested 5 days annual leave from 21 Sep', category: 'HR', priority: 'Normal', time: 'Yesterday', read: true, record: 'LV-2202', href: '/hr/leave' },
{ id: 'NTF-08', title: 'Payment received', body: 'Cape Fabrication settled INV-9024 in full — $61,400', category: 'Finance', priority: 'Low', time: 'Yesterday', read: true, record: 'PAY-3312', href: '/finance/payments' },
{ id: 'NTF-09', title: 'Goods receipt posted', body: 'GRN-2213 · 60 of 120 bearings received against PO-1025', category: 'Procurement', priority: 'Low', time: '2 days ago', read: true, record: 'GRN-2213', href: '/procurement/receipts' },
{ id: 'NTF-10', title: 'Shipment delayed', body: 'SHP-6607 to Hansa Terminals is running 1 day behind schedule', category: 'Logistics', priority: 'Normal', time: '2 days ago', read: true, record: 'SHP-6607', href: '/logistics/shipments' }];


export const AUDIT_LOG: AuditEntry[] = [
{ id: 'AUD-99120', at: '2026-09-02 14:41:08', user: 'Amara Osei', module: 'Procurement', action: 'Approve', record: 'PO-1024', ip: '82.94.221.10', description: 'Admin approved PO-1024 for $96,400 at level 2.' },
{ id: 'AUD-99119', at: '2026-09-02 13:22:47', user: 'Sophie Laurent', module: 'Finance', action: 'Create', record: 'PAY-3315', ip: '82.94.221.14', description: 'Created payment PAY-3315 of $30,000 against SIN-7710.' },
{ id: 'AUD-99118', at: '2026-09-02 11:08:15', user: 'Nadia Rahman', module: 'Inventory', action: 'Update', record: 'ADJ-0443', ip: '145.12.88.4', description: 'Submitted stock adjustment ADJ-0443 for approval.' },
{ id: 'AUD-99117', at: '2026-09-02 09:51:33', user: 'Samuel Adeyemi', module: 'Workshop', action: 'Update', record: 'JOB-8813', ip: '81.164.55.22', description: 'Technician updated workshop job status to Ready.' },
{ id: 'AUD-99116', at: '2026-09-01 17:30:02', user: 'Marek Kowalski', module: 'Production', action: 'Create', record: 'WO-7708', ip: '145.12.88.9', description: 'Sarah created a production order for 12 × Conveyor Drive Unit CD-40.' },
{ id: 'AUD-99115', at: '2026-09-01 16:12:40', user: 'Lars Jensen', module: 'Sales', action: 'Update', record: 'CUS-1001', ip: '82.94.221.31', description: 'Updated customer information for Nordwind Marine BV.' },
{ id: 'AUD-99114', at: '2026-09-01 10:04:19', user: 'Claire Dubois', module: 'Projects', action: 'Approve', record: 'EXP-4402', ip: '82.94.221.18', description: 'Manager approved project expense of $14,600 (crane hire).' },
{ id: 'AUD-99113', at: '2026-08-31 18:44:55', user: 'System', module: 'Finance', action: 'Post', record: 'JV-2210', ip: '—', description: 'Automatic journal posting for WIP material issue.' },
{ id: 'AUD-99112', at: '2026-08-31 15:09:27', user: 'Elena Petrova', module: 'Production', action: 'Reject', record: 'QC-5510', ip: '145.12.88.12', description: 'QC inspection rejected 1 unit — impeller runout out of tolerance.' },
{ id: 'AUD-99111', at: '2026-08-31 08:22:11', user: 'Ibrahim Kone', module: 'HR', action: 'Approve', record: 'LV-2201', ip: '82.94.221.44', description: 'HR approved 10 days annual leave for Femke de Boer.' },
{ id: 'AUD-99110', at: '2026-08-30 19:02:48', user: 'Amara Osei', module: 'Administration', action: 'Update', record: 'ROLE-Sales Executive', ip: '82.94.221.10', description: 'Removed Delete permission on Sales module for role Sales Executive.' },
{ id: 'AUD-99109', at: '2026-08-30 14:35:20', user: 'Wei Lin Tan', module: 'Sales', action: 'Create', record: 'SO-5045', ip: '203.116.44.8', description: 'Created sales order SO-5045 for Vantage Cold Chain.' }];


export const USERS = [
{ id: 'USR-01', name: 'Amara Osei', email: 'amara.osei@meridian-ig.com', role: 'Super Admin', branch: 'Head Office — Rotterdam', lastLogin: '2026-09-02 14:38', mfa: true, status: 'Active' },
{ id: 'USR-02', name: 'Sophie Laurent', email: 'sophie.laurent@meridian-ig.com', role: 'Accountant', branch: 'Head Office — Rotterdam', lastLogin: '2026-09-02 13:20', mfa: true, status: 'Active' },
{ id: 'USR-03', name: 'Marek Kowalski', email: 'marek.kowalski@meridian-ig.com', role: 'Production Manager', branch: 'Vlaardingen Plant', lastLogin: '2026-09-02 07:55', mfa: true, status: 'Active' },
{ id: 'USR-04', name: 'Dieter Ruhl', email: 'dieter.ruhl@meridian-ig.com', role: 'Workshop Manager', branch: 'Antwerp Service Workshop', lastLogin: '2026-09-01 17:41', mfa: false, status: 'Active' },
{ id: 'USR-05', name: 'Claire Dubois', email: 'claire.dubois@meridian-ig.com', role: 'Project Manager', branch: 'Head Office — Rotterdam', lastLogin: '2026-09-02 09:14', mfa: true, status: 'Active' },
{ id: 'USR-06', name: 'Lars Jensen', email: 'lars.jensen@meridian-ig.com', role: 'Sales Manager', branch: 'Head Office — Rotterdam', lastLogin: '2026-09-02 08:32', mfa: true, status: 'Active' },
{ id: 'USR-07', name: 'Wei Lin Tan', email: 'weilin.tan@meridian-ig.com', role: 'Sales Executive', branch: 'Singapore Distribution', lastLogin: '2026-09-02 03:12', mfa: false, status: 'Active' },
{ id: 'USR-08', name: 'Nadia Rahman', email: 'nadia.rahman@meridian-ig.com', role: 'Warehouse Manager', branch: 'Head Office — Rotterdam', lastLogin: '2026-09-02 11:02', mfa: true, status: 'Active' },
{ id: 'USR-09', name: 'Ibrahim Kone', email: 'ibrahim.kone@meridian-ig.com', role: 'HR Manager', branch: 'Head Office — Rotterdam', lastLogin: '2026-09-01 16:48', mfa: true, status: 'Active' },
{ id: 'USR-10', name: 'Samuel Adeyemi', email: 'samuel.adeyemi@meridian-ig.com', role: 'Technician', branch: 'Antwerp Service Workshop', lastLogin: '2026-09-02 09:50', mfa: false, status: 'Active' },
{ id: 'USR-11', name: 'Rania Haddad', email: 'rania.haddad@meridian-ig.com', role: 'Sales Executive', branch: 'Dubai Trading Branch', lastLogin: '2026-08-30 12:22', mfa: true, status: 'Suspended' },
{ id: 'USR-12', name: 'Hugo Martens', email: 'hugo.martens@meridian-ig.com', role: 'Employee', branch: 'Vlaardingen Plant', lastLogin: '2026-08-29 07:30', mfa: false, status: 'Inactive' }];


export const PERMISSION_MODULES = [
'Sales',
'Procurement',
'Inventory',
'Production',
'Workshop',
'Projects',
'Finance',
'HR',
'Logistics',
'Reports',
'Settings'];


export const PERMISSION_ACTIONS = ['View', 'Create', 'Edit', 'Delete', 'Approve', 'Export'] as const;

export const ROLE_LIST = [
'Super Admin',
'Admin',
'Sales Manager',
'Sales Executive',
'Procurement Manager',
'Procurement Officer',
'Warehouse Manager',
'Production Manager',
'Workshop Manager',
'Project Manager',
'Accountant',
'HR Manager',
'HR Executive',
'Employee',
'Technician'];


/** Permission matrix keyed by role → module → allowed actions. */
export const PERMISSION_MATRIX: Record<string, Record<string, string[]>> = {
  'Super Admin': Object.fromEntries(PERMISSION_MODULES.map((m) => [m, [...PERMISSION_ACTIONS]])),
  'Sales Manager': {
    Sales: ['View', 'Create', 'Edit', 'Approve', 'Export'],
    Procurement: ['View'],
    Inventory: ['View'],
    Production: ['View'],
    Workshop: ['View'],
    Projects: ['View', 'Create'],
    Finance: ['View'],
    HR: [],
    Logistics: ['View', 'Create'],
    Reports: ['View', 'Export'],
    Settings: []
  },
  'Production Manager': {
    Sales: ['View'],
    Procurement: ['View', 'Create'],
    Inventory: ['View', 'Create', 'Edit'],
    Production: ['View', 'Create', 'Edit', 'Delete', 'Approve', 'Export'],
    Workshop: ['View'],
    Projects: ['View'],
    Finance: [],
    HR: [],
    Logistics: ['View'],
    Reports: ['View', 'Export'],
    Settings: []
  },
  Accountant: {
    Sales: ['View', 'Export'],
    Procurement: ['View', 'Export'],
    Inventory: ['View'],
    Production: ['View'],
    Workshop: ['View'],
    Projects: ['View', 'Export'],
    Finance: ['View', 'Create', 'Edit', 'Approve', 'Export'],
    HR: ['View'],
    Logistics: [],
    Reports: ['View', 'Export'],
    Settings: []
  },
  Technician: {
    Sales: [],
    Procurement: [],
    Inventory: ['View'],
    Production: ['View'],
    Workshop: ['View', 'Create', 'Edit'],
    Projects: [],
    Finance: [],
    HR: [],
    Logistics: [],
    Reports: [],
    Settings: []
  }
};