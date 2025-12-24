import React, { useEffect } from "react";
import "./NotificationPanel.css";

/**
 * NotificationPanel Component
 * Displays notifications on the right side of the screen
 *
 * Props:
 * - notifications: Array of notification objects { id, type, message }
 * - onClose: Function to remove notification by id
 */
const NotificationPanel = ({ notifications, onClose }) => {
  // Auto-dismiss notifications after 5 seconds
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        onClose(notifications[0].id);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notifications, onClose]);

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "info":
        return "ℹ";
      case "warning":
        return "⚠";
      default:
        return "ℹ";
    }
  };

  return (
    <div className="notification-panel">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type}`}
        >
          <div className="notification-icon">{getIcon(notification.type)}</div>
          <div className="notification-message">{notification.message}</div>
          <button
            className="notification-close"
            onClick={() => onClose(notification.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationPanel;
