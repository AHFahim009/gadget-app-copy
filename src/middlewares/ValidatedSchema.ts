import { AnyZodObject } from "zod";
import { NextFunction, Request, Response } from "express";

const validateSchema = (schema: AnyZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = schema.parse(req.body);
            req.body = result;
            next();
        } catch (error) {
            next(error)
        }
    };
};

export default validateSchema;
