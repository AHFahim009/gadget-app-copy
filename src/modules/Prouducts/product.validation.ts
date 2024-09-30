import { z } from "zod";

const productSchema = z.object({
    name: z.string({
        required_error: "product name is required",
        invalid_type_error: "Name must be a string",
    }),
    category: z.string({
        required_error: "Product category is required",
        invalid_type_error: "Category must be a string",
    }),
    description: z.string({
        required_error: "Product description is required",
        invalid_type_error: "Description must be a string",
    }),
    price: z.coerce
        .number({
            required_error: "Product price is required",
            invalid_type_error: "Price must be a number",
        })
        .positive("Price must be a positive number"),
    stock: z.coerce
        .number({
            required_error: "Product stock is required",
            invalid_type_error: "Stock must be a number",
        })
        .positive("Stock must be a positive number"),
});

export const ProductValidation = {
    productSchema,
};
