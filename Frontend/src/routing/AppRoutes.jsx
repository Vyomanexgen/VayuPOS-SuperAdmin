// src/routes/AppRoutes.jsx
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy-loaded components
const SearchResults = React.lazy(() => import("../components/SearchResults"));
const Dashboard = React.lazy(() => import("../components/Dashboard"));
const AdminManagement = React.lazy(() => import("../components/AdminManagement"));
const CustomerManagement = React.lazy(() => import("../components/CustomerManagement"));
const ExpenseManagement = React.lazy(() => import("../components/ExpenseManagement"));
const ShippingCharges = React.lazy(() => import("../components/ShippingCharges"));
const VoiceAssistant = React.lazy(() => import("../components/VoiceAssistant"));
const SuperAdmin = React.lazy(() => import("../components/SuperAdmin"));

// Staff & Payroll
const StaffManagement = React.lazy(() =>
  import("../components/StaffandPayroll/StaffManagement")
);
const PayrollManagement = React.lazy(() =>
  import("../components/StaffandPayroll/PayrollManagement")
);

// Operations
const POS = React.lazy(() => import("../components/Operations/POS"));
const Sales = React.lazy(() => import("../components/Operations/Sales"));
const ReturnsRefunds = React.lazy(() => import("../components/Operations/Returns"));
const TableManagement = React.lazy(() =>
  import("../components/Operations/TableManagement")
);
const SystemManagement = React.lazy(() =>
  import("../components/Operations/SystemManagement")
);

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <Routes>
        <Route path="/search" element={<SearchResults />} />
        
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Admin & Users */}
        <Route path="/admin" element={<AdminManagement />} />
        <Route path="/customers" element={<CustomerManagement />} />

        {/* Staff & Payroll */}
        <Route path="/staff&payroll/staffmanagement" element={<StaffManagement />} />
        <Route path="/staff&payroll/payrollmanagement" element={<PayrollManagement />} />

        {/* Expenses */}
        <Route path="/expenses" element={<ExpenseManagement />} />

        {/* Operations */}
        <Route path="/operations/pos" element={<POS />} />
        <Route path="/operations/sales" element={<Sales />} />
        <Route path="/operations/returns" element={<ReturnsRefunds />} />
        <Route path="/operations/table" element={<TableManagement />} />
        <Route path="/operations/system" element={<SystemManagement />} />

        {/* Other */}
        <Route path="/shipping" element={<ShippingCharges />} />
        <Route path="/voice" element={<VoiceAssistant />} />
        <Route path="/superadmin" element={<SuperAdmin />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
