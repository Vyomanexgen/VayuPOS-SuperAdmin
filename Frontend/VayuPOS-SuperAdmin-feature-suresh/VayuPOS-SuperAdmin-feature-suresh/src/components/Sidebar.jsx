import React from "react";

const Sidebar = ({ sidebarOpen }) => {
  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
      <h2>SuperAdmin</h2>
      <nav>
        <a href="#">Dashboard</a>
        <a href="#" className="active">
          Admin Management
        </a>
        <a href="#">User Management</a>
        <a href="#">Staff & Payroll</a>
        <a href="#">Expense Management</a>
        <a href="#">Operations</a>
        <a href="#">Shipping Charges</a>
        <a href="#">Voice Assistant</a>
      </nav>
    </aside>
  );
};

export default Sidebar;
