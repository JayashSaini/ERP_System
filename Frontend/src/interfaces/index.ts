import { DepartmentsEnum, StatusEnum, UserRolesEnum } from "../constants";

export interface UserAvatar {
  url: string;
  public_id: string | null;
  _id: string;
}

export interface UserInterface {
  _id: string;
  avatar: UserAvatar;
  username: string;
  email: string;
  role: (typeof UserRolesEnum)[number];
  favorites: string[];
  enrollments: string[];
  loginType: "EMAIL_PASSWORD";
  isEmailVerified: boolean;
  __v: number;
}

export interface ApiResponse {
  data: any;
  message: string;
  statusCode: number;
  success: boolean;
}

export interface AuthState {
  user: UserInterface | null;
  email: string | null;
  token: string | null;
  isLoading: boolean;
}

export interface ProfileInterface {
  _id: string;
  firstName?: string;
  lastName?: string;
  contactNumber?: string | number;
  email?: string;
  dateOfBirth?: string | Date;
  gender?: "Male" | "Female" | "Other";
  permanentAddress?: string;
  city?: string;
  stateProvince?: string;
  jobTitle?: string;
  department?: (typeof DepartmentsEnum)[number];
  joiningDate?: string | Date;
  employeeStatus?: "FULL_TIME" | "PART_TIME" | "INTERN";
  workLocation?: "WFO" | "WFH" | "HYBRID";
  owner?: string;
  role?: (typeof UserRolesEnum)[number];
  status?: (typeof StatusEnum)[number];
  avatar?: UserAvatar;
}
