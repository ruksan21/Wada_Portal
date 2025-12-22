import React from "react";
import { Routes, Route } from "react-router-dom";
import OfficerDashboard from "./OfficerDashboard";
import OfficerWorks from "./OfficerWorks";
import OfficerDepartments from "./OfficerDepartments";
import OfficerBudget from "./OfficerBudget";
import OfficerComplaints from "./OfficerComplaints";
import OfficerNotices from "./OfficerNotices";

const OfficerRoutes = () => {
  return (
    <Routes>
      <Route index element={<OfficerDashboard />} />
      <Route path="works" element={<OfficerWorks />} />
      <Route path="budgets" element={<OfficerBudget />} />
      <Route path="departments" element={<OfficerDepartments />} />
      <Route path="complaints" element={<OfficerComplaints />} />
      <Route path="notices" element={<OfficerNotices />} />
    </Routes>
  );
};

export default OfficerRoutes;
