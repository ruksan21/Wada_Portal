import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Lazy loading components for better performance
const OfficerDashboard = lazy(() => import("./Dashboard/OfficerDashboard"));
const OfficerActivities = lazy(() => import("./Dashboard/OfficerActivities"));
const OfficerApplications = lazy(
  () => import("./Applications/OfficerApplications"),
);
const OfficerSocialMedia = lazy(() => import("./Social/OfficerSocialMedia"));
const OfficerFollowers = lazy(() => import("./Social/OfficerFollowers"));
const OfficerReviews = lazy(() => import("./Social/OfficerReviews"));
const OfficerComplaints = lazy(() => import("./Complaints/OfficerComplaints"));
const OfficerProfile = lazy(() => import("./Profile/OfficerProfile"));
const OfficerAssets = lazy(() => import("./Assets/OfficerAssets"));
const OfficerBudget = lazy(() => import("./Budget/OfficerBudget"));
const OfficerDepartments = lazy(
  () => import("./Departments/OfficerDepartments"),
);
const OfficerNotices = lazy(() => import("./Notices/OfficerNotices"));
const OfficerWorks = lazy(() => import("./Works/OfficerWorks"));

const OfficerRoutes = () => {
  return (
    <Suspense fallback={<div className="loading-screen">Loading...</div>}>
      <Routes>
        <Route path="dashboard" element={<OfficerDashboard />} />
        <Route path="activities" element={<OfficerActivities />} />
        <Route path="applications" element={<OfficerApplications />} />
        <Route path="social-media" element={<OfficerSocialMedia />} />
        <Route path="followers" element={<OfficerFollowers />} />
        <Route path="reviews" element={<OfficerReviews />} />
        <Route path="complaints" element={<OfficerComplaints />} />
        <Route path="profile" element={<OfficerProfile />} />
        <Route path="assets" element={<OfficerAssets />} />
        <Route path="budgets" element={<OfficerBudget />} />
        <Route path="departments" element={<OfficerDepartments />} />
        <Route path="notices" element={<OfficerNotices />} />
        <Route path="works" element={<OfficerWorks />} />
        <Route path="/" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </Suspense>
  );
};

export default OfficerRoutes;
