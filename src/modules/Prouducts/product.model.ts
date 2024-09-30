import mongoose, { Schema } from "mongoose";
import { ProductProps } from "./product.interface";

const productSchema = new Schema<ProductProps>({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    photo: { type: String, required: true },
}, {
    timestamps: true
});

const ProductModel = mongoose.model<ProductProps>("product", productSchema);

export default ProductModel;
