/* eslint-disable react/prop-types */
import React from "react";
import AdminLayout from "./AdminLayout";
import { useAuth } from "../Home/Context/AuthContext";

const Reports = () => {
  const { getSystemStats } = useAuth();
  const stats = getSystemStats();

  return (
    <AdminLayout title="System Reports">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Total Users</span>
            <span className="stat-value">{stats.totalUsers}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Total Officers</span>
            <span className="stat-value">{stats.totalOfficers}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Total Revenue</span>
            <span className="stat-value">
              Rs. {stats.revenue.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div
        className="table-container"
        style={{ padding: "32px", textAlign: "center" }}
      >
        <h3 className="section-title">Detailed Reports</h3>
        <p style={{ color: "var(--text-muted)" }}>
          Downloadable PDF/Excel reports will be available here after backend
          integration.
        </p>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          <button className="btn-primary">Download User Report</button>
          <button
            className="btn-primary"
            style={{ backgroundColor: "var(--admin-sidebar-bg)" }}
          >
            Download Financial Report
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Reports;
