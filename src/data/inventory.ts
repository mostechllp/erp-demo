import type { Product, StockMovement, StockRow } from '../types/erp';

export const WAREHOUSES = [
{ id: 'WH-01', name: 'Rotterdam Main', type: 'Warehouse', branch: 'Head Office — Rotterdam', manager: 'Nadia Rahman', bins: 420, valuation: 4128900, utilisation: 78, status: 'Active' },
{ id: 'WH-02', name: 'Vlaardingen Plant Store', type: 'Plant Store', branch: 'Vlaardingen Plant', manager: 'Marek Kowalski', bins: 260, valuation: 2394500, utilisation: 84, status: 'Active' },
{ id: 'WH-03', name: 'Antwerp Workshop Store', type: 'Store', branch: 'Antwerp Service Workshop', manager: 'Samuel Adeyemi', bins: 110, valuation: 486300, utilisation: 61, status: 'Active' },
{ id: 'WH-04', name: 'Dubai Trading Depot', type: 'Warehouse', branch: 'Dubai Trading Branch', manager: 'Hessa Al Jabri', bins: 300, valuation: 1874200, utilisation: 52, status: 'Active' },
{ id: 'WH-05', name: 'Singapore Distribution', type: 'Warehouse', branch: 'Singapore Distribution', manager: 'Wei Lin Tan', bins: 340, valuation: 2140800, utilisation: 69, status: 'Active' },
{ id: 'WH-06', name: 'Quarantine / NCR Store', type: 'Quarantine', branch: 'Vlaardingen Plant', manager: 'Elena Petrova', bins: 40, valuation: 94100, utilisation: 22, status: 'Restricted' }];


export const CATEGORIES = [
{ id: 'CAT-01', name: 'Pumps & Hydraulics', parent: '—', products: 142, value: 2841200, margin: 31.4 },
{ id: 'CAT-02', name: 'Power Transmission', parent: '—', products: 98, value: 1984300, margin: 28.9 },
{ id: 'CAT-03', name: 'Bearings', parent: 'Power Transmission', products: 64, value: 612400, margin: 34.2 },
{ id: 'CAT-04', name: 'Seals & Gaskets', parent: 'Pumps & Hydraulics', products: 87, value: 218900, margin: 41.8 },
{ id: 'CAT-05', name: 'Raw Steel & Castings', parent: '—', products: 46, value: 1723800, margin: 12.6 },
{ id: 'CAT-06', name: 'Electrical & Drives', parent: '—', products: 73, value: 1104600, margin: 26.3 },
{ id: 'CAT-07', name: 'Workshop Consumables', parent: '—', products: 210, value: 168400, margin: 44.1 },
{ id: 'CAT-08', name: 'Service & Labour', parent: '—', products: 18, value: 0, margin: 58.0 }];


