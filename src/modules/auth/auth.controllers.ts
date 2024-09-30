/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import asyncHandler from "../../helpers/asyncHandeler";
import sendResponse from "../../helpers/responseHandler";
import { UserProps } from "./auth.interface";
import uploadImageAndGenerateUrls from "../../helpers/cloudinary";
import UserModel from "./auth.model";
import generateToken from "../../helpers/generateToken";
import { config } from "../../config";
import QueryHandler from "../../queryBuilder/QueryHandler";
import { AppError } from "../../helpers/AppError";

const createUser = asyncHandler(async (req, res) => {
    const userPayload = req.body as UserProps;
    const photo = req.file;



    const session = await mongoose.startSession();
    try {
        // Start session inside try block to handle potential errors
        session.startTransaction();


        if (photo) {

            const uploadResult = await uploadImageAndGenerateUrls(
                photo.path,
                userPayload.name
            );
            const photoUrl = uploadResult?.optimizedUrl || "";
            userPayload.photo = photoUrl;
        }

        // Create a new product instance
        // add
        const user = new UserModel({ ...userPayload });

        // Save the product using the session
        const result = await user.save({ session });

        const accessToken = generateToken({
            jwtPayload: {
                _id: result._id,
                name: result.name,
                email: result.email,
                photo: result.photo || "",
                role: user.role,
            },
            expiresIn: config.ACCESS_TOKEN_EXPIRY as string,
            secretToken: config.ACCESS_TOKEN as string,
        });


        // Commit the transaction
        await session.commitTransaction();
        const userData = {
            _id: result._id,
            name: result.name,
            email: result.email,
            photo: result.photo || "",
            role: user.role,
        }

        // Send a success response
        sendResponse(res, {
            status: 201,
            success: true,
            message: "User created successfully",
            accessToken,
            data: userData
        });

    } catch (error: any) {

        await session.abortTransaction();
        throw error;

    } finally {

        await session.endSession();

    }
});

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email, });
    if (!user) throw new Error("Invalid email or password");
    const isMatch = user.password === password;

    if (!isMatch) throw new Error("Invalid email or password");
    const accessToken = generateToken({
        jwtPayload: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        expiresIn: config.ACCESS_TOKEN_EXPIRY as string,
        secretToken: config.ACCESS_TOKEN as string,
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
    }

    sendResponse(res, {
        status: 201,
        success: true,
        message: "login success",
        data: userData,
        accessToken

    });


});




const getAllUser = asyncHandler(async (req, res) => {
    const query = req.query
    const queryHandler = new QueryHandler<UserProps>(query as any, UserModel);
    const users = await queryHandler.search(['name', 'email']).sort().paginate().execute();
    const metaData = await queryHandler.getPaginationResult()
    sendResponse(res, {
        status: 201,
        success: true,
        message: "get all user retrieved",
        data: users,
        metaData
    });
});


const getSingleUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;


    // Check if user exists
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new AppError(404, "User not found")
    }

    // get the user
    await UserModel.findById({ _id: userId });

    sendResponse(res, {
        status: 201,
        success: true,
        message: "User retrieved successfully",
        data: null,

    });
});





const updateUserRole = asyncHandler(async (req, res) => {
    const userId = req.params.id;


    const { role } = req.body;

    // Validate role input
    if (!["user", "admin"].includes(role)) {
        throw new AppError(404, "Invalid user role")
    }
    // Check if user exists
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new AppError(404, "User not found")
    }
    // Update the user's role
    user.role = role;
    await user.save();
    sendResponse(res, {
        status: 201,
        success: true,
        message: "User role updated successfully",
        data: null,

    });
});
const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;


    // Check if user exists
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new AppError(404, "User not found")
    }

    // Delete the user
    await UserModel.findByIdAndDelete(userId);

    sendResponse(res, {
        status: 201,
        success: true,
        message: "User deleted successfully",
        data: null,

    });
});


const logout = asyncHandler(async (req, res) => {
    res.clearCookie("jwtAccessToken")
    sendResponse(res, {
        status: 201,
        success: true,
        message: "logged out",
        data: null
    })
})


export const AuthControllers = {
    createUser,
    loginUser,

    deleteUser,
    updateUserRole,
    getSingleUser,
    getAllUser,

    logout,

};
