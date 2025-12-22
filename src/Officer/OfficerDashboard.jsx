import React from "react";
import OfficerLayout from "./OfficerLayout";

const OfficerDashboard = () => {
  const stats = [
    { label: "New Applications", value: "5", icon: "📝" },
    { label: "Pending Complaints", value: "3", icon: "📢" },
    { label: "Ward Population", value: "12,500", icon: "👥" },
  ];

  return (
    <OfficerLayout title="Ward Overview">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <span className="stat-label">{stat.label}</span>
            <span className="stat-value">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="recent-activity">
        <h2 className="section-title">Pending Tasks</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                padding: "15px",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h4 style={{ margin: "0 0 5px 0" }}>
                  Citizenship Verification Request
                </h4>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#718096" }}>
                  Submitted by Ram Kumar • 2 hours ago
                </p>
              </div>
              <button
                style={{
                  padding: "8px 16px",
                  background: "#3182ce",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Review
              </button>
            </div>
          ))}
        </div>
      </div>
    </OfficerLayout>
  );
};

export default OfficerDashboard;
