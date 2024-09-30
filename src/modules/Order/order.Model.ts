import mongoose, { Schema } from 'mongoose';
import { TOrder, TShoppingCart, TShoppingInfo } from './order.interface';


const ShoppingCartSchema = new Schema<TShoppingCart>({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    photo: { type: String, required: true },
    quantity: { type: Number, required: true },
}, { _id: false }); // _id set to false here since we handle _id as a string

// Define the Shopping Info schema
const ShoppingInfoSchema = new Schema<TShoppingInfo>({
    name: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true }
}, { _id: false });

// Define the Order schema
const OrderSchema = new Schema<TOrder>({
    carts: { type: [ShoppingCartSchema], required: true }, // Array of shopping cart items
    total: { type: Number, required: true },
    userId: { type: String, required: true },
    shoppingInfo: { type: ShoppingInfoSchema, required: true }, // Embedded document for shopping info
    tax: { type: Number, required: true },
    shippingCharge: { type: Number, required: true },
    subtotal: { type: Number, required: true }
}, { timestamps: true }); // Automatically adds `createdAt` and `updatedAt` timestamps

// Create and export the Mongoose model for Order
const OrderModel = mongoose.model<TOrder>('Order', OrderSchema);

export default OrderModel;
