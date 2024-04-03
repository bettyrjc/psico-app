import { Validators } from "../../config/validators";

export class UpdateProductDto {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: string,
    public readonly category: string,
    public readonly description: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateProductDto?] {
    const { name, price, category, description, id } = object;
    if (price && isNaN(+price)) return ["price must be a number"];
    if (!Validators.isMongoId(id)) return ["invalid product id"];
    return [
      undefined,
      new UpdateProductDto(id, name, price, category, description),
    ];
  }
}
