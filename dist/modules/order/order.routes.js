"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = require("express");
const order_controllers_1 = require("./order.controllers");
const router = (0, express_1.Router)();
router.post("/create-order", order_controllers_1.OrderControlles.createUser);
router.get("/myOrder/:userId", order_controllers_1.OrderControlles.getMyOrder);
exports.OrderRoutes = router;
