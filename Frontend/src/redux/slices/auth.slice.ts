// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, UserInterface } from "../../interfaces";
import { toast } from "sonner";

import {
  forgotPassword,
  login,
  register,
  logout,
  verifyOTP,
  resetPassword,
} from "../thunk/auth.thunk";
import { LocalStorage } from "../../util";

const initialState: AuthState = {
  user: null,
  email: null,
  token: null,
  isLoading: false,
};

// Create slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState(state) {
      state.user = null;
      state.email = null;
      state.token = null;
    },
    setUser(
      state,
      action: PayloadAction<{ user: UserInterface; accessToken: string }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
      state.email = action.payload.user.email || null;
    },
    updateAvatar(state, action: PayloadAction<{ user: UserInterface }>) {
      console.log("slice ", action.payload.user);
      state.user = action.payload.user;
      LocalStorage.set("user", JSON.stringify(state.user));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        login.fulfilled,
        (
          state,
          action: PayloadAction<{ user: UserInterface; accessToken: string }>
        ) => {
          state.user = action.payload.user;
          state.token = action.payload.accessToken;
          state.isLoading = false;
          toast.success("Login successful!");
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload as string);
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<string>) => {
        state.email = action.payload;
        state.isLoading = false;
        toast.success("Verification link sent to your email!");
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload as string);
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.email = null;
        state.isLoading = false;
        window.location.href = "/auth/login";
        toast.success("Logout successful!");
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload as string);
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        forgotPassword.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.email = action.payload;
          state.isLoading = false;
          toast.success("OTP sent to your email!");
        }
      )
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload as string);
      })
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOTP.fulfilled, (state, action: PayloadAction<string>) => {
        state.token = action.payload;
        state.isLoading = false;
        toast.success("OTP verified successfully!");
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload as string);
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Password reset successfully!");
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload as string);
      });
  },
});

export const { clearState, setUser, updateAvatar } = authSlice.actions;
export default authSlice.reducer;
