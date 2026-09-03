export const CHART_OF_ACCOUNTS = [
{ code: '1000', name: 'Cash and Cash Equivalents', type: 'Asset', group: 'Current Assets', balance: 1842300, status: 'Active' },
{ code: '1010', name: 'Bank — ING Operating Account', type: 'Asset', group: 'Current Assets', balance: 1284900, status: 'Active' },
{ code: '1020', name: 'Bank — HSBC USD Account', type: 'Asset', group: 'Current Assets', balance: 452800, status: 'Active' },
{ code: '1100', name: 'Accounts Receivable', type: 'Asset', group: 'Current Assets', balance: 1279520, status: 'Active' },
{ code: '1200', name: 'Inventory — Raw Materials', type: 'Asset', group: 'Current Assets', balance: 2412700, status: 'Active' },
{ code: '1210', name: 'Inventory — Work in Progress', type: 'Asset', group: 'Current Assets', balance: 986400, status: 'Active' },
{ code: '1220', name: 'Inventory — Finished Goods', type: 'Asset', group: 'Current Assets', balance: 4128900, status: 'Active' },
{ code: '1500', name: 'Plant, Property & Equipment', type: 'Asset', group: 'Fixed Assets', balance: 8940000, status: 'Active' },
{ code: '2000', name: 'Accounts Payable', type: 'Liability', group: 'Current Liabilities', balance: 788680, status: 'Active' },
{ code: '2100', name: 'VAT / Tax Payable', type: 'Liability', group: 'Current Liabilities', balance: 214600, status: 'Active' },
{ code: '2200', name: 'Payroll Liabilities', type: 'Liability', group: 'Current Liabilities', balance: 168400, status: 'Active' },
{ code: '2500', name: 'Long Term Loans', type: 'Liability', group: 'Non-current Liabilities', balance: 3200000, status: 'Active' },
{ code: '3000', name: 'Share Capital', type: 'Equity', group: 'Equity', balance: 5000000, status: 'Active' },
{ code: '3100', name: 'Retained Earnings', type: 'Equity', group: 'Equity', balance: 6218940, status: 'Active' },
{ code: '4000', name: 'Revenue — Product Sales', type: 'Revenue', group: 'Operating Income', balance: 12480600, status: 'Active' },
{ code: '4100', name: 'Revenue — Service & Workshop', type: 'Revenue', group: 'Operating Income', balance: 3184200, status: 'Active' },
{ code: '4200', name: 'Revenue — Projects', type: 'Revenue', group: 'Operating Income', balance: 6842000, status: 'Active' },
{ code: '5000', name: 'Cost of Goods Sold', type: 'Expense', group: 'Direct Costs', balance: 13284100, status: 'Active' },
{ code: '5100', name: 'Direct Labour', type: 'Expense', group: 'Direct Costs', balance: 2984600, status: 'Active' },
{ code: '6000', name: 'Salaries & Wages', type: 'Expense', group: 'Operating Expenses', balance: 3126800, status: 'Active' },
{ code: '6100', name: 'Rent & Utilities', type: 'Expense', group: 'Operating Expenses', balance: 486200, status: 'Active' },
{ code: '6200', name: 'Freight & Logistics', type: 'Expense', group: 'Operating Expenses', balance: 612400, status: 'Active' },
{ code: '6300', name: 'Repairs & Maintenance', type: 'Expense', group: 'Operating Expenses', balance: 284900, status: 'Active' },
{ code: '6900', name: 'Depreciation', type: 'Expense', group: 'Operating Expenses', balance: 742000, status: 'Active' }];


export const GENERAL_LEDGER = [
{ id: 'GL-88201', date: '2026-09-01', account: '1100 Accounts Receivable', journal: 'JV-2211', reference: 'INV-9021', description: 'Invoice raised — Nordwind Marine BV', debit: 184500, credit: 0, balance: 1279520 },
{ id: 'GL-88202', date: '2026-09-01', account: '4000 Revenue — Product Sales', journal: 'JV-2211', reference: 'INV-9021', description: 'Revenue recognised — SO-5041', debit: 0, credit: 152479, balance: 12480600 },
{ id: 'GL-88203', date: '2026-09-01', account: '2100 VAT / Tax Payable', journal: 'JV-2211', reference: 'INV-9021', description: 'Output VAT 21%', debit: 0, credit: 32021, balance: 214600 },
{ id: 'GL-88204', date: '2026-08-31', account: '1210 Inventory — WIP', journal: 'JV-2210', reference: 'WO-7702', description: 'Material issued to work order', debit: 44560, credit: 0, balance: 986400 },
{ id: 'GL-88205', date: '2026-08-31', account: '1200 Inventory — Raw Materials', journal: 'JV-2210', reference: 'WO-7702', description: 'Raw material consumption', debit: 0, credit: 44560, balance: 2412700 },
{ id: 'GL-88206', date: '2026-08-30', account: '2000 Accounts Payable', journal: 'JV-2209', reference: 'SIN-7710', description: 'Supplier invoice — Rheinstahl Components', debit: 0, credit: 58800, balance: 788680 },
{ id: 'GL-88207', date: '2026-08-30', account: '1200 Inventory — Raw Materials', journal: 'JV-2209', reference: 'GRN-2210', description: 'Goods received into WH-02', debit: 48595, credit: 0, balance: 2412700 },
{ id: 'GL-88208', date: '2026-08-29', account: '1010 Bank — ING Operating', journal: 'JV-2208', reference: 'PAY-3312', description: 'Customer receipt — Cape Fabrication', debit: 61400, credit: 0, balance: 1284900 },
{ id: 'GL-88209', date: '2026-08-28', account: '6200 Freight & Logistics', journal: 'JV-2207', reference: 'SIN-7713', description: 'Freight — Batavia Logistics', debit: 12750, credit: 0, balance: 612400 },
{ id: 'GL-88210', date: '2026-08-27', account: '5100 Direct Labour', journal: 'JV-2206', reference: 'TS-5501', description: 'Timesheet posting — W35', debit: 28460, credit: 0, balance: 2984600 }];


