import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { ToastProvider } from './contexts/ToastContext';
import { AppShell } from './components/layout/AppShell';

import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/auth/Login';
import { NotFound } from './pages/errors/NotFound';
import { Forbidden } from './pages/errors/Forbidden';

import { Customers } from './pages/sales/Customers';
import { CustomerDetail } from './pages/sales/CustomerDetail';
import { Leads } from './pages/sales/Leads';
import { Quotations } from './pages/sales/Quotations';
import { SalesOrders } from './pages/sales/SalesOrders';
import { SalesOrderDetail } from './pages/sales/SalesOrderDetail';
import { SalesInvoices } from './pages/sales/SalesInvoices';
import { SalesReturns } from './pages/sales/SalesReturns';
import { Receivables } from './pages/sales/Receivables';

import { Suppliers } from './pages/procurement/Suppliers';
import { PurchaseRequests } from './pages/procurement/PurchaseRequests';
import { PurchaseOrders } from './pages/procurement/PurchaseOrders';
import { PurchaseOrderDetail } from './pages/procurement/PurchaseOrderDetail';
import { GoodsReceipts } from './pages/procurement/GoodsReceipts';
import { PurchaseReturns } from './pages/procurement/PurchaseReturns';
import { SupplierInvoices } from './pages/procurement/SupplierInvoices';

import { InventoryDashboard } from './pages/inventory/InventoryDashboard';
import { Products } from './pages/inventory/Products';
import { Categories } from './pages/inventory/Categories';
import { Warehouses } from './pages/inventory/Warehouses';
import { Stock } from './pages/inventory/Stock';
import { StockTransfers } from './pages/inventory/StockTransfers';
import { StockAdjustments } from './pages/inventory/StockAdjustments';
import { StockMovements } from './pages/inventory/StockMovements';
import { Reorder } from './pages/inventory/Reorder';

import { ProductionDashboard } from './pages/production/ProductionDashboard';
import { ProductionPlanning } from './pages/production/ProductionPlanning';
import { WorkOrders } from './pages/production/WorkOrders';
import { BillOfMaterials } from './pages/production/BillOfMaterials';
import { WorkCenters } from './pages/production/WorkCenters';
import { MaterialConsumption } from './pages/production/MaterialConsumption';
import { ProductionOutput } from './pages/production/ProductionOutput';
import { QualityControl } from './pages/production/QualityControl';

import { WorkshopDashboard } from './pages/workshop/WorkshopDashboard';
import { JobCards } from './pages/workshop/JobCards';
import { JobCardDetail } from './pages/workshop/JobCardDetail';
import { Technicians } from './pages/workshop/Technicians';
import { Maintenance } from './pages/workshop/Maintenance';

import { ProjectList } from './pages/projects/ProjectList';
import { ProjectDetail } from './pages/projects/ProjectDetail';
import { JobList } from './pages/projects/JobList';
import { JobDetail } from './pages/projects/JobDetail';
import { Tasks } from './pages/projects/Tasks';
import { JobCosting } from './pages/projects/JobCosting';
import { Timesheets } from './pages/projects/Timesheets';

import { FinanceDashboard } from './pages/finance/FinanceDashboard';
import { ChartOfAccounts } from './pages/finance/ChartOfAccounts';
import { GeneralLedger } from './pages/finance/GeneralLedger';
import { JournalEntries } from './pages/finance/JournalEntries';
import { AccountsReceivable } from './pages/finance/AccountsReceivable';
import { AccountsPayable } from './pages/finance/AccountsPayable';
import { Payments } from './pages/finance/Payments';
import { Expenses } from './pages/finance/Expenses';
import { BankAndCash } from './pages/finance/BankAndCash';
import { Tax } from './pages/finance/Tax';
import { ProfitAndLoss } from './pages/finance/ProfitAndLoss';
import { BalanceSheetPage } from './pages/finance/BalanceSheetPage';
import { CashFlowPage } from './pages/finance/CashFlowPage';

import { HrDashboard } from './pages/hr/HrDashboard';
import { Employees } from './pages/hr/Employees';
import { EmployeeDetail } from './pages/hr/EmployeeDetail';
import { Departments } from './pages/hr/Departments';
import { Attendance } from './pages/hr/Attendance';
import { Leave } from './pages/hr/Leave';
import { Payroll } from './pages/hr/Payroll';
import { Recruitment } from './pages/hr/Recruitment';
import { Performance } from './pages/hr/Performance';

import { Shipments } from './pages/logistics/Shipments';
import { Dispatch } from './pages/logistics/Dispatch';

import { Reports } from './pages/Reports';
import { ApprovalCenter } from './pages/approvals/ApprovalCenter';
import { ApprovalDetail } from './pages/approvals/ApprovalDetail';
import { NotificationCenter } from './pages/NotificationCenter';
import { MasterData } from './pages/MasterData';
import { Users } from './pages/admin/Users';
import { RolesPermissions } from './pages/admin/RolesPermissions';
import { Workflows } from './pages/admin/Workflows';
import { Branches } from './pages/admin/Branches';
import { AuditLogs } from './pages/admin/AuditLogs';
import { Settings } from './pages/Settings';

