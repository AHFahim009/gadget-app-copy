/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "./AppError";

async function verifyRefreshToken({
    token,
    storedToken,
}: {
    token: string;
    storedToken: string;
}) {
    try {
        const decoded = jwt.verify(token, storedToken);
        return decoded as JwtPayload;
    } catch (error: any) {
        //  if token validation failed of a authentic user that he his visit time may be expired . so he should be login again....

        throw new AppError(401, "your session out please login... ");
    }
}

export default verifyRefreshToken;
