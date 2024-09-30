// src/config/env.config.ts

import * as dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Define and export your environment variables
export const config = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    FRONTED_URL: process.env.FRONTED_URL,
    REFRESH_TOKEN_SECRET_EXPIRY: process.env.REFRESH_TOKEN_SECRET_EXPIRY,
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
    CLOUDINARY_API: process.env.CLOUDINARY_API,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,

};
