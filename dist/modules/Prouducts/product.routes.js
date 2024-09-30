"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const product_controllers_1 = require("./product.controllers");
const multer_1 = __importDefault(require("../../middlewares/multer"));
const router = (0, express_1.Router)();
router.post("/create-product", 
//  auth middleware
multer_1.default.single("photo"), (req, res, next) => {
    const body = JSON.parse(req.body.data);
    req.body = body;
    next();
}, 
// validateSchema(ProductValidation.productSchema),
product_controllers_1.ProductControllers.createProduct);
router.get("/:productId", product_controllers_1.ProductControllers.getSingleProduct);
router.get("/", product_controllers_1.ProductControllers.getAllProducts);
exports.ProductRoutes = router;
