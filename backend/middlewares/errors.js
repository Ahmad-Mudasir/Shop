import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
    let error = {
        statusCode: err?.statusCode || 500,
        message: err?.message || "Internal Server Error",
    };

    // Trim safely handles potential trailing spaces from Windows 'set NODE_ENV=' commands
    const env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : "development";

    // Handle invalid Mongoose ID Error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        error = new ErrorHandler(message, 404);
    }

    //Handle duplicate key error
    if (err.code === 11000) {
        const message = `Resource already exists`;
        error = new ErrorHandler(message, 400);
    }

    //Handle wrong JWT error
    if (err.name === "JsonWebTokenError") {
        const message = "Invalid token";
        error = new ErrorHandler(message, 400);
    }

    //Handle wrong JWT error
    if (err.name === "TokenExpiredError") {
        const message = "Token expired";
        error = new ErrorHandler(message, 400);
    }

    //handle validation errors
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((value) => value.message);
        error = new ErrorHandler(message, 400);
    }

    if (env === "development") {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            error: err,
            stack: err?.stack,
        });
    }

    if (env === "production") {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
    }
};