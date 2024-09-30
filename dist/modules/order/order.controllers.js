"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControlles = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const asyncHandeler_1 = __importDefault(require("../../helpers/asyncHandeler"));
const responseHandler_1 = __importDefault(require("../../helpers/responseHandler"));
const QueryHandler_1 = __importDefault(require("../../queryBuilder/QueryHandler"));
const order_Model_1 = __importDefault(require("./order.Model"));
const createUser = (0, asyncHandeler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productPayload = req.body;
    const result = yield order_Model_1.default.create(productPayload);
    (0, responseHandler_1.default)(res, {
        status: 201,
        success: true,
        message: "order created successfully",
        data: result
    });
}));
const getMyOrder = (0, asyncHandeler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const query = req.query;
    query.userId = userId;
    const queryHandler = new QueryHandler_1.default(query, order_Model_1.default);
    console.log(query);
    const result = yield queryHandler.paginate().execute();
    const metaData = yield queryHandler.getPaginationResult();
    (0, responseHandler_1.default)(res, {
        status: 201,
        success: true,
        message: "My order retrieved successfully",
        data: result,
        metaData: metaData
    });
}));
exports.OrderControlles = {
    createUser,
    getMyOrder
};
