import { Router } from "express";
import { OrderControlles } from "./order.controllers";

const router = Router()

router.post("/create-order", OrderControlles.createUser)
router.get("/myOrder/:userId", OrderControlles.getMyOrder)

export const OrderRoutes = router
// add