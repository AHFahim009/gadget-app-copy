import { z } from 'zod';

const userSchema = z.object({
    name: z.string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
    })
        .min(3, 'Name must be at least 3 characters')
        .max(50, 'Name must be at most 50 characters'),
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    })
        .email('Invalid email address'),
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
    })
        .min(8, 'Password must be at least 8 characters'),
    photo: z.string({
        invalid_type_error: 'Photo must be a string',
    }).optional(),
});

export const UserValidation = {
    userSchema
}
