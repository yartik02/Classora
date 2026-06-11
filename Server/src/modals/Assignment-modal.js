import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Assignment title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    attachments: [
      {
        fileName: String,
        fileUrl: String, // URL from S3, Cloudinary, or your local storage
      },
    ],
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the Faculty discriminator
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
    deadline: {
      type: Date,
      required: [true, "Strict deadline is required"],
      validate: {
        validator: function (v) {
          return v > Date.now();
        },
        message: "Deadline must be in the future",
      },
    },
    maxMarks: {
      type: Number,
      required: true,
      min: [1, "Maximum marks must be at least 1"],
    },
  },
  { timestamps: true }
);

// Indexing for performance: Faculty will frequently query assignments by their ID or by Subject/Section
assignmentSchema.index({ faculty: 1, createdAt: -1 });
assignmentSchema.index({ subject: 1, section: 1 });

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;