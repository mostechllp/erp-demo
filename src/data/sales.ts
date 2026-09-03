import type { Customer, Invoice, Lead, Quotation, SalesOrder } from '../types/erp';

export const CUSTOMERS: Customer[] = [
{ id: 'CUS-1001', name: 'Nordwind Marine BV', company: 'Nordwind Marine BV', contact: 'Pieter de Vries', email: 'p.devries@nordwindmarine.nl', phone: '+31 10 442 8891', segment: 'Marine', outstanding: 184320.5, creditLimit: 400000, status: 'Active', owner: 'Lars Jensen', since: '2019-04-11' },
{ id: 'CUS-1002', name: 'Al Ruwais Petrochem', company: 'Al Ruwais Petrochemical LLC', contact: 'Hessa Al Marri', email: 'hessa@ruwaispetro.ae', phone: '+971 2 555 1180', segment: 'Energy', outstanding: 421900.0, creditLimit: 750000, status: 'Active', owner: 'Rania Haddad', since: '2017-09-02' },
{ id: 'CUS-1003', name: 'Baltic Rail Works', company: 'Baltic Rail Works AS', contact: 'Kristina Sepp', email: 'k.sepp@balticrail.ee', phone: '+372 662 4410', segment: 'Rail', outstanding: 96450.75, creditLimit: 250000, status: 'Active', owner: 'Lars Jensen', since: '2021-01-25' },
{ id: 'CUS-1004', name: 'Sunda Agro Mills', company: 'PT Sunda Agro Mills', contact: 'Bagus Pratama', email: 'bagus@sundaagro.co.id', phone: '+62 21 5099 3312', segment: 'Agri-processing', outstanding: 0, creditLimit: 180000, status: 'Active', owner: 'Wei Lin Tan', since: '2022-06-14' },
{ id: 'CUS-1005', name: 'Helvetia Precision', company: 'Helvetia Precision AG', contact: 'Andrea Brunner', email: 'a.brunner@helvetiaprecision.ch', phone: '+41 44 880 2277', segment: 'Machinery', outstanding: 54280.0, creditLimit: 300000, status: 'On Hold', owner: 'Rania Haddad', since: '2018-11-30' },
{ id: 'CUS-1006', name: 'Cape Fabrication', company: 'Cape Fabrication (Pty) Ltd', contact: 'Thabo Nkosi', email: 'thabo@capefab.co.za', phone: '+27 21 447 6620', segment: 'Fabrication', outstanding: 33120.4, creditLimit: 150000, status: 'Active', owner: 'Wei Lin Tan', since: '2023-03-08' },
{ id: 'CUS-1007', name: 'Vantage Cold Chain', company: 'Vantage Cold Chain Pte Ltd', contact: 'Serene Koh', email: 'serene.koh@vantagecc.sg', phone: '+65 6221 7788', segment: 'Logistics', outstanding: 128740.0, creditLimit: 350000, status: 'Active', owner: 'Wei Lin Tan', since: '2020-08-19' },
{ id: 'CUS-1008', name: 'Hansa Terminals', company: 'Hansa Terminals GmbH', contact: 'Jonas Bergmann', email: 'j.bergmann@hansaterminals.de', phone: '+49 40 3399 0021', segment: 'Ports', outstanding: 267500.0, creditLimit: 500000, status: 'Active', owner: 'Lars Jensen', since: '2016-02-04' },
{ id: 'CUS-1009', name: 'Delta Water Utilities', company: 'Delta Water Utilities NV', contact: 'Marieke Smit', email: 'm.smit@deltawater.nl', phone: '+31 78 611 4402', segment: 'Utilities', outstanding: 18900.0, creditLimit: 200000, status: 'Active', owner: 'Lars Jensen', since: '2024-05-21' },
{ id: 'CUS-1010', name: 'Atlas Mining Services', company: 'Atlas Mining Services Ltd', contact: 'Grace Mwangi', email: 'g.mwangi@atlasmining.co.ke', phone: '+254 20 288 4410', segment: 'Mining', outstanding: 74350.25, creditLimit: 220000, status: 'Inactive', owner: 'Rania Haddad', since: '2019-10-17' }];


