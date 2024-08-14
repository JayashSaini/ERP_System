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

export const profileSchema = yup.object().shape({
  firstName: yup.string().trim().notRequired().min(1, "First name is required"),
  lastName: yup.string().trim().notRequired().min(1, "Last name is required"),
  contactNumber: yup
    .string()
    .trim()
    .notRequired()
    .matches(/^[0-9]{10}$/, "Contact number must be exactly 10 digits long")
    .required("Contact number is required"),
  email: yup
    .string()
    .trim()
    .email("Email is invalid")
    .notRequired()
    .required("Email is required"),
  dateOfBirth: yup
    .date()
    .notRequired()
    .typeError("Date of birth must be a valid date"),
  gender: yup
    .string()
    .oneOf(
      ["Male", "Female", "Other"],
      "Gender must be either Male, Female, or Other"
    )
    .notRequired(),
  permanentAddress: yup
    .string()
    .trim()
    .notRequired()
    .min(1, "Permanent address is required"),
  city: yup.string().trim().notRequired().min(1, "City is required"),
  stateProvince: yup
    .string()
    .trim()
    .notRequired()
    .min(1, "State/Province is required"),
  jobTitle: yup.string().trim().notRequired().min(1, "Job title is required"),
  department: yup
    .string()
    .trim()
    .notRequired()
    .min(1, "Department is required"),
  joiningDate: yup
    .date()
    .notRequired()
    .typeError("Joining date must be a valid date"),
  employeeStatus: yup
    .string()
    .oneOf(
      ["PART_TIME", "FULL_TIME", "INTERN"],
      `Employee status must be one of the following: PART TIME FULL TIME OR INTERN}`
    )
    .notRequired(),
  workLocation: yup
    .string()
    .oneOf(
      ["WFO", "WFH", "HYBRID"],
      `Work location must be one of the following: WFO WFH OR HYBRID`
    )
    .notRequired(),
});
