"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controllers_1 = require("./auth.controllers");
const multer_1 = __importDefault(require("../../middlewares/multer"));
const router = (0, express_1.Router)();
router.post("/create-user", 
//  auth middleware
multer_1.default.single("photo"), (req, res, next) => {
    const body = JSON.parse(req.body.data);
    req.body = body;
    next();
}, auth_controllers_1.AuthControllers.createUser);
router.post("/login", auth_controllers_1.AuthControllers.loginUser);
router.get("/get-all-users", auth_controllers_1.AuthControllers.getAllUser);
router.post("/logout", auth_controllers_1.AuthControllers.logout);
router.get("/user/:id", auth_controllers_1.AuthControllers.getSingleUser);
router.put("/user/:id", auth_controllers_1.AuthControllers.updateUserRole);
router.delete("/user/:id", auth_controllers_1.AuthControllers.deleteUser);
exports.AuthRoutes = router;
