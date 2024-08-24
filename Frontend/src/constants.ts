export const Departments = {
  HR: "HR",
  IT: "IT",
  MARKETING: "MARKETING",
  FINANCE: "FINANCE",
  ADMINISTRATION: "ADMINISTRATION",
  SALES: "SALES",
  MANAGEMENT: "MANAGEMENT",
  MARKETING_AND_PR: "MARKETING_AND_PR",
  TECHNICAL_SUPPORT: "TECHNICAL_SUPPORT",
  DESIGNING: "DESIGNING",
  OTHERS: "OTHERS",
} as const; // Add 'as const' here to ensure that the values are treated as string literals.

export const AvailableUserRoles = {
  USER: "USER",
  ADMIN: "ADMIN",
  HR: "HR",
  TEAM_LEADER: "TEAM_LEADER",
  PROJECT_MANAGER: "PROJECT_MANAGER",
  EMPLOYEE: "EMPLOYEE",
  CLIENT_SUPPORT: "CLIENT_SUPPORT",
} as const;

export const AvailableUserRolesDropDown = {
  USER: "USER",
  HR: "HR",
  TEAM_LEADER: "TEAM_LEADER",
  PROJECT_MANAGER: "PROJECT_MANAGER",
  EMPLOYEE: "EMPLOYEE",
  CLIENT_SUPPORT: "CLIENT_SUPPORT",
} as const;

export const AvailableStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  RESIGNED: "RESIGNED",
} as const;

export const UserRolesEnum = Object.values(AvailableUserRoles);
export const UserRolesDropdownEnum = Object.values(AvailableUserRolesDropDown);
export const StatusEnum = Object.values(AvailableStatus);

export const DepartmentsEnum = Object.values(Departments);
