const { Router } = require('express');
const router = Router();
const {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  deleteEnquiry,
} = require('../controllers/enquiry.controllers');

// route for enquires
router.route('/').post(createEnquiry).get(getAllEnquiries);

// route for enquiry by id
router.route('/:enquiryId').get(getEnquiryById).delete(deleteEnquiry);

module.exports = router;