export const PRODUCTS: Product[] = [
{ id: 'PRD-101', sku: 'PMP-CS-150', name: 'Centrifugal Pump CS-150', category: 'Pumps & Hydraulics', unit: 'EA', warehouse: 'WH-01', available: 26, reserved: 12, reorderLevel: 15, avgCost: 11840, price: 18400, status: 'Active', type: 'Finished Good' },
{ id: 'PRD-102', sku: 'PMP-CS-220', name: 'Centrifugal Pump CS-220', category: 'Pumps & Hydraulics', unit: 'EA', warehouse: 'WH-01', available: 9, reserved: 4, reorderLevel: 10, avgCost: 17420, price: 26900, status: 'Active', type: 'Finished Good' },
{ id: 'PRD-118', sku: 'SEA-MEC-42', name: 'Mechanical Seal Kit 42mm', category: 'Seals & Gaskets', unit: 'EA', warehouse: 'WH-01', available: 148, reserved: 24, reorderLevel: 60, avgCost: 1280, price: 2150, status: 'Active', type: 'Component' },
{ id: 'PRD-140', sku: 'GRB-HD-900', name: 'Heavy Duty Gearbox HD-900', category: 'Power Transmission', unit: 'EA', warehouse: 'WH-01', available: 4, reserved: 4, reorderLevel: 6, avgCost: 38400, price: 52300, status: 'Active', type: 'Finished Good' },
{ id: 'PRD-155', sku: 'CPL-FLX-220', name: 'Flexible Coupling 220mm', category: 'Power Transmission', unit: 'EA', warehouse: 'WH-01', available: 62, reserved: 8, reorderLevel: 30, avgCost: 2810, price: 4380, status: 'Active', type: 'Component' },
{ id: 'PRD-201', sku: 'BRG-SPH-6320', name: 'Spherical Roller Bearing 6320', category: 'Bearings', unit: 'EA', warehouse: 'WH-02', available: 0, reserved: 0, reorderLevel: 40, avgCost: 412, price: 690, status: 'Active', type: 'Component' },
{ id: 'PRD-202', sku: 'BRG-TAP-32218', name: 'Tapered Bearing 32218', category: 'Bearings', unit: 'EA', warehouse: 'WH-02', available: 34, reserved: 12, reorderLevel: 50, avgCost: 268, price: 440, status: 'Active', type: 'Component' },
{ id: 'PRD-310', sku: 'CST-IMP-150', name: 'Cast Impeller Blank 150', category: 'Raw Steel & Castings', unit: 'EA', warehouse: 'WH-02', available: 41, reserved: 24, reorderLevel: 30, avgCost: 2450, price: 0, status: 'Active', type: 'Raw Material' },
{ id: 'PRD-311', sku: 'CST-HSG-150', name: 'Pump Housing Casting 150', category: 'Raw Steel & Castings', unit: 'EA', warehouse: 'WH-02', available: 18, reserved: 12, reorderLevel: 20, avgCost: 3120, price: 0, status: 'Active', type: 'Raw Material' },
{ id: 'PRD-320', sku: 'STL-BAR-4140', name: 'Alloy Steel Bar 4140 Ø80', category: 'Raw Steel & Castings', unit: 'M', warehouse: 'WH-02', available: 640, reserved: 180, reorderLevel: 400, avgCost: 86, price: 0, status: 'Active', type: 'Raw Material' },
{ id: 'PRD-401', sku: 'MTR-IE3-45', name: 'IE3 Electric Motor 45kW', category: 'Electrical & Drives', unit: 'EA', warehouse: 'WH-02', available: 12, reserved: 6, reorderLevel: 8, avgCost: 4180, price: 6450, status: 'Active', type: 'Component' },
{ id: 'PRD-402', sku: 'VFD-90-400', name: 'Variable Frequency Drive 90kW', category: 'Electrical & Drives', unit: 'EA', warehouse: 'WH-04', available: 7, reserved: 2, reorderLevel: 5, avgCost: 5240, price: 8120, status: 'Active', type: 'Component' },
{ id: 'PRD-501', sku: 'CON-WELD-E71', name: 'Welding Wire E71T-1 15kg', category: 'Workshop Consumables', unit: 'ROLL', warehouse: 'WH-03', available: 22, reserved: 0, reorderLevel: 40, avgCost: 78, price: 128, status: 'Active', type: 'Consumable' },
{ id: 'PRD-502', sku: 'CON-OIL-ISO68', name: 'Hydraulic Oil ISO VG68 208L', category: 'Workshop Consumables', unit: 'DRUM', warehouse: 'WH-03', available: 14, reserved: 3, reorderLevel: 10, avgCost: 412, price: 680, status: 'Active', type: 'Consumable' },
{ id: 'PRD-601', sku: 'SPR-KIT-CS150', name: 'CS-150 Overhaul Spare Kit', category: 'Pumps & Hydraulics', unit: 'KIT', warehouse: 'WH-03', available: 6, reserved: 4, reorderLevel: 12, avgCost: 2940, price: 4750, status: 'Active', type: 'Spare Part' },
{ id: 'PRD-204', sku: 'SRV-COMM-01', name: 'Commissioning Service — day rate', category: 'Service & Labour', unit: 'DAY', warehouse: '—', available: 0, reserved: 0, reorderLevel: 0, avgCost: 980, price: 2400, status: 'Active', type: 'Finished Good' },
{ id: 'PRD-205', sku: 'PMP-CS-090', name: 'Centrifugal Pump CS-090 (legacy)', category: 'Pumps & Hydraulics', unit: 'EA', warehouse: 'WH-01', available: 3, reserved: 0, reorderLevel: 0, avgCost: 7620, price: 11200, status: 'Inactive', type: 'Finished Good' }];


export const STOCK: StockRow[] = PRODUCTS.filter((p) => p.warehouse !== '—').map((p) => ({
  sku: p.sku,
  name: p.name,
  warehouse: p.warehouse,
  bin: `${p.warehouse}-${p.id.slice(-3).charCodeAt(0) % 9 + 1}${p.id.slice(-2)}`,
  onHand: p.available + p.reserved,
  reserved: p.reserved,
  available: p.available,
  incoming: p.sku === 'CST-IMP-150' ? 8 : p.sku === 'BRG-SPH-6320' ? 60 : p.sku === 'MTR-IE3-45' ? 6 : 0,
  value: (p.available + p.reserved) * p.avgCost,
  reorderLevel: p.reorderLevel
}));

