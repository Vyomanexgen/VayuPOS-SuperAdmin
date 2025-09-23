import React, { useState } from "react";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import "../styles/adminmanagement.css"; // <-- Make sure this path is correct

const blankForm = {
  id: null,
  name: "",
  email: "",
  role: "Admin",
  status: "Active",
  createdAt: "",
};

export default function AdminManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "johnsmith@company.com",
      role: "Super Admin",
      status: "Active",
      createdAt: "2025-09-01",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@company.com",
      role: "Admin",
      status: "Inactive",
      createdAt: "2025-09-10",
    },
    {
      id: 3,
      name: "Supriya",
      email: "supriya@company.com",
      role: "Admin",
      status: "Active",
      createdAt: "2025-08-05",
    },
    {
      id: 4,
      name: "David Wilson",
      email: "wilsondavid@company.com",
      role: "Moderator",
      status: "Active",
      createdAt: "2025-07-20",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(blankForm);

  // Filtering
  const filteredAdmins = admins.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || a.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Open Add modal
  const handleAdd = () => {
    setForm({ ...blankForm });
    setShowModal(true);
  };

  // Open Edit modal
  const handleEdit = (admin) => {
    setForm({ ...admin });
    setShowModal(true);
  };

  // Delete
  const handleDelete = (id) => {
    if (window.confirm("Delete this admin?")) {
      setAdmins((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Submit Add/Edit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return alert("Name + Email required.");

    if (form.id) {
      // update
      setAdmins((prev) => prev.map((p) => (p.id === form.id ? form : p)));
    } else {
      // create
      setAdmins((prev) => [
        ...prev,
        {
          ...form,
          id: Date.now(),
          createdAt: new Date().toISOString().split("T")[0],
        },
      ]);
    }
    setShowModal(false);
    setForm(blankForm);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar sidebarOpen={sidebarOpen} />
      <div
        className={`main-wrapper ${sidebarOpen ? "shifted" : "collapsed"}`}
        role="main"
      >
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onSearch={(q) => setSearch(q)}
        />

        <main className="page-content">
          <div className="header-row">
            <div className="title-block">
              <h1>Admin Management</h1>
              <p className="subtitle">Manage system administrators and their permissions</p>
            </div>


          </div>

          {/* stat cards */}
          <div className="cards">
            <div className="card">
              <div className="card-num">{admins.filter((a) => a.status === "Active").length}</div>
              <div className="card-label">Active Admin</div>
            </div>
            <div className="card">
              <div className="card-num">{admins.filter((a) => a.status === "Inactive").length}</div>
              <div className="card-label">Inactive Admin</div>
            </div>
            <div className="card">
              <div className="card-num">{admins.filter((a) => a.role === "Super Admin").length}</div>
              <div className="card-label">Super Admin</div>
            </div>
          </div>

          {/* admin list */}
          <div className="admin-list">
            <h3>Administrator List</h3>
            <div className="header-actions">
              <div className="search-wrap">
                <input
                  aria-label="search admins"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or email..."
                />
                <button className="icon-btn" aria-hidden>🔍</button>
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="status-filter"
                aria-label="filter by status"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <button className="btn-primary" onClick={handleAdd}>
                + Add Admin
              </button>
            </div>
            <div className="table-wrap">
              <table className="admin-table" role="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th className="col-actions">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredAdmins.map((a) => (
                    <tr key={a.id}>
                      <td data-label="Name">{a.name}</td>
                      <td data-label="Email">{a.email}</td>
                      <td data-label="Role">
                        <span className={`role-badge role-${a.role.replace(/\s+/g, "").toLowerCase()}`}>
                          {a.role}
                        </span>
                      </td>
                      <td data-label="Status">
                        <span className={`status-badge ${a.status === "Active" ? "active" : "inactive"}`}>
                          {a.status}
                        </span>
                      </td>
                      <td data-label="Created At">{a.createdAt}</td>
                      <td data-label="Actions" className="col-actions">
                        <button className="action edit" onClick={() => handleEdit(a)} aria-label={`Edit ${a.name}`}>✏️</button>
                        <button className="action delete" onClick={() => handleDelete(a.id)} aria-label={`Delete ${a.name}`}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredAdmins.length === 0 && (
                <div className="empty">No administrators found</div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modal Add/Edit */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{form.id ? "Edit Admin" : "Add Admin"}</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Name
                <input
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </label>

              <label>
                Email
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </label>

              <label>
                Role
                <select
                  name="role"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option>Super Admin</option>
                  <option>Admin</option>
                  <option>Moderator</option>
                  <option>Staff</option>
                </select>
              </label>

              <label>
                Status
                <select
                  name="status"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </label>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => { setShowModal(false); setForm(blankForm); }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}