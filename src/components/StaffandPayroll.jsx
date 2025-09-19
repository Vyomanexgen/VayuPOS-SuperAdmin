import React, { useState } from "react";
import Sidebar from "./common/Sidebar";
import Navbar from "./common/Navbar";
import "../styles/adminmanagement.css"; // consider renaming to layout.css

const StaffandPayroll = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} />

      {/* Main Wrapper */}
      <div className={`main-wrapper ${sidebarOpen ? "shifted" : "collapsed"}`}>
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <main className="page-content">
          <h1>staff & payroll</h1>
          <p>xxx</p>
        </main>
      </div>
    </div>
  );
};

export default StaffandPayroll;
