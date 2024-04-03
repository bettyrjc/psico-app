import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/custom.error";
import { PaginationDto } from "../../domain/dtos/pagination.dto";
import { CreateProductDto } from "../../domain/dtos/create-product.dto";
import { productModel } from "../../data/mongo/models/product.model";

export class ProductServices {
  constructor() {}

  createProduct = async (
    createProductDto: CreateProductDto,
    user: UserEntity
  ) => {
    const productExists = await productModel.findOne({
      name: createProductDto.name,
    });
    if (productExists) throw CustomError.badRequest("product already exists");

    try {
      const product = new productModel({
        ...createProductDto,
        user: user.id,
      });
      await product.save();
      return product;
    } catch (error) {
      throw new Error(`internal server error!! ${error}`);
    }
  };

  async getProducts(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      const [total, products] = await Promise.all([
        productModel.countDocuments(),
        productModel
          .find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate("category", "id role name"), // give me the category id, role and name I specified what field I wants
      ]);
      return {
        page: page,
        limit: limit,
        total: total,
        next: `/api/products?page=${page + 1}&limit=${limit}`,
        prev:
          page - 1 > 0 ? `/api/products?page=${page - 1}&limit=${limit}` : null,
        data: products,
      };
    } catch (error) {
      throw CustomError.internalServel(`internal error ${error}`);
    }
  }
}
