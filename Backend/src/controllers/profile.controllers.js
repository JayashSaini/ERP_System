const {
  DepartmentEnum,
  EmployeeStatusEnum,
  EmployeeWorkLocationEnum,
  AvailableStatus,
} = require('../constants.js');
const Profile = require('../models/profile.models.js');
const { ApiError } = require('../utils/ApiError.js');
const { ApiResponse } = require('../utils/ApiResponse.js');
const { asyncHandler } = require('../utils/asyncHandler.js');
const mongoose = require('mongoose');

const getAllProfile = asyncHandler(async (req, res) => {
  const ProfileAggregate = [
    {
      $lookup: {
        from: 'users', // The collection name for the User model
        localField: 'owner', // The field in your local model that corresponds to the user's ID
        foreignField: '_id', // The field in the User model that corresponds to the user's ID
        as: 'userInfo', // The name of the array field to store the joined documents
      },
    },
    {
      $unwind: '$userInfo', // Unwind the array to get a single document instead of an array
    },
    {
      $addFields: {
        role: '$userInfo.role', // Add the role field from the joined User model to the Profile document
      },
    },
    {
      $project: {
        userInfo: 0, // Exclude the userInfo array from the final output, if you don't need it
        // Alternatively, you could exclude any other fields you don't need.
      },
    },
  ];
  const profiles = await Profile.aggregate(ProfileAggregate);

  return res
    .status(200)
    .json(new ApiResponse(200, profiles, 'Profiles fetched successfully'));
});

const getProfileById = asyncHandler(async (req, res) => {
  const profileId = req.params?.profileId;

  const profile = await Profile.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(profileId) },
    },
    {
      $lookup: {
        from: 'users', // The name of the users collection
        localField: 'owner', // The field in Profile collection that references the user
        foreignField: '_id', // The field in the users collection to match with
        as: 'userDetails', // The name of the field where the joined documents will be stored
      },
    },
    {
      $unwind: '$userDetails', // Unwind the userDetails array to get an object instead of an array
    },
    {
      $addFields: {
        avatar: '$userDetails.avatar',
        role: '$userDetails.role',
      },
    },
    {
      $project: {
        userDetails: 0, // Optionally remove the `userDetails` field if you don't need it anymore
      },
    },
  ]);

  if (!profile.length) {
    throw new ApiError(404, 'Profile not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, profile[0], 'Profile fetched successfully'));
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
  const { profileId } = req.params;

  // Validate the provided status
  if (!AvailableStatus.includes(status)) {
    throw new ApiError(400, 'Invalid status');
  }

  // Find the user by userId
  const profile = await Profile.findById(profileId);

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
