const { Router } = require('express');
const router = Router();
const {
  getMyProfile,
  updateMyProfile,
  getAllProfile,
  assignUserStatus,
  getProfileById,
} = require('../controllers/profile.controllers.js');
const {
  verifyJWT,
  verifyPermission,
} = require('../middlewares/auth.middlewares.js');
const { profileValidator } = require('../validators/profile.validators.js');
const { validate } = require('../validators/validate.js');
const { UserRolesEnum } = require('../constants.js');

router.use(verifyJWT);

router
  .route('/')
  .get(getAllProfile)
  .patch(profileValidator(), validate, updateMyProfile);

router.route('/self').get(getMyProfile);
router.route('/:profileId').get(getProfileById);

// set User status
router
  .route('/status/:profileId')
  .patch(
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.HR]),
    assignUserStatus
  );

module.exports = router;
