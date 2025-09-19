import React, { useState } from "react";
import Sidebar from "./common/Sidebar";
import Navbar from "./common/Navbar";
import "../styles/adminmanagement.css";
import { Calendar, Send, User, ScanFace, Users, Clock, MessageSquare, Gift } from "lucide-react";
import "../styles/dashboard.css"

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Stats Data
  const stats = [
    { title: "Total Users", value: "3,500", change: "+12% from last month" },
    { title: "Revenue", value: "$43,500", change: "+25% from last month" },
    { title: "Orders", value: "1500", change: "+10% from last month" },
    { title: "Growth", value: "15.5%", change: "+6% from last month" },
  ];

  // Recent Sales
  const recentSales = [
    { id: "#1234", amount: "$15.09", date: "July 18, 2025" },
    { id: "#1235", amount: "$42.00", date: "July 18, 2025" },
    { id: "#1236", amount: "$30.50", date: "July 18, 2025" },
  ];

  // Low Stock Alert
  const lowStock = [
    { id: "#5678", name: "Product A", qty: "5 left" },
    { id: "#5679", name: "Product B", qty: "2 left" },
  ];

  // Business Tools
  const tools = [
    { name: "Staff Payroll", icon: "👨‍💼" },
    { name: "User Management", icon: "👥" },
    { name: "Reminder System", icon: "⏰" },
    { name: "SMS Marketing", icon: "💬" },
    { name: "Rewards/Loyalty", icon: "🎁" },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar sidebarOpen={sidebarOpen} />

      <div className={`main-wrapper ${sidebarOpen ? "shifted" : "collapsed"}`}>
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="page-content">
          <h1>Dashboard</h1>
          <p style={{ display: "flex", justifyContent: "space-between" }}>
            Welcome back! Here's what's happening today.{" "}
            <span>
              <Calendar size={18} /> Tuesday, August 12, 2025
            </span>
          </p>

          {/* Stats Cards */}
          <div className="cards">
            {stats.map((item, index) => (
              <div
                className="card"
                key={index}
                style={{ border: "1px solid #8b8686ff" }}
              >
                <p style={{ color: "#000" }}>{item.title}</p>
                <h2 style={{ color: "#000" }}>{item.value}</h2>
                {/* <small style={{fontSize:"16px", padding:"8px 16px", display:"inline-block", textAlign:"center", borderRadius:"20px", backgroundColor:"#abf1b7ff"}}>{item.change}</small> */}
                <small
                  style={{
                    fontSize: "16px",
                    borderRadius: "20px",
                    backgroundColor: "#abf1b7ff",
                    padding: "8px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center", // vertical center
                    alignItems: "center", // horizontal center
                    lineHeight: "1.2", // reduce gap between lines
                    minHeight: "32px", // optional: keeps pill shape uniform
                    minWidth: "90px", // optional: makes all labels same width
                    textAlign: "center",
                  }}
                >
                  {item.change
                    .split(" ")
                    .map((word, i) =>
                      (i + 1) % 2 === 0 ? word + "\n" : word + " "
                    )
                    .join("")
                    .split("\n")
                    .map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                </small>
              </div>
            ))}
          </div>

          <div className="cards mid-row">
            {/* Sales Overview */}

          <div
            className="card sales-overview"
            style={{
              border: "1px solid #8b8686ff",
              padding: "16px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Sales Overview</h3>
              <div className="tabs">
                <button
                  style={{
                    borderRadius: "10px",
                    border: "none",
                    padding: "5px 8px",
                    fontSize: "15px",
                    margin: "5px",
                  }}
                >
                  Day
                </button>
                <button
                  style={{
                    borderRadius: "10px",
                    border: "none",
                    padding: "5px 8px",
                    fontSize: "15px",
                    margin: "5px",
                  }}
                >
                  Week
                </button>
                <button
                  style={{
                    borderRadius: "10px",
                    border: "none",
                    padding: "5px 8px",
                    fontSize: "15px",
                    margin: "5px",
                  }}
                >
                  Month
                </button>
                <button
                  style={{
                    background: "#000",
                    color: "#fff",
                    borderRadius: "10px",
                    border: "none",
                    padding: "5px 8px",
                    fontSize: "15px",
                    margin: "5px",
                  }}
                >
                  Year
                </button>
              </div>
            </div>

            {/* Placeholder for chart */}
            <div className="chart-placeholder"
              style={{
                height: "250px",
                border: "1px solid #007bff",
                borderRadius: "12px",
                marginTop: "16px",
              }}
            ></div>
          </div>

          {/* AI Assistant */}
            <div className="card ai-assistant"
  style={{
    border: "1px solid #8b8686ff",
    display: "flex",
    flexDirection: "column",
    gridRow: "span 1",
    height: "89%",        // ensures it matches row height
  }}
>
  <h3 style={{ margin: "8px 0", fontSize:"30px" }}>AI Assistant</h3> {/* minimal top space */}

  <div className="chat" style={{ marginBottom:"50px", padding:"20px", backgroundColor:"#d3d2d2ff", borderRadius:"20px" }}>
    <div className="message robot" style={{display:"flex"}}>
      <div className="avatar" style={{marginTop:"30px", marginLeft:"10px"}}><ScanFace size={30}/></div>
      <div className="bubble" style={{backgroundColor:"#fff", borderRadius:"20px", marginLeft:"10px", padding:"10px"}}>
        Good Morning! Your sales are up 12% compared to last month.
        Would you like to see the detailed report?
      </div>
    </div>

    <div className="action-row" style={{display:"flex", gap:"5px", marginLeft:'70px', marginTop:"20px"}}>
      <button className="btn-pill" style={{borderRadius:"12px", border:"none", backgroundColor:"#000", color:"#fff", padding:"8px"}}>Yes, show me the report</button>
      <div className="user-avatar"><User size={22} /></div>
    </div>
  </div>

  <div className="chat-input" style={{ width: "100%" }}>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      border: "1px solid #ccc",
      overflow: "hidden",
      width: "100%",
    }}
  >
    <input
      type="text"
      placeholder="Ask anything......."
      style={{
        flex: 1,
        border: "none",
        outline: "none",
        padding: "8px 12px",
        fontSize: "14px",
      }}
    />
    <button
      className="send-btn"
      aria-label="send"
      style={{
        border: "none",
        background: "transparent",
        padding: "8px 12px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Send size={16} style={{backgroundColor:"#000", color:"#fff", padding:"2px"}} />
    </button>
  </div>
</div>

</div>

          </div>
          
<div
  className="cards bottom-row"
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "16px",
    marginTop: "16px",
  }}
>
  {/* Recent Sales */}
  <div
    className="card"
    style={{
      border: "1px solid #8b8686ff",
      borderRadius: "12px",
      padding:"12px"
    }}
  >
    <h3 style={{ marginBottom: "20px", borderBottom: "3px solid #ccc", fontSize:'30px' }}>Recent Sales</h3>
    <div
      className="sale-item"
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid #ccc",
        padding: "6px 0",
        marginTop:"50px"
      }}
    >
      <div>
        <div>Order #1234</div>
        <small>July 18, 2025</small>
      </div>
      <div>$15.09</div>
    </div>

     <div
      className="sale-item"
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid #ccc",
        padding: "6px 0",
      }}
    >
      <div>
        <div>Order #1234</div>
        <small>July 18, 2025</small>
      </div>
      <div>$15.09</div>
    </div>
     <div
      className="sale-item"
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid #ccc",
        padding: "6px 0",
      }}
    >
      <div>
        <div>Order #1234</div>
        <small>July 18, 2025</small>
      </div>
      <div>$15.09</div>
    </div>
    <div
      className="sale-item"
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid #ccc",
        padding: "6px 0",
      }}
    >
      <div>
        <div>Order #1234</div>
        <small>July 18, 2025</small>
      </div>
      <div>$15.09</div>
    </div>
    
  </div>

  {/* Low Stock Alert */}
  <div
    className="card"
    style={{
      border: "1px solid #8b8686ff",
      borderRadius: "12px",
      padding:"12px"
    }}
  >
    <h3 style={{ marginBottom: "20px", borderBottom: "3px solid #ccc", fontSize:'30px' }}>Low Stock Alert</h3>
    <div
      className="sale-item"
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid #ccc",
        padding: "6px 0",
        marginTop:"50px"
      }}
    >
      <div>
        <div>Order #1234</div>
        <small>July 18, 2025</small>
      </div>
      <div>$15.09</div>
    </div>

     <div
      className="sale-item"
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid #ccc",
        padding: "6px 0",
      }}
    >
      <div>
        <div>Order #1234</div>
        <small>July 18, 2025</small>
      </div>
      <div>$15.09</div>
    </div>
     <div
      className="sale-item"
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid #ccc",
        padding: "6px 0",
      }}
    >
      <div>
        <div>Order #1234</div>
        <small>July 18, 2025</small>
      </div>
      <div>$15.09</div>
    </div>
    <div
      className="sale-item"
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid #ccc",
        padding: "6px 0",
      }}
    >
      <div>
        <div>Order #1234</div>
        <small>July 18, 2025</small>
      </div>
      <div>$15.09</div>
    </div>
    
  </div>

  {/* Business Tools */}
  <div
    className="card"
    style={{
      border: "1px solid #8b8686ff",
      borderRadius: "12px",
      padding: "12px",
    }}
  >
    <h3 style={{ marginBottom: "20px", borderBottom: "3px solid #ccc", fontSize:'30px' }}>Business Tools</h3>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px",
      }}
    >
      <button
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "12px",
          background: "#fff",
          cursor: "pointer",
          display: "flex",
          flexDirection:"column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Users size={18} /> Staff Payroll
      </button>

      <button
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "12px",
          background: "#fff",
          cursor: "pointer",
          display: "flex",
          flexDirection:"column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <User size={18} /> User Management
      </button>

      <button
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "12px",
          background: "#fff",
          cursor: "pointer",
          display: "flex",
          flexDirection:"column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Clock size={18} /> Reminder System
      </button>

      <button
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "12px",
          background: "#fff",
          cursor: "pointer",
          display: "flex",
          flexDirection:"column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <MessageSquare size={18} /> SMS Marketing
      </button>

      <button
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "12px",
          background: "#fff",
          cursor: "pointer",
          display: "flex",
          flexDirection:"column",
          alignItems: "center",
          gap: "8px",
          gridColumn: "span 2",
          margin:"0 80px"
        }}
      >
        <Gift size={18} /> Rewards / Loyalty System
      </button>
    </div>
  </div>
</div>
         

         
          
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