export const LEADS: Lead[] = [
{ id: 'LEA-2201', name: 'Retrofit of 4 ballast pumps', company: 'Fjordline Shipping AS', source: 'Trade show — SMM Hamburg', owner: 'Lars Jensen', value: 240000, stage: 'Qualified', nextAction: 'Site survey 08 Sep' },
{ id: 'LEA-2202', name: 'Annual spares framework', company: 'Gulf Marine Terminals', source: 'Referral', owner: 'Rania Haddad', value: 615000, stage: 'In Review', nextAction: 'Commercial review with CFO' },
{ id: 'LEA-2203', name: 'Conveyor drive upgrade', company: 'Sunda Agro Mills', source: 'Existing customer', owner: 'Wei Lin Tan', value: 87500, stage: 'Qualified', nextAction: 'Issue quotation' },
{ id: 'LEA-2204', name: 'Workshop overhaul contract', company: 'Baltic Rail Works AS', source: 'Inbound website', owner: 'Lars Jensen', value: 132000, stage: 'New', nextAction: 'Discovery call' },
{ id: 'LEA-2205', name: 'Cold store compressor package', company: 'Vantage Cold Chain', source: 'Partner', owner: 'Wei Lin Tan', value: 398000, stage: 'In Review', nextAction: 'Technical clarification' },
{ id: 'LEA-2206', name: 'Spare parts consignment stock', company: 'Hansa Terminals GmbH', source: 'Account plan', owner: 'Rania Haddad', value: 156000, stage: 'Qualified', nextAction: 'Draft consignment terms' }];


export const QUOTATIONS: Quotation[] = [
{ id: 'QUO-3312', customer: 'Nordwind Marine BV', date: '2026-08-04', validUntil: '2026-09-04', owner: 'Lars Jensen', amount: 184500, status: 'Accepted', convertedTo: 'SO-5041' },
{ id: 'QUO-3313', customer: 'Al Ruwais Petrochem', date: '2026-08-09', validUntil: '2026-09-09', owner: 'Rania Haddad', amount: 612300, status: 'Sent' },
{ id: 'QUO-3314', customer: 'Baltic Rail Works', date: '2026-08-12', validUntil: '2026-09-12', owner: 'Lars Jensen', amount: 96800, status: 'Accepted', convertedTo: 'SO-5044' },
{ id: 'QUO-3315', customer: 'Helvetia Precision', date: '2026-08-15', validUntil: '2026-09-15', owner: 'Rania Haddad', amount: 42750, status: 'Rejected' },
{ id: 'QUO-3316', customer: 'Vantage Cold Chain', date: '2026-08-19', validUntil: '2026-09-19', owner: 'Wei Lin Tan', amount: 398000, status: 'Sent' },
{ id: 'QUO-3317', customer: 'Cape Fabrication', date: '2026-08-24', validUntil: '2026-09-24', owner: 'Wei Lin Tan', amount: 61400, status: 'Draft' },
{ id: 'QUO-3318', customer: 'Delta Water Utilities', date: '2026-08-27', validUntil: '2026-09-27', owner: 'Lars Jensen', amount: 28900, status: 'Draft' }];


