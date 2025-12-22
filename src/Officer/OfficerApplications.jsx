import React, { useState } from "react";
import OfficerLayout from "./OfficerLayout";

const OfficerApplications = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      applicant: "Ram Kumar",
      type: "Citizenship Recommendation",
      date: "2023-11-15",
      status: "Pending",
    },
    {
      id: 2,
      applicant: "Sita Sharma",
      type: "Relationship Verification",
      date: "2023-11-16",
      status: "Pending",
    },
    {
      id: 3,
      applicant: "Hari Bahadur",
      type: "Tax Clearance",
      date: "2023-11-14",
      status: "Approved",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      setApplications(applications.filter((a) => a.id !== id));
    }
  };

  return (
    <OfficerLayout title="Applications">
      <div className="recent-activity">
        <h2 className="section-title">Incoming Applications</h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
              <th style={{ padding: "12px", color: "#718096" }}>Applicant</th>
              <th style={{ padding: "12px", color: "#718096" }}>Type</th>
              <th style={{ padding: "12px", color: "#718096" }}>Date</th>
              <th style={{ padding: "12px", color: "#718096" }}>Status</th>
              <th style={{ padding: "12px", color: "#718096" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} style={{ borderBottom: "1px solid #edf2f7" }}>
                <td style={{ padding: "12px", fontWeight: "500" }}>
                  {app.applicant}
                </td>
                <td style={{ padding: "12px" }}>{app.type}</td>
                <td style={{ padding: "12px" }}>{app.date}</td>
                <td style={{ padding: "12px" }}>
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: "12px",
                      background:
                        app.status === "Approved"
                          ? "#c6f6d5"
                          : app.status === "Rejected"
                          ? "#fed7d7"
                          : "#feebc8",
                      color:
                        app.status === "Approved"
                          ? "#22543d"
                          : app.status === "Rejected"
                          ? "#822727"
                          : "#744210",
                      fontSize: "0.8rem",
                    }}
                  >
                    {app.status}
                  </span>
                </td>
                <td style={{ padding: "12px" }}>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    {app.status === "Pending" && (
                      <>
                        <button
                          onClick={() => handleStatusChange(app.id, "Approved")}
                          style={{
                            padding: "6px 12px",
                            background: "#48bb78",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "0.85rem",
                          }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(app.id, "Rejected")}
                          style={{
                            padding: "6px 12px",
                            background: "#fc8181",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "0.85rem",
                          }}
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {/* Delete is available for any application */}
                    <button
                      onClick={() => handleDelete(app.id)}
                      style={{
                        padding: "6px 12px",
                        background: "#e53e3e",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                      }}
                    >
                      Delete
                    </button>

                    {app.status !== "Pending" && (
                      <span style={{ color: "#a0aec0", fontSize: "0.9rem" }}>
                        {/* keep visual hint that no more status actions available */}
                        Status: {app.status}
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </OfficerLayout>
  );
};

export default OfficerApplications;
