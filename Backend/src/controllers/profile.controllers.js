const {
  DepartmentEnum,
  EmployeeStatusEnum,
  EmployeeWorkLocationEnum,
} = require('../constants.js');
const Profile = require('../models/profile.models.js');
const { ApiResponse } = require('../utils/ApiResponse.js');
const { asyncHandler } = require('../utils/asyncHandler.js');

const getAllProfile = asyncHandler(async (req, res) => {
  const profiles = await Profile.find({});
  return res
    .status(200)
    .json(new ApiResponse(200, profiles, 'Profiles fetched successfully'));
});

const getProfileById = asyncHandler(async (req, res) => {
  const profile = await Profile.findById(req.params?.profileId);
  if (!profile) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, 'Profile not found'));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, profile, 'Profile fetched successfully'));
});

const getMyProfile = asyncHandler(async (req, res) => {
  let profile = await Profile.findOne({
    owner: req.user._id,
  });
  if (!profile) {
    profile = await Profile.create({
      firstName: 'John',
      lastName: 'Doe',
      contactNumber: '1234567890',
      email: 'johndoe@example.com',
      dateOfBirth: new Date(),
      gender: 'Male',
      permanentAddress: '123 Main St',
      city: 'New York',
      stateProvince: 'London',
      jobTitle: 'Software Engineer',
      department: DepartmentEnum.IT,
      joiningDate: new Date(),
      employeeStatus: EmployeeStatusEnum.FULL_TIME,
      workLocation: EmployeeWorkLocationEnum.WFO,
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

const assignUserStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { userId } = req.params;

  // Validate the provided status
  if (!AvailableStatus.includes(status)) {
    throw new ApiError(400, 'Invalid status');
  }

  // Find the user by userId
  const profile = await Profile.findOne({ owner: userId });

  if (!profile) {
    throw new ApiError(404, 'Profile not found');
  }

  // Check if the profile already has the specified status
  if (profile.status === status) {
    throw new ApiError(400, 'User already has this status');
  }

  // Assign the new status to the profile
  profile.status = status;

  await profile.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        profile,
        `User Status Successfully updated to ${status}!`
      )
    );
});

module.exports = {
  getAllProfile,
  getMyProfile,
  updateMyProfile,
  assignUserStatus,
  getProfileById,
};
