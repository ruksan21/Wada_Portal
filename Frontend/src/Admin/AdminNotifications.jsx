import React, { useState, useEffect, useCallback } from "react";
import AdminLayout from "./AdminLayout";
import { API_ENDPOINTS } from "../config/api";
import "./AdminNotifications.css";

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "system",
    source_ward: "",
  });
  const [stats, setStats] = useState({
    total: 0,
  });

  const fetchNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${API_ENDPOINTS.notifications.getAll}?limit=500`
      );
      const data = await response.json();

      if (data.success) {
        setNotifications(data.notifications);
        setStats({ total: data.notifications.length });
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    let filtered = notifications;
    if (filterType !== "all") {
      filtered = filtered.filter((n) => n.type === filterType);
    }
    setFilteredNotifications(filtered);
  }, [notifications, filterType]);

  const handleCreateNotification = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_ENDPOINTS.notifications.create, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Notification created successfully!");
        setIsCreateModalOpen(false);
        setFormData({
          title: "",
          message: "",
          type: "system",
          source_ward: "",
        });
        fetchNotifications();
      } else {
        alert("Failed: " + data.message);
      }
    } catch (error) {
      console.error("Error creating notification:", error);
      alert("Failed to create notification");
    }
  };

  const handleDelete = async (id, origin = "notification") => {
    if (!window.confirm("Delete this notification?")) return;

    try {
      const response = await fetch(API_ENDPOINTS.notifications.manage, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id, origin }),
      });

      const data = await response.json();
      if (data.success) {
        fetchNotifications();
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const handleDeleteAll = async () => {
    if (
      !window.confirm(
        "Delete ALL notifications permanently? This cannot be undone!"
      )
    )
      return;

    try {
      const response = await fetch(API_ENDPOINTS.notifications.manage, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete_all" }),
      });

      const data = await response.json();
      if (data.success) {
        fetchNotifications();
      }
    } catch (error) {
      console.error("Error deleting all:", error);
    }
  };

  const getTypeIcon = (type) => {
    const icons = {
      notice: "📢",
      complaint: "📝",
      work: "🏗️",
      budget: "💰",
      activity: "📅",
      meeting: "🤝",
      alert: "⚠️",
      system: "🔔",
    };
    return icons[type] || "🔔";
  };

  const getTypeColor = (type) => {
    const colors = {
      notice: "#3b82f6",
      complaint: "#f59e0b",
      work: "#10b981",
      budget: "#8b5cf6",
      activity: "#06b6d4",
      meeting: "#f97316",
      alert: "#ef4444",
      system: "#64748b",
    };
    return colors[type] || "#64748b";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 7) {
      return date.toLocaleDateString();
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  };

  return (
    <AdminLayout title="System Notifications">
      <div className="admin-notifications-container">
        {/* Simplified Header Stats */}
        <div className="notification-stats-premium">
          <div className="stat-card-simple">
            <div className="stat-icon-wrapper">
              <span className="stat-main-icon">🔔</span>
            </div>
            <div className="stat-details">
              <h3>{stats.total}</h3>
              <p>Total Records</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="notification-toolbar">
          <div className="filter-group">
            <label>Filter by Type:</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="toolbar-select"
            >
              <option value="all">📁 All Types</option>
              <option value="system">🔔 System</option>
              <option value="notice">📢 Notice</option>
              <option value="complaint">📝 Complaint</option>
              <option value="work">🏗️ Work</option>
              <option value="budget">💰 Budget</option>
              <option value="activity">📅 Activity</option>
              <option value="meeting">🤝 Meeting</option>
              <option value="alert">⚠️ Alert</option>
            </select>
          </div>

          <div className="toolbar-actions">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="btn-create-premium"
            >
              <span>+</span> Create Notice
            </button>
            <button
              onClick={handleDeleteAll}
              className="btn-destructive-outline"
            >
              🗑️ Purge All
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="notifications-list-premium">
          {isLoading ? (
            <div className="loading-state">Loading records...</div>
          ) : filteredNotifications.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📂</div>
              <h3>Nothing to show</h3>
              <p>No notifications match the current filters.</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={`${notification.origin}-${notification.id}`}
                className="notification-card-premium"
              >
                <div
                  className="card-icon-aside"
                  style={{
                    backgroundColor: getTypeColor(notification.type) + "15",
                    color: getTypeColor(notification.type),
                  }}
                >
                  {getTypeIcon(notification.type)}
                </div>

                <div className="card-body">
                  <div className="card-header-row">
                    <div className="title-area">
                      <h4>{notification.title}</h4>
                      {notification.origin === "system_alert" && (
                        <span className="system-tag">SYSTEM</span>
                      )}
                    </div>
                    <span className="time-stamp">
                      {formatDate(notification.created_at)}
                    </span>
                  </div>
                  <p className="message-text">{notification.message}</p>
                  {(notification.source_municipality ||
                    notification.source_ward) && (
                    <div className="location-footer">
                      📍 {notification.source_municipality || "Internal System"}
                      {notification.source_ward &&
                        ` • Ward ${notification.source_ward}`}
                    </div>
                  )}
                </div>

                <div className="card-actions-aside">
                  <button
                    onClick={() =>
                      handleDelete(notification.id, notification.origin)
                    }
                    className="delete-icon-btn"
                    title="Delete Permanently"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Simplified Create Modal */}
        {isCreateModalOpen && (
          <div
            className="custom-modal-overlay"
            onClick={() => setIsCreateModalOpen(false)}
          >
            <div
              className="premium-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="premium-modal-header">
                <h2>Broadcast New Notice</h2>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="close-x"
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={handleCreateNotification}
                className="premium-form"
              >
                <div className="form-field">
                  <label>Subject Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g. Important Update for Citizens"
                  />
                </div>

                <div className="form-field">
                  <label>Message Content</label>
                  <textarea
                    required
                    rows="4"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Provide full details of the notice..."
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label>Notice Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                    >
                      <option value="system">System</option>
                      <option value="notice">Notice</option>
                      <option value="alert">Alert</option>
                      <option value="meeting">Meeting</option>
                      <option value="work">Work</option>
                      <option value="budget">Budget</option>
                      <option value="activity">Activity</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Target Ward (Optional)</label>
                    <input
                      type="number"
                      value={formData.source_ward}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          source_ward: e.target.value,
                        })
                      }
                      placeholder="Ward No."
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="btn-ghost"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary-action">
                    Send Notification
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminNotifications;
