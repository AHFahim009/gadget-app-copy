/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";

type TJwtPayload = {
    _id: any;
    name: string;
    email: string;
    photo?: string;
    role: string
}


const generateToken = ({ jwtPayload, expiresIn, secretToken }: { jwtPayload: TJwtPayload, expiresIn: string, secretToken: string }) => {


    const token = jwt.sign(jwtPayload, secretToken, {
        expiresIn: expiresIn,
        algorithm: "HS256",
    });

    return token;
};

export default generateToken;
