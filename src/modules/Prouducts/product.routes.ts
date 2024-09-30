import { NextFunction, Request, Response, Router } from "express";
import { ProductControllers } from "./product.controllers";
import upload from "../../middlewares/multer";

const router = Router();

router.post(
    "/create-product",
    //  auth middleware
    upload.single("photo"),
    (req: Request, res: Response, next: NextFunction) => {
        const body = JSON.parse(req.body.data);
        req.body = body;

        next();
    },
    // validateSchema(ProductValidation.productSchema),
    ProductControllers.createProduct
);

router.get("/:productId", ProductControllers.getSingleProduct);

router.get("/", ProductControllers.getAllProducts);

export const ProductRoutes = router;
