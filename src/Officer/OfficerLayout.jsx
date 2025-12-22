import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Admin/Admin.css"; // Reuse styles for consistency
import { useAuth } from "../Home/Context/AuthContext";

const OfficerLayout = ({ children, title }) => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { path: "/officer", label: "Ward Overview", icon: "📊" },
    { path: "/officer/works", label: "Development Works", icon: "🏗️" },
    { path: "/officer/budgets", label: "Budgets", icon: "💰" },
    { path: "/officer/departments", label: "Departments", icon: "🏢" },
    { path: "/officer/complaints", label: "Complaints", icon: "📢" },
    { path: "/officer/notices", label: "Notices", icon: "📌" },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar officer-sidebar">
        <div className="admin-logo">
          <span>👮</span> Officer Panel
        </div>
        <div
          style={{
            padding: "0 20px 20px",
            fontSize: "0.85rem",
            color: "#a0aec0",
          }}
        >
          Ward No. {user?.ward || "1"}
        </div>
        <nav className="admin-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-nav-item ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <div
            className="admin-nav-item"
            onClick={handleLogout}
            style={{ marginTop: "auto", color: "#fc8181" }}
          >
            <span>🚪</span> Logout
          </div>
        </nav>
      </aside>
      <main className="admin-main">
        <header className="admin-header">
          <h1 className="admin-title">{title}</h1>
          <div className="admin-user-profile">
            <span>Officer: {user?.name || "Officer"}</span>
            <div
              style={{
                width: 35,
                height: 35,
                borderRadius: "50%",
                background: "#cbd5e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              O
            </div>
          </div>
        </header>
        <div className="admin-content">{children}</div>
      </main>
    </div>
  );
};

export default OfficerLayout;
