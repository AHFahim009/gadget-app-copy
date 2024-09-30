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
const AppError_1 = require("../helpers/AppError");
const verifyToken_1 = __importDefault(require("../helpers/verifyToken"));
const config_1 = require("../config");
const asyncHandeler_1 = __importDefault(require("../helpers/asyncHandeler"));
const authGuard = () => {
    return (0, asyncHandeler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError_1.AppError(404, "No token provided");
        }
        const decodeToken = yield (0, verifyToken_1.default)({
            token: token,
            storedToken: config_1.config.ACCESS_TOKEN,
        });
        // console.log({ accessToken: decodeToken });
        next();
    }));
};
exports.default = authGuard;
