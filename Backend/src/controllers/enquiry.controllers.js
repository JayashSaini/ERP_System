const { asyncHandler } = require('../utils/asyncHandler');
const { ApiError } = require('../utils/ApiError');
const { ApiResponse } = require('../utils/ApiResponse');
const Enquiry = require('../models/enquiry.models');

const getAllEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await Enquiry.find({});

  if (!enquiries) {
    throw new ApiError(404, 'No enquiries found');
  }

  res.json(
    new ApiResponse(200, enquiries, 'Enquiries retrieved successfully!')
  );
});

const createEnquiry = asyncHandler(async (req, res) => {
  const { name, email, message, subject } = req.body;
  const requiredFields = { name, email, message, subject };

  for (const [key, value] of Object.entries(requiredFields)) {
    if (!value) {
      throw new ApiError(400, `${key} is required`);
    }
  }

  const enquiry = await Enquiry.create({ name, email, message, subject });

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        enquiry,
        'Your enquiry has been successfully submitted!'
      )
    );
});

const getEnquiryById = asyncHandler(async (req, res) => {
  const { enquiryId } = req.params;
  const enquiry = await Enquiry.findById(enquiryId);

  if (!enquiry) {
    throw new ApiError(404, 'Enquiry not found');
  }

  res
    .status(200)
    .json(new ApiResponse(200, enquiry, 'Enquiry retrieved successfully'));
});

const deleteEnquiry = asyncHandler(async (req, res) => {
  const { enquiryId } = req.params;
  const enquiry = await Enquiry.findByIdAndDelete(enquiryId);

  if (!enquiry) {
    throw new ApiError(404, 'Enquiry not found');
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, 'Enquiry deleted successfully'));
});

module.exports = {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  deleteEnquiry,
};
