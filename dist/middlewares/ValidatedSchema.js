"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateSchema = (schema) => {
    return (req, res, next) => {
        try {
            const result = schema.parse(req.body);
            req.body = result;
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.default = validateSchema;
