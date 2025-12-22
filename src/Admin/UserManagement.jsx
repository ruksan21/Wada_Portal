import React from "react";
import AdminLayout from "./AdminLayout";
import { useAuth } from "../Home/Context/AuthContext";

const UserManagement = () => {
  const { allUsers, deleteUser } = useAuth();

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      deleteUser(id);
    }
  };

  const getRoleBadge = (user) => {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: user.role === "officer" ? "#3b82f6" : "#10b981",
          }}
        ></span>
        {user.role} {user.role === "officer" && `(Ward ${user.ward})`}
      </span>
    );
  };

  return (
    <AdminLayout title="User Management">
      <div className="table-container">
        <div className="table-header-actions">
          <h2 className="section-title">All Users & Officers</h2>
          <button
            className="btn-primary"
            style={{ padding: "8px 16px", borderRadius: "8px" }}
          >
            + Add New User
          </button>
        </div>

        {allUsers.length === 0 ? (
          <div className="no-data">No users found.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        className="profile-avatar-circle"
                        style={{
                          width: "32px",
                          height: "32px",
                          fontSize: "0.85rem",
                        }}
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span style={{ fontWeight: 500 }}>{user.name}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td style={{ textTransform: "capitalize" }}>
                    {getRoleBadge(user)}
                  </td>
                  <td>
                    <span className={`badge ${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="action-btn reject"
                      style={{ backgroundColor: "#ef4444" }}
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
