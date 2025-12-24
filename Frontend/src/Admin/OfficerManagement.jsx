import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import { useAuth } from "../Home/Context/AuthContext";

const OfficerManagement = () => {
  const { pendingOfficers, approveOfficer, rejectOfficer, createOfficer } =
    useAuth();

  // Create Officer State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newOfficer, setNewOfficer] = useState({
    name: "",
    email: "",
    officerId: "", // Unique ID
    ward: "1",
    department: "",
    password: "", // Basic pass for now
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newOfficer.name || !newOfficer.email || !newOfficer.officerId) {
      alert("Please fill all required fields.");
      return;
    }

    const result = createOfficer(newOfficer);
    if (result.success) {
      setShowCreateModal(false);
      setNewOfficer({
        name: "",
        email: "",
        officerId: "",
        ward: "1",
        department: "",
        password: "",
      });
    } else {
      alert(result.message);
    }
  };

  const handleApprove = (id) => {
    if (window.confirm("Are you sure you want to approve this officer?")) {
      approveOfficer(id);
    }
  };

  const handleReject = (id) => {
    if (window.confirm("Are you sure you want to reject this application?")) {
      rejectOfficer(id);
    }
  };

  const getStatusBadge = (status) => {
    return <span className={`badge ${status.toLowerCase()}`}>{status}</span>;
  };

  return (
    <AdminLayout title="Officer Applications">
      {/* Create Officer Modal Overlay */}
      {showCreateModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="stat-card"
            style={{
              width: "500px",
              display: "block",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <h2 className="section-title" style={{ marginBottom: "20px" }}>
              Create New Officer
            </h2>
            <form
              onSubmit={handleCreateSubmit}
              style={{ display: "grid", gap: "16px" }}
            >
              <div>
                <label className="stat-label">Full Name *</label>
                <input
                  type="text"
                  value={newOfficer.name}
                  onChange={(e) =>
                    setNewOfficer({ ...newOfficer, name: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-color)",
                    marginTop: "4px",
                  }}
                  required
                />
              </div>
              <div>
                <label className="stat-label">Email *</label>
                <input
                  type="email"
                  value={newOfficer.email}
                  onChange={(e) =>
                    setNewOfficer({ ...newOfficer, email: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-color)",
                    marginTop: "4px",
                  }}
                  required
                />
              </div>
              <div>
                <label className="stat-label">Unique Officer ID *</label>
                <input
                  type="text"
                  value={newOfficer.officerId}
                  onChange={(e) =>
                    setNewOfficer({ ...newOfficer, officerId: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-color)",
                    marginTop: "4px",
                  }}
                  required
                  placeholder="e.g. OFF-2023-001"
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                <div>
                  <label className="stat-label">Ward *</label>
                  <select
                    value={newOfficer.ward}
                    onChange={(e) =>
                      setNewOfficer({ ...newOfficer, ward: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid var(--border-color)",
                      marginTop: "4px",
                    }}
                  >
                    {Array.from({ length: 32 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        Ward {n}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="stat-label">Department</label>
                  <input
                    type="text"
                    value={newOfficer.department}
                    onChange={(e) =>
                      setNewOfficer({
                        ...newOfficer,
                        department: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid var(--border-color)",
                      marginTop: "4px",
                    }}
                    placeholder="e.g. Health"
                  />
                </div>
              </div>
              <div>
                <label className="stat-label">Temporary Password</label>
                <input
                  type="password"
                  value={newOfficer.password}
                  onChange={(e) =>
                    setNewOfficer({ ...newOfficer, password: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-color)",
                    marginTop: "4px",
                  }}
                  placeholder="Min 6 chars"
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
                  onClick={() => setShowCreateModal(false)}
                  className="action-btn"
                  style={{ backgroundColor: "var(--text-muted)" }}
                >
                  Cancel
                </button>
                <button type="submit" className="action-btn approve">
                  Create Officer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-container">
        <div className="table-header-actions">
          <div>
            <h2 className="section-title">Pending Officer Applications</h2>
            <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              {pendingOfficers.length} pending applications
            </span>
          </div>
          <button
            className="btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            + Create Officer
          </button>
        </div>

        {pendingOfficers.length === 0 ? (
          <div className="no-data">
            No pending officer applications at the moment.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Officer ID</th>
                <th>Department</th>
                <th>Ward</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingOfficers.map((officer) => (
                <tr key={officer.id}>
                  <td style={{ fontWeight: 500 }}>{officer.name}</td>
                  <td>{officer.email}</td>
                  <td>{officer.employeeId || officer.officerId || "N/A"}</td>
                  <td>{officer.department || "General"}</td>
                  <td>{officer.ward}</td>
                  <td>{getStatusBadge(officer.status)}</td>
                  <td>
                    <button
                      className="action-btn approve"
                      onClick={() => handleApprove(officer.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="action-btn reject"
                      onClick={() => handleReject(officer.id)}
                    >
                      Reject
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

export default OfficerManagement;
