import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/custom.error";
import { PaginationDto } from "../../domain/dtos/pagination.dto";
import { CreateProductDto } from "../../domain/dtos/create-product.dto";
import { productModel } from "../../data/mongo/models/product.model";
import mongoose from "mongoose";
import { UpdateProductDto } from "../../domain/dtos/update-product.dto";
import { categoryModel } from "../../data/mongo/models/category.model";

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
      //? only show with the role psicologo
      // const categories = await categoryModel.find({ role: "all" }, "_id");
      // const categoryIds = categories.map((category) => category._id);
      // productModel.countDocuments({ category: { $in: categoryIds } }),
      // .find({ category: { $in: categoryIds } })
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
        data: products.map((product) => {
          return {
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
          };
        }),
      };
    } catch (error) {
      throw CustomError.internalServel(`internal error ${error}`);
    }
  }

  getProduct = async (id: string) => {
    try {
      //? find the product by id and populate the category field with the id, role and name
      const product = await productModel
        .findById(id)
        .populate("category", "id role name");
      if (!product) throw CustomError.notFound("product not found");
      return product;
    } catch (error) {
      throw CustomError.internalServel(`internal error ${error}`);
    }
  };

  updateProduct = async (product: UpdateProductDto) => {
    if (!product.id) {
      throw CustomError.notFound("Product ID is required");
    }

    try {
      //? find the product by id and update it with findByIdAndUpdate
      const updatedProduct = await productModel.findByIdAndUpdate(
        product.id,
        product,
        {
          new: true,
        }
      );

      if (!updatedProduct) throw CustomError.notFound("product not found");
      return updatedProduct;
    } catch (error) {
      throw CustomError.internalServel(`internal error ${error}`);
    }
  };
}
