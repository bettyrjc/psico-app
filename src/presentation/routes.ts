import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { CategoriesRoutes } from "./categories/routes";
import { ProductsRoutes } from "./products/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use(`/api/v1/auth/`, AuthRoutes.routes);
    router.use(`/api/v1/categories/`, CategoriesRoutes.routes);
    router.use(`/api/v1/products/`, ProductsRoutes.routes);

    return router;
  }
}
