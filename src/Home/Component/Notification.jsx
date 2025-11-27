import { useState } from "react";
import "./Notification.css";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Sample notifications - भविष्यमा यो API बाट आउनेछ
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Work Assigned",
      message: "Road construction work has been assigned to your ward",
      time: "2 hours ago",
      read: false,
      type: "work",
    },
    {
      id: 2,
      title: "Meeting Scheduled",
      message: "Ward committee meeting tomorrow at 10 AM",
      time: "5 hours ago",
      read: false,
      type: "meeting",
    },
    {
      id: 3,
      title: "Budget Approved",
      message: "Your budget proposal has been approved",
      time: "1 day ago",
      read: true,
      type: "info",
    },
    {
      id: 4,
      title: "Complaint Received",
      message: "New complaint from Ward 5 resident",
      time: "2 days ago",
      read: false,
      type: "complaint",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleNotification = () => {
    setIsOpen(!isOpen);
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
    setIsOpen(false);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "work":
        return "🏗️";
      case "meeting":
        return "📅";
      case "info":
        return "ℹ️";
      case "complaint":
        return "📝";
      default:
        return "🔔";
    }
  };

  return (
    <div className="notification-container">
      <button className="notification-btn" onClick={toggleNotification}>
        <span className="notification-icon">🔔</span>
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="notification-overlay"
            onClick={toggleNotification}
          ></div>
          <div className="notification-dropdown">
            <div className="notification-header">
              <h3>Notifications</h3>
              <div className="notification-actions">
                {unreadCount > 0 && (
                  <button onClick={markAllAsRead} className="mark-all-btn">
                    Mark all as read
                  </button>
                )}
                {notifications.length > 0 && (
                  <button onClick={clearAll} className="clear-all-btn">
                    Clear all
                  </button>
                )}
              </div>
            </div>

            <div className="notification-list">
              {notifications.length === 0 ? (
                <div className="no-notifications">
                  <span className="no-notif-icon">🔕</span>
                  <p>No notifications</p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`notification-item ${
                      !notif.read ? "unread" : ""
                    }`}
                    onClick={() => markAsRead(notif.id)}
                  >
                    <div className="notif-icon">
                      {getNotificationIcon(notif.type)}
                    </div>
                    <div className="notif-content">
                      <h4>{notif.title}</h4>
                      <p>{notif.message}</p>
                      <span className="notif-time">{notif.time}</span>
                    </div>
                    {!notif.read && <div className="unread-dot"></div>}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Notification;
