/* eslint-disable @typescript-eslint/no-explicit-any */
import asyncHandler from "../../helpers/asyncHandeler";
import sendResponse from "../../helpers/responseHandler";
import QueryHandler from "../../queryBuilder/QueryHandler";
import { TOrder } from "./order.interface";
import OrderModel from "./order.Model";





const createUser = asyncHandler(async (req, res) => {
    const productPayload = req.body as TOrder;

    const result = await OrderModel.create(productPayload)

    sendResponse(res, {
        status: 201,
        success: true,
        message: "order created successfully",
        data: result
    });





});
const getMyOrder = asyncHandler(async (req, res) => {
    const userId = req.params.userId
    const query = req.query
    query.userId = userId
    const queryHandler = new QueryHandler<TOrder>(query, OrderModel)

    const result = await queryHandler.paginate().execute()
    const metaData = await queryHandler.getPaginationResult()

    sendResponse(res, {
        status: 201,
        success: true,
        message: "My order retrieved successfully",
        data: result,
        metaData: metaData
    });





});



export const OrderControlles = {
    createUser,
    getMyOrder
}