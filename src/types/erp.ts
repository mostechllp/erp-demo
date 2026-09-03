export type Tone =
'success' |
'warning' |
'danger' |
'info' |
'neutral' |
'brand';

export type RoleId =
'super-admin' |
'finance' |
'production' |
'project' |
'workshop' |
'hr';

export interface Role {
  id: RoleId;
  name: string;
  scope: string;
}

export interface Branch {
  id: string;
  name: string;
  city: string;
  country: string;
  currency: string;
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  segment: string;
  outstanding: number;
  creditLimit: number;
  status: 'Active' | 'On Hold' | 'Inactive';
  owner: string;
  since: string;
}

export interface Supplier {
  id: string;
  name: string;
  category: string;
  contact: string;
  email: string;
  phone: string;
  payable: number;
  terms: string;
  rating: number;
  onTimePct: number;
  status: 'Active' | 'On Hold' | 'Inactive';
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  unit: string;
  warehouse: string;
  available: number;
  reserved: number;
  reorderLevel: number;
  avgCost: number;
  price: number;
  status: 'Active' | 'Inactive';
  type: 'Finished Good' | 'Raw Material' | 'Component' | 'Consumable' | 'Spare Part';
}

export interface LineItem {
  productId: string;
  sku: string;
  name: string;
  qty: number;
  unit: string;
  unitPrice: number;
  discountPct: number;
  taxPct: number;
}

export interface SalesOrder {
  id: string;
  customerId: string;
  customer: string;
  orderDate: string;
  deliveryDate: string;
  warehouse: string;
  salesperson: string;
  currency: string;
  status: string;
  amount: number;
  paid: number;
  lines: LineItem[];
  notes?: string;
  linkedPr?: string;
  linkedWo?: string;
  linkedInvoice?: string;
  linkedShipment?: string;
}

export interface Quotation {
  id: string;
  customer: string;
  date: string;
  validUntil: string;
  owner: string;
  amount: number;
  status: string;
  convertedTo?: string;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  source: string;
  owner: string;
  value: number;
  stage: string;
  nextAction: string;
}

export interface Invoice {
  id: string;
  party: string;
  reference: string;
  issued: string;
  due: string;
  amount: number;
  balance: number;
  status: string;
  kind: 'AR' | 'AP';
}

export interface PurchaseRequest {
  id: string;
  requester: string;
  department: string;
  date: string;
  priority: 'Low' | 'Normal' | 'High' | 'Urgent';
  amount: number;
  status: string;
  approver: string;
  linkedTo?: string;
}

export interface PurchaseOrder {
  id: string;
  supplier: string;
  date: string;
  expected: string;
  amount: number;
  paymentStatus: string;
  receiptStatus: string;
  status: string;
  fromRequest?: string;
  lines: LineItem[];
}

export interface GoodsReceipt {
  id: string;
  po: string;
  supplier: string;
  warehouse: string;
  received: string;
  ordered: number;
  receivedQty: number;
  damaged: number;
  accepted: number;
  status: string;
  remarks: string;
}

export interface StockRow {
  sku: string;
  name: string;
  warehouse: string;
  bin: string;
  onHand: number;
  reserved: number;
  available: number;
  incoming: number;
  value: number;
  reorderLevel: number;
}

export interface StockMovement {
  id: string;
  date: string;
  type: string;
  sku: string;
  name: string;
  qty: number;
  from: string;
  to: string;
  reference: string;
  user: string;
}

export interface WorkOrder {
  id: string;
  plan: string;
  product: string;
  qty: number;
  produced: number;
  rejected: number;
  workCenter: string;
  machine: string;
  operator: string;
  start: string;
  end: string;
  status: string;
  progress: number;
  sourceOrder?: string;
}

export interface BomLine {
  sku: string;
  name: string;
  qty: number;
  unit: string;
  cost: number;
  kind: 'Raw Material' | 'Component';
  children?: BomLine[];
}

export interface Bom {
  id: string;
  product: string;
  version: string;
  status: string;
  outputQty: number;
  unit: string;
  cost: number;
  lines: BomLine[];
}

export interface JobCard {
  id: string;
  customer: string;
  asset: string;
  problem: string;
  technician: string;
  priority: 'Low' | 'Normal' | 'High' | 'Urgent';
  start: string;
  due: string;
  status: string;
  parts: number;
  labour: number;
  revenue: number;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  manager: string;
  start: string;
  end: string;
  budget: number;
  actual: number;
  committed: number;
  revenue: number;
  progress: number;
  status: string;
  hours: number;
}

export interface Job {
  id: string;
  projectId: string;
  project: string;
  customer: string;
  type: string;
  team: string;
  start: string;
  due: string;
  estimate: number;
  actual: number;
  revenue: number;
  status: string;
  costs: {material: number;labour: number;equipment: number;travel: number;other: number;};
}

export interface Employee {
  id: string;
  name: string;
  department: string;
  designation: string;
  branch: string;
  joined: string;
  email: string;
  phone: string;
  status: 'Active' | 'Probation' | 'On Leave' | 'Exited';
  salary: number;
  manager: string;
}

export interface ApprovalRequest {
  id: string;
  type: string;
  title: string;
  requester: string;
  department: string;
  amount: number;
  date: string;
  priority: 'Low' | 'Normal' | 'High' | 'Urgent';
  status: 'Pending' | 'Approved' | 'Rejected' | 'Returned';
  currentLevel: number;
  levels: {level: number;role: string;approver: string;state: string;at?: string;note?: string;}[];
  record: string;
  module: string;
  summary: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  category: string;
  priority: 'Low' | 'Normal' | 'High';
  time: string;
  read: boolean;
  record: string;
  href: string;
}

export interface AuditEntry {
  id: string;
  at: string;
  user: string;
  module: string;
  action: string;
  record: string;
  ip: string;
  description: string;
}

export interface Shipment {
  id: string;
  order: string;
  customer: string;
  warehouse: string;
  carrier: string;
  shipped: string;
  eta: string;
  status: string;
  tracking: string;
}