export const SALES_ORDERS: SalesOrder[] = [
{
  id: 'SO-5041',
  customerId: 'CUS-1001',
  customer: 'Nordwind Marine BV',
  orderDate: '2026-08-06',
  deliveryDate: '2026-09-18',
  warehouse: 'WH-01 Rotterdam Main',
  salesperson: 'Lars Jensen',
  currency: 'EUR',
  status: 'Processing',
  amount: 184500,
  paid: 55350,
  notes: 'Customer requires class certification documents with delivery.',
  linkedPr: 'PR-4410',
  linkedWo: 'WO-7702',
  linkedInvoice: 'INV-9021',
  linkedShipment: 'SHP-6610',
  lines: [
  { productId: 'PRD-101', sku: 'PMP-CS-150', name: 'Centrifugal Pump CS-150', qty: 6, unit: 'EA', unitPrice: 18400, discountPct: 5, taxPct: 21 },
  { productId: 'PRD-118', sku: 'SEA-MEC-42', name: 'Mechanical Seal Kit 42mm', qty: 12, unit: 'EA', unitPrice: 2150, discountPct: 0, taxPct: 21 },
  { productId: 'PRD-204', sku: 'SRV-COMM-01', name: 'Commissioning Service — 3 days', qty: 3, unit: 'DAY', unitPrice: 2400, discountPct: 0, taxPct: 21 }]

},
{
  id: 'SO-5042',
  customerId: 'CUS-1008',
  customer: 'Hansa Terminals GmbH',
  orderDate: '2026-08-08',
  deliveryDate: '2026-09-05',
  warehouse: 'WH-01 Rotterdam Main',
  salesperson: 'Lars Jensen',
  currency: 'EUR',
  status: 'Partially Delivered',
  amount: 267500,
  paid: 120000,
  linkedInvoice: 'INV-9018',
  linkedShipment: 'SHP-6607',
  lines: [
  { productId: 'PRD-140', sku: 'GRB-HD-900', name: 'Heavy Duty Gearbox HD-900', qty: 4, unit: 'EA', unitPrice: 52300, discountPct: 3, taxPct: 19 },
  { productId: 'PRD-155', sku: 'CPL-FLX-220', name: 'Flexible Coupling 220mm', qty: 8, unit: 'EA', unitPrice: 4380, discountPct: 0, taxPct: 19 }]

},
{ id: 'SO-5043', customerId: 'CUS-1002', customer: 'Al Ruwais Petrochem', orderDate: '2026-08-11', deliveryDate: '2026-10-02', warehouse: 'WH-04 Dubai', salesperson: 'Rania Haddad', currency: 'USD', status: 'Pending Approval', amount: 612300, paid: 0, lines: [] },
{ id: 'SO-5044', customerId: 'CUS-1003', customer: 'Baltic Rail Works', orderDate: '2026-08-14', deliveryDate: '2026-09-22', warehouse: 'WH-01 Rotterdam Main', salesperson: 'Lars Jensen', currency: 'EUR', status: 'Confirmed', amount: 96800, paid: 0, linkedWo: 'WO-7705', lines: [] },
{ id: 'SO-5045', customerId: 'CUS-1007', customer: 'Vantage Cold Chain', orderDate: '2026-08-18', deliveryDate: '2026-09-30', warehouse: 'WH-05 Singapore', salesperson: 'Wei Lin Tan', currency: 'SGD', status: 'Confirmed', amount: 128740, paid: 32000, lines: [] },
{ id: 'SO-5046', customerId: 'CUS-1006', customer: 'Cape Fabrication', orderDate: '2026-08-20', deliveryDate: '2026-09-14', warehouse: 'WH-01 Rotterdam Main', salesperson: 'Wei Lin Tan', currency: 'EUR', status: 'Delivered', amount: 61400, paid: 61400, linkedInvoice: 'INV-9024', lines: [] },
{ id: 'SO-5047', customerId: 'CUS-1009', customer: 'Delta Water Utilities', orderDate: '2026-08-23', deliveryDate: '2026-09-26', warehouse: 'WH-01 Rotterdam Main', salesperson: 'Lars Jensen', currency: 'EUR', status: 'Draft', amount: 28900, paid: 0, lines: [] },
{ id: 'SO-5048', customerId: 'CUS-1005', customer: 'Helvetia Precision', orderDate: '2026-08-25', deliveryDate: '2026-09-11', warehouse: 'WH-02 Vlaardingen', salesperson: 'Rania Haddad', currency: 'EUR', status: 'Cancelled', amount: 42750, paid: 0, lines: [] },
{ id: 'SO-5049', customerId: 'CUS-1004', customer: 'Sunda Agro Mills', orderDate: '2026-08-27', deliveryDate: '2026-10-09', warehouse: 'WH-05 Singapore', salesperson: 'Wei Lin Tan', currency: 'USD', status: 'Processing', amount: 87500, paid: 0, linkedWo: 'WO-7708', lines: [] },
{ id: 'SO-5050', customerId: 'CUS-1010', customer: 'Atlas Mining Services', orderDate: '2026-08-29', deliveryDate: '2026-10-15', warehouse: 'WH-04 Dubai', salesperson: 'Rania Haddad', currency: 'USD', status: 'Pending Approval', amount: 74350, paid: 0, lines: [] }];


