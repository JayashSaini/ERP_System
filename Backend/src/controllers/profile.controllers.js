const Profile = require('../models/profile.models.js');
const { ApiResponse } = require('../utils/ApiResponse.js');
const { asyncHandler } = require('../utils/asyncHandler.js');

const getAllProfile = asyncHandler(async (req, res) => {
  const profiles = await Profile.find({});
  return res
    .status(200)
    .json(new ApiResponse(200, profiles, 'Profiles fetched successfully'));
});

const getMyProfile = asyncHandler(async (req, res) => {
  let profile = await Profile.findOne({
    owner: req.user._id,
  });
  if (!profile) {
    profile = await Profile.create({
      email: 'john@gmail.com',
      contactNumber: '9192100000',
      firstName: 'John',
      lastName: 'Deo',
      owner: req.user._id,
    });
  }
  return res
    .status(200)
    .json(new ApiResponse(200, profile, 'User profile fetched successfully'));
});

const updateMyProfile = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    contactNumber,
    email,
    dateOfBirth,
    gender,
    permanentAddress,
    city,
    stateProvince,
    jobTitle,
    department,
    joiningDate,
    employeeStatus,
    workLocation,
  } = req.body;

  // Check if a profile exists for the current user
  let profile = await Profile.findOne({ owner: req.user._id });

  if (!profile) {
    // If no profile exists, create a new one
    profile = await Profile.create({
      owner: req.user._id,
      firstName,
      lastName,
      contactNumber,
      email,
      dateOfBirth,
      gender,
      permanentAddress,
      city,
      stateProvince,
      jobTitle,
      department,
      joiningDate,
      employeeStatus,
      workLocation,
    });
  } else {
    // Update existing profile
    profile = await Profile.findOneAndUpdate(
      { owner: req.user._id },
      {
        $set: {
          firstName,
          lastName,
          contactNumber,
          email,
          dateOfBirth,
          gender,
          permanentAddress,
          city,
          stateProvince,
          jobTitle,
          department,
          joiningDate,
          employeeStatus,
          workLocation,
        },
      },
      { new: true }
    );
  }

  // Send response
  return res
    .status(200)
    .json(new ApiResponse(200, profile, 'User profile updated successfully'));
});

module.exports = {
  getAllProfile,
  getMyProfile,
  updateMyProfile,
};
