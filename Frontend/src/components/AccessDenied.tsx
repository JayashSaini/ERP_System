import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const AccessDenied: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="flex items-center justify-center h-screen px-2">
      <div className="p-6 max-w-lg bg-white dark:bg-neutral-800 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          403 - Access Denied
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6 poppins">
          You do not have permission to view this page or access this service.
        </p>
        <Button onClick={handleGoBack}>Go Back</Button>
      </div>
    </div>
  );
};

export default AccessDenied;
