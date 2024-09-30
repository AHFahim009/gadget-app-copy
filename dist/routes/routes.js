"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const product_routes_1 = require("../modules/Prouducts/product.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const order_routes_1 = require("../modules/order/order.routes");
// commit
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/products",
        element: product_routes_1.ProductRoutes,
    },
    {
        path: "/auth",
        element: auth_routes_1.AuthRoutes,
    },
    {
        path: "/orders",
        element: order_routes_1.OrderRoutes,
    },
];
// fixed
moduleRoutes.forEach((route) => {
    router.use(route.path, route.element);
});
exports.routes = router;
