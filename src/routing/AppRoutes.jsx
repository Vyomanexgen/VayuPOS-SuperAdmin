import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
let UserManagement = React.lazy(() => import("../components/UserManagement"));
let AdminManagement = React.lazy(() => import("../components/AdminManagement"));
let Dashboard = React.lazy(() => import("../components/Dashboard"));
let ExpenseManagement = React.lazy(() =>
  import("../components/ExpenseManagement")
);
let Operations = React.lazy(() => import("../components/Operations"));
let ShippingCharges = React.lazy(() => import("../components/ShippingCharges"));
let StaffManagement = React.lazy(() => import("../components/StaffandPayroll/StaffManagement"));
let PayrollManagement = React.lazy(() =>
  import("../components/staffandpayroll/PayrollManagement")
);
let VoiceAssistant = React.lazy(() =>
  import("../components/VoiceAssistant")
);
let SuperAdmin = React.lazy(() => import("../components/SuperAdmin"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<h6>Loading...</h6>}>
      <Routes>
        <Route path="/" element={<Dashboard />} index />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/adminmanagement" element={<AdminManagement />} />
        <Route path="/usermanagement" element={<UserManagement />} />
        <Route path="/expensemanagement" element={<ExpenseManagement />} />
        <Route path="/superadmin" element={<SuperAdmin />} />
        <Route path="/operations" element={<Operations />} />
        <Route path="/shippingcharges" element={<ShippingCharges />} />
        <Route path="/staffmanagement" element={<StaffManagement />} />
        <Route path="/payrollmanagement" element={<PayrollManagement />} />
        <Route path="/voiceassistant" element={<VoiceAssistant />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
