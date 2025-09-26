import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  Shield,
  Users,
  Wallet,
  Receipt,
  Settings,
  Truck,
  Mic,
  ChevronDown,
  X,
} from "lucide-react";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // Auto-expand dropdown if route matches
  useEffect(() => {
    if (location.pathname.startsWith("/staff&payroll")) {
      setOpenMenu("staff");
    } else if (location.pathname.startsWith("/operations")) {
      setOpenMenu("operations");
    }
  }, [location.pathname]);

  // ✅ Close sidebar only on mobile
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? "bg-white text-blue-700"
        : "text-white hover:bg-blue-500 hover:text-white"
    }`;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-blue-600 text-white flex flex-col z-40 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-blue-500">
          <h1 className="text-lg font-bold">SuperAdmin</h1>
          {/* Hide close button on desktop */}
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-gray-200 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-1 p-3 overflow-y-auto">
          <NavLink to="/" end className={linkClass} onClick={handleLinkClick}>
            <BarChart3 size={18} /> Dashboard
          </NavLink>
          <NavLink to="/admin" className={linkClass} onClick={handleLinkClick}>
            <Shield size={18} /> Admin Management
          </NavLink>
          <NavLink
            to="/customers"
            className={linkClass}
            onClick={handleLinkClick}
          >
            <Users size={18} /> Customer Management
          </NavLink>

          {/* Staff & Payroll */}
          <button
            onClick={() => toggleMenu("staff")}
            className={`flex items-center justify-between px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              openMenu === "staff" ? "bg-blue-500" : "hover:bg-blue-500"
            }`}
          >
            <span className="flex items-center gap-3">
              <Wallet size={18} /> Staff & Payroll
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform ${
                openMenu === "staff" ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`flex flex-col pl-10 pr-2 text-sm overflow-hidden transition-all duration-300 ${
              openMenu === "staff" ? "max-h-40" : "max-h-0"
            }`}
          >
            <NavLink
              to="/staff&payroll/staffmanagement"
              className={linkClass}
              onClick={handleLinkClick}
            >
              Staff Management
            </NavLink>
            <NavLink
              to="/staff&payroll/payrollmanagement"
              className={linkClass}
              onClick={handleLinkClick}
            >
              Payroll Management
            </NavLink>
          </div>

          <NavLink
            to="/expenses"
            className={linkClass}
            onClick={handleLinkClick}
          >
            <Receipt size={18} /> Expense Management
          </NavLink>

          {/* Operations */}
          <button
            onClick={() => toggleMenu("operations")}
            className={`flex items-center justify-between px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              openMenu === "operations" ? "bg-blue-500" : "hover:bg-blue-500"
            }`}
          >
            <span className="flex items-center gap-3">
              <Settings size={18} /> Operations
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform ${
                openMenu === "operations" ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`flex flex-col pl-10 pr-2 text-sm overflow-hidden transition-all duration-300 ${
              openMenu === "operations" ? "max-h-60" : "max-h-0"
            }`}
          >
            <NavLink
              to="/operations/pos"
              className={linkClass}
              onClick={handleLinkClick}
            >
              POS
            </NavLink>
            <NavLink
              to="/operations/sales"
              className={linkClass}
              onClick={handleLinkClick}
            >
              Sales
            </NavLink>
            <NavLink
              to="/operations/returns"
              className={linkClass}
              onClick={handleLinkClick}
            >
              Returns & Refunds
            </NavLink>
            <NavLink
              to="/operations/table"
              className={linkClass}
              onClick={handleLinkClick}
            >
              Table Management
            </NavLink>
            <NavLink
              to="/operations/system"
              className={linkClass}
              onClick={handleLinkClick}
            >
              System Management
            </NavLink>
          </div>

          <NavLink
            to="/shipping"
            className={linkClass}
            onClick={handleLinkClick}
          >
            <Truck size={18} /> Shipping Charges
          </NavLink>
          <NavLink to="/voice" className={linkClass} onClick={handleLinkClick}>
            <Mic size={18} /> Voice Assistant
          </NavLink>
        </nav>
      </aside>
    </>
  );
}