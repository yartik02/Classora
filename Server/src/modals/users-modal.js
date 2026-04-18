import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const baseUserOptions = {
  discriminatorKey: "role", // The engine that tells Mongoose which sub-schema to use
  timestamps: true,
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      match: [
        /@jmieti\.edu\.in$/,
        "Must be a valid @jmieti.edu.in institutional email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    // Moved to Base: Faculty can also face disciplinary action
    isSuspended: {
      type: Boolean,
      default: false,
    },
    suspensionDetails: {
      reason: { type: String, default: "" },
      suspendedAt: { type: Date, default: null },
      expiresAt: { type: Date, default: null },
      appeal: {
        hasAppealed: { type: Boolean, default: false },
        appealText: { type: String, default: null },
        submittedAt: { type: Date, default: null },
        status: {
          type: String,
          enum: ["None", "Pending", "Approved", "Rejected"],
          default: "None",
        },
        adminRemarks: { type: String, default: null },
      },
    },
  },
  baseUserOptions,
);

// 2. BASE METHODS & MIDDLEWARE
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
    const saltRounds = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, saltRounds);
});

userSchema.methods.generateToken = function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(), // Changed from studentId to userId so it works for Faculty too
        email: this.email,
        role: this.role, // Added role to JWT payload for easy frontend routing
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_TOKEN_EXPIRY },
    );
  } catch (error) {
    console.error("JWT Generation Error:", error);
  }
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Compile the Base Model
const User = mongoose.model("User", userSchema);

// 3. THE STUDENT DISCRIMINATOR
const Student = User.discriminator(
  "Student",
  new mongoose.Schema({
    rollno: {
      type: Number,
      required: [true, "Roll Number is required"],
      unique: true,
    },
    // Using relational mapping based on our previous architecture
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: [true, "Department reference is required"],
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: [true, "Batch reference is required"],
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: [true, "Section reference is required"],
    },
  }),
);

// 4. THE FACULTY DISCRIMINATOR
const Faculty = User.discriminator(
  "Faculty",
  new mongoose.Schema({
    employeeId: {
      type: String,
      required: [true, "Employee ID is required"],
      unique: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: [true, "Department reference is required"],
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
    },
  }),
);

export { User, Student, Faculty };