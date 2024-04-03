import { Validators } from "../../config/validators";

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly price: string,
    public readonly category: string,
    public readonly description: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, price, category, description } = object;
    if (!name) {
      return ["missing name"];
    }
    if (price && isNaN(+price)) return ["price must be a number"];
    if (!category) return ["missing category"];
    if (!description) return ["missing category"];
    if (Validators.isMongoId(category) === false)
      return ["invalid mongo user id"];
    return [
      undefined,
      new CreateProductDto(name, price, category, description),
    ];
  }
}
