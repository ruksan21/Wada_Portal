import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { useAuth } from "../Home/Context/AuthContext";
import "./AdminSettings.css";

const AdminSettings = () => {
  const { addNotification } = useAuth();
  const [settings, setSettings] = useState({
    siteName: "Digital Ward System",
    maintenanceMode: false,
    allowRegistration: true,
    language: "English",
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("adminSettings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("adminSettings", JSON.stringify(settings));
    addNotification("success", "Settings saved successfully.");
  };

  return (
    <AdminLayout title="Global Settings">
      <div className="admin-settings-container">
        <div className="settings-card">
          <h2 className="settings-title">System Configuration</h2>

          <div className="settings-grid">
            <div className="settings-item">
              <div className="settings-item-content">
                <p className="settings-item-label">Maintenance Mode</p>
                <p className="settings-item-description">
                  Disable access for users during updates
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) =>
                  handleChange("maintenanceMode", e.target.checked)
                }
                className="toggle-input"
              />
            </div>

            <div className="settings-item">
              <div className="settings-item-content">
                <p className="settings-item-label">Allow Public Registration</p>
                <p className="settings-item-description">
                  If disabled, only admins can create users
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.allowRegistration}
                onChange={(e) =>
                  handleChange("allowRegistration", e.target.checked)
                }
                className="toggle-input"
              />
            </div>

            <div className="select-field">
              <label className="select-label">Default Language</label>
              <select
                value={settings.language}
                onChange={(e) => handleChange("language", e.target.value)}
                className="settings-select"
              >
                <option>English</option>
                <option>Nepali</option>
              </select>
            </div>

            <button className="settings-save-btn" onClick={handleSave}>
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
