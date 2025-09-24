// src/components/Dashboard.jsx
import React from "react";
import {
  Calendar,
  Send,
  User,
  ScanFace,
  Users,
  Clock,
  MessageSquare,
  Gift,
} from "lucide-react";

const Dashboard = () => {
  // Stats Data
  const stats = [
    { title: "Total Users", value: "3,500", change: "+12% from last month" },
    { title: "Revenue", value: "$43,500", change: "+25% from last month" },
    { title: "Orders", value: "1,500", change: "+10% from last month" },
    { title: "Growth", value: "15.5%", change: "+6% from last month" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="flex items-center justify-between text-gray-600 mt-1">
          Welcome back! Here's what's happening today.
          <span className="flex items-center gap-2 text-sm">
            <Calendar size={16} /> Tuesday, August 12, 2025
          </span>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl shadow-sm p-4 flex flex-col justify-between"
          >
            <p className="text-gray-600 text-sm">{item.title}</p>
            <h2 className="text-xl font-semibold text-gray-900">
              {item.value}
            </h2>
            <span className="text-xs mt-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-center">
              {item.change}
            </span>
          </div>
        ))}
      </div>

      {/* Middle Row: Sales Overview + AI Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Overview */}
        <div className="lg:col-span-2 bg-white border rounded-xl shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Sales Overview</h3>
            <div className="space-x-2">
              {["Day", "Week", "Month", "Year"].map((label, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    label === "Year"
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64 border border-blue-500 rounded-lg mt-4 flex items-center justify-center text-gray-400">
            Chart Placeholder
          </div>
        </div>

        {/* AI Assistant */}
        <div className="bg-white border rounded-xl shadow-sm p-4 flex flex-col">
          <h3 className="text-lg font-semibold mb-3">AI Assistant</h3>
          <div className="bg-gray-200 rounded-xl p-4 flex-1 flex flex-col justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-1 text-blue-600">
                <ScanFace size={28} />
              </div>
              <div className="bg-white rounded-xl px-3 py-2 text-sm text-gray-700">
                Good Morning! Your sales are up 12% compared to last month.
                Would you like to see the detailed report?
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4 ml-10">
              <button className="bg-black text-white text-sm px-3 py-1 rounded-lg">
                Yes, show me the report
              </button>
              <User size={20} className="text-gray-700" />
            </div>
          </div>
          <div className="mt-4 flex border rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Ask anything..."
              className="flex-1 px-3 py-2 text-sm outline-none"
            />
            <button className="px-3 bg-black text-white flex items-center justify-center">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent Sales */}
        <div className="bg-white border rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-semibold border-b pb-2 mb-3">
            Recent Sales
          </h3>
          {[1, 2, 3, 4].map((sale) => (
            <div
              key={sale}
              className="flex justify-between border-b py-2 text-sm text-gray-600"
            >
              <div>
                <p>Order #1234</p>
                <small>July 18, 2025</small>
              </div>
              <span>$15.09</span>
            </div>
          ))}
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white border rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-semibold border-b pb-2 mb-3">
            Low Stock Alert
          </h3>
          {[1, 2, 3, 4].map((stock) => (
            <div
              key={stock}
              className="flex justify-between border-b py-2 text-sm text-gray-600"
            >
              <div>
                <p>Product A</p>
                <small>Only {stock} left</small>
              </div>
              <span>⚠️</span>
            </div>
          ))}
        </div>

        {/* Business Tools */}
        <div className="bg-white border rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-semibold border-b pb-2 mb-3">
            Business Tools
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="border rounded-lg p-3 flex flex-col items-center text-sm hover:bg-gray-50">
              <Users size={20} /> Staff Payroll
            </button>
            <button className="border rounded-lg p-3 flex flex-col items-center text-sm hover:bg-gray-50">
              <User size={20} /> User Management
            </button>
            <button className="border rounded-lg p-3 flex flex-col items-center text-sm hover:bg-gray-50">
              <Clock size={20} /> Reminder System
            </button>
            <button className="border rounded-lg p-3 flex flex-col items-center text-sm hover:bg-gray-50">
              <MessageSquare size={20} /> SMS Marketing
            </button>
            <button className="border rounded-lg p-3 col-span-2 flex flex-col items-center text-sm hover:bg-gray-50">
              <Gift size={20} /> Rewards / Loyalty
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
