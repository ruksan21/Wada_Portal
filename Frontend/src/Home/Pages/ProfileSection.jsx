import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";

import { API_ENDPOINTS } from "../../config/api";
import "./ProfileSection.css";

const ProfileSection = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="profile-layout">
      {/* Sidebar */}
      <div className="profile-sidebar">
        <div className="user-profile-summary">
          <div className="profile-avatar-large">
            {user?.photoUrl || user?.profileImage ? (
              <img
                src={user?.photoUrl || user?.profileImage}
                alt="Profile"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              user?.name?.charAt(0) || "U"
            )}
          </div>
          <h3>{user?.name || "User Name"}</h3>
          <p className="profile-role">
            {user?.ward ? `Ward No. ${user.ward.replace("Ward ", "")}` : "User"}
          </p>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`sidebar-link ${
              activeTab === "personal" ? "active" : ""
            }`}
            onClick={() => setActiveTab("personal")}
          >
            <i className="fa-regular fa-user"></i> Personal Information
          </button>

          <button
            className={`sidebar-link ${
              activeTab === "preferences" ? "active" : ""
            }`}
            onClick={() => setActiveTab("preferences")}
          >
            <i className="fa-solid fa-gear"></i> Preferences
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="profile-content">
        {activeTab === "personal" && (
          <div className="content-card">
            <div className="card-header">
              <h2>Personal Information</h2>
              {!isEditing && (
                <button className="btn-edit" onClick={() => setIsEditing(true)}>
                  Edit
                </button>
              )}
            </div>
            <div className="card-body">
              {isEditing ? (
                <div className="profile-view-details">
                  <div className="coming-soon-badge" style={{ marginTop: 0 }}>
                    <i className="fa-solid fa-hourglass-half"></i>
                    <span>Profile editing feature coming soon</span>
                  </div>
                  <button
                    className="btn-secondary"
                    onClick={() => setIsEditing(false)}
                    style={{
                      marginTop: "1.5rem",
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="profile-view-details">
                  <div className="details-section basic-info">
                    <h4 className="section-label">Basic Information</h4>
                    <div className="details-grid">
                      <div className="detail-item">
                        <label>Full Name</label>
                        <p>
                          {`${user?.first_name || ""} ${
                            user?.middle_name ? user.middle_name + " " : ""
                          }${user?.last_name || ""}`.trim() ||
                            user?.name ||
                            "N/A"}
                        </p>
                      </div>
                      <div className="detail-item">
                        <label>Email</label>
                        <p>{user?.email || "N/A"}</p>
                      </div>
                      <div className="detail-item">
                        <label>Phone Number</label>
                        <p>{user?.contact_number || user?.phone || "N/A"}</p>
                      </div>
                      <div className="detail-item">
                        <label>Role</label>
                        <p style={{ textTransform: "capitalize" }}>
                          {user?.role || "Citizen"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="details-section">
                    <h4 className="section-label">Additional Details</h4>
                    <div className="details-grid">
                      <div className="detail-item">
                        <label>Gender</label>
                        <p>{user?.gender || "N/A"}</p>
                      </div>
                      <div className="detail-item">
                        <label>Date of Birth</label>
                        <p>{user?.dob || "N/A"}</p>
                      </div>
                      <div className="detail-item">
                        <label>Occupation</label>
                        <p>{user?.occupation || "N/A"}</p>
                      </div>
                      <div className="detail-item">
                        <label>Province</label>
                        <p>{user?.province || "N/A"}</p>
                      </div>
                      <div className="detail-item">
                        <label>District</label>
                        <p>{user?.district || "N/A"}</p>
                      </div>
                      <div className="detail-item">
                        <label>Municipality</label>
                        <p>{user?.city || user?.municipality || "N/A"}</p>
                      </div>
                      <div className="detail-item">
                        <label>Ward No.</label>
                        <p>{user?.ward_number || user?.ward || "N/A"}</p>
                      </div>
                      <div className="detail-item">
                        <label>Citizenship Number</label>
                        <p>{user?.citizenship_number || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "preferences" && (
          <div className="content-card">
            <div className="card-header">
              <h2>Notification Settings</h2>
            </div>
            <div className="card-body">
              <div className="notification-settings">
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Email Notification</h4>
                    <p>Receive notifications via email</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" disabled />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>SMS Notification</h4>
                    <p>Receive important updates via SMS</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" disabled />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Push Notification</h4>
                    <p>Receive push notifications on your device</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" disabled />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="coming-soon-badge">
                  <i className="fa-solid fa-hourglass-half"></i>
                  <span>Settings coming soon</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
