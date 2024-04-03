import { Validators } from "../../config/validators";

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly price: string,
    public readonly category: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, price, category } = object;
    if (!name) {
      return ["missing name"];
    }
 
    if (!category) return ["missing category"];
    if (Validators.isMongoId(category) === false) return ["invalid mongo user id"];
    return [undefined, new CreateProductDto(name, price, category)];
  }
}
