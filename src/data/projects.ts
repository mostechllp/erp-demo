import type { Job, Project } from '../types/erp';

export const PROJECTS: Project[] = [
{ id: 'PRJ-9001', name: 'Ruwais Pump Station Upgrade', client: 'Al Ruwais Petrochem', manager: 'Tomás Ferreira', start: '2026-03-02', end: '2026-11-30', budget: 2450000, actual: 1684200, committed: 312000, revenue: 2980000, progress: 68, status: 'In Progress', hours: 9840 },
{ id: 'PRJ-9002', name: 'Hansa Terminal Crane Retrofit', client: 'Hansa Terminals GmbH', manager: 'Claire Dubois', start: '2026-05-11', end: '2026-12-18', budget: 1180000, actual: 942400, committed: 168000, revenue: 1320000, progress: 74, status: 'In Progress', hours: 5120 },
{ id: 'PRJ-9003', name: 'Baltic Rail Depot Fit-out', client: 'Baltic Rail Works', manager: 'Tomás Ferreira', start: '2026-06-01', end: '2026-10-15', budget: 640000, actual: 688300, committed: 42000, revenue: 705000, progress: 82, status: 'Over Budget', hours: 3410 },
{ id: 'PRJ-9004', name: 'Vantage Cold Store Phase 2', client: 'Vantage Cold Chain', manager: 'Wei Lin Tan', start: '2026-07-14', end: '2027-02-28', budget: 1960000, actual: 412800, committed: 640000, revenue: 2310000, progress: 24, status: 'In Progress', hours: 1780 },
{ id: 'PRJ-9005', name: 'Nordwind Fleet Overhaul Programme', client: 'Nordwind Marine BV', manager: 'Claire Dubois', start: '2026-01-08', end: '2026-09-30', budget: 880000, actual: 812600, committed: 18000, revenue: 1045000, progress: 93, status: 'In Progress', hours: 4620 },
{ id: 'PRJ-9006', name: 'Cape Fabrication Line Automation', client: 'Cape Fabrication', manager: 'Wei Lin Tan', start: '2026-08-18', end: '2027-01-22', budget: 520000, actual: 26400, committed: 88000, revenue: 615000, progress: 6, status: 'Planned', hours: 180 },
{ id: 'PRJ-9007', name: 'Delta Water Intake Refurbishment', client: 'Delta Water Utilities', manager: 'Tomás Ferreira', start: '2025-11-03', end: '2026-06-30', budget: 410000, actual: 388900, committed: 0, revenue: 462000, progress: 100, status: 'Completed', hours: 2240 },
{ id: 'PRJ-9008', name: 'Atlas Mining Slurry Line', client: 'Atlas Mining Services', manager: 'Claire Dubois', start: '2026-04-20', end: '2026-12-05', budget: 760000, actual: 298400, committed: 24000, revenue: 812000, progress: 38, status: 'On Hold', hours: 1420 }];


