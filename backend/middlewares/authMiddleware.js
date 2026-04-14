import catchAsyncErrors from "./catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return next(new ErrorHandler("Unauthorized, login ist to access this resource", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
});

//Authorize user roles
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role ${req.user.role} is not authorized to access this resource`, 403));
        }
        next();
    };
};