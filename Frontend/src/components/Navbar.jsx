// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Menu, Search, Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ toggleSidebar, isSidebarOpen }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle search submit
  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (searchTerm.trim().length >= 3) {
        navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
        setSearchTerm(""); // clear input
      } else {
        alert("Please enter at least 3 characters.");
      }
    }
  };

  return (
    <div className="px-4 sm:px-6 transition-all duration-300">
      <header className="mt-3 bg-white rounded-lg shadow-md px-4 sm:px-6 py-2 flex items-center justify-between">
        {/* Left: Hamburger + Search */}
        <div className="flex items-center flex-1 gap-3 sm:max-w-md">
          {/* Hamburger */}
          <button
            onClick={toggleSidebar}
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Menu size={20} />
          </button>

          {/* Search bar */}
          <div className="flex items-center flex-1 bg-gray-100 rounded-md px-3 py-1.5 gap-2">
            <Search
              size={16}
              className="text-gray-500 cursor-pointer"
              onClick={handleSearch}
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
              className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400"
            />
          </div>
        </div>

        {/* Right: Notifications + Profile */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Notifications */}
          <button className="relative text-gray-700 hover:text-gray-900 transition-colors">
            <Bell size={18} />
            <span className="absolute -top-1 -right-2 text-[10px] bg-blue-600 text-white rounded-full px-1">
              3
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <div className="hidden sm:block leading-tight text-left">
                <p className="font-semibold text-sm text-gray-900">
                  Super Admin
                </p>
                <p className="text-gray-500 text-xs">System Administrator</p>
              </div>
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-100 z-50">
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => {
                    navigate("/superadmin");
                    setDropdownOpen(false);
                  }}
                >
                  Profile
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                  onClick={() => {
                    console.log("Logout clicked"); // later: clear auth + redirect
                    setDropdownOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