export const STOCK_MOVEMENTS: StockMovement[] = [
{ id: 'MOV-90341', date: '2026-09-01 09:12', type: 'Purchase Receipt', sku: 'BRG-SPH-6320', name: 'Spherical Roller Bearing 6320', qty: 60, from: 'Sakai Bearings Co.', to: 'WH-02', reference: 'GRN-2213', user: 'Nadia Rahman' },
{ id: 'MOV-90340', date: '2026-08-31 16:48', type: 'Production Output', sku: 'PMP-CS-150', name: 'Centrifugal Pump CS-150', qty: 4, from: 'WC-ASSY-1', to: 'WH-01', reference: 'WO-7702', user: 'Marek Kowalski' },
{ id: 'MOV-90339', date: '2026-08-31 11:05', type: 'Production Consumption', sku: 'CST-IMP-150', name: 'Cast Impeller Blank 150', qty: -4, from: 'WH-02', to: 'WC-MACH-2', reference: 'WO-7702', user: 'Marek Kowalski' },
{ id: 'MOV-90338', date: '2026-08-30 14:22', type: 'Sales Issue', sku: 'GRB-HD-900', name: 'Heavy Duty Gearbox HD-900', qty: -2, from: 'WH-01', to: 'Hansa Terminals GmbH', reference: 'SO-5042', user: 'Nadia Rahman' },
{ id: 'MOV-90337', date: '2026-08-30 10:40', type: 'Transfer', sku: 'SPR-KIT-CS150', name: 'CS-150 Overhaul Spare Kit', qty: -4, from: 'WH-01', to: 'WH-03', reference: 'TRF-1140', user: 'Samuel Adeyemi' },
{ id: 'MOV-90336', date: '2026-08-29 15:31', type: 'Purchase Receipt', sku: 'MTR-IE3-45', name: 'IE3 Electric Motor 45kW', qty: 18, from: 'Volta Electricals Ltd', to: 'WH-02', reference: 'GRN-2211', user: 'Marek Kowalski' },
{ id: 'MOV-90335', date: '2026-08-28 09:02', type: 'Adjustment', sku: 'CON-WELD-E71', name: 'Welding Wire E71T-1 15kg', qty: -3, from: 'WH-03', to: 'Scrap', reference: 'ADJ-0442', user: 'Samuel Adeyemi' },
{ id: 'MOV-90334', date: '2026-08-27 13:17', type: 'Return', sku: 'CST-IMP-150', name: 'Cast Impeller Blank 150', qty: -1, from: 'WH-02', to: 'Rheinstahl Components GmbH', reference: 'PRT-880', user: 'Elena Petrova' },
{ id: 'MOV-90333', date: '2026-08-26 08:55', type: 'Purchase Receipt', sku: 'CST-IMP-150', name: 'Cast Impeller Blank 150', qty: 16, from: 'Rheinstahl Components GmbH', to: 'WH-02', reference: 'GRN-2210', user: 'Elena Petrova' },
{ id: 'MOV-90332', date: '2026-08-25 17:20', type: 'Sales Issue', sku: 'SEA-MEC-42', name: 'Mechanical Seal Kit 42mm', qty: -12, from: 'WH-01', to: 'Nordwind Marine BV', reference: 'SO-5041', user: 'Nadia Rahman' }];


export const STOCK_TRANSFERS = [
{ id: 'TRF-1140', from: 'WH-01 Rotterdam Main', to: 'WH-03 Antwerp Workshop', product: 'CS-150 Overhaul Spare Kit', qty: 4, requested: '2026-08-29', status: 'Received', approver: 'Nadia Rahman' },
{ id: 'TRF-1141', from: 'WH-02 Vlaardingen', to: 'WH-01 Rotterdam Main', product: 'IE3 Electric Motor 45kW', qty: 6, requested: '2026-08-30', status: 'In Transit', approver: 'Marek Kowalski' },
{ id: 'TRF-1142', from: 'WH-01 Rotterdam Main', to: 'WH-04 Dubai Depot', product: 'Mechanical Seal Kit 42mm', qty: 40, requested: '2026-08-31', status: 'Pending Approval', approver: 'Amara Osei' },
{ id: 'TRF-1143', from: 'WH-05 Singapore', to: 'WH-04 Dubai Depot', product: 'Variable Frequency Drive 90kW', qty: 2, requested: '2026-09-01', status: 'Draft', approver: '—' },
{ id: 'TRF-1144', from: 'WH-02 Vlaardingen', to: 'WH-06 Quarantine', product: 'Cast Impeller Blank 150', qty: 1, requested: '2026-08-26', status: 'Received', approver: 'Elena Petrova' }];


export const STOCK_ADJUSTMENTS = [
{ id: 'ADJ-0442', warehouse: 'WH-03 Antwerp Workshop', product: 'Welding Wire E71T-1 15kg', system: 25, counted: 22, variance: -3, value: -234, reason: 'Cycle count variance', date: '2026-08-28', status: 'Approved', approver: 'Dieter Ruhl' },
{ id: 'ADJ-0443', warehouse: 'WH-01 Rotterdam Main', product: 'Flexible Coupling 220mm', system: 60, counted: 62, variance: 2, value: 5620, reason: 'Found in wrong bin', date: '2026-08-30', status: 'Pending Approval', approver: 'Amara Osei' },
{ id: 'ADJ-0444', warehouse: 'WH-02 Vlaardingen', product: 'Alloy Steel Bar 4140 Ø80', system: 660, counted: 640, variance: -20, value: -1720, reason: 'Offcut scrap not booked', date: '2026-08-31', status: 'Pending Approval', approver: 'Amara Osei' },
{ id: 'ADJ-0445', warehouse: 'WH-04 Dubai Depot', product: 'Variable Frequency Drive 90kW', system: 8, counted: 7, variance: -1, value: -5240, reason: 'Damaged during handling', date: '2026-09-01', status: 'Draft', approver: '—' }];