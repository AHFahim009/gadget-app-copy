"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = require("zod");
const productSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "product name is required",
        invalid_type_error: "Name must be a string",
    }),
    category: zod_1.z.string({
        required_error: "Product category is required",
        invalid_type_error: "Category must be a string",
    }),
    description: zod_1.z.string({
        required_error: "Product description is required",
        invalid_type_error: "Description must be a string",
    }),
    price: zod_1.z.coerce
        .number({
        required_error: "Product price is required",
        invalid_type_error: "Price must be a number",
    })
        .positive("Price must be a positive number"),
    stock: zod_1.z.coerce
        .number({
        required_error: "Product stock is required",
        invalid_type_error: "Stock must be a number",
    })
        .positive("Stock must be a positive number"),
});
exports.ProductValidation = {
    productSchema,
};
