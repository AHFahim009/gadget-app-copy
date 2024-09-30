/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { AppError } from "../helpers/AppError";

type GenericErrorProps = {
    status: number;
    success: boolean;
    message: string;
    error: any;
};

const globalError = (
    error: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errorResponse: GenericErrorProps = {
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

export default globalError;
