"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const multer_1 = require("multer");
const multer_2 = __importDefault(require("multer"));
const storage = (0, multer_1.diskStorage)({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
        console.log(file);
    },
    filename: (req, file, cb) => {
        const randomNumber = Math.floor(Math.random() * 1000);
        const uniqueSuffix = `${randomNumber}${(0, path_1.extname)(file.originalname)}`;
        cb(null, uniqueSuffix);
    },
});
const upload = (0, multer_2.default)({ storage });
exports.default = upload;
