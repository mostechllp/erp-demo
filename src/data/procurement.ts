import type { GoodsReceipt, Invoice, PurchaseOrder, PurchaseRequest, Supplier } from '../types/erp';

export const SUPPLIERS: Supplier[] = [
{ id: 'SUP-2001', name: 'Rheinstahl Components GmbH', category: 'Castings & Forgings', contact: 'Ulrich Mayer', email: 'u.mayer@rheinstahl.de', phone: '+49 211 445 8800', payable: 214500, terms: 'Net 45', rating: 4.6, onTimePct: 94, status: 'Active' },
{ id: 'SUP-2002', name: 'Sakai Bearings Co.', category: 'Bearings', contact: 'Hiroshi Sakai', email: 'h.sakai@sakaibearings.jp', phone: '+81 6 6210 4411', payable: 88700, terms: 'Net 30', rating: 4.8, onTimePct: 98, status: 'Active' },
{ id: 'SUP-2003', name: 'Meridian Steel Supply', category: 'Raw Steel', contact: 'Fatima Zahra', email: 'fatima@meridiansteel.ae', phone: '+971 4 332 7710', payable: 341200, terms: 'Net 60', rating: 4.1, onTimePct: 87, status: 'Active' },
{ id: 'SUP-2004', name: 'Volta Electricals Ltd', category: 'Motors & Drives', contact: 'Daniel Owusu', email: 'd.owusu@voltaelec.com', phone: '+44 121 448 2211', payable: 56300, terms: 'Net 30', rating: 4.4, onTimePct: 91, status: 'Active' },
{ id: 'SUP-2005', name: 'Polymer Seals Iberia', category: 'Seals & Gaskets', contact: 'Nuria Vidal', email: 'nuria@polymerseals.es', phone: '+34 93 220 1188', payable: 12400, terms: 'Net 15', rating: 3.9, onTimePct: 79, status: 'On Hold' },
{ id: 'SUP-2006', name: 'Batavia Logistics BV', category: 'Freight & Logistics', contact: 'Ruben Kok', email: 'r.kok@batavialog.nl', phone: '+31 10 288 9911', payable: 41850, terms: 'Net 30', rating: 4.5, onTimePct: 96, status: 'Active' },
{ id: 'SUP-2007', name: 'Precision Tooling SG', category: 'Tooling & Consumables', contact: 'Melissa Ang', email: 'melissa@ptsg.com.sg', phone: '+65 6844 7720', payable: 23980, terms: 'Net 30', rating: 4.2, onTimePct: 89, status: 'Active' },
{ id: 'SUP-2008', name: 'Nordic Coatings AS', category: 'Surface Treatment', contact: 'Erik Halvorsen', email: 'erik@nordiccoatings.no', phone: '+47 55 300 122', payable: 9750, terms: 'Net 21', rating: 4.0, onTimePct: 83, status: 'Inactive' }];


export const PURCHASE_REQUESTS: PurchaseRequest[] = [
{ id: 'PR-4410', requester: 'Marek Kowalski', department: 'Production', date: '2026-08-07', priority: 'High', amount: 96400, status: 'Approved', approver: 'Amara Osei', linkedTo: 'SO-5041' },
{ id: 'PR-4411', requester: 'Ingrid Bakker', department: 'Maintenance', date: '2026-08-10', priority: 'Normal', amount: 18450, status: 'Pending Approval', approver: 'Dieter Ruhl', linkedTo: 'MNT-3304' },
{ id: 'PR-4412', requester: 'Samuel Adeyemi', department: 'Workshop', date: '2026-08-13', priority: 'Urgent', amount: 7320, status: 'Pending Approval', approver: 'Dieter Ruhl', linkedTo: 'JOB-8812' },
{ id: 'PR-4413', requester: 'Wei Lin Tan', department: 'Sales', date: '2026-08-15', priority: 'Normal', amount: 4200, status: 'Approved', approver: 'Amara Osei' },
{ id: 'PR-4414', requester: 'Marek Kowalski', department: 'Production', date: '2026-08-18', priority: 'High', amount: 132700, status: 'Rejected', approver: 'Claire Dubois' },
{ id: 'PR-4415', requester: 'Nadia Rahman', department: 'Stores', date: '2026-08-21', priority: 'Low', amount: 2860, status: 'Draft', approver: '—' },
{ id: 'PR-4416', requester: 'Ingrid Bakker', department: 'Maintenance', date: '2026-08-24', priority: 'Normal', amount: 22400, status: 'Approved', approver: 'Dieter Ruhl' },
{ id: 'PR-4417', requester: 'Tomás Ferreira', department: 'Projects', date: '2026-08-27', priority: 'High', amount: 58900, status: 'Pending Approval', approver: 'Claire Dubois', linkedTo: 'PRJ-9002' }];


