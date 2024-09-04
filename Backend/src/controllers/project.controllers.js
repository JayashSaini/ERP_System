const { asyncHandler } = require('../utils/asyncHandler');
const Project = require('../models/project.models.js');
const User = require('../models/auth/user.models.js');
const { ApiResponse } = require('../utils/ApiResponse.js');
const { ApiError } = require('../utils/ApiError.js');
const {
  uploadOnCloudinary,
  deleteImageOnCloudinary,
} = require('../utils/cloudinary.js');
const {
  ProjectStatusEnum,
  AvailableProjectStatus,
  AvailableTaskStatus,
} = require('../constants.js');

const getAllProjects = asyncHandler(async (req, res) => {
  // Optional query parameters for pagination and filtering
  const { page = 1, limit = 10, query = 'all' } = req.query;
  const skip = (page - 1) * limit;
  let projects = [];

  if (query === 'ongoing-projects') {
    // Retrieve ongoing projects with sorting
    projects = await Project.find({
      projectStatus: ProjectStatusEnum.IN_PROGRESS,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
  } else {
    // Retrieve all projects with optional pagination
    projects = await Project.find().skip(skip).limit(Number(limit));
  }

  // Count total number of projects for pagination
  const totalProjects = await Project.countDocuments();

  // Send a success response
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { projects, totalProjects },
        'Projects retrieved successfully'
      )
    );
});

const getProjectById = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  // Find the project by ID
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  // Send a success response
  return res
    .status(200)
    .json(new ApiResponse(200, project, 'Project retrieved successfully'));
});

const createProject = asyncHandler(async (req, res) => {
  // Destructure all the necessary fields from req.body
  const { projectName, projectHeading, projectManager } = req.body;

  // Upload project image to Cloudinary
  const projectImageLocalPath = req?.files?.projectImage[0]?.path;
  if (!projectImageLocalPath) {
    throw new ApiError(400, 'Project image is required');
  }
  const projectImageInfo = await uploadOnCloudinary(projectImageLocalPath);

  // Create a new project using the provided data
  const newProject = new Project({
    projectName,
    projectHeading,

    projectImage: {
      url: projectImageInfo.url,
      public_id: projectImageInfo.public_id,
    },

    projectManager,
  });

  // Save the new project to the database
  await newProject.save();

  // Send a success response
  return res
    .status(201)
    .json(new ApiResponse(201, newProject, 'Project created successfully'));
});

const updateProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const {
    projectName,
    projectHeading,
    dateOfInitiation,
    closureDate,
    tasks,
    projectAmount,
    paymentReceived,
    paymentDue,
    outstandingPayment,
    clientName,
    clientNumber,
    projectManager,
    projectStatus,
  } = req.body;

  // Find the project by ID
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  // Update the other fields
  project.projectName = projectName ?? project.projectName;
  project.projectHeading = projectHeading ?? project.projectHeading;
  project.dateOfInitiation = dateOfInitiation ?? project.dateOfInitiation;
  project.closureDate = closureDate ?? project.closureDate;
  project.tasks = tasks ?? project.tasks;
  project.projectAmount = projectAmount ?? project.projectAmount;
  project.paymentReceived = paymentReceived ?? project.paymentReceived;
  project.paymentDue = paymentDue ?? project.paymentDue;
  project.outstandingPayment = outstandingPayment ?? project.outstandingPayment;
  project.clientName = clientName ?? project.clientName;
  project.clientNumber = clientNumber ?? project.clientNumber;
  project.projectManager = projectManager ?? project.projectManager;
  project.projectStatus = projectStatus ?? project.projectStatus;

  // Save the updated project
  await project.save();

  // Send a success response
  return res
    .status(200)
    .json(new ApiResponse(200, project, 'Project updated successfully'));
});

const addTaskToProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { taskName, taskDescription, assignee } = req.body;

  // Find the project by ID
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  const user = await User.findById(assignee);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Check if the project status is 'IN_PROGRESS'
  if (project.projectStatus !== 'IN_PROGRESS') {
    throw new ApiError(400, 'Project status must be IN_PROGRESS to add tasks');
  }

  // Create the new task
  const newTask = {
    taskName,
    taskDescription,
    assignee: {
      _id: user._id,
      username: user.username,
      avatar: {
        url: user.avatar.url,
        public_id: user.avatar.public_id,
      },
      email: user.email,
    },
  };

  // Add the task to the project's tasks array
  project.tasks.push(newTask);

  // Save the updated project
  await project.save();

  // Send a success response
  return res
    .status(200)
    .json(new ApiResponse(200, project, 'Task added successfully'));
});

