import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Dashboard,
  Finance,
  HumanResource,
  ProjectManagement,
  Settings,
  UserManagement,
  Profile,
  UserProfile,
  ProjectList,
} from "../pages";
import { PrivateRoute } from "../components";
import DashboardLayout from "../layouts/Dashboard.layout";

const DashboardRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route index={true} path="/d" element={<Dashboard />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/user-management/:profileId" element={<UserProfile />} />
      <Route path="/project-management" element={<ProjectManagement />} />
      <Route path="/project-management/list" element={<ProjectList />} />
      <Route path="/finance" element={<Finance />} />
      <Route path="/human-resources" element={<HumanResource />} />
      <Route path="/setting" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />

      {/* 404 page */}
      <Route
        path="*"
        element={
          <div className="w-full h-screen flex items-center justify-center custom-main-bg">
            <h1 className="text-lg">404 Page not found | Not Design yet</h1>
          </div>
        }
      />
    </Route>
  </Routes>
);

const DashboardRoutesWrapper: React.FC = () => (
  <PrivateRoute>
    <DashboardRoutes />
  </PrivateRoute>
);

export default DashboardRoutesWrapper;
