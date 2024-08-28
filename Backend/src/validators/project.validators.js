const { body } = require('express-validator');

const createProjectValidator = () => {
  return [
    body('srNumber')
      .isNumeric()
      .withMessage('Serial number must be a number')
      .notEmpty()
      .withMessage('Serial number is required'),

    body('projectName')
      .trim()
      .notEmpty()
      .withMessage('Project name is required')
      .isString()
      .withMessage('Project name must be a string'),

    body('projectHeading')
      .trim()
      .notEmpty()
      .withMessage('Project heading is required')
      .isString()
      .withMessage('Project heading must be a string'),

    body('dateOfInitiation')
      .isISO8601()
      .withMessage('Date of initiation must be a valid date')
      .toDate(),

    body('closureDate')
      .optional()
      .isISO8601()
      .withMessage('Closure date must be a valid date')
      .toDate(),

    body('tasks').optional().isArray().withMessage('Tasks must be an array'),

    body('projectAmount')
      .isNumeric()
      .withMessage('Project amount must be a number')
      .notEmpty()
      .withMessage('Project amount is required'),
  ];
};

const updateProjectValidator = () => {
  return [
    body('srNumber')
      .optional()
      .isNumeric()
      .withMessage('Serial number must be a number'),

    body('projectName')
      .optional()
      .trim()
      .isString()
      .withMessage('Project name must be a string'),

    body('projectHeading')
      .optional()
      .trim()
      .isString()
      .withMessage('Project heading must be a string'),

    body('dateOfInitiation')
      .optional()
      .isISO8601()
      .withMessage('Date of initiation must be a valid date')
      .toDate(),

    body('closureDate')
      .optional()
      .isISO8601()
      .withMessage('Closure date must be a valid date')
      .toDate(),

    body('tasks').optional().isArray().withMessage('Tasks must be an array'),

    body('projectAmount')
      .optional()
      .isNumeric()
      .withMessage('Project amount must be a number'),

    body('paymentReceived')
      .optional()
      .isNumeric()
      .withMessage('Payment received must be a number'),

    body('paymentDue')
      .optional()
      .isNumeric()
      .withMessage('Payment due must be a number'),

    body('outstandingPayment')
      .optional()
      .isNumeric()
      .withMessage('Outstanding payment must be a number'),

    body('clientName')
      .optional()
      .trim()
      .isString()
      .withMessage('Client name must be a string'),

    body('clientNumber')
      .optional()
      .trim()
      .isString()
      .withMessage('Client contact number must be a string'),

    body('projectManager')
      .optional()
      .trim()
      .isString()
      .withMessage('Project manager must be a string'),

    body('isCompleted')
      .optional()
      .isBoolean()
      .withMessage('IsCompleted must be a boolean'),
  ];
};

const taskValidator = () => {
  return [
    body('taskName')
      .trim()
      .notEmpty()
      .withMessage('Task name is required')
      .isString()
      .withMessage('Task name must be a string'),

    body('isCompleted')
      .optional()
      .isBoolean()
      .withMessage('IsCompleted must be a boolean'),
  ];
};

module.exports = {
  createProjectValidator,
  updateProjectValidator,
  taskValidator,
};