export const AR_INVOICES: Invoice[] = [
{ id: 'INV-9018', party: 'Hansa Terminals GmbH', reference: 'SO-5042', issued: '2026-07-28', due: '2026-08-27', amount: 267500, balance: 147500, status: 'Overdue', kind: 'AR' },
{ id: 'INV-9019', party: 'Al Ruwais Petrochem', reference: 'SO-5031', issued: '2026-08-01', due: '2026-08-31', amount: 421900, balance: 421900, status: 'Overdue', kind: 'AR' },
{ id: 'INV-9021', party: 'Nordwind Marine BV', reference: 'SO-5041', issued: '2026-08-10', due: '2026-09-09', amount: 184500, balance: 129150, status: 'Partially Paid', kind: 'AR' },
{ id: 'INV-9022', party: 'Baltic Rail Works', reference: 'SO-5036', issued: '2026-08-12', due: '2026-09-11', amount: 96450, balance: 96450, status: 'Sent', kind: 'AR' },
{ id: 'INV-9023', party: 'Vantage Cold Chain', reference: 'SO-5045', issued: '2026-08-18', due: '2026-09-17', amount: 128740, balance: 96740, status: 'Partially Paid', kind: 'AR' },
{ id: 'INV-9024', party: 'Cape Fabrication', reference: 'SO-5046', issued: '2026-08-21', due: '2026-09-20', amount: 61400, balance: 0, status: 'Paid', kind: 'AR' },
{ id: 'INV-9025', party: 'Delta Water Utilities', reference: 'SO-5029', issued: '2026-08-24', due: '2026-09-23', amount: 18900, balance: 18900, status: 'Sent', kind: 'AR' },
{ id: 'INV-9026', party: 'Atlas Mining Services', reference: 'SO-5022', issued: '2026-06-30', due: '2026-07-30', amount: 74350, balance: 74350, status: 'Overdue', kind: 'AR' },
{ id: 'INV-9027', party: 'Helvetia Precision', reference: 'SO-5019', issued: '2026-08-02', due: '2026-09-01', amount: 54280, balance: 54280, status: 'Sent', kind: 'AR' }];


export const SALES_RETURNS = [
{ id: 'SRT-1201', order: 'SO-5036', customer: 'Baltic Rail Works', date: '2026-08-16', reason: 'Wrong shaft length supplied', qty: 4, amount: 12800, status: 'Approved', creditNote: 'CN-4402' },
{ id: 'SRT-1202', order: 'SO-5042', customer: 'Hansa Terminals GmbH', date: '2026-08-21', reason: 'Transit damage — coupling housing', qty: 1, amount: 4380, status: 'Pending Approval', creditNote: '—' },
{ id: 'SRT-1203', order: 'SO-5029', customer: 'Delta Water Utilities', date: '2026-08-26', reason: 'Over-supply against order', qty: 6, amount: 3120, status: 'Received', creditNote: '—' },
{ id: 'SRT-1204', order: 'SO-5019', customer: 'Helvetia Precision', date: '2026-08-28', reason: 'Quality complaint — surface finish', qty: 2, amount: 8600, status: 'Rejected', creditNote: '—' }];