"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const ShoppingCartSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    photo: { type: String, required: true },
    quantity: { type: Number, required: true },
}, { _id: false }); // _id set to false here since we handle _id as a string
// Define the Shopping Info schema
const ShoppingInfoSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true }
}, { _id: false });
// Define the Order schema
const OrderSchema = new mongoose_1.Schema({
    carts: { type: [ShoppingCartSchema], required: true }, // Array of shopping cart items
    total: { type: Number, required: true },
    userId: { type: String, required: true },
    shoppingInfo: { type: ShoppingInfoSchema, required: true }, // Embedded document for shopping info
    tax: { type: Number, required: true },
    shippingCharge: { type: Number, required: true },
    subtotal: { type: Number, required: true }
}, { timestamps: true }); // Automatically adds `createdAt` and `updatedAt` timestamps
// Create and export the Mongoose model for Order
const OrderModel = mongoose_1.default.model('Order', OrderSchema);
exports.default = OrderModel;
