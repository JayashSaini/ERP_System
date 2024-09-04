const { Router } = require('express');
const router = Router();
const {
  userRegister,
  userLogin,
  verifyEmail,
  refreshAccessToken,
  forgotPasswordRequest,
  resetForgottenPassword,
  userLogout,
  verifyOtp,
  resendEmailVerification,
  userSelf,
  updateAvatar,
  assignRole,
  getAllUserNames,
} = require('../../controllers/auth/user.controllers.js');
const {
  userRegisterValidator,
  userLoginValidator,
  userForgotPasswordValidator,
  userResetForgottenPasswordValidator,
  userVerifyOtpValidator,
} = require('../../validators/auth/user.validators.js');
const { validate } = require('../../validators/validate.js');
const {
  verifyJWT,
  verifyPermission,
} = require('../../middlewares/auth.middlewares.js');
const { upload } = require('../../middlewares/multer.middlewares.js');
const { UserRolesEnum } = require('../../constants.js');

//unsecured routes
router.route('/register').post(userRegisterValidator(), validate, userRegister);
router.route('/login').post(userLoginValidator(), validate, userLogin);
router.route('/refresh-token').post(refreshAccessToken);
router.route('/verify-email/:verificationToken').get(verifyEmail);
router.route('/resend-verify-email').post(resendEmailVerification);

router
  .route('/forgot-password')
  .post(userForgotPasswordValidator(), validate, forgotPasswordRequest);

router.route('/verify-otp').post(userVerifyOtpValidator(), validate, verifyOtp);

router
  .route('/reset-password/:resetToken')
  .post(
    userResetForgottenPasswordValidator(),
    validate,
    resetForgottenPassword
  );

// Secured Routes
router.route('/logout').get(verifyJWT, userLogout);
router.route('/self').get(verifyJWT, userSelf);
router.route('/update-avatar').patch(
  verifyJWT,
  upload.single('avatar'), // multer
  updateAvatar
);

router.route('/usernames').get(verifyJWT, getAllUserNames);
// assign roles
router
  .route('/assign-role/:userId')
  .patch(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.HR]),
    assignRole
  );

module.exports = router;
