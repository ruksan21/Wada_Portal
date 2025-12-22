import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import NotificationPanel from "../Component/NotificationPanel";
import "./ProfileSection.css";
import "./Settings.css";

const Settings = () => {
  const { logout, addNotification, notifications, removeNotification } =
    useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("security");

  // Settings state
  const [settings, setSettings] = useState({
    theme: "light",
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });

  // Password state
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Toggle handler
  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });

    // TODO: Backend integration - Save to database
    // Example API call:
    // await fetch('http://localhost/ward-portal/api/update_settings.php', {
    //   method: 'POST',
    //   body: JSON.stringify({ userId: user.id, setting: key, value: !settings[key] })
    // });
  };

  // Password change handler
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      addNotification("error", "Passwords do not match!");
      return;
    }

    // TODO: Backend integration - Verify old password and update new password
    try {
      /* Example API call:
      const response = await fetch('http://localhost/ward-portal/api/change_password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword
        })
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        addNotification("success", "Password changed successfully!");
        setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        addNotification("error", "Error: " + data.message); // e.g., "Old password is incorrect"
      }
      */

      // Current mock implementation
      addNotification("success", "Password changed successfully!");
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error changing password:", error);
      addNotification("error", "Failed to change password. Please try again.");
    }
  };

  // Delete account handler
  const handleDeleteAccount = async () => {
    // TODO: Backend integration - Delete user from database
    try {
      /* Example API call:
      const response = await fetch('http://localhost/ward-portal/api/delete_account.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        // Account deleted successfully
        addNotification("success", "Account deleted successfully!");
        logout(); // Logout user
        navigate("/login"); // Redirect to login
      } else {
        addNotification("error", "Error: " + data.message);
      }
      */

      // Current mock implementation
      addNotification("success", "Account deleted successfully!");
      setShowDeleteModal(false);

      // Logout user after deleting account
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Error deleting account:", error);
      addNotification("error", "Failed to delete account. Please try again.");
    }
  };

  return (
    <>
      <NotificationPanel
        notifications={notifications}
        onClose={removeNotification}
      />
      <div className="profile-layout">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="settings-sidebar-header">
            <h2>Settings</h2>
            <p>Manage your account preferences</p>
          </div>

          <nav className="sidebar-nav">
            <button
              className={`sidebar-link ${
                activeTab === "general" ? "active" : ""
              }`}
              onClick={() => setActiveTab("general")}
            >
              <i className="fa-solid fa-sliders"></i> General
            </button>
            <button
              className={`sidebar-link ${
                activeTab === "notifications" ? "active" : ""
              }`}
              onClick={() => setActiveTab("notifications")}
            >
              <i className="fa-regular fa-bell"></i> Notifications
            </button>
            <button
              className={`sidebar-link ${
                activeTab === "privacy" ? "active" : ""
              }`}
              onClick={() => setActiveTab("privacy")}
            >
              <i className="fa-solid fa-lock"></i> Privacy
            </button>
            <button
              className={`sidebar-link ${
                activeTab === "security" ? "active" : ""
              }`}
              onClick={() => setActiveTab("security")}
            >
              <i className="fa-solid fa-shield-halved"></i> Security
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="profile-content">
          {/* General Tab */}
          {activeTab === "general" && (
            <div className="content-card">
              <div className="card-header">
                <h2>General Settings</h2>
              </div>
              <div className="card-body">
                <p>General settings coming soon...</p>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="content-card">
              <div className="card-header">
                <h2>Notification Settings</h2>
              </div>
              <div className="card-body">
                <div className="settings-group">
                  <div className="setting-row">
                    <div className="setting-info">
                      <h3>Email Notification</h3>
                      <p>Receive notifications via email</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={() => handleToggle("emailNotifications")}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="setting-row">
                    <div className="setting-info">
                      <h3>SMS Notification</h3>
                      <p>Receive important updates via SMS</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.smsNotifications}
                        onChange={() => handleToggle("smsNotifications")}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="setting-row">
                    <div className="setting-info">
                      <h3>Push Notification</h3>
                      <p>Receive push notifications on your device</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.pushNotifications}
                        onChange={() => handleToggle("pushNotifications")}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === "privacy" && (
            <div className="content-card">
              <div className="card-header">
                <h2>Privacy Settings</h2>
              </div>
              <div className="card-body">
                <p>Privacy settings coming soon...</p>
              </div>
            </div>
          )}
          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="content-card">
              <div className="card-header">
                <h2>Security Settings</h2>
              </div>
              <div className="card-body">
                <div className="settings-group highlight-bg">
                  <h3>Change Password</h3>
                  <p>Update your password regularly for better security</p>
                  <form
                    onSubmit={handlePasswordChange}
                    className="password-form"
                  >
                    <div className="form-group">
                      <label>Old Password</label>
                      <input
                        type="password"
                        value={passwordData.oldPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            oldPassword: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>New Password</label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            newPassword: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            confirmPassword: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <button type="submit" className="btn-primary mt-2">
                      Change Password
                    </button>
                  </form>
                </div>

                <div className="settings-group danger-bg">
                  <h3 className="text-danger">Delete Account</h3>
                  <p className="text-danger">
                    This action is irreversible. Please consider carefully.
                  </p>
                  <button
                    className="btn-danger mt-2"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Delete Account Modal */}
        {showDeleteModal && (
          <div
            className="modal-overlay"
            onClick={() => setShowDeleteModal(false)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>⚠️ Delete Account</h2>
                <button
                  className="modal-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </p>
                <p className="text-danger">
                  All your data, including posts, comments, and personal
                  information will be permanently deleted.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button className="btn-danger" onClick={handleDeleteAccount}>
                  Yes, Delete My Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Settings;
