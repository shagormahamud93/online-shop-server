import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import userTokenVerify from "../../middleware/userTokenVerify";
import { categoryValidation } from "./categories.validation";
import { categoryController } from "./categories.controller";

const router = Router();
/**
 * Public
 */
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getSingleCategory);

/**
 * Admin
 */
router.post(
  "/admin/category",
  userTokenVerify,
  validateRequest(categoryValidation.createCategoryValidationSchema),
  categoryController.createCategory
);

router.put(
  "/admin/category/:id",
  userTokenVerify,
  validateRequest(categoryValidation.updateCategoryValidationSchema),
  categoryController.updateCategory
);

router.delete(
  "/admin/category/:id",
  userTokenVerify,
  categoryController.deleteCategory
);

export const categoryRouter = router;
