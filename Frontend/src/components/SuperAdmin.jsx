import React, { useState } from "react";
import Sidebar from "./common/Sidebar";
import Navbar from "./common/Navbar";

const SuperAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} />

      {/* Main Content */}
      <main className="main">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Header */}
        <h1>Super Admin</h1>
        <p>xxx</p>
      </main>
    </div>
  );
};

export default SuperAdmin;
