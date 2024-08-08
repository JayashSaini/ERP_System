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

module.exports = {
  DB_NAME,
  USER_OTP_EXPIRY,
  AvailableUserRoles,
  UserRolesEnum,
  UserLoginType,
  USER_TEMPORARY_TOKEN_EXPIRY,
  AvailableSocialLogins,
};
