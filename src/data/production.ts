import type { Bom, WorkOrder } from '../types/erp';

export const PRODUCTION_PLANS = [
{ id: 'PP-2210', product: 'Centrifugal Pump CS-150', qty: 24, start: '2026-08-24', due: '2026-09-18', workCenter: 'WC-ASSY-1', priority: 'High', owner: 'Marek Kowalski', status: 'In Progress', source: 'SO-5041' },
{ id: 'PP-2211', product: 'Heavy Duty Gearbox HD-900', qty: 6, start: '2026-09-02', due: '2026-10-06', workCenter: 'WC-ASSY-2', priority: 'Normal', owner: 'Marek Kowalski', status: 'Planned', source: 'Forecast' },
{ id: 'PP-2212', product: 'Conveyor Drive Unit CD-40', qty: 12, start: '2026-09-08', due: '2026-10-09', workCenter: 'WC-ASSY-1', priority: 'High', owner: 'Elena Petrova', status: 'Planned', source: 'SO-5049' },
{ id: 'PP-2213', product: 'Mechanical Seal Kit 42mm', qty: 200, start: '2026-08-18', due: '2026-09-05', workCenter: 'WC-SUB-1', priority: 'Normal', owner: 'Elena Petrova', status: 'In Progress', source: 'Stock replenishment' },
{ id: 'PP-2214', product: 'Centrifugal Pump CS-220', qty: 8, start: '2026-09-14', due: '2026-10-24', workCenter: 'WC-ASSY-2', priority: 'Low', owner: 'Marek Kowalski', status: 'Draft', source: 'Forecast' }];


export const WORK_ORDERS: WorkOrder[] = [
{ id: 'WO-7702', plan: 'PP-2210', product: 'Centrifugal Pump CS-150', qty: 12, produced: 8, rejected: 1, workCenter: 'WC-ASSY-1', machine: 'ASSY-LINE-A', operator: 'Jonas Vermeer', start: '2026-08-24', end: '2026-09-10', status: 'In Progress', progress: 67, sourceOrder: 'SO-5041' },
{ id: 'WO-7703', plan: 'PP-2213', product: 'Mechanical Seal Kit 42mm', qty: 200, produced: 200, rejected: 4, workCenter: 'WC-SUB-1', machine: 'PRESS-04', operator: 'Aylin Demir', start: '2026-08-18', end: '2026-09-02', status: 'Completed', progress: 100 },
{ id: 'WO-7704', plan: 'PP-2210', product: 'Centrifugal Pump CS-150', qty: 12, produced: 0, rejected: 0, workCenter: 'WC-MACH-2', machine: 'CNC-VTL-02', operator: 'Piotr Nowak', start: '2026-09-04', end: '2026-09-18', status: 'Released', progress: 0, sourceOrder: 'SO-5041' },
{ id: 'WO-7705', plan: 'PP-2212', product: 'Rail Axle Housing RA-70', qty: 20, produced: 6, rejected: 0, workCenter: 'WC-MACH-1', machine: 'CNC-HMC-01', operator: 'Piotr Nowak', start: '2026-08-26', end: '2026-09-22', status: 'In Progress', progress: 30, sourceOrder: 'SO-5044' },
{ id: 'WO-7706', plan: 'PP-2211', product: 'Heavy Duty Gearbox HD-900', qty: 6, produced: 0, rejected: 0, workCenter: 'WC-ASSY-2', machine: 'ASSY-LINE-B', operator: 'Unassigned', start: '2026-09-02', end: '2026-10-06', status: 'Planned', progress: 0 },
{ id: 'WO-7707', plan: 'PP-2213', product: 'Seal Housing Machining', qty: 200, produced: 120, rejected: 2, workCenter: 'WC-MACH-2', machine: 'CNC-VTL-01', operator: 'Aylin Demir', start: '2026-08-20', end: '2026-09-04', status: 'Paused', progress: 60 },
{ id: 'WO-7708', plan: 'PP-2212', product: 'Conveyor Drive Unit CD-40', qty: 12, produced: 0, rejected: 0, workCenter: 'WC-ASSY-1', machine: 'ASSY-LINE-A', operator: 'Jonas Vermeer', start: '2026-09-08', end: '2026-10-09', status: 'Planned', progress: 0, sourceOrder: 'SO-5049' },
{ id: 'WO-7709', plan: 'PP-2214', product: 'Centrifugal Pump CS-220', qty: 8, produced: 0, rejected: 0, workCenter: 'WC-ASSY-2', machine: 'ASSY-LINE-B', operator: 'Unassigned', start: '2026-09-14', end: '2026-10-24', status: 'Cancelled', progress: 0 }];


