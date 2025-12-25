import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { productValidation } from "./product.validation";
import { productController } from "./product.controller";
import userTokenVerify from "../../middleware/userTokenVerify";

const router = Router();

/**
 * Public
 */
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getSingleProduct);

/**
 * Admin
 */
router.post(
  "/admin/create",
  userTokenVerify,
  validateRequest(productValidation.createProductValidationSchema),
  productController.createProduct
);

router.put(
  "/admin/update/:id",
  userTokenVerify,
  validateRequest(productValidation.updateProductValidationSchema),
  productController.updateProduct
);

router.delete(
  "/admin/delete/:id",
  userTokenVerify,
  productController.deleteProduct
);

export const productRouter = router;
