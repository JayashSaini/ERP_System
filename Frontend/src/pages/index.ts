import Home from "./Home";
import About from "./About";

// auth routes
import Login from "./auth/Login";
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgotPassword";
import EmailVerification from "./auth/EmailVerification";
import EmailVerificationHandler from "./auth/EmailVerificationHandler";
import ResetPassword from "./auth/ResetPassword";
import VerifyOTP from "./auth/VerifyOTP";

// dashboard routes
import Dashboard from "./Dashboard/Dashboard";
import UserManagement from "./Dashboard/UserManagement";
import ProjectManagement from "./Dashboard/ProjectManagement";
import Finance from "./Dashboard/Finance";
import HumanResource from "./Dashboard/HumanResource";
import Settings from "./Dashboard/Settings";
import Profile from "./Dashboard/Profile";

export {
  Home,
  About,
  Login,
  Register,
  ForgotPassword,
  VerifyOTP,
  ResetPassword,
  EmailVerification,
  EmailVerificationHandler,
  Dashboard,
  UserManagement,
  ProjectManagement,
  Finance,
  HumanResource,
  Settings,
  Profile,
};