export const JOBS: Job[] = [
{ id: 'JB-7101', projectId: 'PRJ-9001', project: 'Ruwais Pump Station Upgrade', customer: 'Al Ruwais Petrochem', type: 'Installation', team: 'Field Team Alpha', start: '2026-06-01', due: '2026-09-20', estimate: 486000, actual: 421300, revenue: 585000, status: 'In Progress', costs: { material: 218400, labour: 142900, equipment: 38200, travel: 12600, other: 9200 } },
{ id: 'JB-7102', projectId: 'PRJ-9001', project: 'Ruwais Pump Station Upgrade', customer: 'Al Ruwais Petrochem', type: 'Commissioning', team: 'Commissioning Crew', start: '2026-09-22', due: '2026-11-15', estimate: 194000, actual: 0, revenue: 246000, status: 'Assigned', costs: { material: 0, labour: 0, equipment: 0, travel: 0, other: 0 } },
{ id: 'JB-7103', projectId: 'PRJ-9002', project: 'Hansa Terminal Crane Retrofit', customer: 'Hansa Terminals GmbH', type: 'Mechanical Retrofit', team: 'Field Team Bravo', start: '2026-05-18', due: '2026-09-30', estimate: 612000, actual: 648900, revenue: 690000, status: 'In Progress', costs: { material: 341200, labour: 224800, equipment: 54200, travel: 18400, other: 10300 } },
{ id: 'JB-7104', projectId: 'PRJ-9003', project: 'Baltic Rail Depot Fit-out', customer: 'Baltic Rail Works', type: 'Fabrication', team: 'Workshop Cell 2', start: '2026-06-08', due: '2026-09-12', estimate: 288000, actual: 331400, revenue: 342000, status: 'On Hold', costs: { material: 186200, labour: 108400, equipment: 22600, travel: 6400, other: 7800 } },
{ id: 'JB-7105', projectId: 'PRJ-9005', project: 'Nordwind Fleet Overhaul Programme', customer: 'Nordwind Marine BV', type: 'Overhaul', team: 'Field Team Alpha', start: '2026-02-10', due: '2026-08-28', estimate: 402000, actual: 396800, revenue: 498000, status: 'Completed', costs: { material: 201400, labour: 148200, equipment: 31600, travel: 10200, other: 5400 } },
{ id: 'JB-7106', projectId: 'PRJ-9004', project: 'Vantage Cold Store Phase 2', customer: 'Vantage Cold Chain', type: 'Installation', team: 'Field Team Charlie', start: '2026-08-04', due: '2026-12-19', estimate: 728000, actual: 184600, revenue: 892000, status: 'In Progress', costs: { material: 102400, labour: 62800, equipment: 12400, travel: 4200, other: 2800 } },
{ id: 'JB-7107', projectId: 'PRJ-9007', project: 'Delta Water Intake Refurbishment', customer: 'Delta Water Utilities', type: 'Refurbishment', team: 'Workshop Cell 1', start: '2025-12-01', due: '2026-06-14', estimate: 214000, actual: 208700, revenue: 262000, status: 'Invoiced', costs: { material: 118400, labour: 71200, equipment: 12800, travel: 3800, other: 2500 } },
{ id: 'JB-7108', projectId: 'PRJ-9008', project: 'Atlas Mining Slurry Line', customer: 'Atlas Mining Services', type: 'Installation', team: 'Field Team Bravo', start: '2026-05-05', due: '2026-11-20', estimate: 486000, actual: 214800, revenue: 542000, status: 'On Hold', costs: { material: 128600, labour: 68400, equipment: 12200, travel: 3800, other: 1800 } },
{ id: 'JB-7109', projectId: 'PRJ-9006', project: 'Cape Fabrication Line Automation', customer: 'Cape Fabrication', type: 'Design & Engineering', team: 'Engineering', start: '2026-08-20', due: '2026-10-30', estimate: 96000, actual: 22400, revenue: 128000, status: 'Draft', costs: { material: 4200, labour: 16800, equipment: 800, travel: 400, other: 200 } }];


export const PROJECT_TASKS = [
{ id: 'TSK-2201', project: 'PRJ-9001', name: 'Pump skid mechanical installation', assignee: 'Jonas Vermeer', start: '2026-06-01', due: '2026-08-15', progress: 100, status: 'Completed', hours: 640 },
{ id: 'TSK-2202', project: 'PRJ-9001', name: 'Pipework tie-ins and hydro test', assignee: 'Aylin Demir', start: '2026-08-16', due: '2026-09-20', progress: 62, status: 'In Progress', hours: 410 },
{ id: 'TSK-2203', project: 'PRJ-9001', name: 'Control panel integration', assignee: 'Ivan Petrov', start: '2026-09-01', due: '2026-10-10', progress: 18, status: 'In Progress', hours: 96 },
{ id: 'TSK-2204', project: 'PRJ-9002', name: 'Hoist gearbox replacement', assignee: 'Kwame Boateng', start: '2026-05-18', due: '2026-09-01', progress: 88, status: 'In Progress', hours: 520 },
{ id: 'TSK-2205', project: 'PRJ-9003', name: 'Depot rail jig fabrication', assignee: 'Piotr Nowak', start: '2026-06-08', due: '2026-09-12', progress: 74, status: 'On Hold', hours: 380 },
{ id: 'TSK-2206', project: 'PRJ-9004', name: 'Cold store compressor foundations', assignee: 'Field Team Charlie', start: '2026-08-04', due: '2026-10-02', progress: 30, status: 'In Progress', hours: 210 },
{ id: 'TSK-2207', project: 'PRJ-9005', name: 'Vessel 3 pump overhaul', assignee: 'Samuel Adeyemi', start: '2026-07-01', due: '2026-08-28', progress: 100, status: 'Completed', hours: 300 },
{ id: 'TSK-2208', project: 'PRJ-9006', name: 'Automation concept design', assignee: 'Engineering', start: '2026-08-20', due: '2026-10-30', progress: 12, status: 'In Progress', hours: 88 }];


