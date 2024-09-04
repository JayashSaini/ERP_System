const mongoose = require('mongoose');
const {
  ProjectStatusEnum,
  AvailableProjectStatus,
  AvailableTaskStatus,
  TaskStatusEnum,
} = require('../constants');
const { Schema } = mongoose;

// Define the Image schema
const ImageSchema = new Schema({
  url: { type: String, required: true }, // URL of the image
  public_id: { type: String, required: true }, // Public ID for the image, typically used by cloud services like Cloudinary
});

const TaskSchema = new Schema(
  {
    taskName: { type: String, required: true }, // Task name or title
    taskDescription: { type: String }, // Detailed description of the task
    taskStatus: {
      type: String,
      enum: AvailableTaskStatus,
      default: TaskStatusEnum.IN_PROGRESS,
    }, // Status of the task (e.g., Not Started, In Progress, Completed)
    assignee: {
      type: {
        _id: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        username: String,
        avatar: {
          url: String,
          public_id: String,
        },
        email: String,
      },
      required: true,
    }, // The user assigned to this task
  },
  { timestamps: true }
);

// Define the Project schema
const ProjectSchema = new Schema(
  {
    projectName: { type: String, required: true }, // Project name
    projectHeading: { type: String, required: true }, // Project heading
    projectLogo: { type: ImageSchema, required: false }, // Project logo as an embedded Image document
    projectImage: { type: ImageSchema, required: true }, // Project image as an embedded Image document
    dateOfInitiation: { type: Date }, // Date of initiation
    closureDate: { type: Date }, // Closure date, optional
    tasks: {
      type: [TaskSchema],
      default: [],
    }, // Array of tasks
    projectAmount: { type: Number }, // Total project amount
    paymentReceived: { type: Number }, // Amount received
    paymentDue: { type: Number }, // Amount due
    outstandingPayment: { type: Number }, // Outstanding payment
    clientName: { type: String }, // Client name
    clientNumber: { type: String }, // Client contact number
    projectManager: { type: String, required: true }, // Name of the project manager
    projectStatus: {
      type: String,
      enum: AvailableProjectStatus, // Available project statuses enumerated in constants.js
      default: ProjectStatusEnum.IN_PROGRESS,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Project model
const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
