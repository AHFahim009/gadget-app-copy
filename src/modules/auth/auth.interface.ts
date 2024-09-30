import { Document } from 'mongoose';
export interface UserProps extends Document {
    name: string;
    email: string;
    password?: string;
    photo?: string;
    role: string;
}