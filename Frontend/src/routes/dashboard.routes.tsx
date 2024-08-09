import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Dashboard,
  Finance,
  HumanResource,
  ProjectManagement,
  Settings,
  UserManagement,
} from "../pages";
import { PrivateRoute } from "../components";
import DashboardLayout from "../layouts/Dashboard.layout";

const DashboardRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route index={true} path="/" element={<Dashboard />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/project-management" element={<ProjectManagement />} />
      <Route path="/finance" element={<Finance />} />
      <Route path="/human-resources" element={<HumanResource />} />
      <Route path="/setting" element={<Settings />} />
    </Route>
  </Routes>
);

const DashboardRoutesWrapper: React.FC = () => (
  <PrivateRoute>
    <DashboardRoutes />
  </PrivateRoute>
);

export default DashboardRoutesWrapper;
