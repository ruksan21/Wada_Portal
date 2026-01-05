import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../Home/Context/AuthContext";
import "./Admin.css";
import "./AdminLayout.css";

const AdminLayout = ({ children, title }) => {
  const { user, logout, pendingOfficers, notifications } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  // Calculate total notifications count
  const notifyCount =
    (notifications?.length || 0) + (pendingOfficers?.length || 0);

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <span>🛡️</span> Admin Panel
        </div>
        <nav className="admin-nav">
          <Link
            to="/admin"
            className={`admin-nav-item ${
              location.pathname === "/admin" ? "active" : ""
            }`}
          >
            📊 Dashboard
          </Link>
          <div className="admin-nav-divider"></div>
          <Link to="/" className="admin-nav-item home-link">
            🏠 Go to Home
          </Link>
          <div className="admin-nav-divider"></div>
          <Link
            to="/admin/wards"
            className={`admin-nav-item ${
              isActive("/admin/wards") ? "active" : ""
            }`}
          >
            🏘️ Wards
          </Link>
          <Link
            to="/admin/officers"
            className={`admin-nav-item ${
              isActive("/admin/officers") ? "active" : ""
            }`}
          >
            👮 Officers
          </Link>
          <Link
            to="/admin/users"
            className={`admin-nav-item ${
              isActive("/admin/users") ? "active" : ""
            }`}
          >
            👥 Users
          </Link>

          <Link
            to="/admin/complaints"
            className={`admin-nav-item ${
              isActive("/admin/complaints") ? "active" : ""
            }`}
          >
            💬 Complaints
          </Link>
          <Link
            to="/admin/settings"
            className={`admin-nav-item ${
              isActive("/admin/settings") ? "active" : ""
            }`}
          >
            ⚙️ Settings
          </Link>
          <div onClick={logout} className="admin-nav-item logout">
            🚪 Logout
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <header className="admin-header">
          <h2 className="admin-title">
            {title ||
              (location.pathname === "/admin"
                ? "Dashboard"
                : location.pathname.split("/").pop().charAt(0).toUpperCase() +
                  location.pathname.split("/").pop().slice(1))}
          </h2>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* Conditional Notification Bell - Shows ONLY if there are notifications */}
            {notifyCount > 0 && (
              <div
                className="admin-notification-bell"
                style={{ position: "relative", cursor: "pointer" }}
                onClick={() => (window.location.href = "/admin/officers")}
                title="View Pending Applications"
              >
                <span style={{ fontSize: "1.5rem" }}>🔔</span>
                <span
                  className="notification-badge"
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    width: "18px",
                    height: "18px",
                    fontSize: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                  }}
                >
                  {notifyCount}
                </span>
              </div>
            )}

            <div className="admin-user-profile">
              <span>{user?.name || "Admin"}</span>
              <div className="profile-avatar-circle">
                {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
              </div>
            </div>
          </div>
        </header>

        <div className="admin-content">{children || <Outlet />}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
