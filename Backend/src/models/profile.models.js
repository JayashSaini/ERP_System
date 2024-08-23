const mongoose = require('mongoose');
const {
  AvailableEmployeeStatus,
  EmployeeWorkLocationEnum,
  AvailableEmployeeSWorkLocation,
  EmployeeStatusEnum,
  DepartmentEnum,
  AvailableStatus,
  StatusEnum,
  AvailableDepartments,
} = require('../constants');

const profileSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
    contactNumber: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
      required: true,
      unique: true,
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      default: 'Male',
    },
    permanentAddress: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    stateProvince: {
      type: String,
      default: '',
    },
    jobTitle: {
      type: String,
      default: '',
    },
    department: {
      type: String,
      enum: AvailableDepartments,
      default: DepartmentEnum.OTHERS,
    },
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    employeeStatus: {
      type: String,
      enum: AvailableEmployeeStatus,
      default: EmployeeStatusEnum.FULL_TIME,
    },
    status: {
      type: String,
      enum: AvailableStatus,
      default: StatusEnum.ACTIVE,
    },
    workLocation: {
      type: String,
      enum: AvailableEmployeeSWorkLocation,
      default: EmployeeWorkLocationEnum.WFO,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
