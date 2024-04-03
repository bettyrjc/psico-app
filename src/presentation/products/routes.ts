import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { ProductController } from "./controller";
import { ProductServices } from "../services/product.service";

export class ProductsRoutes {
  static get routes(): Router {
    const router = Router();
    const productServices = new ProductServices();
    const controller = new ProductController(productServices);

    router.post("/", [AuthMiddleware.validateJwt], controller.createProduct);
    router.get("/", controller.getProducts);
    router.get("/:id", controller.getProduct);
    router.put("/:id", controller.updateProduct);

    return router;
  }
}
