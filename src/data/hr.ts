import type { Employee } from '../types/erp';

export const EMPLOYEES: Employee[] = [
{ id: 'EMP-1001', name: 'Claire Dubois', department: 'Projects', designation: 'Head of Projects', branch: 'Head Office — Rotterdam', joined: '2016-03-14', email: 'claire.dubois@meridian-ig.com', phone: '+31 6 2288 4410', status: 'Active', salary: 9800, manager: 'Board' },
{ id: 'EMP-1002', name: 'Amara Osei', department: 'Executive', designation: 'Chief Operating Officer', branch: 'Head Office — Rotterdam', joined: '2015-01-06', email: 'amara.osei@meridian-ig.com', phone: '+31 6 1188 2201', status: 'Active', salary: 14200, manager: 'Board' },
{ id: 'EMP-1003', name: 'Marek Kowalski', department: 'Production', designation: 'Production Manager', branch: 'Vlaardingen Plant', joined: '2017-08-21', email: 'marek.kowalski@meridian-ig.com', phone: '+31 6 3344 1120', status: 'Active', salary: 7600, manager: 'Amara Osei' },
{ id: 'EMP-1004', name: 'Sophie Laurent', department: 'Finance', designation: 'Financial Controller', branch: 'Head Office — Rotterdam', joined: '2018-05-02', email: 'sophie.laurent@meridian-ig.com', phone: '+31 6 4455 8890', status: 'Active', salary: 8400, manager: 'Amara Osei' },
{ id: 'EMP-1005', name: 'Samuel Adeyemi', department: 'Workshop', designation: 'Senior Technician', branch: 'Antwerp Service Workshop', joined: '2019-02-18', email: 'samuel.adeyemi@meridian-ig.com', phone: '+32 47 221 3390', status: 'Active', salary: 4900, manager: 'Dieter Ruhl' },
{ id: 'EMP-1006', name: 'Wei Lin Tan', department: 'Sales', designation: 'Regional Sales Manager', branch: 'Singapore Distribution', joined: '2020-06-29', email: 'weilin.tan@meridian-ig.com', phone: '+65 9123 4488', status: 'Active', salary: 6800, manager: 'Amara Osei' },
{ id: 'EMP-1007', name: 'Nadia Rahman', department: 'Stores', designation: 'Warehouse Supervisor', branch: 'Head Office — Rotterdam', joined: '2021-04-12', email: 'nadia.rahman@meridian-ig.com', phone: '+31 6 5566 7712', status: 'Active', salary: 4200, manager: 'Marek Kowalski' },
{ id: 'EMP-1008', name: 'Dieter Ruhl', department: 'Workshop', designation: 'Workshop Manager', branch: 'Antwerp Service Workshop', joined: '2016-11-07', email: 'dieter.ruhl@meridian-ig.com', phone: '+32 47 889 1102', status: 'Active', salary: 7200, manager: 'Amara Osei' },
{ id: 'EMP-1009', name: 'Tomás Ferreira', department: 'Projects', designation: 'Project Manager', branch: 'Head Office — Rotterdam', joined: '2019-09-16', email: 'tomas.ferreira@meridian-ig.com', phone: '+31 6 7788 2233', status: 'Active', salary: 6900, manager: 'Claire Dubois' },
{ id: 'EMP-1010', name: 'Elena Petrova', department: 'Quality', designation: 'QA/QC Engineer', branch: 'Vlaardingen Plant', joined: '2022-01-24', email: 'elena.petrova@meridian-ig.com', phone: '+31 6 2211 9988', status: 'Active', salary: 5400, manager: 'Marek Kowalski' },
{ id: 'EMP-1011', name: 'Lars Jensen', department: 'Sales', designation: 'Key Account Manager', branch: 'Head Office — Rotterdam', joined: '2018-07-30', email: 'lars.jensen@meridian-ig.com', phone: '+31 6 3399 4471', status: 'Active', salary: 6200, manager: 'Amara Osei' },
{ id: 'EMP-1012', name: 'Rania Haddad', department: 'Sales', designation: 'Key Account Manager', branch: 'Dubai Trading Branch', joined: '2021-10-11', email: 'rania.haddad@meridian-ig.com', phone: '+971 50 448 2210', status: 'Active', salary: 6100, manager: 'Amara Osei' },
{ id: 'EMP-1013', name: 'Piotr Nowak', department: 'Production', designation: 'CNC Machinist', branch: 'Vlaardingen Plant', joined: '2023-02-06', email: 'piotr.nowak@meridian-ig.com', phone: '+31 6 4422 6610', status: 'Active', salary: 3900, manager: 'Marek Kowalski' },
{ id: 'EMP-1014', name: 'Femke de Boer', department: 'Workshop', designation: 'Technician', branch: 'Antwerp Service Workshop', joined: '2024-03-18', email: 'femke.deboer@meridian-ig.com', phone: '+32 47 660 2214', status: 'On Leave', salary: 3800, manager: 'Dieter Ruhl' },
{ id: 'EMP-1015', name: 'Ibrahim Kone', department: 'HR', designation: 'HR Business Partner', branch: 'Head Office — Rotterdam', joined: '2025-08-04', email: 'ibrahim.kone@meridian-ig.com', phone: '+31 6 1122 3345', status: 'Probation', salary: 4600, manager: 'Amara Osei' },
{ id: 'EMP-1016', name: 'Aylin Demir', department: 'Production', designation: 'Assembly Operator', branch: 'Vlaardingen Plant', joined: '2022-09-12', email: 'aylin.demir@meridian-ig.com', phone: '+31 6 8877 1102', status: 'Active', salary: 3600, manager: 'Marek Kowalski' }];


