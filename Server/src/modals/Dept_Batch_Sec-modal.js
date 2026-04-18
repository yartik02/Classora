import mongoose from "mongoose";

// 1. Department Schema (The Root)
const DepartmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true, uppercase: true }, 
    headOfDepartment: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// 2. Academic Batch Schema (The Timeline)
const BatchSchema = new mongoose.Schema(
  {
    programName: { type: String, required: true }, 
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    startingYear: { type: Number, required: true },
    endingYear: { type: Number, required: true },
    currentSemester: { type: Number, required: true, default: 1 },
    isActive: { type: Boolean, default: true }, 
  },
  { timestamps: true },
);

// 3. Section Schema (The Physical Group)
const SectionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, uppercase: true }, 
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },
    studentCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// 4. Subject Schema (The Curriculum)
const SubjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true, uppercase: true },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    credits: { type: Number, required: true, min: 1, max: 5 },
    subjectType: { type: String, enum: ["Core", "Elective"], required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// 5. Faculty Allocation Schema (The Engine)
const AllocationSchema = new mongoose.Schema(
  {
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },
    // assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  },
  { timestamps: true },
);

AllocationSchema.index(
  { faculty: 1, subject: 1, batch: 1 },
  { unique: true },
);

const Department = mongoose.model("Department", DepartmentSchema);
const Batch = mongoose.model("Batch", BatchSchema);
const Section = mongoose.model("Section", SectionSchema);
const Subject = mongoose.model("Subject", SubjectSchema);
const Allocation = mongoose.model("Allocation", AllocationSchema);

export { Department, Batch, Section, Subject, Allocation };