export function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<AppShell />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />

              <Route path="sales/customers" element={<Customers />} />
              <Route path="sales/customers/:id" element={<CustomerDetail />} />
              <Route path="sales/leads" element={<Leads />} />
              <Route path="sales/quotations" element={<Quotations />} />
              <Route path="sales/orders" element={<SalesOrders />} />
              <Route path="sales/orders/:id" element={<SalesOrderDetail />} />
              <Route path="sales/invoices" element={<SalesInvoices />} />
              <Route path="sales/returns" element={<SalesReturns />} />
              <Route path="sales/receivables" element={<Receivables />} />

              <Route path="procurement/suppliers" element={<Suppliers />} />
              <Route path="procurement/requests" element={<PurchaseRequests />} />
              <Route path="procurement/orders" element={<PurchaseOrders />} />
              <Route path="procurement/orders/:id" element={<PurchaseOrderDetail />} />
              <Route path="procurement/receipts" element={<GoodsReceipts />} />
              <Route path="procurement/returns" element={<PurchaseReturns />} />
              <Route path="procurement/invoices" element={<SupplierInvoices />} />

              <Route path="inventory" element={<InventoryDashboard />} />
              <Route path="inventory/products" element={<Products />} />
              <Route path="inventory/categories" element={<Categories />} />
              <Route path="inventory/warehouses" element={<Warehouses />} />
              <Route path="inventory/stock" element={<Stock />} />
              <Route path="inventory/transfers" element={<StockTransfers />} />
              <Route path="inventory/adjustments" element={<StockAdjustments />} />
              <Route path="inventory/movements" element={<StockMovements />} />
              <Route path="inventory/reorder" element={<Reorder />} />

              <Route path="production" element={<ProductionDashboard />} />
              <Route path="production/planning" element={<ProductionPlanning />} />
              <Route path="production/work-orders" element={<WorkOrders />} />
              <Route path="production/bom" element={<BillOfMaterials />} />
              <Route path="production/work-centers" element={<WorkCenters />} />
              <Route path="production/consumption" element={<MaterialConsumption />} />
              <Route path="production/output" element={<ProductionOutput />} />
              <Route path="production/quality" element={<QualityControl />} />

              <Route path="workshop" element={<WorkshopDashboard />} />
              <Route path="workshop/jobs" element={<JobCards />} />
              <Route path="workshop/jobs/:id" element={<JobCardDetail />} />
              <Route path="workshop/technicians" element={<Technicians />} />
              <Route path="workshop/maintenance" element={<Maintenance />} />

              <Route path="projects" element={<ProjectList />} />
              <Route path="projects/jobs" element={<JobList />} />
              <Route path="projects/jobs/:id" element={<JobDetail />} />
              <Route path="projects/tasks" element={<Tasks />} />
              <Route path="projects/costing" element={<JobCosting />} />
              <Route path="projects/timesheets" element={<Timesheets />} />
              <Route path="projects/:id" element={<ProjectDetail />} />

              <Route path="finance" element={<FinanceDashboard />} />
              <Route path="finance/coa" element={<ChartOfAccounts />} />
              <Route path="finance/ledger" element={<GeneralLedger />} />
              <Route path="finance/journals" element={<JournalEntries />} />
              <Route path="finance/receivable" element={<AccountsReceivable />} />
              <Route path="finance/payable" element={<AccountsPayable />} />
              <Route path="finance/payments" element={<Payments />} />
              <Route path="finance/expenses" element={<Expenses />} />
              <Route path="finance/bank" element={<BankAndCash />} />
              <Route path="finance/tax" element={<Tax />} />
              <Route path="finance/pnl" element={<ProfitAndLoss />} />
              <Route path="finance/balance-sheet" element={<BalanceSheetPage />} />
              <Route path="finance/cash-flow" element={<CashFlowPage />} />

              <Route path="hr" element={<HrDashboard />} />
              <Route path="hr/employees" element={<Employees />} />
              <Route path="hr/employees/:id" element={<EmployeeDetail />} />
              <Route path="hr/departments" element={<Departments />} />
              <Route path="hr/attendance" element={<Attendance />} />
              <Route path="hr/leave" element={<Leave />} />
              <Route path="hr/payroll" element={<Payroll />} />
              <Route path="hr/recruitment" element={<Recruitment />} />
              <Route path="hr/performance" element={<Performance />} />

              <Route path="logistics/shipments" element={<Shipments />} />
              <Route path="logistics/dispatch" element={<Dispatch />} />

              <Route path="reports" element={<Reports />} />
              <Route path="approvals" element={<ApprovalCenter />} />
              <Route path="approvals/:id" element={<ApprovalDetail />} />
              <Route path="notifications" element={<NotificationCenter />} />
              <Route path="master-data" element={<MasterData />} />

              <Route path="admin/users" element={<Users />} />
              <Route path="admin/roles" element={<RolesPermissions />} />
              <Route path="admin/workflows" element={<Workflows />} />
              <Route path="admin/branches" element={<Branches />} />
              <Route path="admin/audit" element={<AuditLogs />} />

              <Route path="settings" element={<Settings />} />
              <Route path="403" element={<Forbidden />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AppProvider>
      </ToastProvider>
    </BrowserRouter>);

}