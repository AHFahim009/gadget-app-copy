import { Router } from "express"
import { OrderControllers } from "./order.controllers"


const router = Router()




router.post("/create-order", OrderControllers.createUser)
router.get("/myOrder/:userId", OrderControllers.getMyOrder)

export const OrderRoutes = router




