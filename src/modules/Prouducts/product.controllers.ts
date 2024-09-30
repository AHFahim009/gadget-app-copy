/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import asyncHandler from "../../helpers/asyncHandeler";
import sendResponse from "../../helpers/responseHandler";
import uploadImageAndGenerateUrls from "../../helpers/cloudinary";
import { ProductProps } from "./product.interface";
import ProductModel from "./product.model";
import mongoose from "mongoose";

const createProduct = asyncHandler(async (req, res) => {
    const productPayload = req.body as ProductProps;

    const photo = req.file;


    const session = await mongoose.startSession();
    try {
        // Start session inside try block to handle potential errors

        session.startTransaction();

        // Ensure photo file exists before processing

        if (photo) {
            const uploadResult = await uploadImageAndGenerateUrls(
                photo.path,
                productPayload.name
            );
            productPayload.photo = uploadResult?.optimizedUrl || "";
        } else {
            throw new Error("You have to give product photo");
        }



        // Create a new product instance
        const product = new ProductModel({ ...productPayload });

        // Save the product using the session
        const result = await product.save({ session });

        // Commit the transaction
        await session.commitTransaction();

        // Send a success response
        sendResponse(res, {
            status: 201,
            success: true,
            message: "Product created successfully",
            data: result,
        });
    } catch (error: any) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
});

const getSingleProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const result = await ProductModel.findById(productId);
    sendResponse(res, {
        status: 201,
        success: true,
        message: "Single Product get successfully",
        data: result,
    });
});

const getAllProducts = asyncHandler(async (req, res) => {

    const result = await ProductModel.find();
    sendResponse(res, {
        status: 201,
        success: true,
        message: "All Products get successfully",
        data: result,
    });
});

export const ProductControllers = {
    createProduct,
    getSingleProduct,
    getAllProducts,
    // updateProduct,
    // deleteProduct,
};
