"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const config_1 = require("../config");
const configCloudinary = () => {
    cloudinary_1.v2.config({
        cloud_name: config_1.config.CLOUDINARY_NAME,
        api_key: config_1.config.CLOUDINARY_API,
        api_secret: config_1.config.CLOUDINARY_SECRET,
    });
};
const uploadImageToCloudinary = (imagePath, imageName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uploadResult = yield cloudinary_1.v2.uploader.upload(imagePath, {
            public_id: imageName,
        });
        return uploadResult;
    }
    catch (error) {
        throw new Error(`Failed to upload image to Cloudinary: ${error}`);
    }
});
const deleteLocalImage = (imagePath) => {
    try {
        fs_1.default.unlinkSync(imagePath);
        console.log(`Deleted local image: ${imagePath}`);
    }
    catch (error) {
        console.error(`Failed to delete local image: ${error}`);
    }
};
const getOptimizedUrl = (publicId) => {
    return cloudinary_1.v2.url(publicId, {
        fetch_format: "auto",
        quality: "auto",
    });
};
const getAutoCropUrl = (publicId) => {
    return cloudinary_1.v2.url(publicId, {
        crop: "auto",
        gravity: "auto",
        width: 500,
        height: 500,
    });
};
const uploadImageAndGenerateUrls = (imagePath, imageName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        configCloudinary();
        const uploadResult = yield uploadImageToCloudinary(imagePath, imageName);
        const optimizedUrl = getOptimizedUrl(imageName);
        const autoCropUrl = getAutoCropUrl(imageName);
        deleteLocalImage(imagePath);
        return { uploadResult, optimizedUrl, autoCropUrl };
    }
    catch (error) {
        throw Error(error);
    }
});
exports.default = uploadImageAndGenerateUrls;
