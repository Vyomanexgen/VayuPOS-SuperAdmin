import React from "react";
import { Bell, Menu, Search } from "lucide-react";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="topbar">
      {/* Sidebar toggle */}
      <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <Menu size={22} />
      </button>

      {/* Search bar */}
      <div className="search-bar">
        <Search size={18} className="icon" />
        <input type="text" placeholder="Search..." />
      </div>

      {/* Right side */}
      <div className="topbar-right">
        <div className="notifications">
          <Bell size={22} />
          <span className="badge">3</span>
        </div>

        <div className="profile">
          <div className="avatar"></div>
          <div>
            <strong>Super Admin</strong>
            <span>System Administrator</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
