import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import "./AlertCentre.css";

const AlertCentre = () => {
  const [filterType, setFilterType] = useState("all");

  // Mock alerts data - in real app, these would come from backend
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "warning",
      title: "High Traffic Alert",
      message: "System received 500+ concurrent users",
      timestamp: "2024-12-20 14:30",
      status: "unread",
    },
    {
      id: 2,
      type: "error",
      title: "Failed User Registration",
      message: "Officer registration failed: Invalid document",
      timestamp: "2024-12-20 13:15",
      status: "read",
    },
    {
      id: 3,
      type: "info",
      title: "System Update Completed",
      message: "Database migration completed successfully",
      timestamp: "2024-12-20 12:00",
      status: "read",
    },
    {
      id: 4,
      type: "success",
      title: "Officer Approved",
      message: "New officer application approved: Ram Bahadur",
      timestamp: "2024-12-19 16:45",
      status: "read",
    },
    {
      id: 5,
      type: "warning",
      title: "Low Storage Space",
      message: "Only 15% disk space remaining",
      timestamp: "2024-12-19 10:20",
      status: "unread",
    },
  ]);

  const filteredAlerts =
    filterType === "all"
      ? alerts
      : alerts.filter((alert) => alert.type === filterType);

  const handleMarkAsRead = (id) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, status: "read" } : alert
      )
    );
  };

  const handleDelete = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm("Clear all alerts?")) {
      setAlerts([]);
    }
  };

  const getAlertIcon = (type) => {
    const icons = {
      error: "❌",
      warning: "⚠️",
      info: "ℹ️",
      success: "✅",
    };
    return icons[type] || "📢";
  };

  const getAlertColor = (type) => {
    const colors = {
      error: "#ef4444",
      warning: "#f59e0b",
      info: "#3b82f6",
      success: "#10b981",
    };
    return colors[type] || "#64748b";
  };

  return (
    <AdminLayout title="Alert Centre">
      <div className="alert-centre-container">
        <div className="alert-header">
          <div>
            <h2 className="alert-title">System Alerts & Notifications</h2>
            <p className="alert-subtitle">
              {alerts.length} total alerts
              {alerts.filter((a) => a.status === "unread").length > 0 &&
                ` • ${alerts.filter((a) => a.status === "unread").length} unread`}
            </p>
          </div>
          <div className="alert-actions">
            <button
              className="btn-secondary"
              onClick={handleClearAll}
              disabled={alerts.length === 0}
            >
              Clear All
            </button>
          </div>
        </div>

        <div className="alert-filters">
          <button
            className={`filter-btn ${filterType === "all" ? "active" : ""}`}
            onClick={() => setFilterType("all")}
          >
            All ({alerts.length})
          </button>
          <button
            className={`filter-btn ${filterType === "error" ? "active" : ""}`}
            onClick={() => setFilterType("error")}
          >
            Error (
            {alerts.filter((a) => a.type === "error").length})
          </button>
          <button
            className={`filter-btn ${filterType === "warning" ? "active" : ""}`}
            onClick={() => setFilterType("warning")}
          >
            Warning (
            {alerts.filter((a) => a.type === "warning").length})
          </button>
          <button
            className={`filter-btn ${filterType === "info" ? "active" : ""}`}
            onClick={() => setFilterType("info")}
          >
            Info (
            {alerts.filter((a) => a.type === "info").length})
          </button>
          <button
            className={`filter-btn ${filterType === "success" ? "active" : ""}`}
            onClick={() => setFilterType("success")}
          >
            Success (
            {alerts.filter((a) => a.type === "success").length})
          </button>
        </div>

        <div className="alerts-list">
          {filteredAlerts.length === 0 ? (
            <div className="no-alerts">
              <span style={{ fontSize: "2rem" }}>🎉</span>
              <p>No alerts found</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`alert-item ${alert.status} ${alert.type}`}
                style={{
                  borderLeftColor: getAlertColor(alert.type),
                }}
              >
                <div className="alert-icon">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="alert-content">
                  <div className="alert-header-row">
                    <h4 className="alert-item-title">{alert.title}</h4>
                    <span className="alert-time">{alert.timestamp}</span>
                  </div>
                  <p className="alert-message">{alert.message}</p>
                  {alert.status === "unread" && (
                    <div className="unread-badge">Unread</div>
                  )}
                </div>
                <div className="alert-actions-row">
                  {alert.status === "unread" && (
                    <button
                      className="action-btn-small"
                      onClick={() => handleMarkAsRead(alert.id)}
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    className="action-btn-small delete"
                    onClick={() => handleDelete(alert.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AlertCentre;
