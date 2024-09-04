const DB_NAME = 'Cluster0';
const USER_OTP_EXPIRY = 2;
const USER_TEMPORARY_TOKEN_EXPIRY = 20 * 60 * 1000; // 20 minutes

const UserRolesEnum = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  HR: 'HR',
  TEAM_LEADER: 'TEAM_LEADER',
  PROJECT_MANAGER: 'PROJECT_MANAGER',
  EMPLOYEE: 'EMPLOYEE',
  CLIENT_SUPPORT: 'CLIENT_SUPPORT',
};

const UserLoginType = {
  EMAIL_PASSWORD: 'EMAIL_PASSWORD',
};

const AvailableUserRoles = Object.values(UserRolesEnum);
const AvailableSocialLogins = Object.values(UserLoginType);

// Employee Constants
const EmployeeWorkLocationEnum = {
  WFO: 'WFO',
  WFH: 'WFH',
  HYBRID: 'HYBRID',
};

const EmployeeStatusEnum = {
  PART_TIME: 'PART_TIME',
  FULL_TIME: 'FULL_TIME',
  INTERN: 'INTERN',
};

const DepartmentEnum = {
  HR: 'HR',
  IT: 'IT',
  MARKETING: 'MARKETING',
  FINANCE: 'FINANCE',
  ADMINISTRATION: 'ADMINISTRATION',
  SALES: 'SALES',
  MANAGEMENT: 'MANAGEMENT',
  MARKETING_AND_PR: 'MARKETING_AND_PR',
  TECHNICAL_SUPPORT: 'TECHNICAL_SUPPORT',
  DESIGNING: 'DESIGNING',
  OTHERS: 'OTHERS',
};

const StatusEnum = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  RESIGNED: 'RESIGNED',
};

const ProjectStatusEnum = {
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  ON_HOLD: 'ON_HOLD',
  CANCELLED: 'CANCELLED',
};

const TaskStatusEnum = {
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  PENDING: 'PENDING',
};

const AvailableEmployeeStatus = Object.values(EmployeeStatusEnum);
const AvailableEmployeeSWorkLocation = Object.values(EmployeeWorkLocationEnum);
const AvailableDepartments = Object.values(DepartmentEnum);
const AvailableStatus = Object.values(StatusEnum);
const AvailableProjectStatus = Object.values(ProjectStatusEnum);
const AvailableTaskStatus = Object.values(TaskStatusEnum);

module.exports = {
  DB_NAME,
  USER_OTP_EXPIRY,
  AvailableUserRoles,
  UserRolesEnum,
  UserLoginType,
  USER_TEMPORARY_TOKEN_EXPIRY,
  AvailableSocialLogins,
  EmployeeWorkLocationEnum,
  AvailableEmployeeSWorkLocation,
  AvailableEmployeeStatus,
  EmployeeStatusEnum,
  DepartmentEnum,
  AvailableDepartments,
  StatusEnum,
  AvailableStatus,
  ProjectStatusEnum,
  AvailableProjectStatus,
  AvailableTaskStatus,
  TaskStatusEnum,
};
