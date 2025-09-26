import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000/adminmanagement ";

const blankForm = {
  id: null,
  name: "",
  email: "",
  role: "Admin",
  status: "Active",
  createdAt: "",
  lastLogin: "",
  permissions: [],
};

const ALL_PERMISSIONS = [
  "Full Access",
  "User Management",
  "Reports",
  "Staff & Payroll",
  "Operations",
  "Expense Management",
];

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(blankForm);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setAdmins(data))
      .catch(() => toast.error("Failed to load admins"));
  }, []);

  const filteredAdmins = admins.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || a.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.warn("Name and Email are required");
      return;
    }

    try {
      if (form.id) {
        const res = await fetch(`${API_URL}/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const updated = await res.json();
        setAdmins((prev) => prev.map((p) => (p.id === form.id ? updated : p)));
        toast.success("Admin updated");
      } else {
        const newAdmin = {
          ...form,
          id: uuidv4(),
          createdAt: new Date().toISOString().split("T")[0],
          lastLogin: new Date().toISOString(),
        };
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAdmin),
        });
        const data = await res.json();
        setAdmins((prev) => [...prev, data]);
        toast.success("Admin added");
      }
    } catch {
      toast.error("Error saving admin");
    }

    setShowModal(false);
    setForm(blankForm);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this admin?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        setAdmins((prev) => prev.filter((a) => a.id !== id));
        toast.success("Admin deleted");
      } catch {
        toast.error("Delete failed");
      }
    }
  };

  const handleAdd = () => {
    setForm(blankForm);
    setShowModal(true);
  };

  const handleEdit = (admin) => {
    setForm(admin);
    setShowModal(true);
  };

  const togglePermission = (perm) => {
    setForm((prev) => {
      const hasPerm = prev.permissions.includes(perm);
      return {
        ...prev,
        permissions: hasPerm
          ? prev.permissions.filter((p) => p !== perm)
          : [...prev.permissions, perm],
      };
    });
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <div>
          <h1 className="text-3xl font-bold">Admin Management</h1>
          <p className="text-gray-500">
            Manage system administrators and their permissions
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Add Admin
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Active */}
        <div className="bg-white p-5 rounded-xl shadow text-center flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-3xl font-bold text-green-600">
            <img src="./src/assets/Vector-7.png" alt="Active Admin" className="w-8 h-8 sm:w-6 sm:h-6 object-contain" />
            {admins.filter((a) => a.status === "Active").length}
          </div>
          <p className="text-gray-500">Active Admin</p>
        </div>

        {/* Inactive */}
        <div className="bg-white p-5 rounded-xl shadow text-center flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-3xl font-bold text-red-600">
            <img src="./src/assets/Vector-5 (2).png" alt="Inactive Admin" className="w-8 h-8 sm:w-6 sm:h-6 object-contain" />
            {admins.filter((a) => a.status === "Inactive").length}
          </div>
          <p className="text-gray-500">Inactive Admin</p>
        </div>

        {/* Super Admin */}
        <div className="bg-white p-5 rounded-xl shadow text-center flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-3xl font-bold text-blue-600">
            <img src="./src/assets/Vector-5.png" alt="Super Admin" className="w-8 h-8 sm:w-6 sm:h-6 object-contain" />
            {admins.filter((a) => a.role === "Super Admin").length}
          </div>
          <p className="text-gray-500">Super Admin</p>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-10 py-2 rounded-lg shadow-sm w-full"
          />
          <img
            src="./src/assets/Search.png"
            alt="Search Icon"
            className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-2 rounded-lg shadow-sm"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Admin Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-sm text-gray-500">
              <th className="p-3">Administrator</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Last Login</th>
              <th className="p-3">Permissions</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.map((a) => (
              <tr key={a.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <div>
                    <p className="font-semibold">{a.name}</p>
                    <p className="text-sm text-gray-500">{a.email}</p>
                  </div>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${a.role === "Super Admin"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                      }`}
                  >
                    {a.role}
                  </span>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${a.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                      }`}
                  >
                    {a.status}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-500">
                  {new Date(a.lastLogin).toLocaleString()}
                </td>
                <td className="p-3">
                  {a.permissions?.length ? (
                    <div className="flex flex-wrap gap-1">
                      {a.permissions.map((perm, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600"
                        >
                          {perm}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">No Access</span>
                  )}
                </td>
                <td className="p-3 text-center flex justify-center gap-2">
                  <button onClick={() => handleEdit(a)}>
                    <img src="./src/assets/edit 1.png" alt="Edit" className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(a.id)}>
                    <img src="./src/assets/Vector-9.png" alt="Delete" className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAdmins.length === 0 && (
          <div className="text-center text-gray-500 py-6">
            No administrators found
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-semibold mb-1">
              {form.id ? "Edit Admin" : "Add New Administrator"}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Create a new admin account with specific permissions.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                type="email"
                className="w-full border rounded px-3 py-2"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
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
              <select
                className="w-full border rounded px-3 py-2"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <div>
                <label className="font-semibold">Permissions</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {ALL_PERMISSIONS.map((perm) => (
                    <label key={perm} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={form.permissions.includes(perm)}
                        onChange={() => togglePermission(perm)}
                      />
                      <span>{perm}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {form.id ? "Update Admin" : "Add Admin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}