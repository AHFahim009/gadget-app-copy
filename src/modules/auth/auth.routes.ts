import { NextFunction, Request, Response, Router } from "express";
import { AuthControllers } from "./auth.controllers";
import upload from "../../middlewares/multer";

const router = Router()

router.post(
    "/create-user",
    //  auth middleware
    upload.single("photo"),
    (req: Request, res: Response, next: NextFunction) => {
        const body = JSON.parse(req.body.data)
        req.body = body;
        next();

    },
    AuthControllers.createUser
)



router.post("/login", AuthControllers.loginUser)
router.get("/get-all-users", AuthControllers.getAllUser)
router.post("/logout", AuthControllers.logout)
router.get("/user/:id", AuthControllers.getSingleUser)
router.put("/user/:id", AuthControllers.updateUserRole)
router.delete("/user/:id", AuthControllers.deleteUser)

export const AuthRoutes = router