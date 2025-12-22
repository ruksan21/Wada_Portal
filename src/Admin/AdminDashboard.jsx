import React from "react";
import AdminLayout from "./AdminLayout";
import { useAuth } from "../Home/Context/AuthContext";

const AdminDashboard = () => {
  const { allUsers, pendingOfficers } = useAuth();

  // Real stats based on context
  const totalUsers = allUsers.length;
  const pendingApps = pendingOfficers.length;
  const activeOfficers = allUsers.filter(
    (u) => u.role === "officer" && u.status === "active"
  ).length;

  const stats = [
    { label: "Total Users", value: totalUsers.toString(), icon: "👥" },
    { label: "Active Officers", value: activeOfficers.toString(), icon: "👮" },
    {
      label: "Pending Applications",
      value: pendingApps.toString(),
      icon: "⚠️",
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
            <div className="stat-icon-container">{stat.icon}</div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