export const JOURNAL_ENTRIES = [
{ id: 'JV-2211', date: '2026-09-01', type: 'Sales Invoice', reference: 'INV-9021', description: 'Nordwind Marine BV — SO-5041', debit: 184500, credit: 184500, status: 'Posted', createdBy: 'System' },
{ id: 'JV-2210', date: '2026-08-31', type: 'Inventory', reference: 'WO-7702', description: 'WIP material issue', debit: 44560, credit: 44560, status: 'Posted', createdBy: 'System' },
{ id: 'JV-2209', date: '2026-08-30', type: 'Purchase Invoice', reference: 'SIN-7710', description: 'Rheinstahl Components GmbH', debit: 58800, credit: 58800, status: 'Posted', createdBy: 'Sophie Laurent' },
{ id: 'JV-2208', date: '2026-08-29', type: 'Receipt', reference: 'PAY-3312', description: 'Cape Fabrication payment received', debit: 61400, credit: 61400, status: 'Posted', createdBy: 'Sophie Laurent' },
{ id: 'JV-2212', date: '2026-09-02', type: 'Accrual', reference: 'ACR-0091', description: 'August utilities accrual', debit: 18400, credit: 18400, status: 'Draft', createdBy: 'Sophie Laurent' },
{ id: 'JV-2213', date: '2026-09-02', type: 'Depreciation', reference: 'DEP-08', description: 'August depreciation run', debit: 61833, credit: 61833, status: 'Pending Approval', createdBy: 'System' }];


export const PAYMENTS = [
{ id: 'PAY-3312', date: '2026-08-29', party: 'Cape Fabrication', kind: 'Receipt', method: 'Bank Transfer', reference: 'INV-9024', amount: 61400, account: '1010 ING Operating', status: 'Reconciled' },
{ id: 'PAY-3313', date: '2026-08-30', party: 'Volta Electricals Ltd', kind: 'Payment', method: 'Bank Transfer', reference: 'SIN-7711', amount: 56300, account: '1010 ING Operating', status: 'Reconciled' },
{ id: 'PAY-3314', date: '2026-09-01', party: 'Nordwind Marine BV', kind: 'Receipt', method: 'Bank Transfer', reference: 'INV-9021', amount: 55350, account: '1010 ING Operating', status: 'Posted' },
{ id: 'PAY-3315', date: '2026-09-02', party: 'Rheinstahl Components GmbH', kind: 'Payment', method: 'Bank Transfer', reference: 'SIN-7710', amount: 30000, account: '1020 HSBC USD', status: 'Pending Approval' },
{ id: 'PAY-3316', date: '2026-09-02', party: 'Vantage Cold Chain', kind: 'Receipt', method: 'Letter of Credit', reference: 'INV-9023', amount: 32000, account: '1020 HSBC USD', status: 'Posted' }];


export const EXPENSES = [
{ id: 'EXP-7701', date: '2026-08-26', category: 'Travel', description: 'Client visit — Hamburg', employee: 'Lars Jensen', costCenter: 'Sales — HQ', amount: 1240, status: 'Approved' },
{ id: 'EXP-7702', date: '2026-08-27', category: 'Equipment Hire', description: 'Mobile crane hire', employee: 'Claire Dubois', costCenter: 'Projects', amount: 14600, status: 'Approved' },
{ id: 'EXP-7703', date: '2026-08-29', category: 'Subcontract', description: 'NDT inspection services', employee: 'Tomás Ferreira', costCenter: 'Projects', amount: 6200, status: 'Pending Approval' },
{ id: 'EXP-7704', date: '2026-08-30', category: 'Utilities', description: 'Plant electricity — August', employee: 'Sophie Laurent', costCenter: 'Plant — Vlaardingen', amount: 18400, status: 'Pending Approval' },
{ id: 'EXP-7705', date: '2026-09-01', category: 'Consumables', description: 'Workshop consumables restock', employee: 'Samuel Adeyemi', costCenter: 'Workshop — Antwerp', amount: 2140, status: 'Draft' },
{ id: 'EXP-7706', date: '2026-09-02', category: 'Training', description: 'Welding certification renewal', employee: 'Marek Kowalski', costCenter: 'Production', amount: 3600, status: 'Rejected' }];


