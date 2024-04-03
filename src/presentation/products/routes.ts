
import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { ProductController } from "./controller";
import { ProductServices } from '../services/product.service';

export class ProductsRoutes {
  static get routes(): Router {
    const router = Router();
    const productServices = new ProductServices();
    const controller = new ProductController(productServices);

    router.use(AuthMiddleware.validateJwt)
    router.post("/", controller.createProduct);
    router.get("/", controller.getProducts);

    return router;
  }
}