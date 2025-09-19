import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  DollarSign,
  Settings,
  Truck,
  Mic,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import "../../styles/sidebar.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ sidebarOpen }) => {
   const [openPayroll, setOpenPayroll] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current route is under staff/payroll
  const isPayrollActive =
    location.pathname.startsWith("/staffmanagement") ||
    location.pathname.startsWith("/payrollmanagement");

  const handlePayrollClick = () => {
    // Toggle dropdown
    setOpenPayroll(!openPayroll);

    // If user is not already in staff/payroll pages, navigate to staffmanagement
    if (!location.pathname.startsWith("/staffmanagement") &&
        !location.pathname.startsWith("/payrollmanagement")) {
      navigate("/staffmanagement");
    }
  };

  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
      <h2>SuperAdmin</h2>
      <nav>
        <NavLink to="/dashboard" replace>
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>

        <NavLink
          to="/adminmanagement"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <Users size={18} /> Admin Management
        </NavLink>

        <NavLink to="/usermanagement">
          <FileText size={18} /> User Management
        </NavLink>

        {/* Collapsible Staff & Payroll */}
        {/* Staff & Payroll dropdown */}
         <div className="menu-group">
          <button
            className={`menu-toggle ${isPayrollActive ? "active" : ""}`}
            onClick={handlePayrollClick}
          >
            <DollarSign size={18} /> Staff & Payroll
            <ChevronDown
              size={16}
              className={`arrow ${openPayroll ? "rotated" : ""}`}
            />
          </button>

          {openPayroll && (
            <div className="submenu">
              <NavLink to="/staffmanagement">Staff Management</NavLink>
              <NavLink to="/payrollmanagement">Payroll Management</NavLink>
            </div>
          )}
        </div>

        <NavLink to="/expensemanagement">
          <FileText size={18} /> Expense Management
        </NavLink>

        <NavLink to="/operations">
          <Settings size={18} /> Operations
        </NavLink>

        <NavLink to="/shippingcharges">
          <Truck size={18} /> Shipping Charges
        </NavLink>

        <NavLink to="/voiceassistant">
          <Mic size={18} /> Voice Assistant
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;






