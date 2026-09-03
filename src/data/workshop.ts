import type { JobCard } from '../types/erp';

export const JOB_CARDS: JobCard[] = [
{ id: 'JOB-8810', customer: 'Nordwind Marine BV', asset: 'Ballast Pump BP-4 (S/N 55-8821)', problem: 'Excessive vibration and seal leakage at 1450 rpm', technician: 'Samuel Adeyemi', priority: 'High', start: '2026-08-19', due: '2026-09-05', status: 'In Progress', parts: 6420, labour: 4200, revenue: 16800 },
{ id: 'JOB-8811', customer: 'Hansa Terminals GmbH', asset: 'Crane Gearbox HD-900 (S/N 22-1104)', problem: 'Oil contamination, bearing noise on hoist drive', technician: 'Kwame Boateng', priority: 'Urgent', start: '2026-08-22', due: '2026-09-03', status: 'Waiting for Parts', parts: 18900, labour: 6800, revenue: 42500 },
{ id: 'JOB-8812', customer: 'Baltic Rail Works', asset: 'Axle Press AP-120', problem: 'Hydraulic pressure loss during press cycle', technician: 'Samuel Adeyemi', priority: 'High', start: '2026-08-25', due: '2026-09-08', status: 'Inspection', parts: 2140, labour: 1600, revenue: 9400 },
{ id: 'JOB-8813', customer: 'Delta Water Utilities', asset: 'Intake Pump IP-2', problem: 'Annual overhaul and impeller replacement', technician: 'Femke de Boer', priority: 'Normal', start: '2026-08-11', due: '2026-08-29', status: 'Ready', parts: 4750, labour: 3100, revenue: 12600 },
{ id: 'JOB-8814', customer: 'Cape Fabrication', asset: 'Welding Positioner WP-5', problem: 'Rotary drive slipping under load', technician: 'Kwame Boateng', priority: 'Normal', start: '2026-08-27', due: '2026-09-12', status: 'Received', parts: 0, labour: 0, revenue: 5200 },
{ id: 'JOB-8815', customer: 'Vantage Cold Chain', asset: 'Compressor CP-88', problem: 'Low suction pressure, suspected valve plate wear', technician: 'Femke de Boer', priority: 'High', start: '2026-08-14', due: '2026-08-30', status: 'Quality Check', parts: 8940, labour: 5400, revenue: 21800 },
{ id: 'JOB-8816', customer: 'Sunda Agro Mills', asset: 'Conveyor Drive CD-40', problem: 'Gear reducer overheating', technician: 'Samuel Adeyemi', priority: 'Low', start: '2026-07-28', due: '2026-08-18', status: 'Delivered', parts: 3210, labour: 2400, revenue: 8900 },
{ id: 'JOB-8817', customer: 'Atlas Mining Services', asset: 'Slurry Pump SP-14', problem: 'Casing wear beyond limits', technician: 'Kwame Boateng', priority: 'Normal', start: '2026-07-12', due: '2026-08-02', status: 'Closed', parts: 11400, labour: 7200, revenue: 27500 }];


export const JOB_PARTS = [
{ job: 'JOB-8810', sku: 'SPR-KIT-CS150', part: 'CS-150 Overhaul Spare Kit', required: 1, available: 6, used: 1, cost: 2940 },
{ job: 'JOB-8810', sku: 'SEA-MEC-42', part: 'Mechanical Seal Kit 42mm', required: 2, available: 148, used: 2, cost: 2560 },
{ job: 'JOB-8810', sku: 'BRG-TAP-32218', part: 'Tapered Bearing 32218', required: 4, available: 34, used: 4, cost: 1072 },
{ job: 'JOB-8811', sku: 'BRG-SPH-6320', part: 'Spherical Roller Bearing 6320', required: 4, available: 0, used: 0, cost: 0 },
{ job: 'JOB-8811', sku: 'CON-OIL-ISO68', part: 'Hydraulic Oil ISO VG68 208L', required: 2, available: 14, used: 2, cost: 824 }];


export const JOB_LABOUR = [
{ job: 'JOB-8810', technician: 'Samuel Adeyemi', date: '2026-08-19', hours: 12, rate: 95, cost: 1140, activity: 'Strip-down and inspection' },
{ job: 'JOB-8810', technician: 'Femke de Boer', date: '2026-08-22', hours: 16, rate: 88, cost: 1408, activity: 'Shaft alignment and seal fitting' },
{ job: 'JOB-8810', technician: 'Samuel Adeyemi', date: '2026-08-27', hours: 18, rate: 95, cost: 1710, activity: 'Reassembly and test run' },
{ job: 'JOB-8811', technician: 'Kwame Boateng', date: '2026-08-22', hours: 20, rate: 102, cost: 2040, activity: 'Gearbox teardown' },
{ job: 'JOB-8811', technician: 'Kwame Boateng', date: '2026-08-28', hours: 14, rate: 102, cost: 1428, activity: 'Housing inspection and measurement' }];


export const TECHNICIANS = [
{ id: 'TEC-01', name: 'Samuel Adeyemi', skill: 'Rotating equipment', openJobs: 3, hoursWeek: 38, utilisation: 95, rating: 4.7, branch: 'Antwerp Service Workshop' },
{ id: 'TEC-02', name: 'Kwame Boateng', skill: 'Gearboxes & drives', openJobs: 3, hoursWeek: 34, utilisation: 85, rating: 4.5, branch: 'Antwerp Service Workshop' },
{ id: 'TEC-03', name: 'Femke de Boer', skill: 'Hydraulics & refrigeration', openJobs: 2, hoursWeek: 30, utilisation: 75, rating: 4.8, branch: 'Antwerp Service Workshop' },
{ id: 'TEC-04', name: 'Ivan Petrov', skill: 'Electrical & controls', openJobs: 1, hoursWeek: 22, utilisation: 55, rating: 4.2, branch: 'Vlaardingen Plant' }];


export const MAINTENANCE = [
{ id: 'MNT-3301', equipment: 'CNC-VTL-01 Vertical Turret Lathe', type: 'Preventive', scheduled: '2026-09-02', technician: 'Ivan Petrov', cost: 1850, status: 'Scheduled', next: '2026-12-02' },
{ id: 'MNT-3302', equipment: 'PAINT-B1 Coating Booth', type: 'Corrective', scheduled: '2026-08-29', technician: 'Ivan Petrov', cost: 6400, status: 'In Progress', next: '2026-11-29' },
{ id: 'MNT-3303', equipment: 'PRESS-04 Hydraulic Press 250T', type: 'Preventive', scheduled: '2026-09-05', technician: 'Femke de Boer', cost: 1200, status: 'Scheduled', next: '2026-12-05' },
{ id: 'MNT-3304', equipment: 'ASSY-LINE-A Assembly Rig', type: 'Predictive', scheduled: '2026-09-11', technician: 'Samuel Adeyemi', cost: 3400, status: 'Scheduled', next: '2026-12-11' },
{ id: 'MNT-3305', equipment: 'CNC-HMC-01 Machining Centre', type: 'Preventive', scheduled: '2026-07-14', technician: 'Ivan Petrov', cost: 2100, status: 'Completed', next: '2026-10-14' }];