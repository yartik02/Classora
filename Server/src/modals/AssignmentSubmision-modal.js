import mongoose from "mongoose";

const assignmentSubmissionSchema = new mongoose.Schema(
  {
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the Student discriminator
      required: true,
    },
    submittedText: {
      type: String,
      default: "", // Crucial for the student-to-student text similarity checker
    },
    attachments: [
      {
        fileName: String,
        fileUrl: String,
      },
    ],
    // Evaluation Engine & Grading
    aiSuggestedMark: {
      type: Number,
      default: null, // Populated by your evaluation engine
    },
    finalMark: {
      type: Number,
      default: null, // The actual grade given
    },
    facultyFeedback: {
      type: String,
      default: "",
    },
    // The "Anti-Laziness" Lock
    isManuallyConfirmed: {
      type: Boolean,
      default: false,
      required: true, // Forces the teacher to explicitly click "Confirm" on the UI
    },
    // Plagiarism Flagging
    similarityScore: {
      type: Number,
      default: 0, // Percentage of overlap with other submissions
    },
    isPlagiarized: {
      type: Boolean,
      default: false, // Automatically set to true if similarityScore > 80%
    },
  },
  { timestamps: true }
);

// Prevent duplicate submissions: A student can only submit once per assignment
assignmentSubmissionSchema.index({ assignment: 1, student: 1 }, { unique: true });

const AssignmentSubmission = mongoose.model("AssignmentSubmission", assignmentSubmissionSchema);
export default AssignmentSubmission;