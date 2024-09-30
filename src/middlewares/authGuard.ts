import { AppError } from "../helpers/AppError";
import verifyRefreshToken from "../helpers/verifyToken";
import { config } from "../config";
import asyncHandler from "../helpers/asyncHandeler";

const authGuard = () => {
    return asyncHandler(async (req, res, next) => {

        const token = req.headers.authorization;

        if (!token) {
            throw new AppError(404, "No token provided");
        }

        const decodeToken = await verifyRefreshToken({
            token: token,
            storedToken: config.ACCESS_TOKEN as string,
        });


        // console.log({ accessToken: decodeToken });

        next();
    });
};

export default authGuard;