export const DEPARTMENTS = [
{ id: 'DEP-01', name: 'Executive', head: 'Amara Osei', headcount: 3, costCenter: 'CC-100', budget: 640000, spend: 412000 },
{ id: 'DEP-02', name: 'Sales', head: 'Amara Osei', headcount: 14, costCenter: 'CC-200', budget: 1840000, spend: 1284000 },
{ id: 'DEP-03', name: 'Procurement', head: 'Sophie Laurent', headcount: 6, costCenter: 'CC-210', budget: 620000, spend: 402000 },
{ id: 'DEP-04', name: 'Production', head: 'Marek Kowalski', headcount: 48, costCenter: 'CC-300', budget: 4120000, spend: 3084000 },
{ id: 'DEP-05', name: 'Quality', head: 'Elena Petrova', headcount: 7, costCenter: 'CC-310', budget: 480000, spend: 318000 },
{ id: 'DEP-06', name: 'Workshop', head: 'Dieter Ruhl', headcount: 22, costCenter: 'CC-400', budget: 1620000, spend: 1204000 },
{ id: 'DEP-07', name: 'Projects', head: 'Claire Dubois', headcount: 19, costCenter: 'CC-500', budget: 2240000, spend: 1684000 },
{ id: 'DEP-08', name: 'Stores', head: 'Nadia Rahman', headcount: 12, costCenter: 'CC-600', budget: 720000, spend: 512000 },
{ id: 'DEP-09', name: 'Finance', head: 'Sophie Laurent', headcount: 9, costCenter: 'CC-700', budget: 880000, spend: 604000 },
{ id: 'DEP-10', name: 'HR', head: 'Ibrahim Kone', headcount: 5, costCenter: 'CC-800', budget: 460000, spend: 288000 }];


export const DESIGNATIONS = [
{ id: 'DSG-01', title: 'Chief Operating Officer', grade: 'E1', department: 'Executive', holders: 1, bandMin: 12000, bandMax: 16000 },
{ id: 'DSG-02', title: 'Production Manager', grade: 'M2', department: 'Production', holders: 1, bandMin: 6800, bandMax: 8600 },
{ id: 'DSG-03', title: 'Project Manager', grade: 'M2', department: 'Projects', holders: 4, bandMin: 6200, bandMax: 8200 },
{ id: 'DSG-04', title: 'Senior Technician', grade: 'T3', department: 'Workshop', holders: 6, bandMin: 4200, bandMax: 5600 },
{ id: 'DSG-05', title: 'CNC Machinist', grade: 'T2', department: 'Production', holders: 11, bandMin: 3400, bandMax: 4400 },
{ id: 'DSG-06', title: 'Key Account Manager', grade: 'S3', department: 'Sales', holders: 5, bandMin: 5600, bandMax: 7000 },
{ id: 'DSG-07', title: 'QA/QC Engineer', grade: 'E3', department: 'Quality', holders: 3, bandMin: 4800, bandMax: 6200 }];


export const ATTENDANCE = [
{ id: 'ATT-01', employee: 'Marek Kowalski', department: 'Production', date: '2026-09-02', in: '07:52', out: '17:06', hours: 9.2, overtime: 1.2, status: 'Present' },
{ id: 'ATT-02', employee: 'Piotr Nowak', department: 'Production', date: '2026-09-02', in: '08:04', out: '16:58', hours: 8.9, overtime: 0.9, status: 'Present' },
{ id: 'ATT-03', employee: 'Aylin Demir', department: 'Production', date: '2026-09-02', in: '08:22', out: '17:02', hours: 8.7, overtime: 0.7, status: 'Late' },
{ id: 'ATT-04', employee: 'Samuel Adeyemi', department: 'Workshop', date: '2026-09-02', in: '07:45', out: '18:10', hours: 10.4, overtime: 2.4, status: 'Present' },
{ id: 'ATT-05', employee: 'Femke de Boer', department: 'Workshop', date: '2026-09-02', in: '—', out: '—', hours: 0, overtime: 0, status: 'On Leave' },
{ id: 'ATT-06', employee: 'Nadia Rahman', department: 'Stores', date: '2026-09-02', in: '08:00', out: '16:32', hours: 8.5, overtime: 0, status: 'Present' },
{ id: 'ATT-07', employee: 'Elena Petrova', department: 'Quality', date: '2026-09-02', in: '—', out: '—', hours: 0, overtime: 0, status: 'Absent' },
{ id: 'ATT-08', employee: 'Ivan Petrov', department: 'Workshop', date: '2026-09-02', in: '08:10', out: '17:00', hours: 8.8, overtime: 0.8, status: 'Present' }];


