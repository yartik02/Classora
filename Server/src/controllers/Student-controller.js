import { User, Student } from "../modals/users-modal.js";
import { Department, Batch, Section } from "../modals/Dept_Batch_Sec-modal.js";
import { contactMsg } from "../modals/ContactUs-modal.js";
import admin from "../modals/admin-modal.js";
// import { NotificationMsg } from "../Modals/Notification-modals.js";
import { generateOtp } from "../utility/otpGenerator.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

const otpStore = new Map();

const home = async (req, res) => {
  try {
    res.status(200).send("Hello Welcome to the Auth Page...");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    // 1. Update destructuring to match the new frontend payload
    const { name, rollno, email, password, department, batch, section } =
      req.body;
    console.log("Recived data:", req.body);

    // 2. Email Validation
    const correctEmail = email.endsWith("@jmieti.edu.in");
    if (!correctEmail) {
      return res
        .status(400)
        .json({ msg: "Please use your college email to register!" });
    }

    // 3. User Existence Check (Check the unified User collection, not just Students)
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ msg: "A user with this email already exists!" });
    }

    const rollnoExists = await Student.findOne({ rollno });
    if (rollnoExists) {
      return res
        .status(400)
        .json({ msg: "A student with this Roll Number already exists!" });
    }

    // A. Find Department ID
    const deptDoc = await Department.findOne({ name: department });
    if (!deptDoc) {
      return res
        .status(400)
        .json({ msg: `Department '${department}' not found in the database.` });
    }

    if (!batch || typeof batch !== "string") {
      return res.status(400).json({ msg: "Batch is required" });
    }

    const match = batch.match(/batch\s*(\d{4})-(\d{4})/i);

    if (!match) {
      return res
        .status(400)
        .json({ msg: "Batch format must be 'Batch YYYY-YYYY'" });
    }
    const startYear = Number(match[1]);
    const endYear = Number(match[2]);
    // const deptIdStr = deptDoc._id.toString();

    if (startYear >= endYear) {
      return res.status(400).json({ msg: "Invalid batch years" });
    }
    const batchDoc = await Batch.findOne({
      department: deptDoc._id,
      startingYear: startYear,
      endingYear: endYear,
    });

    if (!batchDoc) {
      return res
        .status(400)
        .json({
          msg: `Batch '${batch}' is not configured for this department.`,
        });
    }
    // C. Parse and Find Section ID (Converts "Section A" -> "A")
    const sectionName = section.replace("Section ", "").trim();
    console.log("Finding section with batch ID:", batchDoc._id, "and name:", sectionName);

    const sectionDoc = await Section.findOne({
      batch: batchDoc._id,
      name: sectionName,
    });
    console.log("Found section document: ", sectionDoc);

    if (!sectionDoc) {
      return res
        .status(400)
        .json({
          msg: `Section '${sectionName}' does not exist for this batch.`,
        });
    }
    // We use Student.create(), which automatically applies the "Student" discriminator role
    const studentCreated = await Student.create({
      name,
      rollno,
      email,
      password,
      department: deptDoc._id,
      batch: batchDoc._id,
      section: sectionDoc._id,
    });

    // 6. Success Response
    res.status(201).json({
      msg: "Student registered successfully!",
      token: await studentCreated.generateToken(),
      studentID: studentCreated._id.toString(),
    });

    console.log("Student registered successfully:", studentCreated.email);
  } catch (error) {
    console.error("🔥 Register error:", error.message);
    console.error(error.stack);
    res.status(500).json({
      msg: "Internal Server Error!",
      error: error.message,
      stack: error.stack,
    });
  }
};

//login logic

