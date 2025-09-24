// src/components/SearchResults.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("q");

  // Simulate available pages in the app (this can be dynamically fetched later)
  const pages = [
    { title: "Dashboard", path: "/" },
    { title: "Admin Management", path: "/admin" },
    { title: "User Management", path: "/users" },
    { title: "Staff Management", path: "/staff&payroll/staffmanagement" },
    { title: "Payroll Management", path: "/staff&payroll/payrollmanagement" },
    { title: "Expense Management", path: "/expenses" },
    { title: "Shipping Charges", path: "/shipping" },
    { title: "Voice Assistant", path: "/voice" },
    { title: "Super Admin", path: "/superadmin" },
    { title: "POS", path: "/operations/pos" },
    { title: "Sales", path: "/operations/sales" },
    { title: "Returns & Refunds", path: "/operations/returns" },
    { title: "System Management", path: "/operations/system" },
    { title: "Table Management", path: "/operations/table" },
  ];

  // Filter pages based on the search query
  const filteredPages = pages.filter((page) =>
    page.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="dashboard-layout">
      <main className="page-content p-4">
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
        {query && query.length >= 3 ? (
          <div>
            <p>
              Showing results for: <span className="font-semibold">{query}</span>
            </p>
            {filteredPages.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {filteredPages.map((page) => (
                  <li key={page.path}>
                    <Link
                      to={page.path}
                      className="text-blue-600 hover:underline"
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No results found.</p>
            )}
          </div>
        ) : (
          <p>Please enter at least 3 characters to search.</p>
        )}
      </main>
    </div>
  );
};

export default SearchResults;
