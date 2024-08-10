// src/routes/auth.routes.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Login,
  Register,
  ForgotPassword,
  VerifyOTP,
  ResetPassword,
  EmailVerification,
  EmailVerificationHandler,
} from "../pages";
import { PublicRoute } from "../components";
import AuthLayout from "../layouts/Auth.layout";

const AuthRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<AuthLayout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/email-verification" element={<EmailVerification />} />
      <Route
        path="/email-verification/:token"
        element={<EmailVerificationHandler />}
      />
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

const AuthRoutesWrapper: React.FC = () => (
  <PublicRoute>
    <AuthRoutes />
  </PublicRoute>
);

export default AuthRoutesWrapper;