const login = async (req, res) => {
  try {
    const { email, password, loginRole } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    if (loginRole && user.role !== loginRole) {
      return res.status(403).json({ 
        msg: `Access Denied. You are registered as ${user.role}. Please use the correct login portal.` 
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    if (user.isSuspended && user.suspensionDetails) {
      const expiryDate = user.suspensionDetails.expiresAt
        ? new Date(user.suspensionDetails.expiresAt)
        : null;
      const now = new Date();

      if (expiryDate && now > expiryDate) {
        user.isSuspended = false;
        await user.save();
      } else {
        return res.status(403).json({
          msg: user.suspensionDetails.reason 
            ? `Account suspended: ${user.suspensionDetails.reason}`
            : "Your account is suspended. Please contact the administration."
        });
      }
    }

    return res.status(200).json({
      msg: `${user.role} logged in successfully!`,
      token: user.generateToken(), // Uses the single method from base schema
      userID: user._id.toString(),
      name: user.name,
      role: user.role,
      
      ...(user.role === 'Student' && { rollno: user.rollno }),
      ...(user.role === 'Faculty' && { employeeId: user.employeeId })
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

//user logic ie get data of the logged user from DB

const user = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("Fetching data for user ID:", userId);
    const adminData = await User.findById(userId);
    console.log("Admin data fetched:", adminData);
    if (adminData && adminData.role === "Admin") {
      return res.status(200).json({ userData: adminData });
    }
    
    const userData = await Student.findById(userId)
      .populate("department", "name code")
      .populate("batch", "startingYear endingYear currentSemester programName")
      .populate("section", "name");

    res.status(200).json({ userData });
  } catch (error) {
    console.error("error form the user route: ", error);
  }
};

//Contact Us
const contactUs = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const messageCreated = await contactMsg.create({
      name,
      email,
      subject,
      message,
    });
    res.status(200).json({
      msg: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Message not sent:", error.message);
    console.error(error.stack);
    res.status(500).json({
      msg: "Internal Server Error!",
      error: error.message, // clean error text
      stack: error.stack, // where the crash happened
    });
  }
};

//get notifications
// const getNotifications = async (req, res, next) => {
//   try {
//     const { rollno } = req.query;
//     const notifications = await NotificationMsg.find({ rollno: rollno }).sort({
//       createdAt: -1,
//     });
//     res.status(200).json(notifications);
//     if (!notifications) {
//       console.error("Couldn't get the notifications!");
//       res.status(500).json({
//         msg: "Couldn't get the notifications!",
//         error: error.message,
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

const sendOtpToMail = async (req, res) => {
  const { name, email } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
      user: process.env.SMTPUser,
      pass: process.env.SMTPPassword,
    },
  });

  try {
    if (!email) {
      return res.status(400).json({ msg: "Email is required" });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res
        .status(400)
        .json({ msg: "Student with this email already exists!" });
    }

    const otp = generateOtp();

    // OTP expiry (5 minutes)
    const expiresAt = Date.now() + 5 * 60 * 1000;

    otpStore.set(email, { otp, expiresAt });

    console.log("Generated OTP:", otp); // for debugging

    const info = await transporter.sendMail({
      from: '"Classora"<kambojyartik@gmail.com>',
      to: email,
      subject: "Hello from Classora Team.",
      text: "Here is your OTP for verification.", // Plain-text version of the message
      html: `
              <h3>Hi ${name} 👋</h3>
              <p>Use the following one-time password (OTP) for verification of your Classora account.</p>
              <h2 style="color:#1a4cff;">${otp}</h2>
              <p>This OTP is valid for 5 minutes only.</p>
              <p>This mail is sent to: ${email}</p><br>
              <p>If you did not request this, please ignore this email.</p><br>
              <p>Regards,</p>
              <p>Team Classora</P>
            `,
    });
    console.log("Message sent:", info.messageId);

    res.status(200).json({
      msg: "OTP generated and email sent successfully!",
      expiresIn: "5 minutes",
    });
  } catch (error) {
    console.error("OTP error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const storedOtpData = otpStore.get(email);

    if (!storedOtpData) {
      return res.status(400).json({ msg: "OTP not found or expired" });
    }

    if (Date.now() > storedOtpData.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ msg: "OTP expired" });
    }

    if (storedOtpData.otp !== otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    otpStore.delete(email);

    res.status(200).json({ msg: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const forgetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  const doesStudentExist = await Student.findOne({ email });
  if (!doesStudentExist) {
    return res.status(400).json({ msg: "Invalid Email!" });
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const updatedPassword = await Student.findByIdAndUpdate(
    doesStudentExist._id,
    { $set: { password: hashedPassword } },
    { new: true },
  );

  if (!updatedPassword) {
    return res.status(404).json({ msg: "Password can't be Updated!" });
  }
  return res.status(200).json({ msg: "Password updated successfully!" });
};

// const clearNotifications = async (req, res, next) => {
//   try {
//     const { rollno } = req.query;

//     if (!rollno) {
//       return res
//         .status(400)
//         .json({ msg: "Roll number is required to clear notifications." });
//     }

//     // deleteMany wipes all documents matching the criteria in one operation
//     const result = await NotificationMsg.deleteMany({ rollno: rollno });

//     return res.status(200).json({
//       msg: "Notifications cleared successfully",
//       deletedCount: result.deletedCount,
//     });
//   } catch (error) {
//     console.error("Error clearing notifications:", error);
//     next(error);
//   }
// };

// const markNotificationsAsRead = async (req, res, next) => {
//   try {
//     const { rollno } = req.query;

//     if (!rollno) {
//       return res.status(400).json({ msg: "Roll number is required." });
//     }

//     // Update all notifications for this user where isRead is currently false
//     await NotificationMsg.updateMany(
//       { rollno: rollno, isRead: false },
//       { $set: { isRead: true } },
//     );

//     return res.status(200).json({ msg: "Notifications marked as read." });
//   } catch (error) {
//     console.error("Error marking notifications as read:", error);
//     next(error);
//   }
// };

// const getAllComplaints = async (req, res) => {
//   try {
//     const allComplaints = await Complaint.find();
//     // console.log(allComplaints);
//     const securedRecentComplaints = allComplaints.map((complaint) => {
//       // If it is anonymous, ONLY the superadmin gets the real data
//       if (complaint.isAnonymous) {
//         complaint.createdByName = "Anonymous Student";
//         complaint.createdByRollno = "Hidden";
//         complaint.createdByClass = "Hidden";
//         complaint.createdByBranch = "Hidden";
//         complaint.createdByEmail = "Hidden";
//       }
//       return complaint;
//     });

//     if (!securedRecentComplaints || securedRecentComplaints.length === 0) {
//       return res.status(404).json({ msg: "No complaints found" });
//     }
//     return res.status(200).json(securedRecentComplaints);
//   } catch (error) {
//     console.error("Error fetching complaints:", error);
//     res
//       .status(500)
//       .json({ msg: "Internal Server Error, cant fetch complaints" });
//   }
// };

// const submitAppeal = async (req, res) => {
//   try {
//     const { appealText } = req.body;
//     const studentId = req.user._id;

//     if (!appealText || appealText.trim() === "") {
//       return res.status(400).json({ message: "Appeal text is required." });
//     }

//     const studentExist = await student.findById(studentId);

//     if (!studentExist.isSuspended) {
//       return res
//         .status(400)
//         .json({ message: "Your account is not currently suspended." });
//     }

//     if (studentExist.suspensionDetails.appeal.hasAppealed) {
//       return res
//         .status(400)
//         .json({ message: "You have already submitted an appeal." });
//     }

//     // Lock in the appeal
//     studentExist.suspensionDetails.appeal = {
//       hasAppealed: true,
//       appealText: appealText,
//       submittedAt: new Date(),
//       status: "Pending",
//       adminRemarks: null,
//     };

//     await studentExist.save();

//     res.status(200).json({
//       message: "Appeal submitted successfully.",
//       suspensionDetails: studentExist.suspensionDetails,
//     });
//   } catch (error) {
//     console.error("Submit Appeal Error:", error);
//     res.status(500).json({ message: "Server error while submitting appeal." });
//   }
// };

export {
  home,
  register,
  login,
  //   getAllComplaints,
  user,
  contactUs,
  //   getNotifications,
  sendOtpToMail,
  verifyOtp,
  forgetPassword,
  //   clearNotifications,
  //   markNotificationsAsRead,
  //   submitAppeal,
};
