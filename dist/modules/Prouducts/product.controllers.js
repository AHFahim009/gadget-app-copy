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
exports.ProductControllers = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const asyncHandeler_1 = __importDefault(require("../../helpers/asyncHandeler"));
const responseHandler_1 = __importDefault(require("../../helpers/responseHandler"));
const cloudinary_1 = __importDefault(require("../../helpers/cloudinary"));
const product_model_1 = __importDefault(require("./product.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const createProduct = (0, asyncHandeler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productPayload = req.body;
    const photo = req.file;
    const session = yield mongoose_1.default.startSession();
    try {
        // Start session inside try block to handle potential errors
        session.startTransaction();
        // Ensure photo file exists before processing
        if (photo) {
            const uploadResult = yield (0, cloudinary_1.default)(photo.path, productPayload.name);
            productPayload.photo = (uploadResult === null || uploadResult === void 0 ? void 0 : uploadResult.optimizedUrl) || "";
        }
        else {
            throw new Error("You have to give product photo");
        }
        // Create a new product instance
        const product = new product_model_1.default(Object.assign({}, productPayload));
        // Save the product using the session
        const result = yield product.save({ session });
        // Commit the transaction
        yield session.commitTransaction();
        // Send a success response
        (0, responseHandler_1.default)(res, {
            status: 201,
            success: true,
            message: "Product created successfully",
            data: result,
        });
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
}));
const getSingleProduct = (0, asyncHandeler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const result = yield product_model_1.default.findById(productId);
    (0, responseHandler_1.default)(res, {
        status: 201,
        success: true,
        message: "Single Product get successfully",
        data: result,
    });
}));
const getAllProducts = (0, asyncHandeler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.find();
    (0, responseHandler_1.default)(res, {
        status: 201,
        success: true,
        message: "All Products get successfully",
        data: result,
    });
}));
exports.ProductControllers = {
    createProduct,
    getSingleProduct,
    getAllProducts,
    // updateProduct,
    // deleteProduct,
};