export const BOMS: Bom[] = [
{
  id: 'BOM-4401',
  product: 'Centrifugal Pump CS-150',
  version: 'v3.2',
  status: 'Active',
  outputQty: 1,
  unit: 'EA',
  cost: 11840,
  lines: [
  { sku: 'CST-HSG-150', name: 'Pump Housing Casting 150', qty: 1, unit: 'EA', cost: 3120, kind: 'Raw Material' },
  {
    sku: 'SUB-ROT-150',
    name: 'Rotor Assembly (sub-assembly)',
    qty: 1,
    unit: 'EA',
    cost: 5290,
    kind: 'Component',
    children: [
    { sku: 'CST-IMP-150', name: 'Cast Impeller Blank 150', qty: 1, unit: 'EA', cost: 2450, kind: 'Raw Material' },
    { sku: 'STL-BAR-4140', name: 'Alloy Steel Bar 4140 Ø80 (shaft)', qty: 1.2, unit: 'M', cost: 103, kind: 'Raw Material' },
    { sku: 'BRG-SPH-6320', name: 'Spherical Roller Bearing 6320', qty: 2, unit: 'EA', cost: 824, kind: 'Component' },
    { sku: 'BRG-TAP-32218', name: 'Tapered Bearing 32218', qty: 2, unit: 'EA', cost: 536, kind: 'Component' }]

  },
  { sku: 'SEA-MEC-42', name: 'Mechanical Seal Kit 42mm', qty: 1, unit: 'EA', cost: 1280, kind: 'Component' },
  { sku: 'MTR-IE3-45', name: 'IE3 Electric Motor 45kW', qty: 0.25, unit: 'EA', cost: 1045, kind: 'Component' },
  { sku: 'CON-OIL-ISO68', name: 'Hydraulic Oil ISO VG68', qty: 0.1, unit: 'DRUM', cost: 41, kind: 'Raw Material' }]

},
{ id: 'BOM-4402', product: 'Heavy Duty Gearbox HD-900', version: 'v2.0', status: 'Active', outputQty: 1, unit: 'EA', cost: 38400, lines: [] },
{ id: 'BOM-4403', product: 'Mechanical Seal Kit 42mm', version: 'v1.4', status: 'Active', outputQty: 1, unit: 'EA', cost: 1280, lines: [] },
{ id: 'BOM-4404', product: 'Conveyor Drive Unit CD-40', version: 'v1.0', status: 'Draft', outputQty: 1, unit: 'EA', cost: 6180, lines: [] },
{ id: 'BOM-4405', product: 'Centrifugal Pump CS-150', version: 'v3.1', status: 'Inactive', outputQty: 1, unit: 'EA', cost: 11420, lines: [] }];


export const WORK_CENTERS = [
{ id: 'WC-ASSY-1', name: 'Assembly Line A', plant: 'Vlaardingen Plant', capacityHrs: 320, loadHrs: 289, utilisation: 90, operators: 6, status: 'Active' },
{ id: 'WC-ASSY-2', name: 'Assembly Line B', plant: 'Vlaardingen Plant', capacityHrs: 320, loadHrs: 176, utilisation: 55, operators: 4, status: 'Active' },
{ id: 'WC-MACH-1', name: 'CNC Machining Cell 1', plant: 'Vlaardingen Plant', capacityHrs: 400, loadHrs: 372, utilisation: 93, operators: 5, status: 'Active' },
{ id: 'WC-MACH-2', name: 'CNC Machining Cell 2', plant: 'Vlaardingen Plant', capacityHrs: 400, loadHrs: 214, utilisation: 54, operators: 5, status: 'Active' },
{ id: 'WC-SUB-1', name: 'Sub-assembly & Kitting', plant: 'Vlaardingen Plant', capacityHrs: 240, loadHrs: 168, utilisation: 70, operators: 3, status: 'Active' },
{ id: 'WC-PAINT', name: 'Paint & Coating Booth', plant: 'Vlaardingen Plant', capacityHrs: 160, loadHrs: 48, utilisation: 30, operators: 2, status: 'Maintenance' }];


