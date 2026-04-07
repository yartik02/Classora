import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    employeeId: {
      type: Number,
      required: [true, "Employee ID is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      endsWith: "@jmieti.edu.in",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    classesAllocated: {
      type: Object,
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

//secure the password

teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const saltRounds = await bcrypt.genSalt(10);
    const hash_Password = await bcrypt.hash(this.password, saltRounds);
    this.password = hash_Password;
  } catch (error) {
    next(error);
  }
});

// JWT are typically not stored in the database along with user credentials. Instead they are issued by the server during
// the authentication process and then stored on the client-side (e.g., in local storage or cookies) for later use.

studentSchema.methods.generateToken = async function () {
  //here generateToken is an instance method, in which u can create as many functions as u want

  try {
    return jwt.sign(
      {
        teacherId: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_TOKEN_EXPIRY,
      },
    );
  } catch (error) {
    console.error(error);
  }
};

//compare the passwords

teacherSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
// 'this' keyword refers to the current document instance being processed.

const teacher = mongoose.model("Teacher", teacherSchema);
export default teacher;
