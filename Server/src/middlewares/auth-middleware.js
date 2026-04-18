import jwt from "jsonwebtoken";
import {Student, User} from "../modals/users-modal.js";
import admin from "../modals/admin-modal.js";

const authMiddleware = async(req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    
    if (!authHeader) {
      return res.status(401).json({ msg: "No token provided" });
    }
    
    const token = authHeader.replace("Bearer ", "");
    
    const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Data after verification of token is: \n",isVerified);
    const userData = await Student.findOne({ email: isVerified.email }).select({
      password: 0, // Exclude password field
    })|| await User.findOne({ email: isVerified.email }).select({ password: 0 });
    
    req.token = token;
    req.userId = userData._id;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid or expired token", error: err });
  }
};

export { authMiddleware };
