import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: true,
    language: "ne",
    theme: "light",
    publicProfile: true,
    showEmail: false,
    showPhone: true,
  });

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleSelect = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <h1>⚙️ Settings</h1>
          <p>Manage your account preferences and settings</p>
        </div>

        {/* Notifications Settings */}
        <div className="settings-section">
          <h2>🔔 Notifications</h2>
          <p className="section-description">
            Choose how you want to receive notifications
          </p>

          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <h3>Email Notifications</h3>
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

            <div className="setting-item">
              <div className="setting-info">
                <h3>Push Notifications</h3>
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

            <div className="setting-item">
              <div className="setting-info">
                <h3>SMS Notifications</h3>
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
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="settings-section">
          <h2>🎨 Appearance</h2>
          <p className="section-description">Customize how the app looks</p>

          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <h3>Language</h3>
                <p>Select your preferred language</p>
              </div>
              <select
                className="setting-select"
                value={settings.language}
                onChange={(e) => handleSelect("language", e.target.value)}
              >
                <option value="ne">नेपाली</option>
                <option value="en">English</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Theme</h3>
                <p>Choose your display theme</p>
              </div>
              <select
                className="setting-select"
                value={settings.theme}
                onChange={(e) => handleSelect("theme", e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="settings-section">
          <h2>🔒 Privacy</h2>
          <p className="section-description">
            Control your privacy and data sharing
          </p>

          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <h3>Public Profile</h3>
                <p>Make your profile visible to everyone</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.publicProfile}
                  onChange={() => handleToggle("publicProfile")}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Show Email Address</h3>
                <p>Display your email on your public profile</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.showEmail}
                  onChange={() => handleToggle("showEmail")}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Show Phone Number</h3>
                <p>Display your phone number on your public profile</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.showPhone}
                  onChange={() => handleToggle("showPhone")}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="settings-section">
          <h2>👤 Account</h2>
          <p className="section-description">
            Manage your account and security
          </p>

          <div className="settings-list">
            <button className="action-btn">
              <span className="btn-icon">🔑</span>
              <div className="btn-content">
                <h3>Change Password</h3>
                <p>Update your password</p>
              </div>
              <span className="btn-arrow">→</span>
            </button>

            <button className="action-btn">
              <span className="btn-icon">🔐</span>
              <div className="btn-content">
                <h3>Two-Factor Authentication</h3>
                <p>Add an extra layer of security</p>
              </div>
              <span className="btn-arrow">→</span>
            </button>

            <button className="action-btn">
              <span className="btn-icon">📱</span>
              <div className="btn-content">
                <h3>Connected Devices</h3>
                <p>Manage devices logged into your account</p>
              </div>
              <span className="btn-arrow">→</span>
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="settings-section danger-section">
          <h2>⚠️ Danger Zone</h2>
          <p className="section-description">
            Irreversible and destructive actions
          </p>

          <div className="settings-list">
            <button className="action-btn danger-btn">
              <span className="btn-icon">🗑️</span>
              <div className="btn-content">
                <h3>Delete Account</h3>
                <p>Permanently delete your account and all data</p>
              </div>
              <span className="btn-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
