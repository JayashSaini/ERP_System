const { asyncHandler } = require('../utils/asyncHandler');
const Project = require('../models/project.models.js');
const { ApiResponse } = require('../utils/ApiResponse.js');
const { ApiError } = require('../utils/ApiError.js');
const {
  uploadOnCloudinary,
  deleteImageOnCloudinary,
} = require('../utils/cloudinary.js');

const getAllProjects = asyncHandler(async (req, res) => {
  // Optional query parameters for pagination and filtering
  const { page = 1, limit = 10, query = 'all' } = req.query;
  const skip = (page - 1) * limit;
  let projects = [];

  if (query === 'ongoing-projects') {
    // Retrieve ongoing projects with sorting
    projects = await Project.find({ isCompleted: false })
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
  const {
    srNumber,
    projectName,
    projectHeading,

    dateOfInitiation,
    closureDate,
    tasks,
    projectAmount,
  } = req.body;

  // Upload project image to Cloudinary
  const projectImageLocalPath = req.files.projectImage[0].path;
  if (!projectImageLocalPath) {
    throw new ApiError(400, 'Project image is required');
  }
  const projectImageInfo = await uploadOnCloudinary(projectImageLocalPath);

  // Create a new project using the provided data
  const newProject = new Project({
    srNumber,
    projectName,
    projectHeading,

    projectImage: {
      url: projectImageInfo.url,
      public_id: projectImageInfo.public_id,
    },
    dateOfInitiation,
    closureDate,
    tasks,
    projectAmount,
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
    srNumber,
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
    isCompleted,
  } = req.body;

  // Find the project by ID
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  // Update project fields if provided
  const projectImageLocalPath = req.files?.projectImage[0]?.path;
  if (projectImageLocalPath) {
    const projectImageInfo = await uploadOnCloudinary(projectImageLocalPath);
    if (project.projectImage?.public_id)
      await deleteImageOnCloudinary(project.projectImage?.public_id);

    project.projectImage = {
      url: projectImageInfo.url,
      public_id: projectImageInfo.public_id,
    };
  }

  const projectLogoLocalPath = req.files?.projectLogo[0]?.path;
  if (projectLogoLocalPath) {
    const projectLogoInfo = await uploadOnCloudinary(projectLogoLocalPath);

    if (project.projectLogo?.public_id)
      await deleteImageOnCloudinary(project.projectLogo?.public_id);

    project.projectLogo = {
      url: projectLogoInfo.url,
      public_id: projectLogoInfo.public_id,
    };
  }

  // Update the other fields
  project.srNumber = srNumber ?? project.srNumber;
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
  project.isCompleted = isCompleted ?? project.isCompleted;

  // Save the updated project
  await project.save();

  // Send a success response
  return res
    .status(200)
    .json(new ApiResponse(200, project, 'Project updated successfully'));
});

const addTaskToProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { taskName, isCompleted } = req.body;

  // Validate required fields
  if (!taskName) {
    throw new ApiError(400, 'Task name is required');
  }

  // Find the project by ID
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  // Create the new task
  const newTask = {
    taskName,
    isCompleted: isCompleted ?? false,
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

const toggleCompleteTask = asyncHandler(async (req, res) => {
  const { projectId, taskId } = req.params;

  if (!projectId || !taskId) {
    throw new ApiError(400, 'Project ID and Task ID are required');
  }

  const task = await Task.findById(taskId);
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  task.completed = !task.completed;
  await task.save();

  return res
    .status(200)
    .json(new ApiResponse(200, task, 'Task completion status updated'));
});

const toggleProjectCompleted = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  if (!projectId) {
    throw new ApiError(400, 'Project ID is required');
  }

  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  project.isCompleted = !project?.isCompleted || false;
  await project.save();

  return res
    .status(200)
    .json(new ApiResponse(200, project, 'Project marked as completed'));
});

module.exports = {
  createProject,
  updateProject,
  getAllProjects,
  getProjectById,
  addTaskToProject,
  deleteTaskToProject,
  searchProjects,
  toggleCompleteTask,
  toggleProjectCompleted,
};
