// Import necessary modules and utilities
import axios from "axios";
import { LocalStorage } from "../util/index.ts";
import { ProfileInterface } from "../interfaces/index.ts";

// Create an Axios instance for API requests
const apiClient = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
  timeout: 120000,
});

// Add a request interceptor to set the authorization header with user token
apiClient.interceptors.request.use(
  function (config) {
    // Retrieve user token from local storage
    const token = LocalStorage.get("token");
    // Set authorization header with bearer token
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle responses
apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    // Handle errors globally
    if (error.response.status == 401) {
      try {
        const response = await axios.post("/api/v1/users/refresh-token");
        const token = response.data.data.accessToken;
        LocalStorage.set("token", token);
        return window.location.reload();
      } catch (error) {
        LocalStorage.clear();
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);

// API functions for User actions
const loginUser = (data: { email: string; password: string }) => {
  return apiClient.post("/users/login", data);
};

const registerUser = (data: {
  email: string;
  username: string;
  password: string;
}) => {
  return apiClient.post("/users/register", data);
};

const logoutUser = () => {
  return apiClient.get("/users/logout");
};

const selfUser = () => {
  return apiClient.get("/users/self");
};

const forgotPasswordRequest = (email: string) => {
  return apiClient.post("/users/forgot-password", { email });
};

const verifyOTPRequest = (data: { email: string; otp: string }) => {
  return apiClient.post("/users/verify-otp", data);
};

const resetPasswordRequest = (data: {
  newPassword: string;
  confirmPassword: string;
  token: string;
}) => {
  return apiClient.post(`/users/reset-password/${data.token}`, {
    newPassword: data.newPassword,
    confirmPassword: data.confirmPassword,
  });
};

const resendEmailVerificationRequest = (email: string) => {
  return apiClient.post(`/users/resend-verify-email`, { email });
};

const verifyEmailRequest = (token: string) => {
  return apiClient.get(`/users/verify-email/${token}`);
};

const updateAvatar = (data: any) => {
  return apiClient.patch(`/users/update-avatar`, data);
};

const assignUserRole = (userId: string, role: string) => {
  return apiClient.patch("/users/assign-role/" + userId, { role });
};

const getAllUsernamesRequest = () => {
  return apiClient.get("/users/usernames");
};

const setProjectStatusRequest = (projectId: string, projectStatus: string) => {
  return apiClient.patch(`/projects/status/` + projectId, { projectStatus });
};

// profile routes

const getAllProfiles = () => {
  return apiClient.get(`/profile`);
};
const updateProfile = (data: ProfileInterface) => {
  return apiClient.patch(`/profile`, data);
};

const getProfile = () => {
  return apiClient.get(`/profile/self`);
};

const getProfileById = (profileId: string) => {
  return apiClient.get(`/profile/` + profileId);
};
const setProfileStatus = (profileId: string, status: string) => {
  return apiClient.patch(`/profile/status/${profileId}`, { status });
};

// Project API

const updateProjectRequest = (projectId: string, data: any) => {
  return apiClient.patch(`/projects/` + projectId, data);
};

const addProjectRequest = (data: any) => {
  return apiClient.post(`/projects`, data);
};

const addTaskRequest = (projectId: string, data: any) => {
  return apiClient.post(`/projects/task/` + projectId, data);
};

const updateTaskRequest = (projectId: string, taskId: string, data: any) => {
  return apiClient.post(`/projects/task/${projectId}/${taskId}`, data);
};

const updateAssigneeToTaskRequest = (
  projectId: string,
  taskId: string,
  assignee: any
) => {
  return apiClient.patch(`/projects/task/assign/${projectId}/${taskId}`, {
    assignee,
  });
};

const deleteTaskRequest = (projectId: string, taskId: string) => {
  return apiClient.delete(`/projects/task/${projectId}/${taskId}`);
};

const setTaskStatusRequest = (
  projectId: string,
  taskId: string,
  taskStatus: string
) => {
  return apiClient.patch(`/projects/task/${projectId}/${taskId}`, {
    taskStatus,
  });
};

const updateLogoRequest = (projectId: string, data: any) => {
  return apiClient.patch(`/projects/logo/` + projectId, data);
};
const getAllProjectRequest = (page = 1, limit = 10, query = "all") => {
  return apiClient.get(`/projects?page=${page}&limit=${limit}&query=${query}`);
};

const getProjectsBySearchQueryRequest = (query: string) => {
  return apiClient.get(`/projects/search?query=${query}`);
};

const getProjectByIdRequest = (projectId: string) => {
  return apiClient.get(`/projects/` + projectId);
};

// inquiries routes
const getAllInquiriesRequest = () => {
  return apiClient.get(`/inquiries`);
};

// Export all the API functions
export {
  loginUser,
  logoutUser,
  registerUser,
  selfUser,
  forgotPasswordRequest,
  verifyOTPRequest,
  resetPasswordRequest,
  resendEmailVerificationRequest,
  verifyEmailRequest,
  updateAvatar,
  getProfile,
  updateProfile,
  getProfileById,
  getAllProfiles,
  assignUserRole,
  setProfileStatus,
  getAllProjectRequest,
  getProjectsBySearchQueryRequest,
  getProjectByIdRequest,
  updateProjectRequest,
  updateLogoRequest,
  addProjectRequest,
  getAllUsernamesRequest,
  addTaskRequest,
  deleteTaskRequest,
  updateTaskRequest,
  setProjectStatusRequest,
  setTaskStatusRequest,
  updateAssigneeToTaskRequest,
  getAllInquiriesRequest,
};
