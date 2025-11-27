import React, { useState } from "react";
import "./MyProfile.css";

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "राम बहादुर श्रेष्ठ",
    nameEn: "Ram Bahadur Shrestha",
    role: "Ward Chairperson",
    ward: "Ward 5",
    municipality: "Kathmandu Metropolitan City",
    phone: "+977 9841234567",
    email: "ram.shrestha@kathmandu.gov.np",
    address: "Thamel, Kathmandu",
    joinedDate: "January 15, 2023",
    bio: "Dedicated to serving the community and improving local infrastructure and services.",
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditedProfile({ ...editedProfile, [field]: value });
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-header-bg"></div>
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <span className="avatar-text">👤</span>
              <button className="avatar-edit-btn">📷</button>
            </div>
            <div className="profile-title">
              <h1>{profile.name}</h1>
              <p>
                {profile.role} • {profile.ward}
              </p>
              <p className="municipality-name">{profile.municipality}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="profile-stats">
          <div className="stat-item">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>156</h3>
              <p>Total Works</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>142</h3>
              <p>Completed</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <h3>4.8</h3>
              <p>Rating</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>2.5k</h3>
              <p>Followers</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="profile-content">
          {/* Personal Information */}
          <div className="profile-section">
            <div className="section-header">
              <h2>Personal Information</h2>
              {!isEditing ? (
                <button className="edit-btn" onClick={handleEdit}>
                  ✏️ Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="cancel-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button className="save-btn" onClick={handleSave}>
                    💾 Save
                  </button>
                </div>
              )}
            </div>

            <div className="info-grid">
              <div className="info-item">
                <label>Full Name (Nepali)</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                ) : (
                  <p>{profile.name}</p>
                )}
              </div>

              <div className="info-item">
                <label>Full Name (English)</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.nameEn}
                    onChange={(e) => handleChange("nameEn", e.target.value)}
                  />
                ) : (
                  <p>{profile.nameEn}</p>
                )}
              </div>

              <div className="info-item">
                <label>Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedProfile.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                ) : (
                  <p>{profile.phone}</p>
                )}
              </div>

              <div className="info-item">
                <label>Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                ) : (
                  <p>{profile.email}</p>
                )}
              </div>

              <div className="info-item full-width">
                <label>Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                  />
                ) : (
                  <p>{profile.address}</p>
                )}
              </div>

              <div className="info-item full-width">
                <label>Bio</label>
                {isEditing ? (
                  <textarea
                    value={editedProfile.bio}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    rows="3"
                  />
                ) : (
                  <p>{profile.bio}</p>
                )}
              </div>
            </div>
          </div>

          {/* Official Information */}
          <div className="profile-section">
            <div className="section-header">
              <h2>Official Information</h2>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <label>Position</label>
                <p>{profile.role}</p>
              </div>

              <div className="info-item">
                <label>Ward Number</label>
                <p>{profile.ward}</p>
              </div>

              <div className="info-item">
                <label>Municipality</label>
                <p>{profile.municipality}</p>
              </div>

              <div className="info-item">
                <label>Joined Date</label>
                <p>{profile.joinedDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
