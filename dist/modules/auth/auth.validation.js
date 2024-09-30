"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
    })
        .min(3, 'Name must be at least 3 characters')
        .max(50, 'Name must be at most 50 characters'),
    email: zod_1.z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    })
        .email('Invalid email address'),
    password: zod_1.z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
    })
        .min(8, 'Password must be at least 8 characters'),
    photo: zod_1.z.string({
        invalid_type_error: 'Photo must be a string',
    }).optional(),
});
exports.UserValidation = {
    userSchema
};
