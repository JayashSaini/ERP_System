// Import required modules and types from React and react-router-dom libraries
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { LocalStorage } from "../util";

// Define a PrivateRoute component that wraps child components to ensure user authentication
const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Destructure token and user details from the authentication context
  const token = LocalStorage.get("token");
  const user = LocalStorage.get("user");

  // If there's no token or user ID, redirect to the login page
  if (!(token || user?._id)) {
    return <Navigate to="/auth/login" replace />;
  }

  // If authenticated, render the child components
  return children;
};

// Export the PrivateRoute component for use in other parts of the application
export default PrivateRoute;
