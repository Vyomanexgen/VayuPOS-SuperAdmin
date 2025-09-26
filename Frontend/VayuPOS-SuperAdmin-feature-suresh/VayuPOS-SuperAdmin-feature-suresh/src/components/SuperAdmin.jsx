// import React, { useState } from "react";
// import { Bell, Menu, Search } from "lucide-react"; 

// const SuperAdmin = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const admins = [
//     {
//       name: "John Smith",
//       email: "johnsmith@company.com",
//       role: "Super Admin",
//       roleClass: "superadmin",
//       status: "Active",
//       statusClass: "status-active",
//       lastLogin: "2024-01-15 10:30 AM",
//       permissions: ["Full Access"],
//     },
//     {
//       name: "Sarah Johnson",
//       email: "sarah@company.com",
//       role: "Admin",
//       roleClass: "admin",
//       status: "Inactive",
//       statusClass: "status-inactive",
//       lastLogin: "2024-01-15 09:30 AM",
//       permissions: ["User Management", "Reports"],
//     },
//     {
//       name: "Supriya",
//       email: "supriya@company.com",
//       role: "Admin",
//       roleClass: "admin",
//       status: "Active",
//       statusClass: "status-active",
//       lastLogin: "2024-01-15 09:30 AM",
//       permissions: ["Staff Management", "Operations"],
//     },
//     {
//       name: "David Wilson",
//       email: "wilsondavid@company.com",
//       role: "Moderator",
//       roleClass: "moderator",
//       status: "Active",
//       statusClass: "status-active",
//       lastLogin: "2024-01-15 09:30 AM",
//       permissions: ["Content Management", "Shipping"],
//     },
//   ];

//   return (
//     <div className="dashboard">
//       {/* Sidebar */}
//       <aside className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
//         <h2>SuperAdmin</h2>
//         <nav>
//           <a href="#">Dashboard</a>
//           <a href="#" className="active">
//             Admin Management
//           </a>
//           <a href="#">User Management</a>
//           <a href="#">Staff & Payroll</a>
//           <a href="#">Expense Management</a>
//           <a href="#">Operations</a>
//           <a href="#">Shipping Charges</a>
//           <a href="#">Voice Assistant</a>
//         </nav>
//       </aside>

//       {/* Main */}
//       <main className="main">
//         {/* Topbar */}
//         <div className="topbar">
//           <button
//             className="menu-btn"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           >
//             <Menu size={22} />
//           </button>

//           {/* Search bar */}
//           <div className="search-bar">
//             <Search size={18} className="icon" />
//             <input type="text" placeholder="Search..." />
//           </div>

//           {/* Right side */}
//           <div className="topbar-right">
//             {/* Notifications */}
//             <div className="notifications">
//               <Bell size={22} />
//               <span className="badge">3</span>
//             </div>

//             {/* Profile */}
//             <div className="profile">
//               <div className="avatar"></div>
//               <div>
//                 <strong>Super Admin</strong>
//                 <span>System Administrator</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Header */}
//         <h1>Admin Management</h1>
//         <p>Manage system administrators and their permissions</p>

//         {/* Cards */}
//         <div className="cards">
//           <div className="card">
//             <h2>5</h2>
//             <p>Active Admin</p>
//           </div>
//           <div className="card">
//             <h2>1</h2>
//             <p>Inactive Admin</p>
//           </div>
//           <div className="card">
//             <h2>1</h2>
//             <p>Super Admin</p>
//           </div>
//         </div>

//         {/* Administrator List */}
//         <div className="admin-list">
//           <h3>Administrator List</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Administrator</th>
//                 <th>Role</th>
//                 <th>Status</th>
//                 <th>Last Login</th>
//                 <th>Permissions</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {admins.map((admin, index) => (
//                 <tr key={index}>
//                   <td>
//                     {admin.name}
//                     <br />
//                     <small>{admin.email}</small>
//                   </td>
//                   <td>
//                     <span className={`role ${admin.roleClass}`}>
//                       {admin.role}
//                     </span>
//                   </td>
//                   <td className={admin.statusClass}>{admin.status}</td>
//                   <td>{admin.lastLogin}</td>
//                   <td className="permissions">
//                     {admin.permissions.map((perm, i) => (
//                       <span key={i}>{perm}</span>
//                     ))}
//                   </td>
//                   <td className="actions">
//                     <button>🗑️</button>
//                     <button>✏️</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default SuperAdmin;
