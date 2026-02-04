import React from "react";
import { Routes, Route } from "react-router-dom";
import OfficerDashboard from "./OfficerDashboard";
import OfficerWorks from "./Works/OfficerWorks";
import OfficerBudget from "./Budget/OfficerBudget";
import OfficerDepartments from "./Departments/OfficerDepartments";
import OfficerNotices from "./Notices/OfficerNotices";
import OfficerComplaints from "./Complaints/OfficerComplaints";
import OfficerAssets from "./Assets/OfficerAssets";
import OfficerActivities from "./OfficerActivities";
import OfficerSocialMedia from "./OfficerSocialMedia";
import OfficerReviews from "./OfficerReviews";

const OfficerRoutes = () => {
  return (
    <Routes>
      <Route index element={<OfficerDashboard />} />
      <Route path="works" element={<OfficerWorks />} />
      <Route path="budgets" element={<OfficerBudget />} />
      <Route path="departments" element={<OfficerDepartments />} />
      <Route path="assets" element={<OfficerAssets />} />
      <Route path="complaints" element={<OfficerComplaints />} />
      <Route path="notices" element={<OfficerNotices />} />
      <Route path="activities" element={<OfficerActivities />} />
      <Route path="social-media" element={<OfficerSocialMedia />} />
      <Route path="reviews" element={<OfficerReviews />} />
    </Routes>
  );
};

export default OfficerRoutes;
