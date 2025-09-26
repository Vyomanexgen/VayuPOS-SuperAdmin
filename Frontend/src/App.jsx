// src/App.jsx
import React, { useState } from "react";
import AppRoutes from "./routing/AppRoutes";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main wrapper */}
      <div className="main-wrapper lg:ml-64 transition-all duration-300" role="main">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />

        {/* Page Content (all routes here) */}
        <main className="page-content p-4">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
};

export default App;