export const TIMESHEETS = [
{ id: 'TS-5501', employee: 'Jonas Vermeer', project: 'PRJ-9001', job: 'JB-7101', week: 'W35 · 24–30 Aug', hours: 42, billable: 40, rate: 82, status: 'Approved' },
{ id: 'TS-5502', employee: 'Aylin Demir', project: 'PRJ-9001', job: 'JB-7101', week: 'W35 · 24–30 Aug', hours: 38, billable: 38, rate: 78, status: 'Approved' },
{ id: 'TS-5503', employee: 'Kwame Boateng', project: 'PRJ-9002', job: 'JB-7103', week: 'W35 · 24–30 Aug', hours: 44, billable: 41, rate: 102, status: 'Pending Approval' },
{ id: 'TS-5504', employee: 'Piotr Nowak', project: 'PRJ-9003', job: 'JB-7104', week: 'W35 · 24–30 Aug', hours: 36, billable: 30, rate: 88, status: 'Pending Approval' },
{ id: 'TS-5505', employee: 'Samuel Adeyemi', project: 'PRJ-9005', job: 'JB-7105', week: 'W34 · 17–23 Aug', hours: 40, billable: 40, rate: 95, status: 'Approved' },
{ id: 'TS-5506', employee: 'Femke de Boer', project: 'PRJ-9004', job: 'JB-7106', week: 'W35 · 24–30 Aug', hours: 32, billable: 28, rate: 88, status: 'Draft' },
{ id: 'TS-5507', employee: 'Ivan Petrov', project: 'PRJ-9001', job: 'JB-7102', week: 'W35 · 24–30 Aug', hours: 28, billable: 26, rate: 92, status: 'Rejected' }];


export const PROJECT_EXPENSES = [
{ id: 'EXP-4401', project: 'PRJ-9001', category: 'Travel & Accommodation', description: 'Site crew mobilisation — Ruwais', date: '2026-08-12', amount: 8420, status: 'Approved', submittedBy: 'Tomás Ferreira' },
{ id: 'EXP-4402', project: 'PRJ-9002', category: 'Equipment Hire', description: '120t mobile crane — 3 days', date: '2026-08-18', amount: 14600, status: 'Approved', submittedBy: 'Claire Dubois' },
{ id: 'EXP-4403', project: 'PRJ-9003', category: 'Subcontract', description: 'Specialist NDT inspection', date: '2026-08-22', amount: 6200, status: 'Pending Approval', submittedBy: 'Tomás Ferreira' },
{ id: 'EXP-4404', project: 'PRJ-9004', category: 'Travel & Accommodation', description: 'Engineering site visit — Singapore', date: '2026-08-26', amount: 3180, status: 'Pending Approval', submittedBy: 'Wei Lin Tan' },
{ id: 'EXP-4405', project: 'PRJ-9001', category: 'Consumables', description: 'Welding consumables and gases', date: '2026-08-29', amount: 2140, status: 'Approved', submittedBy: 'Jonas Vermeer' }];