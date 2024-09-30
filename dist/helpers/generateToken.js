"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = ({ jwtPayload, expiresIn, secretToken }) => {
    const token = jsonwebtoken_1.default.sign(jwtPayload, secretToken, {
        expiresIn: expiresIn,
        algorithm: "HS256",
    });
    return token;
};
exports.default = generateToken;
