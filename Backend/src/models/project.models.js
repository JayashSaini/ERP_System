const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Image schema
const ImageSchema = new Schema({
  url: { type: String, required: true }, // URL of the image
  public_id: { type: String, required: true }, // Public ID for the image, typically used by cloud services like Cloudinary
});

const TaskSchema = new Schema({
  taskName: { type: String, required: true }, // Task name or title
  isCompleted: { type: Boolean, default: false }, // Whether the task is completed or not
});

// Define the Project schema
const ProjectSchema = new Schema(
  {
    srNumber: { type: Number, required: true, unique: true }, // Serial number or unique identifier
    projectName: { type: String, required: true }, // Project name
    projectHeading: { type: String, required: true }, // Project heading
    projectLogo: { type: ImageSchema, required: false }, // Project logo as an embedded Image document
    projectImage: { type: ImageSchema, required: true }, // Project image as an embedded Image document
    dateOfInitiation: { type: Date, required: true }, // Date of initiation
    closureDate: { type: Date }, // Closure date, optional
    tasks: {
      type: [TaskSchema],
      default: [],
    }, // Array of tasks
    projectAmount: { type: Number, required: true }, // Total project amount
    paymentReceived: { type: Number }, // Amount received
    paymentDue: { type: Number }, // Amount due
    outstandingPayment: { type: Number }, // Outstanding payment
    clientName: { type: String }, // Client name
    clientNumber: { type: String }, // Client contact number
    projectManager: { type: String }, // Name of the project manager
    isCompleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Project model
const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
