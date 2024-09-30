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
exports.AuthControllers = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const asyncHandeler_1 = __importDefault(require("../../helpers/asyncHandeler"));
const responseHandler_1 = __importDefault(require("../../helpers/responseHandler"));
const cloudinary_1 = __importDefault(require("../../helpers/cloudinary"));
const auth_model_1 = __importDefault(require("./auth.model"));
const generateToken_1 = __importDefault(require("../../helpers/generateToken"));
const config_1 = require("../../config");
const QueryHandler_1 = __importDefault(require("../../queryBuilder/QueryHandler"));
const AppError_1 = require("../../helpers/AppError");
const createUser = (0, asyncHandeler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userPayload = req.body;
    const photo = req.file;
    const session = yield mongoose_1.default.startSession();
    try {
        // Start session inside try block to handle potential errors
        session.startTransaction();
        if (photo) {
            const uploadResult = yield (0, cloudinary_1.default)(photo.path, userPayload.name);
            const photoUrl = (uploadResult === null || uploadResult === void 0 ? void 0 : uploadResult.optimizedUrl) || "";
            userPayload.photo = photoUrl;
        }
        // Create a new product instance
        const user = new auth_model_1.default(Object.assign({}, userPayload));
        // Save the product using the session
        const result = yield user.save({ session });
        const accessToken = (0, generateToken_1.default)({
            jwtPayload: {
                _id: result._id,
                name: result.name,
                email: result.email,
                photo: result.photo || "",
                role: user.role,
            },
            expiresIn: config_1.config.ACCESS_TOKEN_EXPIRY,
            secretToken: config_1.config.ACCESS_TOKEN,
        });
        // Commit the transaction
        yield session.commitTransaction();
        const userData = {
            _id: result._id,
            name: result.name,
            email: result.email,
            photo: result.photo || "",
            role: user.role,
        };
        // Send a success response
        (0, responseHandler_1.default)(res, {
            status: 201,
            success: true,
            message: "User created successfully",
            accessToken,
            data: userData
        });
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        yield session.endSession();
    }
}));
const loginUser = (0, asyncHandeler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield auth_model_1.default.findOne({ email, });
    if (!user)
        throw new Error("Invalid email or password");
    const isMatch = user.password === password;
    if (!isMatch)
        throw new Error("Invalid email or password");
    const accessToken = (0, generateToken_1.default)({
        jwtPayload: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        expiresIn: config_1.config.ACCESS_TOKEN_EXPIRY,
        secretToken: config_1.config.ACCESS_TOKEN,
    });
    // const refreshToken = generateToken({
    //     jwtPayload: {
    //         _id: user._id,
    //         name: user.name,
    //         email: user.email,
    //         role: user.role,
    //     },
    //     expiresIn: config.REFRESH_TOKEN_SECRET_EXPIRY as string,
    //     secretToken: config.REFRESH_TOKEN_SECRET as string,
    // });
    const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photo || ""
    };
    (0, responseHandler_1.default)(res, {
        status: 201,
        success: true,
        message: "login success",
        data: userData,
        accessToken
    });
}));
const getAllUser = (0, asyncHandeler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const queryHandler = new QueryHandler_1.default(query, auth_model_1.default);
    const users = yield queryHandler.search(['name', 'email']).sort().paginate().execute();
    const metaData = yield queryHandler.getPaginationResult();
    (0, responseHandler_1.default)(res, {
        status: 201,
        success: true,
        message: "get all user retrieved",
        data: users,
        metaData
    });
}));
const getSingleUser = (0, asyncHandeler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    // Check if user exists
    const user = yield auth_model_1.default.findById(userId);
    if (!user) {
        throw new AppError_1.AppError(404, "User not found");
    }
    // get the user
    yield auth_model_1.default.findById({ _id: userId });
    (0, responseHandler_1.default)(res, {
        status: 201,
        success: true,
        message: "User retrieved successfully",
        data: null,
    });
}));
const updateUserRole = (0, asyncHandeler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const { role } = req.body;
    // Validate role input
    if (!["user", "admin"].includes(role)) {
        throw new AppError_1.AppError(404, "Invalid user role");
    }
    // Check if user exists
    const user = yield auth_model_1.default.findById(userId);
    if (!user) {
        throw new AppError_1.AppError(404, "User not found");
    }
    // Update the user's role
    user.role = role;
    yield user.save();
    (0, responseHandler_1.default)(res, {
        status: 201,
        success: true,
        message: "User role updated successfully",
        data: null,
    });
}));
const deleteUser = (0, asyncHandeler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    // Check if user exists
    const user = yield auth_model_1.default.findById(userId);
    if (!user) {
        throw new AppError_1.AppError(404, "User not found");
    }
    // Delete the user
    yield auth_model_1.default.findByIdAndDelete(userId);
    (0, responseHandler_1.default)(res, {
        status: 201,
        success: true,
        message: "User deleted successfully",
        data: null,
    });
}));
const logout = (0, asyncHandeler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("jwtAccessToken");
    (0, responseHandler_1.default)(res, {
        status: 201,
        success: true,
        message: "logged out",
        data: null
    });
}));
exports.AuthControllers = {
    createUser,
    loginUser,
    deleteUser,
    updateUserRole,
    getSingleUser,
    getAllUser,
    logout,
};
