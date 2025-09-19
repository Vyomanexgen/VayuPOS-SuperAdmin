import React from "react";
import { Bell, Menu, Search } from "lucide-react";
import "../../styles/navbar.css";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="topbar">
      <div className="search-bar">
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
          type="button"
        >
          <Menu size={20} />
        </button>

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