export const PURCHASE_ORDERS: PurchaseOrder[] = [
{
  id: 'PO-1024',
  supplier: 'Rheinstahl Components GmbH',
  date: '2026-08-08',
  expected: '2026-09-02',
  amount: 96400,
  paymentStatus: 'Partially Paid',
  receiptStatus: 'Partially Received',
  status: 'Partially Received',
  fromRequest: 'PR-4410',
  lines: [
  { productId: 'PRD-310', sku: 'CST-IMP-150', name: 'Cast Impeller Blank 150', qty: 24, unit: 'EA', unitPrice: 2450, discountPct: 0, taxPct: 21 },
  { productId: 'PRD-311', sku: 'CST-HSG-150', name: 'Pump Housing Casting 150', qty: 12, unit: 'EA', unitPrice: 3120, discountPct: 2, taxPct: 21 }]

},
{ id: 'PO-1025', supplier: 'Sakai Bearings Co.', date: '2026-08-11', expected: '2026-09-08', amount: 42300, paymentStatus: 'Unpaid', receiptStatus: 'Pending', status: 'Sent to Supplier', lines: [] },
{ id: 'PO-1026', supplier: 'Meridian Steel Supply', date: '2026-08-13', expected: '2026-09-20', amount: 218900, paymentStatus: 'Unpaid', receiptStatus: 'Pending', status: 'Pending Approval', lines: [] },
{ id: 'PO-1027', supplier: 'Volta Electricals Ltd', date: '2026-08-15', expected: '2026-08-30', amount: 56300, paymentStatus: 'Paid', receiptStatus: 'Fully Received', status: 'Completed', lines: [] },
{ id: 'PO-1028', supplier: 'Batavia Logistics BV', date: '2026-08-18', expected: '2026-09-01', amount: 12750, paymentStatus: 'Unpaid', receiptStatus: 'Fully Received', status: 'Fully Received', lines: [] },
{ id: 'PO-1029', supplier: 'Precision Tooling SG', date: '2026-08-20', expected: '2026-09-12', amount: 23980, paymentStatus: 'Unpaid', receiptStatus: 'Pending', status: 'Approved', lines: [] },
{ id: 'PO-1030', supplier: 'Polymer Seals Iberia', date: '2026-08-22', expected: '2026-09-06', amount: 8420, paymentStatus: 'Unpaid', receiptStatus: 'Pending', status: 'Draft', lines: [] },
{ id: 'PO-1031', supplier: 'Rheinstahl Components GmbH', date: '2026-08-26', expected: '2026-09-25', amount: 74100, paymentStatus: 'Unpaid', receiptStatus: 'Pending', status: 'Pending Approval', fromRequest: 'PR-4416', lines: [] }];


export const GOODS_RECEIPTS: GoodsReceipt[] = [
{ id: 'GRN-2210', po: 'PO-1024', supplier: 'Rheinstahl Components GmbH', warehouse: 'WH-02 Vlaardingen', received: '2026-08-25', ordered: 24, receivedQty: 16, damaged: 1, accepted: 15, status: 'Partially Received', remarks: 'One blank with casting porosity — raised NCR-118.' },
{ id: 'GRN-2211', po: 'PO-1027', supplier: 'Volta Electricals Ltd', warehouse: 'WH-02 Vlaardingen', received: '2026-08-28', ordered: 18, receivedQty: 18, damaged: 0, accepted: 18, status: 'Fully Received', remarks: 'Inspection passed, certificates filed.' },
{ id: 'GRN-2212', po: 'PO-1028', supplier: 'Batavia Logistics BV', warehouse: 'WH-01 Rotterdam Main', received: '2026-08-29', ordered: 1, receivedQty: 1, damaged: 0, accepted: 1, status: 'Fully Received', remarks: 'Freight service receipt.' },
{ id: 'GRN-2213', po: 'PO-1025', supplier: 'Sakai Bearings Co.', warehouse: 'WH-02 Vlaardingen', received: '2026-09-01', ordered: 120, receivedQty: 60, damaged: 0, accepted: 60, status: 'Partially Received', remarks: 'Balance 60 pcs in transit, ETA 08 Sep.' }];


export const AP_INVOICES: Invoice[] = [
{ id: 'SIN-7710', party: 'Rheinstahl Components GmbH', reference: 'PO-1024', issued: '2026-08-26', due: '2026-10-10', amount: 58800, balance: 28800, status: 'Partially Paid', kind: 'AP' },
{ id: 'SIN-7711', party: 'Volta Electricals Ltd', reference: 'PO-1027', issued: '2026-08-29', due: '2026-09-28', amount: 56300, balance: 0, status: 'Paid', kind: 'AP' },
{ id: 'SIN-7712', party: 'Meridian Steel Supply', reference: 'PO-1019', issued: '2026-07-15', due: '2026-09-13', amount: 341200, balance: 341200, status: 'Pending Approval', kind: 'AP' },
{ id: 'SIN-7713', party: 'Batavia Logistics BV', reference: 'PO-1028', issued: '2026-08-30', due: '2026-09-29', amount: 12750, balance: 12750, status: 'Approved', kind: 'AP' },
{ id: 'SIN-7714', party: 'Sakai Bearings Co.', reference: 'PO-1025', issued: '2026-09-02', due: '2026-10-02', amount: 21150, balance: 21150, status: 'Pending Approval', kind: 'AP' },
{ id: 'SIN-7715', party: 'Polymer Seals Iberia', reference: 'PO-1015', issued: '2026-07-02', due: '2026-07-17', amount: 12400, balance: 12400, status: 'Overdue', kind: 'AP' }];


export const PURCHASE_RETURNS = [
{ id: 'PRT-880', po: 'PO-1024', supplier: 'Rheinstahl Components GmbH', date: '2026-08-27', reason: 'Casting porosity — NCR-118', qty: 1, amount: 2450, status: 'Approved', debitNote: 'DN-2201' },
{ id: 'PRT-881', po: 'PO-1015', supplier: 'Polymer Seals Iberia', date: '2026-08-14', reason: 'Incorrect seal compound', qty: 40, amount: 3200, status: 'Pending Approval', debitNote: '—' },
{ id: 'PRT-882', po: 'PO-1021', supplier: 'Precision Tooling SG', date: '2026-08-19', reason: 'Damaged in transit', qty: 6, amount: 1440, status: 'Received', debitNote: '—' }];