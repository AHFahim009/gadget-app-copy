"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalError = (error, req, res, next) => {
    const errorResponse = {
        status: error.status || 500,
        success: false,
        message: error.message || "Internal Server Error",
        error: error,
    };
    // if (error.name === 'ValidationError') {
    //     errorResponse.status = 400;
    //     errorResponse.message = 'Invalid request';
    // } else if (error.name === 'MongoError') {
    //     errorResponse.status = 500;
    //     errorResponse.message = 'Database error';
    // }
    res.status(errorResponse.status).json(errorResponse);
};
exports.default = globalError;
