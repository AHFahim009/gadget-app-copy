import jwt from "jsonwebtoken";

type TJwtPayload = {
    _id: string;
    name: string;
    email: string;
    photo?: string;
    role: string;
    exp: number;
    iat: number
};

function decodeToken({ token }: { token: string }): TJwtPayload {
    const decoded = jwt.decode(token) as TJwtPayload;
    return decoded;
}

export default decodeToken