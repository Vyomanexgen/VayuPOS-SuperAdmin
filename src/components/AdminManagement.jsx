// src/components/AdminManagement.jsx
import React, { useState } from "react";

const blankForm = {
  id: null,
  name: "",
  email: "",
  role: "Admin",
  status: "Active",
  createdAt: "",
};

export default function AdminManagement() {
  const [admins, setAdmins] = useState([
    { id: 1, name: "John Smith", email: "johnsmith@company.com", role: "Super Admin", status: "Active", createdAt: "2025-09-01" },
    { id: 2, name: "Sarah Johnson", email: "sarah@company.com", role: "Admin", status: "Inactive", createdAt: "2025-09-10" },
    { id: 3, name: "Supriya", email: "supriya@company.com", role: "Admin", status: "Active", createdAt: "2025-08-05" },
    { id: 4, name: "David Wilson", email: "wilsondavid@company.com", role: "Moderator", status: "Active", createdAt: "2025-07-20" },
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

  // CRUD handlers
  const handleAdd = () => {
    setForm({ ...blankForm });
    setShowModal(true);
  };

  const handleEdit = (admin) => {
    setForm({ ...admin });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this admin?")) {
      setAdmins((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return alert("Name + Email required.");

    if (form.id) {
      setAdmins((prev) => prev.map((p) => (p.id === form.id ? form : p)));
    } else {
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
    <main className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Management</h1>
          <p className="text-gray-500">Manage system administrators and their permissions</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          + Add Admin
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-2xl font-bold">{admins.filter((a) => a.status === "Active").length}</div>
          <p className="text-gray-500">Active Admin</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-2xl font-bold">{admins.filter((a) => a.status === "Inactive").length}</div>
          <p className="text-gray-500">Inactive Admin</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-2xl font-bold">{admins.filter((a) => a.role === "Super Admin").length}</div>
          <p className="text-gray-500">Super Admin</p>
        </div>
      </div>

      {/* Admin List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
          {/* Search */}
          <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm w-full sm:w-1/3">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none"
            />
            <span>🔍</span>
          </div>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 shadow-sm"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left text-sm text-gray-500">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3">Created At</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.map((a) => (
                <tr key={a.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{a.name}</td>
                  <td className="p-3">{a.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        a.role === "Super Admin"
                          ? "bg-blue-100 text-blue-600"
                          : a.role === "Admin"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {a.role}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        a.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="p-3">{a.createdAt}</td>
                  <td className="p-3 text-center">
                    <button onClick={() => handleEdit(a)} className="mr-2 hover:scale-110">✏️</button>
                    <button onClick={() => handleDelete(a.id)} className="hover:scale-110">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAdmins.length === 0 && (
            <div className="text-center text-gray-500 py-6">No administrators found</div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">{form.id ? "Edit Admin" : "Add Admin"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm">Name</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm">Email</label>
                <input
                  type="email"
                  className="w-full border rounded px-3 py-2"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm">Role</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option>Super Admin</option>
                  <option>Admin</option>
                  <option>Moderator</option>
                  <option>Staff</option>
                </select>
              </div>
              <div>
                <label className="text-sm">Status</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setForm(blankForm);
                  }}
                  className="px-4 py-2 rounded bg-gray-200"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
