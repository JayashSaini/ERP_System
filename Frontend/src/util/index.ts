// Importing necessary modules and interfaces
import { AxiosResponse } from "axios";
import { ApiResponse, ProfileInterface } from "../interfaces";

// A utility function for handling API requests with loading, success, and error handling
export const requestHandler = async (
  api: () => Promise<AxiosResponse<ApiResponse>>,
  setLoading: ((loading: boolean) => void) | null,
  onSuccess: (data: ApiResponse) => void,
  onError: (error: string) => void
) => {
  // Show loading state if setLoading function is provided

  if (setLoading) {
    setLoading(true);
  }

  try {
    // Make the API request
    const response = await api();
    const { data } = response;

    if (data?.success) {
      // Call the onSuccess callback with the response data
      onSuccess(data);
    }
  } catch (error: any) {
    if (error.response?.status === 422) {
      const errorObject = error.response.data.errors[0];
      const [_, value] = Object.entries(errorObject)[0];
      onError(value as string);
    } else {
      onError(error.response?.data?.message || "Something went wrong");
    }
  } finally {
    // Hide loading state if setLoading function is provided
    if (setLoading) setLoading(false);
  }
};

// Check if the code is running in a browser environment
export const isBrowser = typeof window !== "undefined";

// A class that provides utility functions for working with local storage
export class LocalStorage {
  // Get a value from local storage by key
  static get(key: string) {
    if (!isBrowser) return null;

    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (err) {
        return null;
      }
    }

    return null;
  }

  // Set a value in local storage by key
  static set(key: string, value: string) {
    if (!isBrowser) return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Remove a value from local storage by key
  static remove(key: string) {
    if (!isBrowser) return;
    localStorage.removeItem(key);
  }

  // Clear all items from local storage
  static clear() {
    if (!isBrowser) return;
    localStorage.clear();
  }
}

// Function to format mongodb date
export const formatMongoDate = (createdAt?: string): string => {
  const date = new Date(createdAt || Date.now());
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return `${formattedDate}`;
};

const roleOrder: string[] = [
  "ADMIN",
  "HR",
  "PROJECT_MANAGER",
  "TEAM_LEADER",
  "EMPLOYEE",
  "CLIENT_SUPPORT",
  "USER", // Ensure USER is the last in case it's not listed above
];

const departmentOrder: string[] = [
  "HR",
  "IT",
  "MARKETING",
  "FINANCE",
  "ADMINISTRATION",
  "SALES",
  "MANAGEMENT",
  "MARKETING_AND_PR",
  "TECHNICAL_SUPPORT",
  "DESIGNING",
  "OTHERS", // Ensure OTHERS is the last in case it's not listed above
];

// Function to sort profiles based on roles
export const sortProfilesByRole = (
  profiles: ProfileInterface[]
): ProfileInterface[] => {
  return profiles.sort((a, b) => {
    // Get the index of each profile's role in the roleOrder array
    const indexA = roleOrder.indexOf(a.role || "USER");
    const indexB = roleOrder.indexOf(b.role || "USER");

    // Sort profiles based on the role index
    return indexA - indexB;
  });
};

// Function to sort profiles based on departments
export const sortProfilesByDepartment = (
  profiles: ProfileInterface[]
): ProfileInterface[] => {
  return profiles.sort((a, b) => {
    // Get the index of each profile's department in the departmentOrder array
    const indexA = departmentOrder.indexOf(a.department || "OTHERS");
    const indexB = departmentOrder.indexOf(b.department || "OTHERS");

    // Sort profiles based on the department index
    return indexA - indexB;
  });
};