const updateTaskInProject = asyncHandler(async (req, res) => {
  const { projectId, taskId } = req.params;
  const { taskName, taskDescription } = req.body;

  // Find the project by ID
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  // Find the task within the project's tasks array
  const task = project.tasks.id(taskId);
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  // Update the task name if provided
  if (taskName) {
    task.taskName = taskName;
  }

  // Update the task description if provided
  if (taskDescription) {
    task.taskDescription = taskDescription;
  }
  // Save the updated project
  await project.save();

  // Send a success response
  return res
    .status(200)
    .json(new ApiResponse(200, { task }, 'Task updated successfully'));
});

const updateTaskAssignee = asyncHandler(async (req, res) => {
  const { projectId, taskId } = req.params;
  const { assignee } = req.body;

  // Find the project by ID
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  // Find the task within the project's tasks array
  const task = project.tasks.id(taskId);
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  // Update the assignee if provided
  if (assignee) {
    const user = await User.findById(assignee);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    task.assignee = {
      _id: user._id,
      username: user.username,
      avatar: user.avatar,
      email: user.email,
    };
  }

  // Save the updated project
  await project.save();

  // Send a success response
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { assignee: task.assignee },
        'Task Assignee Update Successfully'
      )
    );
});

const deleteTaskToProject = asyncHandler(async (req, res) => {
  const { projectId, taskId } = req.params;

  // Find the project by ID
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  // Find the task index to remove
  const taskIndex = project.tasks.findIndex(
    (task) => task._id.toString() === taskId
  );
  if (taskIndex === -1) {
    throw new ApiError(404, 'Task not found');
  }

  // Remove the task from the tasks array
  project.tasks.splice(taskIndex, 1);

  // Save the updated project
  await project.save();

  // Send a success response
  return res
    .status(200)
    .json(new ApiResponse(200, project, 'Task deleted successfully'));
});

const setTaskStatus = asyncHandler(async (req, res) => {
  const { projectId, taskId } = req.params;
  const { taskStatus } = req.body;

  if (!projectId || !taskId) {
    throw new ApiError(400, 'Project ID and Task ID are required');
  }

  // Validate required fields
  if (!AvailableTaskStatus.includes(taskStatus)) {
    throw new ApiError(400, 'Invalid task status');
  }

  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  const taskIndex = project.tasks.findIndex(
    (task) => task._id.toString() === taskId
  );

  project.tasks[taskIndex].taskStatus = taskStatus;

  await project.save();

  return res
    .status(200)
    .json(new ApiResponse(200, { taskStatus }, 'Task status updated'));
});

const searchProjects = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    throw new ApiError(400, 'Search query is required');
  }

  const projects = await Project.find({
    $or: [
      { projectName: { $regex: query, $options: 'i' } },
      { projectHeading: { $regex: query, $options: 'i' } },
    ],
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { projects }, 'Projects retrieved successfully')
    );
});

const setProjectStatus = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { projectStatus } = req.body;

  if (!projectId) {
    throw new ApiError(400, 'Project ID is required');
  }

  if (!AvailableProjectStatus.includes(projectStatus)) {
    throw new ApiError(400, 'Invalid project status');
  }
  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  project.projectStatus = projectStatus;
  await project.save();

  return res
    .status(200)
    .json(new ApiResponse(200, project, 'Project Status Updated'));
});

const updateLogo = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId);

  const projectLogoLocalPath = req.file?.path;
  if (projectLogoLocalPath) {
    const projectLogoInfo = await uploadOnCloudinary(projectLogoLocalPath);

    if (project.projectLogo?.public_id)
      await deleteImageOnCloudinary(project.projectLogo?.public_id);

    project.projectLogo = {
      url: projectLogoInfo.url,
      public_id: projectLogoInfo.public_id,
    };
  }
  await project.save();
  res
    .status(200)
    .json(new ApiResponse(200, project, 'Logo updated successfully'));
});

module.exports = {
  createProject,
  updateProject,
  getAllProjects,
  getProjectById,
  addTaskToProject,
  deleteTaskToProject,
  searchProjects,
  setTaskStatus,
  setProjectStatus,
  updateLogo,
  updateTaskInProject,
  updateTaskAssignee,
};
