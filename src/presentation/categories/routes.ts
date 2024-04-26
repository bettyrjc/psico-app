import { Router } from "express";
import { CategoryController } from "./controller";
import { CategoryServices } from "../services/category.service";
import { AuthMiddleware } from "../middleware/auth.middleware";

export class CategoriesRoutes {
  static get routes(): Router {
    const router = Router();
    const categoryService = new CategoryServices();
    const controller = new CategoryController(categoryService);

    router.use(AuthMiddleware.validateJwt)

    
    router.get("/", controller.getCategory);
    router.post("/", controller.createCategory);

    return router;
  }
}
