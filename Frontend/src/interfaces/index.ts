import { DepartmentsEnum, StatusEnum, UserRolesEnum } from "../constants";

export interface ImageInterface {
  url: string;
  public_id: string;
  _id: string;
}
export interface UserInterface {
  _id: string;
  avatar: ImageInterface;
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
  avatar?: ImageInterface;
}

export interface ProjectInterface {
  _id: string; // Project ID
  srNumber: number; // Serial number or unique identifier
  projectName: string; // Project name
  projectHeading: string; // Project heading
  projectLogo: ImageInterface; // URL or path to the project logo image
  projectImage: ImageInterface; // URL or path to the project image
  dateOfInitiation: string; // string of initiation
  closureDate: string; // Closure date
  tasks: [
    {
      taskName: string;
      isCompleted?: boolean;
    }
  ]; // Array of milestones
  projectAmount: number; // Total project amount
  paymentReceived: number; // Amount received
  paymentDue: number; // Amount due
  outstandingPayment: number; // Outstanding payment
  clientName: string; // Client name
  clientNumber: string; // Client contact number
  projectManager: string; // Name of the project manager
  isCompleted: boolean;
}
