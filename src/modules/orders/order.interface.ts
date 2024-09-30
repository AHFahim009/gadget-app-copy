import { Document } from "mongoose";

export type TShoppingCart = {
    _id: string;
    name: string;
    price: number;
    stock: number;
    photo: string;
    quantity: number;
};

export type TShoppingInfo = {
    name: string;
    address: string;
    country: string;
};

export interface TOrder extends Document {
    carts: TShoppingCart[];
    total: number;
    userId: string;
    shoppingInfo: TShoppingInfo;
    tax: number;
    shippingCharge: number;
    subtotal: number;
};