/* eslint-disable react/prop-types */
import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import { useAuth } from "../Home/Context/AuthContext";

const WardManagement = () => {
  const { wards, updateWard } = useAuth();
  const [selectedWard, setSelectedWard] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Edit Form State
  const [formData, setFormData] = useState({
    contact: "",
    location: "",
    chairpersonName: "",
    chairpersonMessage: "",
  });

  const handleEditClick = (ward) => {
    setSelectedWard(ward);
    setFormData({
      contact: ward.contact,
      location: ward.location,
      chairpersonName: ward.chairperson.name,
      chairpersonMessage: ward.chairperson.message,
    });
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!selectedWard) return;

    const updatedData = {
      contact: formData.contact,
      location: formData.location,
      chairperson: {
        ...selectedWard.chairperson,
        name: formData.chairpersonName,
        message: formData.chairpersonMessage,
      },
    };

    updateWard(selectedWard.id, updatedData);
    setIsEditing(false);
    setSelectedWard(null);
  };

  return (
    <AdminLayout title="Ward Management">
      {/* List View */}
      {!isEditing ? (
        <div className="table-container">
          <div className="table-header-actions">
            <h2 className="section-title">All Wards</h2>
            <span style={{ color: "var(--text-muted)" }}>
              Total: {wards.length}
            </span>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Ward No.</th>
                <th>Location</th>
                <th>Contact</th>
                <th>Chairperson</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {wards.map((ward) => (
                <tr key={ward.id}>
                  <td style={{ fontWeight: 600 }}>Ward {ward.number}</td>
                  <td>{ward.location}</td>
                  <td>{ward.contact}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        className="profile-avatar-circle"
                        style={{ width: 24, height: 24, fontSize: "0.7rem" }}
                      >
                        {ward.chairperson.name.charAt(0)}
                      </div>
                      {ward.chairperson.name}
                    </div>
                  </td>
                  <td>
                    <button
                      className="action-btn approve"
                      onClick={() => handleEditClick(ward)}
                      style={{ backgroundColor: "var(--admin-accent)" }}
                    >
                      Edit Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Edit View */
        <div
          className="stat-card"
          style={{ display: "block", maxWidth: "800px", margin: "0 auto" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
          >
            <h2 className="section-title">Edit Ward {selectedWard.number}</h2>
            <button
              onClick={() => setIsEditing(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1.2rem",
              }}
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSave} style={{ display: "grid", gap: "20px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <div>
                <label className="stat-label">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-color)",
                    marginTop: "6px",
                  }}
                />
              </div>
              <div>
                <label className="stat-label">Contact Number</label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-color)",
                    marginTop: "6px",
                  }}
                />
              </div>
            </div>

            <hr
              style={{
                border: "0",
                borderTop: "1px solid var(--border-color)",
                margin: "10px 0",
              }}
            />

            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "var(--text-main)",
                margin: 0,
              }}
            >
              Chairperson Details
            </h3>

            <div>
              <label className="stat-label">Full Name</label>
              <input
                type="text"
                value={formData.chairpersonName}
                onChange={(e) =>
                  setFormData({ ...formData, chairpersonName: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid var(--border-color)",
                  marginTop: "6px",
                }}
              />
            </div>

            <div>
              <label className="stat-label">Message / Bio</label>
              <textarea
                rows="4"
                value={formData.chairpersonMessage}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    chairpersonMessage: e.target.value,
                  })
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid var(--border-color)",
                  marginTop: "6px",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                marginTop: "10px",
              }}
            >
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="action-btn"
                style={{ backgroundColor: "var(--text-muted)" }}
              >
                Cancel
              </button>
              <button type="submit" className="action-btn approve">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </AdminLayout>
  );
};

export default WardManagement;
