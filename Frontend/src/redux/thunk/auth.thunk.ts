import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  logoutUser,
  forgotPasswordRequest,
  verifyOTPRequest,
  resetPasswordRequest,
} from "../../api";
import { LocalStorage } from "../../util";

// Create async thunks for handling API calls
export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginUser(data);
      const userData = response.data.data;
      LocalStorage.set("user", userData.user);
      LocalStorage.set("token", userData.accessToken);
      return { user: userData.user, accessToken: userData.accessToken };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to login"
      );
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    data: { email: string; username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      await registerUser(data);
      return data.email;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to register"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUser();
      LocalStorage.clear();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to logout"
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      await forgotPasswordRequest(email);
      return email;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send OTP"
      );
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (data: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await verifyOTPRequest(data);
      return response.data.data.token;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to verify OTP"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    data: { token: string; newPassword: string; confirmPassword: string },
    { rejectWithValue }
  ) => {
    try {
      await resetPasswordRequest(data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reset password"
      );
    }
  }
);
