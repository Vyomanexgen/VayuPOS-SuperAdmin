// src/components/ExpenseManagement.jsx
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000/expensemanagement ";

const blankForm = {
  id: null,
  description: "",
  category: "",
  amount: "",
  date: "",
  submittedBy: "",
  status: "Pending",
};

export default function ExpenseManagement() {
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(blankForm);

  // Fetch
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch(() => toast.error("Failed to load expenses"));
  }, []);

  // Filter + Search
  const filteredExpenses = expenses.filter((e) => {
    const matchesSearch =
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.submittedBy.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || e.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Totals
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const approved = expenses
    .filter((e) => e.status === "Approved")
    .reduce((sum, e) => sum + Number(e.amount), 0);
  const pending = expenses
    .filter((e) => e.status === "Pending")
    .reduce((sum, e) => sum + Number(e.amount), 0);
  const thisMonth = expenses
    .filter((e) => new Date(e.date).getMonth() === new Date().getMonth())
    .reduce((sum, e) => sum + Number(e.amount), 0);

  // Submit (Add/Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.description || !form.amount || !form.date || !form.submittedBy) {
      toast.warn("Please fill all fields");
      return;
    }

    try {
      if (form.id) {
        // Update
        const res = await fetch(`${API_URL}/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const updated = await res.json();
        setExpenses((prev) =>
          prev.map((p) => (p.id === form.id ? updated : p))
        );
        toast.success("Expense updated");
      } else {
        // Add
        const newExpense = { ...form, id: uuidv4() };
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newExpense),
        });
        const data = await res.json();
        setExpenses((prev) => [...prev, data]);
        toast.success("Expense added");
      }
    } catch {
      toast.error("Error saving expense");
    }

    setShowModal(false);
    setForm(blankForm);
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Delete this expense?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        setExpenses((prev) => prev.filter((e) => e.id !== id));
        toast.success("Expense deleted");
      } catch {
        toast.error("Delete failed");
      }
    }
  };

  const handleAdd = () => {
    setForm(blankForm);
    setShowModal(true);
  };

  const handleEdit = (expense) => {
    setForm(expense);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Expense Management</h1>
          <p className="text-gray-500">
            Track and manage all business expenses and reimbursements
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Add Expenses
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl shadow text-center">
          <div className="text-2xl font-bold">${totalExpenses}</div>
          <p className="text-gray-500">Total Expenses</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow text-center">
          <div className="text-2xl font-bold text-green-600">${approved}</div>
          <p className="text-gray-500">Approved</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow text-center">
          <div className="text-2xl font-bold text-orange-500">${pending}</div>
          <p className="text-gray-500">Pending</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow text-center">
          <div className="text-2xl font-bold text-blue-600">${thisMonth}</div>
          <p className="text-gray-500">This Month</p>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-lg shadow-sm w-full sm:w-1/3"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-2 rounded-lg shadow-sm"
        >
          <option value="All">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-sm text-gray-500">
              <th className="p-3">Description</th>
              <th className="p-3">Category</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
              <th className="p-3">Submitted</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((e) => (
              <tr key={e.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{e.description}</td>
                <td className="p-3">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {e.category}
                  </span>
                </td>
                <td className="p-3">${e.amount}</td>
                <td className="p-3">{e.date}</td>
                <td className="p-3">{e.submittedBy}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      e.status === "Approved"
                        ? "bg-green-100 text-green-600"
                        : e.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {e.status}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleEdit(e)}
                    className="mr-2 text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(e.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredExpenses.length === 0 && (
          <div className="text-center text-gray-500 py-6">
            No expenses found
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              {form.id ? "Edit Expense" : "Add Expense"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
              />
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Category"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                required
              />
              <input
                type="number"
                className="w-full border rounded px-3 py-2"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                required
              />
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Submitted By"
                value={form.submittedBy}
                onChange={(e) =>
                  setForm({ ...form, submittedBy: e.target.value })
                }
                required
              />
              <select
                className="w-full border rounded px-3 py-2"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option>Approved</option>
                <option>Pending</option>
                <option>Rejected</option>
              </select>

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