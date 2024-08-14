const { body } = require('express-validator');
const {
  AvailableEmployeeStatus,
  AvailableEmployeeSWorkLocation,
} = require('../constants');

const profileValidator = () => {
  return [
    body('firstName')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('First name is required'),
    body('lastName')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Last name is required'),
    body('contactNumber')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Contact number is required')
      .isNumeric()
      .withMessage('Contact number must be numeric')
      .isLength({ min: 10, max: 10 })
      .withMessage('Contact number must be exactly 10 digits long'),
    body('email')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email is invalid'),
    body('dateOfBirth').optional(),
    body('gender')
      .optional()
      .isIn(['Male', 'Female', 'Other'])
      .withMessage('Gender must be either Male, Female, or Other'),
    body('permanentAddress')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Permanent address is required'),
    body('city').optional().trim().notEmpty().withMessage('City is required'),
    body('stateProvince')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('State/Province is required'),
    body('jobTitle')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Job title is required'),
    body('department')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Department is required'),
    body('employeeStatus')
      .optional()
      .isIn(AvailableEmployeeStatus)
      .withMessage(
        `Employee status must be one of the following: ${AvailableEmployeeStatus.join(', ')}`
      ),
    body('workLocation')
      .optional()
      .isIn(AvailableEmployeeSWorkLocation)
      .withMessage(
        `Work location must be one of the following: ${AvailableEmployeeSWorkLocation.join(', ')}`
      ),
  ];
};

module.exports = { profileValidator };