export const LEAVE_REQUESTS = [
{ id: 'LV-2201', employee: 'Femke de Boer', department: 'Workshop', type: 'Annual Leave', from: '2026-08-31', to: '2026-09-11', days: 10, status: 'Approved', stage: 'HR Approved', approver: 'Ibrahim Kone' },
{ id: 'LV-2202', employee: 'Piotr Nowak', department: 'Production', type: 'Annual Leave', from: '2026-09-21', to: '2026-09-25', days: 5, status: 'Pending Approval', stage: 'Manager Review', approver: 'Marek Kowalski' },
{ id: 'LV-2203', employee: 'Lars Jensen', department: 'Sales', type: 'Business Travel Leave', from: '2026-09-08', to: '2026-09-09', days: 2, status: 'Approved', stage: 'HR Approved', approver: 'Ibrahim Kone' },
{ id: 'LV-2204', employee: 'Elena Petrova', department: 'Quality', type: 'Sick Leave', from: '2026-09-02', to: '2026-09-03', days: 2, status: 'Pending Approval', stage: 'HR Review', approver: 'Ibrahim Kone' },
{ id: 'LV-2205', employee: 'Aylin Demir', department: 'Production', type: 'Unpaid Leave', from: '2026-10-05', to: '2026-10-16', days: 10, status: 'Rejected', stage: 'Manager Review', approver: 'Marek Kowalski' },
{ id: 'LV-2206', employee: 'Rania Haddad', department: 'Sales', type: 'Annual Leave', from: '2026-09-28', to: '2026-10-09', days: 10, status: 'Draft', stage: 'Not submitted', approver: '—' }];


export const PAYROLL_RUNS = [
{ id: 'PAY-2608', period: 'August 2026', employees: 145, gross: 986400, deductions: 218900, tax: 164200, net: 767500, status: 'Processed', paidOn: '2026-08-28' },
{ id: 'PAY-2609', period: 'September 2026', employees: 146, gross: 992800, deductions: 221400, tax: 166100, net: 771400, status: 'Pending Approval', paidOn: '—' },
{ id: 'PAY-2607', period: 'July 2026', employees: 144, gross: 978200, deductions: 216400, tax: 162800, net: 761800, status: 'Processed', paidOn: '2026-07-28' },
{ id: 'PAY-2606', period: 'June 2026', employees: 142, gross: 964100, deductions: 213200, tax: 160400, net: 750900, status: 'Processed', paidOn: '2026-06-28' }];


export const RECRUITMENT = [
{ id: 'REQ-4401', role: 'CNC Machinist', department: 'Production', location: 'Vlaardingen Plant', applicants: 28, stage: 'Interview', opened: '2026-07-14', owner: 'Ibrahim Kone', status: 'Open' },
{ id: 'REQ-4402', role: 'Field Service Technician', department: 'Workshop', location: 'Antwerp', applicants: 14, stage: 'Screening', opened: '2026-08-04', owner: 'Ibrahim Kone', status: 'Open' },
{ id: 'REQ-4403', role: 'Cost Accountant', department: 'Finance', location: 'Rotterdam', applicants: 41, stage: 'Offer', opened: '2026-06-22', owner: 'Sophie Laurent', status: 'Open' },
{ id: 'REQ-4404', role: 'Project Engineer', department: 'Projects', location: 'Dubai', applicants: 19, stage: 'Interview', opened: '2026-08-18', owner: 'Claire Dubois', status: 'Open' },
{ id: 'REQ-4405', role: 'Procurement Officer', department: 'Procurement', location: 'Rotterdam', applicants: 33, stage: 'Closed', opened: '2026-05-06', owner: 'Sophie Laurent', status: 'Closed' }];


export const PERFORMANCE = [
{ id: 'PRF-01', employee: 'Samuel Adeyemi', cycle: 'H1 2026', rating: 4.6, goalsMet: 9, goalsTotal: 10, reviewer: 'Dieter Ruhl', status: 'Completed' },
{ id: 'PRF-02', employee: 'Piotr Nowak', cycle: 'H1 2026', rating: 4.1, goalsMet: 7, goalsTotal: 9, reviewer: 'Marek Kowalski', status: 'Completed' },
{ id: 'PRF-03', employee: 'Lars Jensen', cycle: 'H1 2026', rating: 4.4, goalsMet: 8, goalsTotal: 9, reviewer: 'Amara Osei', status: 'Completed' },
{ id: 'PRF-04', employee: 'Aylin Demir', cycle: 'H1 2026', rating: 3.6, goalsMet: 6, goalsTotal: 9, reviewer: 'Marek Kowalski', status: 'In Review' },
{ id: 'PRF-05', employee: 'Ibrahim Kone', cycle: 'Probation', rating: 0, goalsMet: 2, goalsTotal: 6, reviewer: 'Amara Osei', status: 'Pending' }];