import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password must be at least 6 characters long"],
        select: false,
    },
    avatar: {
        public_id: String,
        url: String,
    },
    role: {
        type: String,
        default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true });

//Encrypt password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    this.password = await bcryptjs.hash(this.password, 10);
});

//Method to generate JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

//Method to compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
};

//Method to generate reset password token
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    //Hash token
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    //Set expire time
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
};

export default mongoose.model("User", userSchema);  