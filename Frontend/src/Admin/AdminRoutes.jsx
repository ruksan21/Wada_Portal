import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import UserManagement from "./UserManagement";
import AlertCentre from "./AlertCentre";
import OfficerManagement from "./OfficerManagement";
import WardManagement from "./WardManagement";
import AdminSettings from "./AdminSettings";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/alerts" element={<AlertCentre />} />
      <Route path="/officers" element={<OfficerManagement />} />
      <Route path="/wards" element={<WardManagement />} />
      <Route path="/settings" element={<AdminSettings />} />
    </Routes>
  );
};

export default AdminRoutes;
