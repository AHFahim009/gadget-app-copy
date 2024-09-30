import mongoose, { Schema } from "mongoose";
import { UserProps } from "./auth.interface";

const userSchema = new Schema<UserProps>(
    {
        name: {
            type: String
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        },
        photo: {
            type: String,
        },
        role: {
            type: String,
            default: "user"
        }
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model<UserProps>("user", userSchema);

export default UserModel;
