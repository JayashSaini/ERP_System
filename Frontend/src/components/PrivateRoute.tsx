// Import required modules and types from React and react-router-dom libraries
import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../app/store";

// Define a PrivateRoute component that wraps child components to ensure user authentication
const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Destructure token and user details from the authentication context
  const { token, user } = useSelector((state: RootState) => state.auth);

  // If there's no token or user ID, redirect to the login page
  useEffect(() => {
    if (!(token || user)) {
      <Navigate to="/auth/login" replace />;
    }
  }, []);

  // If authenticated, render the child components
  return children;
};

// Export the PrivateRoute component for use in other parts of the application
export default PrivateRoute;
