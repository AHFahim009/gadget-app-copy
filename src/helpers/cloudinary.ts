/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { config } from "../config";

const configCloudinary = () => {
    cloudinary.config({
        cloud_name: config.CLOUDINARY_NAME,
        api_key: config.CLOUDINARY_API,
        api_secret: config.CLOUDINARY_SECRET,
    });
};

const uploadImageToCloudinary = async (imagePath: any, imageName: string) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(imagePath, {
            public_id: imageName,
        });
        return uploadResult;
    } catch (error) {
        throw new Error(`Failed to upload image to Cloudinary: ${error}`);
    }
};

const deleteLocalImage = (imagePath: any) => {
    try {
        fs.unlinkSync(imagePath);
        console.log(`Deleted local image: ${imagePath}`);
    } catch (error) {
        console.error(`Failed to delete local image: ${error}`);
    }
};

const getOptimizedUrl = (publicId: any) => {
    return cloudinary.url(publicId, {
        fetch_format: "auto",
        quality: "auto",
    });
};

const getAutoCropUrl = (publicId: any) => {
    return cloudinary.url(publicId, {
        crop: "auto",
        gravity: "auto",
        width: 500,
        height: 500,
    });
};

const uploadImageAndGenerateUrls = async (
    imagePath: any,
    imageName: string
) => {


    try {
        configCloudinary();

        const uploadResult = await uploadImageToCloudinary(imagePath, imageName);

        const optimizedUrl = getOptimizedUrl(imageName);

        const autoCropUrl = getAutoCropUrl(imageName);

        deleteLocalImage(imagePath);
        return { uploadResult, optimizedUrl, autoCropUrl }

    } catch (error: any) {
        throw Error(error)
    }
};

export default uploadImageAndGenerateUrls;
