import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { brandValidation } from "./brands.validation";
import { brandController } from "./brands.controller";
import userTokenVerify from "../../middleware/userTokenVerify";

const router = Router();

/**
 * Public
 */
router.get("/", brandController.getAllBrands);
router.get("/:id", brandController.getSingleBrand);

/**
 * Admin
 */
router.post(
  "/admin/create",
  userTokenVerify,
  validateRequest(brandValidation.createBrandValidationSchema),
  brandController.createBrand
);

router.put(
  "/admin/update/:id",
  userTokenVerify,
  validateRequest(brandValidation.updateBrandValidationSchema),
  brandController.updateBrand
);

router.delete(
  "/admin/delete/:id",
  userTokenVerify,
  brandController.deleteBrand
);

export const brandRouter = router;
