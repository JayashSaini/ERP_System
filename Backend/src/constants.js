const DB_NAME = 'Cluster0';

const UserRolesEnum = {
  ADMIN: 'ADMIN',
  EMPLOYEE: 'EMPLOYEE',
  USER: 'USER',
};
const AvailableUserRoles = Object.values(UserRolesEnum);

const UserLoginType = {
  EMAIL_PASSWORD: 'EMAIL_PASSWORD',
};

const AvailableSocialLogins = Object.values(UserLoginType);

const USER_OTP_EXPIRY = 2;

const USER_TEMPORARY_TOKEN_EXPIRY = 20 * 60 * 1000; // 20 minutes

const EmployeeWorkLocationEnum = {
  WFO: 'WFO',
  WFH: 'WFH',
  HYBRID: 'HYBRID',
};

const AvailableEmployeeSWorkLocation = Object.values(EmployeeWorkLocationEnum);

const EmployeeStatusEnum = {
  PART_TIME: 'PART_TIME',
  FULL_TIME: 'FULL_TIME',
  INTERN: 'INTERN',
};

const AvailableEmployeeStatus = Object.values(EmployeeStatusEnum);

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
};