export const MACHINES = [
{ id: 'CNC-HMC-01', name: 'Horizontal Machining Centre', workCenter: 'WC-MACH-1', hours: 18420, utilisation: 93, lastService: '2026-07-14', nextService: '2026-10-14', status: 'Active' },
{ id: 'CNC-VTL-01', name: 'Vertical Turret Lathe 01', workCenter: 'WC-MACH-2', hours: 22110, utilisation: 61, lastService: '2026-06-02', nextService: '2026-09-02', status: 'Active' },
{ id: 'CNC-VTL-02', name: 'Vertical Turret Lathe 02', workCenter: 'WC-MACH-2', hours: 9840, utilisation: 47, lastService: '2026-08-11', nextService: '2026-11-11', status: 'Active' },
{ id: 'PRESS-04', name: 'Hydraulic Press 250T', workCenter: 'WC-SUB-1', hours: 14260, utilisation: 70, lastService: '2026-05-20', nextService: '2026-09-05', status: 'Active' },
{ id: 'ASSY-LINE-A', name: 'Assembly Line A Rig', workCenter: 'WC-ASSY-1', hours: 26400, utilisation: 90, lastService: '2026-08-01', nextService: '2026-11-01', status: 'Active' },
{ id: 'PAINT-B1', name: 'Coating Booth B1', workCenter: 'WC-PAINT', hours: 7320, utilisation: 30, lastService: '2026-08-29', nextService: '2026-09-06', status: 'Maintenance' }];


export const MATERIAL_CONSUMPTION = [
{ wo: 'WO-7702', sku: 'CST-HSG-150', material: 'Pump Housing Casting 150', required: 12, issued: 12, consumed: 8, remaining: 4, unit: 'EA', cost: 24960 },
{ wo: 'WO-7702', sku: 'CST-IMP-150', material: 'Cast Impeller Blank 150', required: 12, issued: 10, consumed: 8, remaining: 2, unit: 'EA', cost: 19600 },
{ wo: 'WO-7702', sku: 'BRG-SPH-6320', material: 'Spherical Roller Bearing 6320', required: 24, issued: 0, consumed: 0, remaining: 24, unit: 'EA', cost: 0 },
{ wo: 'WO-7703', sku: 'SEA-RNG-42', material: 'Seal Ring Stock 42mm', required: 200, issued: 200, consumed: 200, remaining: 0, unit: 'EA', cost: 96000 },
{ wo: 'WO-7705', sku: 'STL-BAR-4140', material: 'Alloy Steel Bar 4140 Ø80', required: 180, issued: 120, consumed: 96, remaining: 24, unit: 'M', cost: 8256 },
{ wo: 'WO-7707', sku: 'CST-HSG-150', material: 'Seal Housing Blank', required: 200, issued: 140, consumed: 120, remaining: 20, unit: 'EA', cost: 15600 }];


export const PRODUCTION_OUTPUT = [
{ wo: 'WO-7702', product: 'Centrifugal Pump CS-150', planned: 12, produced: 9, rejected: 1, accepted: 8, completion: 67, shift: 'Shift A', date: '2026-08-31' },
{ wo: 'WO-7703', product: 'Mechanical Seal Kit 42mm', planned: 200, produced: 204, rejected: 4, accepted: 200, completion: 100, shift: 'Shift B', date: '2026-09-02' },
{ wo: 'WO-7705', product: 'Rail Axle Housing RA-70', planned: 20, produced: 6, rejected: 0, accepted: 6, completion: 30, shift: 'Shift A', date: '2026-09-01' },
{ wo: 'WO-7707', product: 'Seal Housing Machining', planned: 200, produced: 122, rejected: 2, accepted: 120, completion: 60, shift: 'Shift C', date: '2026-08-30' }];


export const QUALITY_INSPECTIONS = [
{ id: 'QC-5510', wo: 'WO-7702', product: 'Centrifugal Pump CS-150', batch: 'B-2608-A', inspected: 9, accepted: 8, rejected: 1, defect: 'Impeller runout out of tolerance', inspector: 'Elena Petrova', status: 'Rejected', date: '2026-08-31' },
{ id: 'QC-5511', wo: 'WO-7703', product: 'Mechanical Seal Kit 42mm', batch: 'B-2508-C', inspected: 204, accepted: 200, rejected: 4, defect: 'Elastomer flash', inspector: 'Elena Petrova', status: 'Passed', date: '2026-09-02' },
{ id: 'QC-5512', wo: 'WO-7705', product: 'Rail Axle Housing RA-70', batch: 'B-2708-A', inspected: 6, accepted: 6, rejected: 0, defect: '—', inspector: 'Hugo Martens', status: 'Passed', date: '2026-09-01' },
{ id: 'QC-5513', wo: 'WO-7707', product: 'Seal Housing Machining', batch: 'B-2408-B', inspected: 122, accepted: 120, rejected: 2, defect: 'Bore surface finish', inspector: 'Hugo Martens', status: 'In Progress', date: '2026-08-30' },
{ id: 'QC-5514', wo: 'GRN-2210', product: 'Cast Impeller Blank 150', batch: 'IN-2608', inspected: 16, accepted: 15, rejected: 1, defect: 'Casting porosity (NCR-118)', inspector: 'Elena Petrova', status: 'Rejected', date: '2026-08-26' }];