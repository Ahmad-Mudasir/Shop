class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.error = Error;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler;