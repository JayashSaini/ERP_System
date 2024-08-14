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
  function (error) {
    // Handle errors globally
    if (error.response.status == 401 || error.response.status == 403) {
      LocalStorage.clear();
      window.location.href = "/auth/login";
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

// profile routes
const updateProfile = (data: ProfileInterface) => {
  return apiClient.patch(`/profile`, data);
};

const getProfile = () => {
  return apiClient.get(`/profile`);
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
};