export const BANK_ACCOUNTS = [
{ id: 'BNK-01', name: 'ING Operating Account', currency: 'EUR', iban: 'NL91 INGB 0417 2201 88', balance: 1284900, lastRecon: '2026-08-31', status: 'Active' },
{ id: 'BNK-02', name: 'HSBC USD Account', currency: 'USD', iban: 'GB29 HBUK 4004 1122 3344', balance: 452800, lastRecon: '2026-08-31', status: 'Active' },
{ id: 'BNK-03', name: 'Emirates NBD AED', currency: 'AED', iban: 'AE07 0331 2345 6789 0123', balance: 318400, lastRecon: '2026-08-29', status: 'Active' },
{ id: 'BNK-04', name: 'Petty Cash — Antwerp', currency: 'EUR', iban: '—', balance: 4200, lastRecon: '2026-08-28', status: 'Active' }];


export const TAX_LINES = [
{ id: 'TAX-01', name: 'VAT Standard (NL)', rate: 21, type: 'Output', period: 'Aug 2026', taxable: 1842000, tax: 386820, status: 'Pending' },
{ id: 'TAX-02', name: 'VAT Standard (DE)', rate: 19, type: 'Output', period: 'Aug 2026', taxable: 612000, tax: 116280, status: 'Pending' },
{ id: 'TAX-03', name: 'VAT Input (NL)', rate: 21, type: 'Input', period: 'Aug 2026', taxable: 1184000, tax: 248640, status: 'Pending' },
{ id: 'TAX-04', name: 'UAE VAT', rate: 5, type: 'Output', period: 'Aug 2026', taxable: 428000, tax: 21400, status: 'Filed' },
{ id: 'TAX-05', name: 'Singapore GST', rate: 9, type: 'Output', period: 'Aug 2026', taxable: 214000, tax: 19260, status: 'Filed' }];


export const PNL_ROWS = [
{ label: 'Revenue — Product Sales', current: 12480600, prior: 11284000, group: 'Revenue' },
{ label: 'Revenue — Service & Workshop', current: 3184200, prior: 2864100, group: 'Revenue' },
{ label: 'Revenue — Projects', current: 6842000, prior: 6120400, group: 'Revenue' },
{ label: 'Cost of Goods Sold', current: -13284100, prior: -12184600, group: 'Direct Costs' },
{ label: 'Direct Labour', current: -2984600, prior: -2712400, group: 'Direct Costs' },
{ label: 'Salaries & Wages', current: -3126800, prior: -2984100, group: 'Operating Expenses' },
{ label: 'Rent & Utilities', current: -486200, prior: -462800, group: 'Operating Expenses' },
{ label: 'Freight & Logistics', current: -612400, prior: -584200, group: 'Operating Expenses' },
{ label: 'Repairs & Maintenance', current: -284900, prior: -312600, group: 'Operating Expenses' },
{ label: 'Depreciation', current: -742000, prior: -718400, group: 'Operating Expenses' }];


export const BALANCE_SHEET = {
  assets: [
  { label: 'Cash and Cash Equivalents', value: 1842300 },
  { label: 'Accounts Receivable', value: 1279520 },
  { label: 'Inventory', value: 7528000 },
  { label: 'Work in Progress', value: 986400 },
  { label: 'Plant, Property & Equipment (net)', value: 8940000 }],

  liabilities: [
  { label: 'Accounts Payable', value: 788680 },
  { label: 'VAT / Tax Payable', value: 214600 },
  { label: 'Payroll Liabilities', value: 168400 },
  { label: 'Long Term Loans', value: 3200000 }],

  equity: [
  { label: 'Share Capital', value: 5000000 },
  { label: 'Retained Earnings', value: 6218940 },
  { label: 'Current Period Result', value: 4985600 }]

};

export const CASH_FLOW = [
{ label: 'Net profit for period', value: 4985600, group: 'Operating' },
{ label: 'Depreciation & amortisation', value: 742000, group: 'Operating' },
{ label: 'Movement in receivables', value: -284100, group: 'Operating' },
{ label: 'Movement in inventory', value: -618400, group: 'Operating' },
{ label: 'Movement in payables', value: 194200, group: 'Operating' },
{ label: 'Purchase of plant & equipment', value: -1240000, group: 'Investing' },
{ label: 'Disposal of assets', value: 86000, group: 'Investing' },
{ label: 'Loan repayments', value: -420000, group: 'Financing' },
{ label: 'Dividends paid', value: -600000, group: 'Financing' }];


export const AGING_BUCKETS = [
{ bucket: 'Current', receivable: 428400, payable: 312800 },
{ bucket: '1–30 days', receivable: 312900, payable: 218400 },
{ bucket: '31–60 days', receivable: 268740, payable: 144600 },
{ bucket: '61–90 days', receivable: 194130, payable: 88480 },
{ bucket: '90+ days', receivable: 75350, payable: 24400 }];