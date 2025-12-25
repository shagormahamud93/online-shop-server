import { brandRouter } from "../app/modules/brands/brands.route";
import { categoryRouter } from "../app/modules/categories/categories.route";
import { productRouter } from "../app/modules/product/product.route";
import { userRouter } from "../app/modules/user/user.route";
import { Router } from "express";

const router = Router();
const moduleRoutes = [
  {
    path: "/auth",
    route: userRouter,
  },
  {
    path: "/categories",
    route: categoryRouter,
  },
  {
    path: "/brands",
    route: brandRouter,
  },
  {
    path: "/products",
    route: productRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
