import * as yup from "yup";

// Defining validation userLoginSchema with Yup
export const userLoginSchema = yup
  .object({
    email: yup
      .string()
      .trim()
      .required("Email is required")
      .email("Email is invalid"),
    password: yup
      .string()
      .trim()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  })
  .required();

// Defining validation userRegisterSchema with Yup
export const userRegisterSchema = yup
  .object({
    email: yup
      .string()
      .trim()
      .required("Email is required")
      .email("Email is invalid"),
    username: yup
      .string()
      .trim()
      .required("Username is required")
      .min(4, "Username must be at least 4 characters long"),
    password: yup
      .string()
      .trim()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  })
  .required();

export const userResetPasswordSchema = yup
  .object({
    newPassword: yup
      .string()
      .trim()
      .required("Password is required")
      .min(8, "New Password must be at least 8 characters long"),
    confirmPassword: yup
      .string()
      .trim()
      .required("Confirm Password is required")
      .min(8, "Confirm Password must be at least 8 characters long")
      .oneOf([yup.ref("newPassword")], "Passwords must match"),
  })
  .required();

export const userForgotPasswordSchema = yup
  .object({
    email: yup
      .string()
      .trim()
      .required("Email is required")
      .email("Email is invalid"),
  })
  .required();

export const userVerifyOTP = yup
  .object({
    otp: yup
      .string()
      .trim()
      .required("OTP is required")
      .matches(/^\d{6}$/, "OTP must be exactly 6 digits long"),
  })
  .required();
