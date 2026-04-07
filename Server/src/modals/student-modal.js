import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const studentSchema= new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    rollno: {
        type: Number,
        required: [true, "Roll Number is required"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        trim: true,
        endsWith: "@jmieti.edu.in"
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    dept: {
        type: String,
        required: [true, "Department is required"]
    },
    year: {
        type: String,
        required: [true, "Year is required"]
    },
    // isSuspended: {
    //     type: Boolean,
    //     default: false,
    // },
    // suspensionDetails: {
    // reason: { type: String, default: "" },
    // suspendedAt: { type: Date, default: Date.now },
    // expiresAt: { type: Date, default: null },
    // appeal: {
    // hasAppealed: { type: Boolean, default: false },
    // appealText: { type: String, default: null },
    // submittedAt: { type: Date, default: null },
    // status: { 
    //   type: String, 
    //   enum: ["None","Pending", "Approved", "Rejected"], 
    //   default: "None" 
    // },
    // adminRemarks: { type: String, default: null }
//   }
    // }

},{timestamps: true}

);

//secure the password 


studentSchema.pre("save", async function(next){

    if(!this.isModified("password")) return next();

    try {
        const saltRounds = await bcrypt.genSalt(10);
        const hash_Password = await bcrypt.hash(this.password, saltRounds);
        this.password = hash_Password;
    } catch (error) {
        next( error);
    }
});

studentSchema.methods.generateToken = async function() {

    try {
        return jwt.sign(
            {
                studentId: this._id.toString(),
                email: this.email,
            },
            process.env.JWT_SECRET_KEY,
            { 
                expiresIn: process.env.JWT_TOKEN_EXPIRY,
            }
    )
    } catch (error) {
        console.error(error);
    }
};


//compare the passwords

studentSchema.methods.comparePassword = async function(password) {
        return bcrypt.compare(password, this.password);
};
// 'this' keyword refers to the current document instance being processed.

const student= mongoose.model("Student",studentSchema);
export default student