import { CreateCategoryDto } from "../../domain/dtos/create-category.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { categoryModel } from "../../data/mongo/models/category.model";
import { CustomError } from "../../domain/errors/custom.error";
import { PaginationDto } from "../../domain/dtos/pagination.dto";

export class CategoryServices {
  constructor() {}

  createCategory = async (
    createCategoryDto: CreateCategoryDto,
    user: UserEntity
  ) => {
    const categoryExists = await categoryModel.findOne({
      name: createCategoryDto.name,
    });
    if (categoryExists) throw CustomError.badRequest("category already exists");

    try {
      const category = new categoryModel({
        ...createCategoryDto,
        user: user.id,
      });
      await category.save();
      return {
        id: category.id,
        name: category.name,
        role: category.role,
        available: category.available,
      };
    } catch (error) {
      throw new Error(`internal server error ${error}`);
    }
  };

  async getCategories(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      const [total, categories] = await Promise.all([
        categoryModel.countDocuments(),
        categoryModel
          .find()
          .skip((page - 1) * limit)
          .limit(limit),
      ]);
      return {
        page: page,
        limit: limit,
        total: total,
        next: `/api/categories?page=${page + 1}&limit=${limit}`,
        prev:
          page - 1 > 0
            ? `/api/categories?page=${page - 1}&limit=${limit}`
            : null,
        data: categories.map((category) => ({
          id: category.id,
          name: category.name,
          available: category.available,
        })),
      };
    } catch (error) {
      throw CustomError.internalServel(`internal error ${error}`);
    }
  }
}
