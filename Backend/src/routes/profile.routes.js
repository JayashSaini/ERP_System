const { Router } = require('express');
const router = Router();
const {
  getMyProfile,
  updateMyProfile,
  getAllProfile,
} = require('../controllers/profile.controllers.js');
const { verifyJWT } = require('../middlewares/auth.middlewares.js');
const { profileValidator } = require('../validators/profile.validators.js');
const { validate } = require('../validators/validate.js');

router.use(verifyJWT);

router
  .route('/')
  .get(getAllProfile)
  .patch(profileValidator(), validate, updateMyProfile);

router.route('/self').get(getMyProfile);

module.exports = router;
