import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { ProductServices } from "../services/product.service";
import { PaginationDto } from "../../domain/dtos/pagination.dto";
import { CreateProductDto } from "../../domain/dtos/create-product.dto";

export class ProductController {
  constructor(private readonly productService: ProductServices) {}

  private handleError(error: any, res: Response) {
    if (error instanceof CustomError) {
      return res
        .status(Number(error.statusCode))
        .json({ error: error.message });
    }
    return res.status(500).json({ error: `internal server error ${error}` });
  }
  createProduct =  (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create(req.body);
    if (error) res.status(400).json({ error });

    this.productService
      .createProduct(createProductDto!, req.body.user)
      .then(async(product) => {
        res.status(201).json(product)
      })
      .catch((error) => this.handleError(error, res));
  };

  getProducts = async (req: Request, res: Response) => {
    const { page = 1, limit = 5 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) res.status(400).json({ error });

    this.productService
      .getProducts(paginationDto!)
      .then((products) => res.status(200).json(products))
      .catch((error) => this.handleError(error, res));
  }
}
