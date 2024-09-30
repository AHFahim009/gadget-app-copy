import { Router } from "express";
import { ProductRoutes } from "../modules/Prouducts/product.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { OrderRoutes } from "../modules/orders/order.routes";
// import { OrderRoutes } from "../modules/order/order.routes";
// commit

const router = Router()
const moduleRoutes = [
    {
        path: "/products",
        element: ProductRoutes,
    },
    {
        path: "/auth",
        element: AuthRoutes,
    },
    {
        path: "/orders",
        element: OrderRoutes,
    },


];

// fixed
moduleRoutes.forEach((route) => {
    router.use(route.path, route.element);
});

export const routes = router


